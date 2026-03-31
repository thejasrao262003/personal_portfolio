# ============================================================
# DOCKERFILE — Multi-stage build for production
#
# Stage 1 (deps):    Install only production dependencies
# Stage 2 (builder): Build the Next.js application
# Stage 3 (runner):  Minimal runtime image (~150MB vs ~1GB)
#
# WHY multi-stage: Each stage uses a separate layer cache.
# If only source code changes (not package.json), the deps
# stage is cached and the build is much faster.
# ============================================================

# ── Stage 1: Install dependencies ─────────────────────────────
FROM node:20-alpine AS deps

# Install libc6-compat for Alpine compatibility with some npm packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files first — Docker caches this layer separately.
# If package.json hasn't changed, this entire stage is cache-hit.
COPY package.json package-lock.json* ./

RUN npm ci --omit=dev


# ── Stage 2: Build the application ────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy deps from stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# NEXT_PUBLIC_ vars must be available at build time
# Pass them via --build-arg in docker-compose or CI
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Build Next.js for production
RUN npm run build


# ── Stage 3: Production runner ────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what's needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Set Node.js to production mode
ENV NODE_ENV=production

CMD ["node", "server.js"]
