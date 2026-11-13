export type DivisionId = 'tech' | 'digital' | 'studios' | 'events';

export interface ServiceItem {
  name: string;
  detail: string;
  deliverable: string;
}

export interface CapabilityCluster {
  cluster: string;
  specCode: string;
  headline: string;
  summary: string;
  bgWebp: string;
  bgFallback: string;
  mockupTitle: string;
  mockupMetrics: { label: string; value: string }[];
  mockupPipeline: string[];
  items: ServiceItem[];
}

export interface WorldDivision {
  id: DivisionId;
  index: string;
  tier: 'PRIMARY DIVISION' | 'SECONDARY DIVISION' | 'COMPLEMENTARY STUDIO' | 'COMPLEMENTARY EXECUTION';
  name: string;
  shortName: string;
  environmentTitle: string;
  headline: string;
  description: string;
  telemetryTag: string;
  services: ServiceItem[];
  clusters: CapabilityCluster[];
  comingSoon?: boolean;
}

export interface SoftwareProductShowcase {
  id: string;
  code: string;
  title: string;
  category: string;
  tagline: string;
  architectureLayer: string;
}

export interface ApproachStage {
  number: string;
  title: string;
  description: string;
  artifact: string;
}

export interface ExperimentConcept {
  id: string;
  code: string;
  title: string;
  division: string;
  divisionId: DivisionId;
  classification: 'DEMONSTRATION CONCEPT';
  summary: string;
  imageWebp: string;
  imageFallback: string;
  imageAlt: string;
  architectureNotes: string[];
  integratedSystems: string[];
}

export const BRAND_STATEMENTS = {
  name: 'WONTWE',
  tagline: 'Yes we Do.',
  heroHeadline: "ENGINEERING WHAT'S NEXT.",
  heroSub: 'We design, engineer and deploy digital solutions that help businesses evolve.',
  techIntroHeadline: 'TECHNOLOGY THAT MOVES BUSINESS FORWARD.',
  techIntroSupport:
    'Scalable software architectures, intelligent automation, and cloud platforms built as unified digital products.',
  contactHeadline: "LET'S BUILD SOMETHING EXTRAORDINARY.",
  contactSupport:
    'Ready to architect software systems, deploy intelligent automation, or launch an integrated digital platform?',
} as const;

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'divisions', label: 'Divisions' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const;

export const CONTACT_INFO = {
  phoneDisplay: '+91 8095770506',
  phoneRaw: '8095770506',
  phoneHref: 'tel:+918095770506',
  whatsappNumber: '918095770506',
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const defaultMsg =
    message ?? 'Hello WONTWE, I would like to discuss a software or digital project.';
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;
}

export const SOFTWARE_SHOWCASES: SoftwareProductShowcase[] = [
  {
    id: 'saas-web',
    code: '01',
    title: 'Web, Mobile & SaaS',
    category: 'Software Engineering',
    tagline: 'Multi-tenant platforms, commerce engines, and responsive interfaces.',
    architectureLayer: 'REACT · TYPESCRIPT · DISTRIBUTED APIS',
  },
  {
    id: 'business-erp',
    code: '02',
    title: 'Enterprise ERP & Dashboards',
    category: 'Business Systems',
    tagline: 'Unified resource planning, CRM pipelines, HRMS, and live KPI consoles.',
    architectureLayer: 'RELATIONAL CORE · ROLE ACCESS · TELEMETRY',
  },
  {
    id: 'ai-automation',
    code: '03',
    title: 'AI & Intelligent Workflows',
    category: 'AI & Automation',
    tagline: 'Retrieval agents, conversational bots, and automated operational pipelines.',
    architectureLayer: 'LLM PIPELINES · EVENT QUEUES · GUARDRAILS',
  },
  {
    id: 'cloud-devops',
    code: '04',
    title: 'Cloud & CI/CD Infrastructure',
    category: 'Cloud & DevOps',
    tagline: 'High-availability cloud networks, automated delivery, and disaster recovery.',
    architectureLayer: 'CONTAINERS · IAC · ZERO-DOWNTIME RELEASE',
  },
];

