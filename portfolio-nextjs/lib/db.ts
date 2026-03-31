// ============================================================
// DATABASE — MongoDB connection via Mongoose
//
// WHY: Next.js is serverless — each API route call can spin
// up a fresh Node process. Opening a new DB connection every
// call is expensive. We cache the connection in the Node.js
// module cache (global) so it survives between invocations
// in development (hot-reload) and in production serverless.
// ============================================================

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// Extend the Node.js global type to hold our cached connection
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

// Initialise cache on first module load
if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null }
}

const cached = global._mongooseCache

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set')

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
  }

  cached.conn = await cached.promise
  return cached.conn
}
