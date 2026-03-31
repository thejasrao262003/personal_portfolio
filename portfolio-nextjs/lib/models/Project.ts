// ============================================================
// MODEL — Project
//
// Mongoose schema for portfolio projects stored in MongoDB.
// Each project has a slug (used in API routes), display
// metadata, and flags for featured/order.
// ============================================================

import mongoose, { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema(
  {
    slug:        { type: String, required: true, unique: true, trim: true },
    title:       { type: String, required: true },
    description: { type: String, required: true },
    tags:        { type: [String], default: [] },
    grad:        { type: String, required: true },   // CSS class name for the gradient
    link:        { type: String, required: true },
    marquee:     { type: String, default: '' },
    status: {
      type: String,
      enum: ['Production', 'Scalable', 'Automation', 'Experimental'],
      default: 'Production',
    },
    metrics:     { type: [String], default: [] },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 99 },
  },
  {
    // Adds createdAt + updatedAt automatically
    timestamps: true,
    // When converting to JSON (for API responses), rename _id → id
    toJSON: {
      virtuals: true,
      transform(_: unknown, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// Index for common query patterns
ProjectSchema.index({ featured: 1, order: 1 })
ProjectSchema.index({ slug: 1 })

// Prevent model recompilation on hot-reload (Next.js dev mode quirk)
export const ProjectModel =
  (models.Project as mongoose.Model<mongoose.Document & { slug: string }>) ||
  model('Project', ProjectSchema)
