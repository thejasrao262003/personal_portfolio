import type { Metadata } from 'next'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail'
import { Laptop3D } from '@/components/ui/Laptop3D'
import { SEED_PROJECTS } from '@/lib/data/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'All projects by Thejas Rao — distributed systems, cloud infrastructure, automation, and backend engineering.',
}
const TYPING_STRINGS = [
  'Backend Engineering',
  'Cloud Infrastructure',
  'Automation Platforms',
  'Distributed Systems',
]

const PROJECT_IMAGES: Record<string, string> = {
  'kantara-contest-backend':   '/assets/images/home_page_projects/Kantara.png',
  'agri-predict-v2':           '/assets/images/home_page_projects/AgriPredict.png',
  'mcp-agentic-ec2':           '/assets/images/home_page_projects/AWS%20MCP.png',
  'a-lister-amazon-automation':'/assets/images/home_page_projects/ALister.png',
  'narratron':                 '/assets/images/home_page_projects/Narratron.png',
  'shopperb2b-store':          '/assets/images/home_page_projects/ShopperrB2B.png',
  'naya-global-sourcing':      '/assets/images/home_page_projects/NayaGlobal.png',
  'go-experiments':            '/assets/images/home_page_projects/Go.png',
}

const STATUS_LABEL: Record<string, string> = {
  Production:   'Production',
  Scalable:     'Scalable System',
  Automation:   'Automation',
  Experimental: 'Experimental',
}

export default function WorkPage() {
  const sorted = [...SEED_PROJECTS].sort((a, b) => a.order - b.order)

  const railItems: FocusRailItem[] = sorted.map((p) => ({
    id:          p.slug,
    title:       p.title,
    description: p.description,
    imageSrc:    PROJECT_IMAGES[p.slug] ?? '/assets/images/profile.png',
    href:        p.link,
    meta:        STATUS_LABEL[p.status] ?? p.status,
  }))

  return (
    <>
      <section className="page-hero work-hero" aria-label="Work page introduction">
        <div className="hero-glow" aria-hidden="true" />
        <div className="work-hero-inner">
          <div className="hero-content">
            <h1 className="hero-headline">
              <span className="dim">Here is some of my </span>
              <span className="bright">Work.</span>
            </h1>
            <p className="hero-typing-line" aria-live="polite">
              <span className="prefix dim">I&apos;ve built in&nbsp;</span>
              <TypeWriter strings={TYPING_STRINGS} />
            </p>
          </div>
          <div className="work-hero-laptop" aria-hidden="true">
            <Laptop3D />
          </div>
        </div>
      </section>

      <FocusRail items={railItems} loop autoPlay={false} />
    </>
  )
}
