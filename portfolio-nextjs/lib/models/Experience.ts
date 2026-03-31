// ============================================================
// MODEL — Work Experience
// ============================================================

import mongoose, { Schema, model, models } from 'mongoose'

const ExperienceSchema = new Schema(
  {
    company:  { type: String, required: true },
    role:     { type: String, required: true },
    period:   { type: String, required: true },
    location: { type: String, required: true },
    order:    { type: Number, default: 99 },
  },
  {
    timestamps: true,
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

ExperienceSchema.index({ order: 1 })

export const ExperienceModel =
  (models.Experience as mongoose.Model<mongoose.Document>) ||
  model('Experience', ExperienceSchema)
