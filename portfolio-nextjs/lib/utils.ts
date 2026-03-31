// ShadCN utility — merges Tailwind classes intelligently
// clsx handles conditionals, tailwind-merge resolves conflicts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
