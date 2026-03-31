// ============================================================
// API — GET /api/projects
//
// Returns all projects sorted by order.
// Optional query params:
//   ?featured=true  → only featured projects (for home page carousel)
// ============================================================

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { ProjectModel } from '@/lib/models/Project'
import type { ApiResponse, Project } from '@/types'

export const dynamic = 'force-dynamic' // Always fetch fresh from DB

export async function GET(req: Request) {
  try {
    await connectDB()

    const url = new URL(req.url)
    const featuredOnly = url.searchParams.get('featured') === 'true'

    const query = featuredOnly ? { featured: true } : {}
    const projects = await ProjectModel
      .find(query)
      .sort({ order: 1 })
      .lean()

    const response: ApiResponse<Project[]> = {
      success: true,
      data: projects as unknown as Project[],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[GET /api/projects]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}
