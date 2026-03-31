// ============================================================
// TYPES — Shared TypeScript interfaces used across the app
// ============================================================

// Each project fetched from the API / DB
export interface Project {
  _id?: string
  slug: string           // URL-friendly identifier e.g. "agri-predict-v2"
  title: string
  description: string
  tags: string[]         // Tech stack tags
  grad: string           // CSS class name for gradient background
  link: string           // External URL (GitHub / live site)
  marquee: string        // Marquee text for the sticky section
  status: 'Production' | 'Scalable' | 'Automation' | 'Experimental'
  metrics: string[]      // Short metric strings e.g. ["20k+ users", "<1% failure"]
  featured: boolean      // Show in home page flip carousel
  order: number          // Sort order for display
  createdAt?: string
  updatedAt?: string
}

// Work experience entry
export interface Experience {
  _id?: string
  company: string
  role: string
  period: string         // e.g. "Jun '24 — Jul '24"
  location: string
  order: number
}

// Contact form message stored in DB
export interface ContactMessage {
  _id?: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt?: string
}

// Recognition / awards
export interface Recognition {
  award: string
  project: string
  date: string
  org: string
}

// Journey milestone (static, not from DB)
export interface JourneyItem {
  title: string
  description: string
  image: string
  imageAlt: string
  side: 'left' | 'right'
}

// Contact form input (client-side, before submit)
export interface ContactFormData {
  name: string
  email: string
  message: string
}

// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
