// ============================================================
// API — Admin: POST /api/admin/projects (create)
//             PUT  /api/admin/projects (update by slug)
//             DELETE /api/admin/projects?slug=xxx
//
// Protected by ADMIN_SECRET header.
// WHY simple token auth: portfolio admin is just you.
// No need for full OAuth. Generate a strong secret and keep
// it in env vars — rotate if exposed.
// ============================================================

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { ProjectModel } from '@/lib/models/Project'
import type { ApiResponse, Project } from '@/types'

function checkAuth(req: Request): boolean {
  const secret = req.headers.get('x-admin-secret')
  return secret === process.env.ADMIN_SECRET
}

// CREATE a new project
export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' } satisfies ApiResponse,
      { status: 401 }
    )
  }

  try {
    await connectDB()
    const body = (await req.json()) as Partial<Project>
    const project = await ProjectModel.create(body)

    return NextResponse.json(
      { success: true, data: project.toJSON() } satisfies ApiResponse,
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/admin/projects]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}

// UPDATE a project by slug
export async function PUT(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' } satisfies ApiResponse,
      { status: 401 }
    )
  }

  try {
    await connectDB()
    const body = (await req.json()) as Partial<Project> & { slug: string }

    if (!body.slug) {
      return NextResponse.json(
        { success: false, error: 'slug is required' } satisfies ApiResponse,
        { status: 400 }
      )
    }

    const updated = await ProjectModel.findOneAndUpdate(
      { slug: body.slug },
      { $set: body },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Project not found' } satisfies ApiResponse,
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updated.toJSON() } satisfies ApiResponse)
  } catch (error) {
    console.error('[PUT /api/admin/projects]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}

// DELETE a project by slug
export async function DELETE(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' } satisfies ApiResponse,
      { status: 401 }
    )
  }

  try {
    await connectDB()
    const url = new URL(req.url)
    const slug = url.searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'slug query param required' } satisfies ApiResponse,
        { status: 400 }
      )
    }

    const result = await ProjectModel.findOneAndDelete({ slug })

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Project not found' } satisfies ApiResponse,
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: 'Project deleted' } satisfies ApiResponse)
  } catch (error) {
    console.error('[DELETE /api/admin/projects]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}
