/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file and the whole page updates — no component changes needed.
 *
 * Sourced from Resume_Pema_Lepcha.docx. Deliberately excluded: CID number and
 * date of birth. Those belong on identity documents, not a public, indexable page.
 */

import { iBEST } from "@/assets";
import type {
  Certificate,
  NavItem,
  Project,
  SkillGroup,
  Social,
  TimelineEntry,
} from "@/types/SiteProps";

export type {
  Certificate,
  NavItem,
  Project,
  SkillGroup,
  Social,
  SocialIcon,
  TimelineEntry,
} from "@/types/SiteProps";

/* ---------------------------------------------------------------- */
/* Profile                                                           */
/* ---------------------------------------------------------------- */
export const profile = {
  name: "Pema Lepcha",
  brand: "pema.dev",
  // Rotates through the typewriter in the hero
  roles: [
    "Software Developer",
    "Frontend Engineer",
    "React & Next.js Specialist",
    "Self-Taught Developer",
  ],
  tagline:
    "Crafting maintainable architecture through clean code and a perpetual learner's mindset.",
  bio: "I build responsive, scalable web applications with React and Next.js. At iBEST Technologies I architect dynamic frontends, streamline data fetching with GraphQL and Apollo Client, and turn complex requirements into interfaces that feel simple to use.",
  bioLong:
    "Although my formal background began in Commerce, my transition into software engineering is fueled by a relentless work ethic and a self-taught spirit. I believe professional-grade programming is driven by curiosity and discipline rather than a degree. Having learned the frontend ecosystem through intensive training and real-world project delivery at iBEST — national platforms for GovTech, an e-learning product used across Bhutan, and work for international clients — I am proof that dedication and a passion for logic can bridge any gap.",
  avatar: "/myImage.png",
  resumeUrl: "/Resume_Pema_Lepcha.docx",
  resumeFileName: "Resume_Pema_Lepcha.docx",
  location: "Babesa, Thimphu",
  timezone: "GMT+6 (BT)",
  availability: "Open to freelance & full-time",
  available: true,
} as const;

/* ---------------------------------------------------------------- */
/* Navigation                                                        */
/* ---------------------------------------------------------------- */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export const socials: Social[] = [
  // TODO: replace the bare domains with your actual profile URLs.
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: "linkedin" },
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Email", href: "mailto:pemalepchapema@gmail.com", icon: "mail" },
];

/* ---------------------------------------------------------------- */
/* Hero stats — the number animates up when scrolled into view       */
/* ---------------------------------------------------------------- */
export const stats = [
  { value: 5, suffix: "+", label: "Projects shipped" },
  { value: 2, suffix: "+", label: "Years experience" },
  { value: 3, suffix: "", label: "Languages spoken" },
  { value: 200, suffix: "+", label: "Students" },
];

/* ---------------------------------------------------------------- */
/* Skills                                                            */
/* ---------------------------------------------------------------- */
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    icon: "code",
    blurb: "The fundamentals I reach for every day.",
    skills: [
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 93 },
    ],
  },
  {
    label: "Frameworks & Styling",
    icon: "layers",
    blurb: "How I turn designs into shipped product.",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Responsive Design", level: 94 },
    ],
  },
  {
    label: "State, API & Data",
    icon: "database",
    blurb: "Moving data between server and screen.",
    skills: [
      { name: "GraphQL & Apollo Client", level: 85 },
      { name: "REST APIs", level: 88 },
      { name: "Redux & Redux Thunk", level: 80 },
      { name: "Node.js", level: 65 },
    ],
  },
  {
    label: "Tools & Platforms",
    icon: "wrench",
    blurb: "The workshop around the code.",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "npm / yarn", level: 88 },
      { name: "Squarespace & SimplyBook", level: 70 },
    ],
  },
];

/** Scrolls infinitely in the hero marquee. */
export const techMarquee = [
  "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS",
  "GraphQL", "Apollo Client", "Redux", "REST APIs", "Node.js",
  "Git", "HTML5", "CSS3", "Bhutan NDI",
];

