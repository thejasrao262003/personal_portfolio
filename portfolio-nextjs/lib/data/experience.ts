// ============================================================
// SEED DATA — Experience + static content
// ============================================================

import type { Experience, Recognition, JourneyItem } from '@/types'

export const SEED_EXPERIENCE: Omit<Experience, '_id'>[] = [
  {
    company: 'Alaiy Technovations',
    role: 'Software Development Engineer',
    period: "Nov '24 — Present",
    location: 'Bengaluru, India',
    order: 1,
  },
  {
    company: 'Aveva',
    role: 'Software Engineering Intern',
    period: "Jun '24 — Jul '24",
    location: 'Bengaluru, India',
    order: 2,
  },
]

// Recognition is static (doesn't change often, no need for DB)
export const RECOGNITIONS: Recognition[] = [
  {
    award: 'Valedictorian — School Captain',
    project: 'Class of 2021',
    date: '2021',
    org: 'Pre-University',
  },
  {
    award: 'Hackathon Winner',
    project: 'GDSC Override Hackathon',
    date: '2024',
    org: 'GDSC',
  },
  {
    award: 'Top-10 Finalist',
    project: 'Hallathon',
    date: '2023',
    org: 'Hallmark',
  },
  {
    award: 'MRD Scholarship',
    project: 'All Semesters — CGPA 9.06',
    date: '2021–25',
    org: 'PES University',
  },
]

// Journey milestones (home page timeline) — static content
export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    title: 'Scale & Resilience',
    description:
      'Architected systems for high concurrency. Built contest backends handling 20k+ concurrent users and ~2000 RPS with sub-1% failure rates, validated through rigorous distributed Locust deployments.',
    image: '/assets/images/what_ive_built/Scale.png',
    imageAlt: 'Scale and Resilience Architecture',
    side: 'left',
  },
  {
    title: 'Asynchronous Workflows',
    description:
      'Deep focus on decoupled, event-driven architectures. Designed AWS SQS fan-out pipelines that orchestrate concurrent LLM execution, enabling a 50× throughput gain in production data processing.',
    image: '/assets/images/what_ive_built/SQS%20LAMBDA.png',
    imageAlt: 'AWS SQS and Lambda Architecture',
    side: 'right',
  },
  {
    title: 'Agentic Automation',
    description:
      'Exploring the intersection of AI and Infrastructure. Built modular MCP servers that allow LLMs to safely navigate and control AWS environments, powering GitHub Copilot to execute complex programmatic tasks.',
    image: '/assets/images/what_ive_built/LLM%20Workflow.png',
    imageAlt: 'LLM Agentic Workflow',
    side: 'left',
  },
  {
    title: 'Altitude & Perspective',
    description:
      'Off the screen, I spend time tracing map contours and climbing altitudes. High-altitude trekking clears the headspace and resets the baseline for deep, focused work.',
    image: '/assets/images/what_ive_built/Trekking.jpeg',
    imageAlt: 'High Altitude Trekking',
    side: 'right',
  },
  {
    title: 'Endurance & Momentum',
    description:
      "Whether it's debugging a stubborn distributed system trace or pushing through the final miles of a century ride, endurance is the recurring theme. I like hard climbs — in code and in real life.",
    image: '/assets/images/what_ive_built/Bike.png',
    imageAlt: 'Long Distance Road Biking',
    side: 'left',
  },
]