export const WORLDS: WorldDivision[] = [
  {
    id: 'tech',
    index: '01',
    tier: 'PRIMARY DIVISION',
    name: 'WONTWE Tech',
    shortName: 'Tech',
    environmentTitle: 'Software Engineering, AI & Cloud Architecture',
    headline: 'BUILT FOR MODERN ENTERPRISE.',
    description:
      'Explore our five core engineering disciplines powering custom applications, business infrastructure, intelligent automation, and cloud delivery.',
    telemetryTag: 'PRIMARY DIVISION // WONTWE TECH',
    clusters: [
      {
        cluster: 'SOFTWARE ENGINEERING',
        specCode: 'TECH-01',
        headline: 'Full-Stack Products & SaaS Platforms',
        summary: 'Customer-facing web applications, mobile software, and scalable subscription products.',
        bgWebp: '/images/hero-tech-architecture.webp',
        bgFallback: '/images/hero-tech-architecture.jpg',
        mockupTitle: 'APPLICATION ARCHITECTURE // SAAS & WEB',
        mockupMetrics: [
          { label: 'RUNTIME LAYER', value: 'React / Mobile / Edge' },
          { label: 'TENANCY MODEL', value: 'Isolated Multi-Tenant' },
          { label: 'RELEASE CADENCE', value: 'Continuous Modular' },
        ],
        mockupPipeline: ['Design System', 'Application Core', 'Commerce & Auth', 'Global Edge'],
        items: [
          {
            name: 'Website Development',
            detail: 'High-speed, responsive corporate and product websites engineered on clean semantic architecture.',
            deliverable: 'Responsive Frontend + Core Web Vitals Optimization',
          },
          {
            name: 'Web Application Development',
            detail: 'Interactive browser platforms built for complex user workflows and real-time concurrency.',
            deliverable: 'SPA / SSR Architecture + State & API Layer',
          },
          {
            name: 'Mobile Application Development',
            detail: 'iOS and Android mobile apps crafted for smooth interactions, security, and offline resilience.',
            deliverable: 'Cross-Platform / Native Mobile Build',
          },
          {
            name: 'E-commerce Development',
            detail: 'Custom storefronts, inventory sync, checkout flows, and multi-gateway payment architecture.',
            deliverable: 'Storefront Engine + Payment & Order Pipeline',
          },
          {
            name: 'Custom Software Development',
            detail: 'Tailored software systems designed strictly around proprietary operational workflows.',
            deliverable: 'Bespoke Application + Domain Logic Modules',
          },
          {
            name: 'SaaS Development',
            detail: 'End-to-end subscription software featuring tenant isolation, billing engines, and user permissions.',
            deliverable: 'Multi-Tenant SaaS + Subscription Control',
          },
        ],
      },
      {
        cluster: 'BUSINESS SYSTEMS',
        specCode: 'TECH-02',
        headline: 'Enterprise ERP, CRM & Operations',
        summary: 'Unified business software replacing manual spreadsheets and disconnected internal tools.',
        bgWebp: '/images/world-tech-lab.webp',
        bgFallback: '/images/world-tech-lab.jpg',
        mockupTitle: 'OPERATIONS WORKSPACE // ERP & CRM MESH',
        mockupMetrics: [
          { label: 'CORE MODULES', value: 'ERP · CRM · HRMS' },
          { label: 'DATA INTEGRITY', value: 'Role-Based Audit Trail' },
          { label: 'VISIBILITY', value: 'Live KPI Telemetry' },
        ],
        mockupPipeline: ['Inventory Sync', 'CRM Pipeline', 'Workflow Engine', 'Executive View'],
        items: [
          {
            name: 'ERP Development',
            detail: 'Unified resource planning connecting procurement, finance, operations, and reporting.',
            deliverable: 'Modular ERP Suite + Financial & Ops Sync',
          },
          {
            name: 'CRM Development',
            detail: 'Structured account management, lead pipelines, follow-up automation, and activity logs.',
            deliverable: 'Pipeline Console + Automated Lead Tracking',
          },
          {
            name: 'HRMS Development',
            detail: 'Centralized employee records, attendance tracking, leave approvals, and payroll workflows.',
            deliverable: 'Workforce Portal + Approval Automation',
          },
          {
            name: 'Inventory Management Systems',
            detail: 'Real-time stock ledger tracking across warehouses with automated reorder thresholds.',
            deliverable: 'Multi-Location Stock Sync + Alerts',
          },
          {
            name: 'Workflow Automation',
            detail: 'Rule-driven routing, escalation policies, and digital sign-offs eliminating manual handoffs.',
            deliverable: 'Event Triggers + Audit-Ready Routing',
          },
          {
            name: 'Custom Business Dashboards',
            detail: 'Executive analytics interfaces turning live operational data into clear daily visibility.',
            deliverable: 'Role-Scoped Telemetry & Reporting Views',
          },
        ],
      },
      {
        cluster: 'AI & AUTOMATION',
        specCode: 'TECH-03',
        headline: 'Applied AI & Intelligent Pipelines',
        summary: 'Production AI models, contextual chatbots, and automated decision workflows with human oversight.',
        bgWebp: '/images/exp-tech.webp',
        bgFallback: '/images/exp-tech.jpg',
        mockupTitle: 'INTELLIGENCE ENGINE // AI WORKFLOW GRAPH',
        mockupMetrics: [
          { label: 'MODEL LAYER', value: 'RAG + Structured LLM' },
          { label: 'AUTOMATION', value: 'Event-Driven Agents' },
          { label: 'GOVERNANCE', value: 'Deterministic Guardrails' },
        ],
        mockupPipeline: ['Input Signal', 'Context Retrieval', 'AI Reasoning', 'Verified Action'],
        items: [
          {
            name: 'AI Integration',
            detail: 'Embedding language, classification, and predictive models directly into existing software stacks.',
            deliverable: 'Secure Model Endpoints + Stack Connectors',
          },
          {
            name: 'AI Chatbot Development',
            detail: 'Domain-grounded customer support and internal knowledge assistants trained on verified data.',
            deliverable: 'Retrieval-Grounded Conversational Interface',
          },
          {
            name: 'Intelligent Automation',
            detail: 'Combining AI extraction and classification with deterministic triggers across enterprise operations.',
            deliverable: 'Document & Triage Automation Pipeline',
          },
          {
            name: 'AI-powered Applications',
            detail: 'Full software products designed natively around generative, analytical, or assistive intelligence.',
            deliverable: 'End-to-End AI Product Architecture',
          },
        ],
      },
      {
        cluster: 'CLOUD & DEVOPS',
        specCode: 'TECH-04',
        headline: 'Resilient Infrastructure & Continuous Delivery',
        summary: 'Automated cloud environments, zero-downtime deployment pipelines, and database continuity.',
        bgWebp: '/images/world-tech-lab.webp',
        bgFallback: '/images/world-tech-lab.jpg',
        mockupTitle: 'INFRASTRUCTURE PLANE // CLOUD & CI/CD',
        mockupMetrics: [
          { label: 'DEPLOYMENT', value: 'Automated CI/CD Gates' },
          { label: 'PERSISTENCE', value: 'Replicated Databases' },
          { label: 'RESILIENCE', value: 'Encrypted Snapshots' },
        ],
        mockupPipeline: ['Code Push', 'Automated QA', 'Container Build', 'Zero-Downtime Sync'],
        items: [
          {
            name: 'Cloud Infrastructure',
            detail: 'Scalable virtual networks, load-balanced compute clusters, and hardened cloud security boundaries.',
            deliverable: 'Cloud Topology + Network Security Rules',
          },
          {
            name: 'Server Management',
            detail: 'Continuous OS patching, resource scaling, runtime tuning, and firewall governance.',
            deliverable: 'Managed Runtime + Uptime Optimization',
          },
          {
            name: 'CI/CD',
            detail: 'Automated build, test, and staged release pipelines ensuring reliable software shipping.',
            deliverable: 'Automated Release & Rollback Pipelines',
          },
          {
            name: 'DevOps',
            detail: 'Infrastructure-as-code practices aligning software engineering velocity with production stability.',
            deliverable: 'IaC Templates + Observability Stack',
          },
          {
            name: 'Database Management',
            detail: 'Schema architecture, query optimization, indexing, and secure high-availability replication.',
            deliverable: 'Tuned Schemas + Read/Write Scaling',
          },
          {
            name: 'Backup & Recovery',
            detail: 'Automated encrypted snapshots and verified failover routines protecting operational continuity.',
            deliverable: 'Scheduled Backups + Recovery Playbooks',
          },
        ],
      },
      {
        cluster: 'DIGITAL PRODUCT ENGINEERING',
        specCode: 'TECH-05',
        headline: 'UX Architecture, APIs & Quality Engineering',
        summary: 'Interface systems, system connectivity, automated QA, and long-term architectural stewardship.',
        bgWebp: '/images/hero-tech-architecture.webp',
        bgFallback: '/images/hero-tech-architecture.jpg',
        mockupTitle: 'ENGINEERING LAB // UX & API SPECIFICATION',
        mockupMetrics: [
          { label: 'INTERFACE', value: 'Design Token Systems' },
          { label: 'CONNECTIVITY', value: 'REST / GraphQL APIs' },
          { label: 'QUALITY GATE', value: 'Automated Test Suites' },
        ],
        mockupPipeline: ['Interactive Prototype', 'Tokenized UI', 'API Contract', 'Continuous QA'],
        items: [
          {
            name: 'UI/UX Design',
            detail: 'Clean component systems, ergonomic user journeys, and cohesive dark or light interface craft.',
            deliverable: 'Interactive Design System + UI Specs',
          },
          {
            name: 'API Development',
            detail: 'Cleanly documented REST and GraphQL services enabling secure multi-platform connectivity.',
            deliverable: 'Versioned API Gateway + Auth Layer',
          },
          {
            name: 'Product Prototyping',
            detail: 'Rapid interactive prototypes validating product flows and engineering feasibility prior to build.',
            deliverable: 'Clickable Architecture Prototype',
          },
          {
            name: 'Software Testing',
            detail: 'Automated unit, integration, and end-to-end verification catching regressions before deployment.',
            deliverable: 'Automated Test Harness + QA Coverage',
          },
          {
            name: 'Application Maintenance',
            detail: 'Proactive security patching, dependency upgrades, and ongoing feature iteration.',
            deliverable: 'SLA Maintenance + Dependency Hygiene',
          },
          {
            name: 'Technical Consulting',
            detail: 'Stack audits, legacy modernization blueprints, and scalable architectural decision support.',
            deliverable: 'Architecture Audit + Build Roadmap',
          },
        ],
      },
    ],
    services: [],
  },
  {
    id: 'digital',
    index: '02',
    tier: 'SECONDARY DIVISION',
    name: 'WONTWE Digital',
    shortName: 'Digital',
    environmentTitle: 'Digital Growth, Analytics & Brand Systems',
    headline: 'GROWTH BUILT ON DATA & BRAND CLARITY.',
    description:
      'Connecting software platforms to market demand through technical SEO, performance campaigns, and cohesive brand identity systems.',
    telemetryTag: 'SECONDARY DIVISION // DIGITAL GROWTH',
    clusters: [
      {
        cluster: 'Performance & Search Growth',
        specCode: 'DIG-01',
        headline: 'Acquisition & Conversion',
        summary: 'Measurable visibility across search, paid acquisition, and conversion optimization.',
        bgWebp: '/images/world-digital-command.webp',
        bgFallback: '/images/world-digital-command.jpg',
        mockupTitle: 'GROWTH TELEMETRY',
        mockupMetrics: [],
        mockupPipeline: [],
        items: [
          { name: 'Digital Marketing', detail: 'Integrated digital acquisition anchored to revenue targets.', deliverable: 'Channel Strategy' },
          { name: 'Search Engine Optimization', detail: 'Technical site structure, schema, and search authority.', deliverable: 'Technical SEO' },
          { name: 'Performance Marketing', detail: 'ROI-calibrated paid campaigns across high-intent channels.', deliverable: 'Paid Acquisition' },
          { name: 'Google Ads', detail: 'Search and display campaigns backed by clean attribution.', deliverable: 'Search Media' },
          { name: 'Meta Ads', detail: 'Targeted social acquisition and creative testing loops.', deliverable: 'Social Media' },
          { name: 'Lead Generation', detail: 'High-clarity capture experiences built for qualified pipelines.', deliverable: 'Lead Funnels' },
          { name: 'Conversion Optimization', detail: 'Continuous UX testing and funnel drop-off reduction.', deliverable: 'CRO Iteration' },
        ],
      },
      {
        cluster: 'Brand & Content Systems',
        specCode: 'DIG-02',
        headline: 'Identity & Narrative',
        summary: 'Positioning, visual identity architecture, and consistent digital content.',
        bgWebp: '/images/exp-digital.webp',
        bgFallback: '/images/exp-digital.jpg',
        mockupTitle: 'BRAND ARCHITECTURE',
        mockupMetrics: [],
        mockupPipeline: [],
        items: [
          { name: 'Brand Strategy', detail: 'Market positioning and clear corporate messaging.', deliverable: 'Positioning' },
          { name: 'Brand Identity', detail: 'Cohesive typography, visual marks, and design rules.', deliverable: 'Identity Kit' },
          { name: 'Social Media Management', detail: 'Consistent editorial presence and audience engagement.', deliverable: 'Channel Ops' },
          { name: 'Content Marketing', detail: 'Product guides and strategic assets that educate buyers.', deliverable: 'Content System' },
        ],
      },
    ],
    services: [],
  },
  {
    id: 'studios',
    index: '03',
    tier: 'COMPLEMENTARY STUDIO',
    name: 'WONTWE Studios',
    shortName: 'Studios',
    environmentTitle: 'Creative & Visual Production',
    headline: 'VISUAL ASSETS BUILT FOR DIGITAL LAUNCHES.',
    description:
      'Product photography, corporate films, motion graphics, and 3D visuals supporting software launches and corporate brands.',
    telemetryTag: 'SUPPORTING DIVISION // STUDIOS',
    comingSoon: true,
    clusters: [
      {
        cluster: 'Photography & Video',
        specCode: 'STD-01',
        headline: 'Capture',
        summary: 'Commercial imagery and product storytelling.',
        bgWebp: '/images/world-studios-stage.webp',
        bgFallback: '/images/world-studios-stage.jpg',
        mockupTitle: 'PRODUCTION',
        mockupMetrics: [],
        mockupPipeline: [],
        items: [
          { name: 'Corporate Photography', detail: 'Executive & workspace imagery.', deliverable: 'Photo Suite' },
          { name: 'Product Photography', detail: 'Hardware & product visuals.', deliverable: 'Studio Stills' },
          { name: 'Corporate Videography', detail: 'Leadership & company features.', deliverable: 'Brand Video' },
          { name: 'Promotional Videos', detail: 'Focused product launch films.', deliverable: 'Launch Cut' },
          { name: 'Brand Films', detail: 'Narrative visual stories.', deliverable: 'Master Film' },
          { name: 'Advertisement Production', detail: 'Commercial campaign spots.', deliverable: 'Ad Spots' },
        ],
      },
      {
        cluster: 'Motion, Post & 3D',
        specCode: 'STD-02',
        headline: 'Post & 3D',
        summary: 'Motion graphics, colour grading, and 3D assets.',
        bgWebp: '/images/world-studios-stage.webp',
        bgFallback: '/images/world-studios-stage.jpg',
        mockupTitle: 'POST & 3D',
        mockupMetrics: [],
        mockupPipeline: [],
        items: [
          { name: 'Video Editing', detail: 'Precision narrative assembly.', deliverable: 'Editorial Cut' },
          { name: 'Motion Graphics', detail: 'Product & UI motion callouts.', deliverable: 'Motion Kit' },
          { name: 'Colour Grading', detail: 'Tonal calibration across deliverables.', deliverable: 'Color Master' },
          { name: 'Graphic Design', detail: 'Campaign visuals & decks.', deliverable: 'Visual System' },
          { name: 'Animation', detail: 'Explanatory & product animation.', deliverable: 'Animated Reel' },
          { name: '2D & 3D Design', detail: 'Dimensional mockups & renders.', deliverable: '3D Assets' },
        ],
      },
    ],
    services: [],
  },
  {
    id: 'events',
    index: '04',
    tier: 'COMPLEMENTARY EXECUTION',
    name: 'WONTWE Events',
    shortName: 'Events',
    environmentTitle: 'Corporate Event & Exhibition Execution',
    headline: 'PRECISION EXECUTION FOR LIVE EXPERIENCES.',
    description:
      'Turnkey planning and technical staging for product launches, conferences, exhibitions, and corporate milestones.',
    telemetryTag: 'SUPPORTING DIVISION // EVENTS',
    comingSoon: true,
    clusters: [
      {
        cluster: 'Corporate & Exhibitions',
        specCode: 'EVT-01',
        headline: 'Live Programs',
        summary: 'Corporate event orchestration and trade environments.',
        bgWebp: '/images/world-events-lit.webp',
        bgFallback: '/images/world-events-lit.jpg',
        mockupTitle: 'EVENT OPS',
        mockupMetrics: [],
        mockupPipeline: [],
        items: [
          { name: 'Corporate Event Management', detail: 'End-to-end event logistics.', deliverable: 'Event Ops' },
          { name: 'Product Launches', detail: 'Keynote & demo environments.', deliverable: 'Launch Show' },
          { name: 'Brand Activations', detail: 'Physical-digital touchpoints.', deliverable: 'Activation' },
          { name: 'Conferences', detail: 'Multi-track agenda delivery.', deliverable: 'Conference' },
          { name: 'Exhibitions', detail: 'Spatial pavilion architecture.', deliverable: 'Exhibition' },
          { name: 'Trade Shows', detail: 'Turnkey booth execution.', deliverable: 'Trade Booth' },
        ],
      },
      {
        cluster: 'Staging & AV',
        specCode: 'EVT-02',
        headline: 'Technical Staging',
        summary: 'LED walls, lighting, audio, and live broadcast.',
        bgWebp: '/images/world-events-lit.webp',
        bgFallback: '/images/world-events-lit.jpg',
        mockupTitle: 'STAGE AV',
        mockupMetrics: [],
        mockupPipeline: [],
        items: [
          { name: 'Stage Production', detail: 'Rigging & show-calling precision.', deliverable: 'Stage Build' },
          { name: 'Event Design', detail: 'Spatial & lighting direction.', deliverable: 'Spatial Plan' },
          { name: 'Sound & Lighting', detail: 'Acoustic & architectural lighting.', deliverable: 'AV Rig' },
          { name: 'LED Displays', detail: 'High-resolution stage walls.', deliverable: 'LED Canvas' },
          { name: 'Event Photography', detail: 'Live press & event coverage.', deliverable: 'Event Stills' },
          { name: 'Live Streaming', detail: 'Multi-camera hybrid broadcast.', deliverable: 'Stream Feed' },
        ],
      },
    ],
    services: [],
  },
];

