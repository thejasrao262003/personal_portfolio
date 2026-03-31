// ============================================================
// MODEL — Contact Message
//
// Every contact form submission is saved here. The 'read'
// flag lets you build a simple admin inbox view later.
// ============================================================

import mongoose, { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
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

MessageSchema.index({ createdAt: -1 })
MessageSchema.index({ read: 1 })

export const MessageModel =
  (models.Message as mongoose.Model<mongoose.Document>) ||
  model('Message', MessageSchema)
