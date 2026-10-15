const confidentialProjects = [
  {
    title: "Construction ERP",
    category: "Enterprise systems",
    number: "01",
    description:
      "An ERP system built for a construction firm, bringing its business operations into a dedicated software platform.",
    focus: "Construction · Enterprise software",
    mark: "ERP",
    color: "lime",
  },
  {
    title: "Independent accounting",
    category: "Enterprise systems",
    number: "02",
    description:
      "An independent accounting system developed for private-sector organizations and their financial workflows.",
    focus: "Private sector · Accounting",
    mark: "ACCT",
    color: "sand",
  },
  {
    title: "Philippine prediction market",
    category: "Market platforms",
    number: "03",
    description:
      "A Philippine-focused prediction market and gambling platform. Product identity and implementation details remain confidential.",
    focus: "Philippines · Prediction markets",
    mark: "P / M",
    color: "blue",
  },
  {
    title: "Casino agent system",
    category: "Market platforms",
    number: "04",
    description:
      "An agent system developed for online casino operations, with the client, operating model and technical details covered by NDA.",
    focus: "Online casino · Agent operations",
    mark: "AGNT",
    color: "rose",
  },
  {
    title: "GEO optimization platform",
    category: "AI & intelligence",
    number: "05",
    description:
      "A generative engine optimization platform focused on visibility in AI-powered discovery and search experiences.",
    focus: "Generative search · AI visibility",
    mark: "GEO",
    color: "blue",
  },
  {
    title: "Applied AI initiatives",
    category: "AI & intelligence",
    number: "06",
    description:
      "AI engineering initiatives spanning practical experiments and application development. Individual project scopes remain confidential.",
    focus: "Applied AI · Product development",
    mark: "AI /",
    color: "lime",
  },
] as const;

export const experience = [
  {
    role: "Chief Technology Officer",
    period: "Present",
    context: "Third Code Solutions Inc.",
    href: "https://thirdcodesolutions.com/",
    description:
      "Technology leadership, engineering direction and product development.",
  },
  {
    role: "AI Engineer",
    period: "Apr 2025 — Jul 2026",
    context: "AI engineering",
    description:
      "Applied AI, intelligent applications and AI-assisted workflows.",
  },
  {
    role: "Full Stack Software Engineer",
    period: "2023 — 2026",
    context: "Software engineering",
    description:
      "Web applications, business systems and the services behind them.",
  },
  {
    role: "UI/UX Designer & Developer",
    period: "2022 — 2026",
    context: "Design & development",
    description:
      "User journeys, interface design and bringing digital experiences to life.",
  },
];

