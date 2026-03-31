// ============================================================
// API — GET /api/experience
//
// Returns all experience entries sorted by order (newest first).
// ============================================================

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { ExperienceModel } from '@/lib/models/Experience'
import type { ApiResponse, Experience } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()

    const experience = await ExperienceModel.find({}).sort({ order: 1 }).lean()

    return NextResponse.json({
      success: true,
      data: experience as unknown as Experience[],
    } satisfies ApiResponse<Experience[]>)
  } catch (error) {
    console.error('[GET /api/experience]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}
