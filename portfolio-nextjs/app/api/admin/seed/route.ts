// ============================================================
// API — POST /api/admin/seed
//
// Seeds the database with default projects + experience data.
// Run this ONCE after deploying to a fresh MongoDB database.
//
// Usage:
//   curl -X POST https://your-domain/api/admin/seed \
//     -H "x-admin-secret: YOUR_ADMIN_SECRET"
//
// It's idempotent — it uses upsert so re-running won't
// create duplicates.
// ============================================================

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { ProjectModel } from '@/lib/models/Project'
import { ExperienceModel } from '@/lib/models/Experience'
import { SEED_PROJECTS } from '@/lib/data/projects'
import { SEED_EXPERIENCE } from '@/lib/data/experience'
import type { ApiResponse } from '@/types'

export async function POST(req: Request) {
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' } satisfies ApiResponse,
      { status: 401 }
    )
  }

  try {
    await connectDB()

    // Upsert projects by slug
    const projectResults = await Promise.all(
      SEED_PROJECTS.map((p) =>
        ProjectModel.findOneAndUpdate(
          { slug: p.slug },
          { $setOnInsert: p }, // Only insert if it doesn't exist yet
          { upsert: true, new: true }
        )
      )
    )

    // Upsert experience by company
    const expResults = await Promise.all(
      SEED_EXPERIENCE.map((e) =>
        ExperienceModel.findOneAndUpdate(
          { company: e.company },
          { $setOnInsert: e },
          { upsert: true, new: true }
        )
      )
    )

    return NextResponse.json({
      success: true,
      message: `Seeded ${projectResults.length} projects and ${expResults.length} experience entries.`,
    } satisfies ApiResponse)

  } catch (error) {
    console.error('[POST /api/admin/seed]', error)
    return NextResponse.json(
      { success: false, error: 'Seed failed' } satisfies ApiResponse,
      { status: 500 }
    )
  }
}
