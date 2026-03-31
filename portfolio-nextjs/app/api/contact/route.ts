// ============================================================
// API — POST /api/contact
//
// Receives a contact form submission, validates it, saves
// it to MongoDB, and optionally sends an email notification.
//
// WHY server-side: email credentials must never touch the
// browser. The form POSTs JSON → this route → DB + email.
// ============================================================

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { MessageModel } from '@/lib/models/Message'
import type { ApiResponse, ContactFormData } from '@/types'

// Basic email regex — good enough for form validation
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactFormData

    // ── Server-side validation ──────────────────────────────
    const { name, email, message } = body

    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters.' } satisfies ApiResponse,
        { status: 400 }
      )
    }
    if (!email?.trim() || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' } satisfies ApiResponse,
        { status: 400 }
      )
    }
    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters.' } satisfies ApiResponse,
        { status: 400 }
      )
    }

    // ── Save to DB ──────────────────────────────────────────
    await connectDB()

    await MessageModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      read: false,
    })

    // ── Optional email notification ─────────────────────────
    // Only runs if SMTP env vars are configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL,
          subject: `New message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `
            <h3>New portfolio contact</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        })
      } catch (emailErr) {
        // Email failure should NOT fail the request — message is already saved
        console.warn('[contact] Email notification failed:', emailErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received! I'll get back to you soon.",
    } satisfies ApiResponse)

  } catch (error) {
    console.error('[POST /api/contact]', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}