/* ---------------------------------------------------------------- */
/* Projects                                                          */
/* ---------------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: "geo-hazards",
    title: "GeoHazard Information System",
    year: "2025",
    category: "GovTech",
    description:
      "Created data-driven, responsive interfaces for national hazard monitoring, turning complex environmental data into accessible tools for government use.",
    imageUrl: "/logo_dpt.webp",
    altText: "Department of Geology & Mines logo",
    tags: ["Next.js", "GraphQL", "Data Viz", "Tailwind"],
    url: "https://geohazards.systems.gov.bt/",
    featured: true,
  },
  {
    id: "rpis",
    title: "Royal Project Initiative System",
    year: "2025",
    category: "GovTech · E-commerce",
    description:
      "An e-commerce ecosystem featuring Bhutan NDI integration and the Berms Payment Gateway. I built the public storefront, cart logic, and an admin panel for inventory and Role-Based Access Control (RBAC).",
    imageUrl: "/rpis.png",
    altText: "Royal Project Initiative System logo",
    tags: ["React", "Bhutan NDI", "RBAC", "Payments"],
    url: "#",
    featured: true,
  },
  {
    id: "educare",
    title: "Educare Skill",
    year: "2024",
    category: "EdTech · In-house",
    description:
      "Bhutan's pioneering online learning platform, built to transform learning and skilling in Bhutan and beyond. Educare Skill lets learners master Dzongkha through more than 1,000 engaging, curriculum-aligned episodes.",
    imageUrl: "/iBEST.png",
    altText: "Educare Skill logo",
    tags: ["Next.js", "GraphQL", "Apollo Client"],
    url: "#",
  },
  {
    id: "educare-cms",
    title: "Educare Skill CMS",
    year: "2024",
    category: "Platform · In-house",
    description:
      "The administrative core of the Educare Skill ecosystem, managing high-volume data and user permissions. I implemented dynamic role assignment, membership management, and an integrated media system handling video and imagery across web and mobile.",
    imageUrl: "/iBEST.png",
    altText: "iBEST logo",
    tags: ["React", "Redux", "Media Pipeline"],
    url: "#",
  },
  {
    id: "mindfullness",
    title: "MindFullness Guide",
    year: "2025",
    category: "Client · Australia",
    description:
      "Engineered a high-performance frontend for an international wellness app, focusing on clean code and smooth UI transitions for a global audience.",
    imageUrl: "/programming.png",
    altText: "MindFullness Guide project",
    tags: ["React", "Next.js", "Animation"],
    url: "#",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    year: "2026",
    category: "Personal",
    description:
      "A design-system-driven personal site built on Next.js and Tailwind v4, with scroll-linked animations, a token-based theming layer, and a fully reusable component library.",
    imageUrl: "/images.png",
    altText: "Portfolio screenshot",
    tags: ["Next.js", "Tailwind v4", "Framer Motion"],
    url: "#",
    repoUrl: "https://github.com/",
  },
];

/* ---------------------------------------------------------------- */
/* Experience & education timeline                                   */
/* ---------------------------------------------------------------- */
export const timeline: TimelineEntry[] = [
  {
    id: "ibest",
    role: "Software Developer",
    org: "iBEST Technologies, Chamzamtog",
    period: "Jul 2024 — Present",
    current: true,
    kind: "work",
    description:
      "Architecting dynamic frontends for national platforms, in-house products, and international clients.",
    highlights: [
      "Architected a dynamic frontend using Next.js, React.js, and Tailwind CSS",
      "Streamlined data fetching with GraphQL, Redux, and Apollo Client to improve page load speeds",
      "Delivered GovTech platforms including the GeoHazard Information System and RPIS",
    ],
  },
  {
    id: "govtech-trainer",
    role: "Technical Trainer (IC3 Certification)",
    org: "GovTech Digital Program, Bhutan",
    period: "2026",
    kind: "work",
    description:
      "Delivered IC3-level certification training for the Digital Program for Hotels and Homestays.",
    highlights: [
      "Trained 200+ participants to IC3 certification standard",
      "Facilitated digital literacy and productivity-tool learning, meeting GovTech's standards for the digital transformation of the hospitality sector",
    ],
  },
  {
    id: "ibest-training",
    role: "Software Development Training",
    org: "iBEST Technologies",
    period: "Apr 2024 — Jul 2024",
    kind: "education",
    description:
      "An intensive three-month program specialising in modern web development and full-stack architecture.",
    highlights: [
      "Frontend: built responsive interfaces with HTML, CSS, and JavaScript",
      "Backend: implemented server-side logic and API handling with Node.js",
      "Graduated as a Certified Full-Stack Developer",
    ],
  },
  {
    id: "hotel-druk",
    role: "Receptionist",
    org: "Hotel Druk, Phuentsholing",
    period: "Oct 2022 — Apr 2024",
    kind: "work",
    description:
      "Delivered high-quality guest services in a fast-paced hospitality environment.",
    highlights: [
      "Managed front-desk operations and resolved complex logistical issues",
      "Named Employee of the Month (Sept 2023) for communication and high-pressure problem-solving",
    ],
  },
  {
    id: "marushin",
    role: "Office Assistant",
    org: "Marushin Const. Pvt. Ltd., Phuentsholing",
    period: "Oct 2019 — May 2022",
    kind: "work",
    description:
      "Coordinated administrative workflows and regulatory compliance.",
    highlights: [
      "Handled high-priority financial tasks and maintained a rigorous filing system",
      "Liaised with customs and government agencies for equipment licensing",
    ],
  },
  {
    id: "school",
    role: "Class 12, Commerce",
    org: "Pling Higher Secondary School",
    period: "2017 — 2018",
    kind: "education",
    description:
      "Commerce stream, with a foundation in analytical and logical problem-solving.",
    highlights: [
      "Ranked #1 in Mathematics (Commerce), the highest marks in the stream",
    ],
  },
];

