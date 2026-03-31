import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { JourneySection } from '@/components/home/JourneySection'
import { QuoteSection } from '@/components/home/QuoteSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { SEED_PROJECTS } from '@/lib/data/projects'
import { SEED_EXPERIENCE, JOURNEY_ITEMS } from '@/lib/data/experience'
import type { Project, Experience } from '@/types'

export const metadata: Metadata = {
  title: 'Thejas Rao — Backend Developer & Software Engineer',
  description:
    'Thejas Rao — Backend Developer based in Bengaluru. Building scalable systems, cloud infrastructure, and agentic workflows.',
}

export default function HomePage() {
  const featuredProjects = SEED_PROJECTS
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order) as Project[]

  const experience = SEED_EXPERIENCE as Experience[]

  return (
    <>
      <HeroSection />
      <ProjectsSection projects={featuredProjects} />
      <JourneySection items={JOURNEY_ITEMS} />
      <QuoteSection />
      <ExperienceSection experience={experience} />
    </>
  )
}