WORLDS.forEach((world) => {
  world.services = world.clusters.flatMap((c) => c.items);
});

export const ACTIVE_WORLDS = WORLDS.filter((w) => !w.comingSoon);
export const COMING_SOON_WORLDS = WORLDS.filter((w) => !!w.comingSoon);

export const APPROACH_STAGES: ApproachStage[] = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Audit infrastructure, product workflows, and commercial goals.',
    artifact: 'System Spec & Architecture Audit',
  },
  {
    number: '02',
    title: 'DESIGN',
    description: 'Model UX systems, data schemas, and cloud topology.',
    artifact: 'Interactive Prototype & Schema',
  },
  {
    number: '03',
    title: 'ENGINEER',
    description: 'Build software modules, AI workflows, and automated pipelines.',
    artifact: 'Production Code & QA Suite',
  },
  {
    number: '04',
    title: 'DELIVER',
    description: 'Deploy to cloud production with telemetry and continuous support.',
    artifact: 'Live Launch & Observability',
  },
];

export const EXPERIMENTS: ExperimentConcept[] = [
  {
    id: 'enterprise-erp-mesh',
    code: 'DEMO-01',
    title: 'UNIFIED ENTERPRISE ERP & OPERATIONS MESH',
    division: 'WONTWE Tech',
    divisionId: 'tech',
    classification: 'DEMONSTRATION CONCEPT',
    summary:
      'Conceptual multi-module workspace unifying ERP, CRM, inventory sync, and live executive dashboards.',
    imageWebp: '/images/hero-tech-architecture.webp',
    imageFallback: '/images/hero-tech-architecture.jpg',
    imageAlt: 'Demonstration concept displaying layered enterprise system schematics and modular software panels',
    architectureNotes: [
      'Replaces disconnected operational spreadsheets with a single role-scoped browser workspace.',
      'Connects real-time stock ledgers, approval routing, and API webhooks across departments.',
    ],
    integratedSystems: ['ERP & CRM Core', 'Executive Dashboards', 'Workflow Automation', 'REST APIs'],
  },
  {
    id: 'ai-workflow-copilot',
    code: 'DEMO-02',
    title: 'AUTONOMOUS AI WORKFLOW & COPILOT PIPELINE',
    division: 'WONTWE Tech',
    divisionId: 'tech',
    classification: 'DEMONSTRATION CONCEPT',
    summary:
      'Retrieval-grounded AI assistant and document triage pipeline with deterministic validation guardrails.',
    imageWebp: '/images/exp-tech.webp',
    imageFallback: '/images/exp-tech.jpg',
    imageAlt: 'Demonstration concept showing translucent floating glass computation planes connected by optical routes',
    architectureNotes: [
      'Demonstrates safe enterprise AI deployment anchored to verified company knowledge bases.',
      'Routes structured outputs directly into ERP and CRM queues with audit trails.',
    ],
    integratedSystems: ['AI Integration', 'AI Chatbots', 'Intelligent Automation', 'Cloud Queues'],
  },
  {
    id: 'cloud-telemetry-plane',
    code: 'DEMO-03',
    title: 'CLOUD-NATIVE SAAS & CI/CD OBSERVABILITY',
    division: 'WONTWE Tech',
    divisionId: 'tech',
    classification: 'DEMONSTRATION CONCEPT',
    summary:
      'Multi-region cloud architecture prototype showcasing automated CI/CD gates and failover recovery.',
    imageWebp: '/images/world-tech-lab.webp',
    imageFallback: '/images/world-tech-lab.jpg',
    imageAlt: 'Demonstration concept illustrating cloud server infrastructure and network telemetry lines',
    architectureNotes: [
      'Illustrates zero-downtime deployment pipelines with automated regression testing.',
      'Pairs database replication health monitoring with encrypted snapshot recovery.',
    ],
    integratedSystems: ['Cloud Infrastructure', 'CI/CD & DevOps', 'Database Scaling', 'Backup & Recovery'],
  },
  {
    id: 'digital-growth-engine',
    code: 'DEMO-04',
    title: 'CONNECTED BRAND & PERFORMANCE TELEMETRY',
    division: 'WONTWE Digital',
    divisionId: 'digital',
    classification: 'DEMONSTRATION CONCEPT',
    summary:
      'Unified attribution architecture connecting technical SEO, paid search/social campaigns, and conversion experiments.',
    imageWebp: '/images/exp-digital.webp',
    imageFallback: '/images/exp-digital.jpg',
    imageAlt: 'Demonstration concept installation showing dark curved displays with cobalt analytics trajectories',
    architectureNotes: [
      'Aligns brand identity clarity directly with measurable search and paid acquisition metrics.',
      'Links landing page UX experimentation straight to qualified pipeline attribution.',
    ],
    integratedSystems: ['Brand Strategy', 'Technical SEO', 'Google & Meta Ads', 'Conversion Optimization'],
  },
];
