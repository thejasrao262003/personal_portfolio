// ============================================================
// SEED DATA — Projects
// These are the defaults seeded into MongoDB on first run.
// After seeding, data is served from the DB and can be
// edited via the admin API (POST /api/admin/projects).
// ============================================================

import type { Project } from '@/types'

export const SEED_PROJECTS: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    slug: 'kantara-contest-backend',
    title: 'Kantara Contest Backend',
    description:
      'High-concurrency contest backend built to handle 20,000+ simultaneous players. Designed with distributed architecture on AWS EC2, SQS message queuing, and API Gateway. Load-tested with distributed Locust deployments achieving ~2000 RPS with sub-1% failure rates.',
    tags: ['EC2', 'API Gateway', 'MySQL', 'Locust', 'SQS', 'AWS'],
    grad: 'grad-kantara',
    link: 'https://www.kantara.world/',
    marquee: 'KANTARA \u00a0\u00a0 SCALE \u00a0\u00a0 KANTARA \u00a0\u00a0 SCALE \u00a0\u00a0 KANTARA \u00a0\u00a0 ',
    status: 'Production',
    metrics: ['20k+ concurrent users', '<1% failure rate', '2000 RPS'],
    featured: true,
    order: 1,
  },
  {
    slug: 'agri-predict-v2',
    title: 'AgriPredict V2',
    description:
      'AI-powered crop yield and disease prediction system. Built a real-time agentic pipeline using LangGraph with AWS event-driven architecture (SQS + Lambda). Delivers 14-day agricultural forecasts with on-demand AI analysis.',
    tags: ['LangGraph', 'AWS', 'FastAPI', 'Event-driven', 'Lambda', 'SQS'],
    grad: 'grad-agri',
    link: 'https://agri-predict-v2-frontend.vercel.app/',
    marquee: 'AGRIPREDICT \u00a0\u00a0 AGRIPREDICT \u00a0\u00a0 AGRIPREDICT \u00a0\u00a0 AGRIPREDICT \u00a0\u00a0 ',
    status: 'Production',
    metrics: ['14-day forecasts', 'Real-time AI', 'Event-driven'],
    featured: true,
    order: 2,
  },
  {
    slug: 'mcp-agentic-ec2',
    title: 'MCP Server & Agentic EC2 Automation',
    description:
      'Built modular MCP (Model Context Protocol) servers enabling LLMs to safely navigate and control AWS environments. Powers GitHub Copilot to autonomously execute complex EC2 infrastructure tasks via typed tool interfaces.',
    tags: ['Python', 'FastMCP', 'Boto3', 'GitHub Copilot', 'AWS'],
    grad: 'grad-mcp',
    link: 'https://github.com/thejasrao262003/AWS_MCP',
    marquee: 'MCP \u00a0\u00a0 AGENTIC \u00a0\u00a0 MCP \u00a0\u00a0 AGENTIC \u00a0\u00a0 MCP \u00a0\u00a0 AGENTIC \u00a0\u00a0 ',
    status: 'Automation',
    metrics: ['Autonomous execution', 'LLM-driven', 'Typed tool interface'],
    featured: true,
    order: 3,
  },
  {
    slug: 'a-lister-amazon-automation',
    title: 'A-Lister — Amazon Listing Automation',
    description:
      'Production-scale Amazon product listing automation platform. Built a serverless SQS fan-out pipeline orchestrating concurrent LLM + VLM execution on ECS, processing 50 rows in 30s — a 50x throughput gain over the previous sequential approach.',
    tags: ['AWS Lambda', 'SQS', 'ECS', 'FastAPI', 'MongoDB'],
    grad: 'grad-alister',
    link: 'https://alister.alaiy.com/',
    marquee: 'A-LISTER \u00a0\u00a0 AUTOMATION \u00a0\u00a0 A-LISTER \u00a0\u00a0 AUTOMATION \u00a0\u00a0 ',
    status: 'Scalable',
    metrics: ['50x throughput gain', '50 rows in 30s', 'VLM pipeline'],
    featured: true,
    order: 4,
  },
  {
    slug: 'narratron',
    title: 'Narratron — YouTube Shorts Pipeline',
    description:
      'Fully serverless pipeline that autonomously generates complete YouTube Shorts every 48 hours. Script → TTS → video render in under 5 minutes. Built on Modal serverless for GPU compute, AWS Lambda for orchestration, and S3 for storage.',
    tags: ['FastAPI', 'Modal serverless', 'AWS Lambda', 'AWS S3', 'MongoDB', 'FFmpeg'],
    grad: 'grad-narratron',
    link: 'https://github.com/thejasrao262003/narratron-deployment',
    marquee: 'NARRATRON \u00a0\u00a0 SERVERLESS \u00a0\u00a0 NARRATRON \u00a0\u00a0 SERVERLESS \u00a0\u00a0 ',
    status: 'Automation',
    metrics: ['Auto every 48hrs', '<5 min render', 'Serverless GPU'],
    featured: true,
    order: 5,
  },
  {
    slug: 'shopperb2b-store',
    title: 'ShopperB2B Store Backend',
    description:
      'Microservices-based B2B e-commerce store backend. Built with FastAPI, PostgreSQL, Docker, and Redis caching. Designed for high availability with event sourcing patterns and horizontal scalability.',
    tags: ['FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    grad: 'grad-shopperb2b',
    link: 'https://b2b.shopperr.in/',
    marquee: 'SHOPPERB2B \u00a0\u00a0 MICROSERVICES \u00a0\u00a0 SHOPPERB2B \u00a0\u00a0 ',
    status: 'Production',
    metrics: ['Microservices', 'High availability', 'Event Sourcing'],
    featured: false,
    order: 6,
  },
  {
    slug: 'naya-global-sourcing',
    title: 'NayaGlobal — Sourcing Platform',
    description:
      'Global B2B product sourcing platform backend. Built powerful Elasticsearch-backed search APIs on top of a FastAPI + PostgreSQL stack deployed on AWS for cloud scalability.',
    tags: ['FastAPI', 'PostgreSQL', 'Elasticsearch', 'AWS'],
    grad: 'grad-naya',
    link: 'https://nayaglobal.alaiy.com/',
    marquee: 'NAYAGLOBAL \u00a0\u00a0 SOURCING \u00a0\u00a0 NAYAGLOBAL \u00a0\u00a0 ',
    status: 'Production',
    metrics: ['Global B2B catalog', 'Search APIs', 'Cloud scalable'],
    featured: false,
    order: 7,
  },
  {
    slug: 'go-experiments',
    title: 'Go Learning Experiments',
    description:
      'Learning Go by building: HTTP servers, goroutine-based concurrency experiments, channel patterns, and CLI tooling. Exploring Go\'s concurrency model as a counterpoint to Python\'s async patterns.',
    tags: ['Go', 'Goroutines', 'Channels', 'net/http'],
    grad: 'grad-go',
    link: 'https://github.com/thejasrao262003/go_server',
    marquee: 'GOLANG \u00a0\u00a0 CONCURRENCY \u00a0\u00a0 GOLANG \u00a0\u00a0 CONCURRENCY \u00a0\u00a0 ',
    status: 'Experimental',
    metrics: ['High concurrency', 'Typed abstractions', 'CLI Tooling'],
    featured: false,
    order: 8,
  },
]