export const stack = [
  {
    title: "Interfaces & interaction",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    title: "Backend & data",
    items: ["Node.js", "Python", "SQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "AI & machine learning",
    items: ["OpenAI", "LangChain", "TensorFlow", "PyTorch"],
  },
  {
    title: "Design, delivery & cloud",
    items: ["Figma", "Git", "GitHub", "CI/CD", "Docker", "AWS", "Vercel"],
  },
];

export const journal = [
  {
    image: "/journal/agent-presentation.jpg",
    title: "From an idea to a live demo.",
    label: "01 / PRESENTING",
    alt: "Kurt presenting an AI workflow interface on a projection screen while holding a microphone.",
    description:
      "Presenting an AI workflow demo: describing a task, planning its steps and showing connected tools such as Calendar, Gmail, Drive and Notion. A moment of making an agent workflow understandable in front of an audience.",
    position: "center",
  },
  {
    image: "/journal/zero-to-agent.jpg",
    title: "Building in good company.",
    label: "02 / COLLABORATING",
    alt: "Three participants reviewing a laptop together at a Zero to Agent event, with Kurt holding a microphone.",
    description:
      "Collaborating around a live laptop demo at Zero to Agent. Reviewing the work together, discussing the interface and preparing to share it with the room.",
    position: "center",
  },
  {
    image: "/journal/aws.jpg",
    title: "Out in the cloud community.",
    label: "03 / CONNECTING",
    alt: "Kurt standing beside an illuminated AWS sign at an event venue.",
    description:
      "A moment at an AWS-branded venue. Getting out of the day-to-day build routine and spending time around the wider technology community.",
    position: "50% 50%",
  },
  {
    image: "/journal/agora-hackathon.jpg",
    title: "A seat at the build table.",
    label: "04 / HACKATHON · 2026",
    alt: "Laptop and team placard at Agora Hackathon Philippines 2026, with participants working at nearby tables.",
    description:
      "A workspace snapshot from Agora Hackathon Philippines 2026: laptop open, team placard on the desk and other participants working nearby. The hands-on side of building with a team.",
    position: "50% 55%",
  },
  {
    image: "/journal/microsoft.jpg",
    title: "Learning beyond the desk.",
    label: "05 / COMMUNITY",
    alt: "Kurt beside the Microsoft sign in a reception area with wooden panels and a green wall.",
    description:
      "A visit captured at a Microsoft-branded space. One of the places where my interest in software, developer tooling and the broader technology ecosystem comes together.",
    position: "50% 65%",
  },
  {
    image: "/journal/copilot-dev-days.jpg",
    title: "Exploring AI-assisted development.",
    label: "06 / GITHUB COPILOT DEV DAYS",
    alt: "A speaker and attendees with laptops at GitHub Copilot Dev Days Manila; the slide shows May 6 at 5:30 PM.",
    description:
      "Attending GitHub Copilot Dev Days in Manila. The session screen shows May 6, 5:30 PM; the room brings developers together around AI-assisted development and practical tooling.",
    position: "50% 50%",
  },
  {
    image: "/journal/ai-governance.jpg",
    title: "Better questions. Better AI.",
    label: "07 / RESPONSIBLE AI",
    alt: "A speaker beside a slide titled AI in the B2B World: Ethics, Governance, and the Human Imperative.",
    description:
      "Learning from a session on AI in the B2B world, with a focus on ethics, governance and the human imperative. A reminder that engineering decisions reach beyond the code.",
    position: "50% 60%",
  },
];

export interface PortfolioProject {
  id: number; title: string; category: string; year: string; image: string; link: string; description: string; nda?: boolean; slug?: string;
}

const existingProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Ascend AI',
    category: 'Stealth SaaS Project',
    year: '2024',
    image: '/ascend-ai.png',
    link: '#',
    description: 'AI-powered SaaS platform designed to streamline workflows and elevate productivity through intelligent automation.',
  },
  {
    id: 2,
    title: 'BlockChain Website',
    category: 'Landing Page',
    year: '2024',
    image: '/blockchain-web.png',
    link: '#',
    description: 'Immersive landing page for a blockchain venture, blending Web3 aesthetics with crystal-clear messaging.',
  },
  {
    id: 3,
    title: 'Ni Hao',
    category: 'Face Recognition System',
    year: '2023',
    image: '/NiHao.jpg',
    link: '#',
    description: 'Real-time face recognition system built with computer vision and deep learning for secure authentication.',
  },
  {
    id: 4,
    title: 'Wizard Connect',
    category: 'University Matching WebApp',
    year: '2023',
    image: '/wizard-match.png',
    link: 'https://www.facebook.com/photo/?fbid=1326642939499198&set=a.455844426579058',
    description: 'Intelligent university matching platform connecting students with their ideal academic programs.',
  },
  {
    id: 5,
    title: 'Jjikja Film',
    category: 'Photo Strip WebApp',
    year: '2025',
    image: '/jjikja-film.png',
    link: 'https://jjikja-film.vercel.app/',
    description: 'Retro-inspired photo strip web app capturing moments with a nostalgic analog film aesthetic.',
  },
  {
    id: 6,
    title: 'Project Ayuda',
    category: 'Community Platform',
    year: '2023',
    image: '/project-ayuda.jpg',
    link: '#',
    description: 'Community-driven aid platform connecting donors with those in need during crisis situations.',
  },
  {
    id: 7,
    title: 'TripSync',
    category: 'Travel Application',
    year: '2024',
    image: '/project-tripsync.jpg',
    link: '#',
    description: 'Collaborative travel planning tool that syncs itineraries, budgets, and experiences in real-time.',
  },
  {
    id: 8,
    title: 'NeuBrain',
    category: 'AI Research Tool',
    year: '2024',
    image: '/project-neubrain.jpg',
    link: '#',
    description: 'Neural network visualization tool for researchers to explore, debug, and optimize AI model architectures.',
  },
  {
    id: 9,
    title: 'WellHealth',
    category: 'Health & Wellness App',
    year: '2024',
    image: '/project-wellhealth.jpg',
    link: '#',
    description: 'Holistic health tracking application combining fitness metrics, nutrition logging, and mental wellness.',
  },
];

export const portfolioProjects: PortfolioProject[] = [
  ...confidentialProjects.map((project, index) => ({
    id: 100 + index,
    title: project.title,
    category: project.category,
    year: 'NDA',
    image: '/project-confidential.svg',
    slug: ['construction-erp', 'independent-accounting', 'prediction-market', 'casino-agent-system', 'geo-platform', 'ai-initiatives'][index],
    link: '/work/#' + ['construction-erp', 'independent-accounting', 'prediction-market', 'casino-agent-system', 'geo-platform', 'ai-initiatives'][index],
    description: project.description,
    nda: true,
  })),
  ...existingProjects,
];