/* ---------------------------------------------------------------- */
/* What I do — service cards                                         */
/* ---------------------------------------------------------------- */
export const services = [
  {
    id: "web",
    icon: "monitor" as const,
    title: "Web Development",
    description:
      "Production-grade applications with React and Next.js — server rendering, routing, state, and data fetching with GraphQL or REST.",
  },
  {
    id: "ui",
    icon: "palette" as const,
    title: "UI & Design Systems",
    description:
      "Token-driven component libraries that stay consistent as a product grows, in light mode and dark.",
  },
  {
    id: "perf",
    icon: "gauge" as const,
    title: "Performance & A11y",
    description:
      "Core Web Vitals, semantic markup, keyboard navigation, and reduced-motion support treated as requirements, not extras.",
  },
];

/* ---------------------------------------------------------------- */
/* Awards                                                            */
/* ---------------------------------------------------------------- */
export const awards = [
  {
    id: "employee",
    title: "Employee of the Month",
    year: "Sept 2023",
    description:
      "Recognised for excellence in communication and high-pressure problem-solving at Hotel Druk, Phuentsholing.",
  },
  {
    id: "maths",
    title: "Top Scorer in Mathematics",
    year: "Class 12",
    description:
      "Ranked #1 in Mathematics (Commerce), demonstrating strong analytical and logical foundations.",
  },
  {
    id: "fullstack",
    title: "Certified Full-Stack Developer",
    year: "2024",
    description:
      "Completed an intensive three-month program specialising in modern web development and full-stack architecture.",
  },
];

/* ---------------------------------------------------------------- */
/* Certificates                                                      */
/*                                                                   */
/* To add one: drop `<id>.pdf` into `public/certificates/`, add an   */
/* entry below, and — optionally — a preview image beside the PDF.   */
/* Without `thumbnailUrl` the card shows a PDF glyph instead.        */
/* The section hides itself when this array is empty.                */
/* ---------------------------------------------------------------- */
export const certificates: Certificate[] = [
  // Add `thumbnailUrl: "/certificates/<id>.png"` once the image exists. Point
  // it at a missing file and the card still works, but the browser logs a 404.
  {
    id: "ic3",
    title: "IC3 Digital Literacy Certification",
    issuer: "GovTech Digital Program",
    year: "2023",
    fileUrl: "/certificates/ic3.pdf",
    thumbnailUrl: iBEST,
  },
  // Uncomment each entry once its PDF is in `public/certificates/`.
  // {
  //   id: "fullstack",
  //   title: "Certified Full-Stack Developer",
  //   issuer: "iBEST Technologies",
  //   year: "2024",
  //   fileUrl: "/certificates/fullstack.pdf",
  // },
  // {
  //   id: "employee",
  //   title: "Employee of the Month",
  //   issuer: "Hotel Druk, Phuentsholing",
  //   year: "Sept 2023",
  //   fileUrl: "/certificates/employee.pdf",
  // },
];

/* ---------------------------------------------------------------- */
/* Contact                                                           */
/* ---------------------------------------------------------------- */
export const contact = {
  email: "pemalepchapema@gmail.com",
  emailNote: "I usually reply within a day",
  location: "Babesa, Thimphu",
  locationNote: "Bhutan 🇧🇹",
  // Phone is intentionally omitted from the public site to deter scrapers.
  languages: ["Dzongkha", "English", "Lotshomkha"],
  languagesNote: "Happy to talk in any of these",
};
