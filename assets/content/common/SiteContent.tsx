/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file and the whole page updates — no component changes needed.
 *
 * Sourced from Resume_Pema_Lepcha.docx. Deliberately excluded: CID number and
 * date of birth. Those belong on identity documents, not a public, indexable page.
 */

import {
  dgmLogo,
  ibestLogo,
  ic3Apr03,
  ic3Apr14,
  ic3Apr24,
  ic3Jun01,
  ic3Jun10,
  ic3Jun23,
  ic3Mar24,
  ic3May06,
  ic3May06Group,
  ic3May26,
  mindfulnessGuide,
  pemaPortrait,
  portfolioPreview,
  rpisLogo,
} from "@/assets";
import type {
  Certificate,
  GalleryPhoto,
  NavItem,
  Project,
  SkillGroup,
  Social,
  TimelineEntry,
} from "@/types/SiteProps";

export type {
  Certificate,
  GalleryPhoto,
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
  avatar: pemaPortrait,
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
  { id: "gallery", label: "Gallery" },
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
  { value: 200, suffix: "+", label: "Students Trained" },
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
/*
 * The home page shows only the `showcase: true` entries behind a "View all
 * projects" link; /projects renders the whole array with the detail fields
 * (`role`, `duration`, `client`, `highlights`) that the home cards omit.
 */
export const projects: Project[] = [
  {
    id: "geo-hazards",
    title: "GeoHazard Information System",
    year: "2025",
    category: "GovTech",
    description:
      "Created data-driven, responsive interfaces for national hazard monitoring, turning complex environmental data into accessible tools for government use.",
    image: dgmLogo,
    altText: "Department of Geology & Mines logo",
    tags: ["Next.js", "GraphQL", "Data Viz", "Tailwind"],
    url: "https://geohazards.systems.gov.bt/",
    featured: true,
    showcase: true,
    role: "Frontend Developer",
    client: "Department of Geology & Mines",
    // TODO: add `duration` once you've checked the dates — left out rather
    // than guessed, since it reads as a claim on a portfolio.
    highlights: [
      "Built responsive, data-driven interfaces for national hazard monitoring",
      "Rendered complex environmental datasets as visualisations non-specialists can read",
      "Delivered against government accessibility and browser-support requirements",
    ],
  },
  {
    id: "rpis",
    title: "Royal Project Initiative System",
    year: "2025",
    category: "GovTech · E-commerce",
    description:
      "An e-commerce ecosystem featuring Bhutan NDI integration and the Berms Payment Gateway. I built the public storefront, cart logic, and an admin panel for inventory and Role-Based Access Control (RBAC).",
    image: rpisLogo,
    altText: "Royal Project Initiative System logo",
    tags: ["React", "Bhutan NDI", "RBAC", "Payments"],
    url: "#",
    featured: true,
    showcase: true,
    role: "Frontend Developer",
    highlights: [
      "Built the public storefront and the full cart and checkout flow",
      "Integrated Bhutan NDI for identity and the Berms Payment Gateway for settlement",
      "Shipped an admin panel covering inventory and Role-Based Access Control",
    ],
  },
  {
    id: "educare",
    title: "Educare Skill",
    year: "2024",
    category: "EdTech · In-house",
    description:
      "Bhutan's pioneering online learning platform, built to transform learning and skilling in Bhutan and beyond. Educare Skill lets learners master Dzongkha through more than 1,000 engaging, curriculum-aligned episodes.",
    image: ibestLogo,
    altText: "Educare Skill logo",
    tags: ["Next.js", "GraphQL", "Apollo Client"],
    url: "#",
    showcase: true,
    role: "Frontend Developer",
    client: "iBEST Technologies",
    highlights: [
      "Built the learner-facing frontend for 1,000+ curriculum-aligned Dzongkha episodes",
      "Wired up content delivery with GraphQL and Apollo Client",
      "Tuned the episode browsing experience for low-bandwidth connections",
    ],
  },
  {
    id: "educare-cms",
    title: "Educare Skill CMS",
    year: "2024",
    category: "Platform · In-house",
    description:
      "The administrative core of the Educare Skill ecosystem, managing high-volume data and user permissions. I implemented dynamic role assignment, membership management, and an integrated media system handling video and imagery across web and mobile.",
    image: ibestLogo,
    altText: "iBEST logo",
    tags: ["React", "Redux", "Media Pipeline"],
    url: "#",
    role: "Frontend Developer",
    client: "iBEST Technologies",
    highlights: [
      "Implemented dynamic role assignment and membership management",
      "Built an integrated media system handling video and imagery for web and mobile",
      "Kept the admin UI responsive against high-volume datasets",
    ],
  },
  {
    id: "mindfullness",
    title: "MindFullness Guide",
    year: "2025",
    category: "Client · Australia",
    description:
      "Engineered a high-performance frontend for an international wellness app, focusing on clean code and smooth UI transitions for a global audience.",
    image: mindfulnessGuide,
    altText: "MindFullness Guide project",
    tags: ["React", "Next.js", "Animation"],
    url: "#",
    role: "Frontend Developer",
    client: "Private client, Australia",
    highlights: [
      "Engineered a high-performance frontend for an international audience",
      "Built smooth UI transitions without sacrificing Core Web Vitals",
      "Worked asynchronously across a five-hour time difference",
    ],
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    year: "2026",
    category: "Personal",
    description:
      "A design-system-driven personal site built on Next.js and Tailwind v4, with scroll-linked animations, a token-based theming layer, and a fully reusable component library.",
    image: portfolioPreview,
    altText: "Portfolio screenshot",
    tags: ["Next.js", "Tailwind v4", "Framer Motion"],
    url: "#",
    repoUrl: "https://github.com/",
    role: "Designer & Developer",
    highlights: [
      "Token-based theming layer driving light and dark from one source",
      "Scroll-linked animations that respect prefers-reduced-motion",
      "A reusable component library rather than one-off page markup",
    ],
  },
];

/* ---------------------------------------------------------------- */
/* Training gallery — IC3 certification cohorts                      */
/*                                                                   */
/* Dates come from the original camera filenames, so they are the    */
/* real session dates. Venues are read off signage in the photos     */
/* where it was legible and left general where it wasn't — correct   */
/* any `location` you know precisely. Photos sort newest-first by    */
/* `date`, so adding a cohort is just one more entry here.           */
/* ---------------------------------------------------------------- */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "jun-23",
    src: ic3Jun23,
    date: "2026-06-23",
    title: "Certification day",
    location: "Thimphu",
    altText:
      "Around twenty-five IC3 participants in Bhutanese national dress holding their certificates on the steps of a traditional building",
    note: "The final cohort of the spring intake, photographed after the closing assessment.",
  },
  {
    id: "jun-10",
    src: ic3Jun10,
    date: "2026-06-10",
    title: "An all-women cohort",
    location: "Thimphu",
    altText:
      "A cohort of women participants in kira holding IC3 certificates of completion on a wooden veranda",
    note: "Every participant in this group passed the certification on the first attempt.",
  },
  {
    id: "jun-01",
    src: ic3Jun01,
    date: "2026-06-01",
    title: "Hospitality staff intake",
    location: "Thimphu",
    altText:
      "Hotel and homestay staff, several in chef whites, holding certificates on the stone steps of a traditional Bhutanese building",
    note: "Front-of-house and kitchen staff trained together under the Digital Program for Hotels and Homestays.",
  },
  {
    id: "may-26",
    src: ic3May26,
    date: "2026-05-26",
    title: "Closing session",
    location: "Thimphu",
    altText:
      "Participants in national dress holding IC3 certificates in front of a wooden lodge",
  },
  {
    id: "may-06-group",
    src: ic3May06Group,
    date: "2026-05-06",
    title: "Between sessions",
    location: "Thimphu",
    altText:
      "A close-up group photo of five smiling participants taken during a break in training",
    note: "Not every good photo is a formal one.",
  },
  {
    id: "may-06",
    src: ic3May06,
    date: "2026-05-06",
    title: "Certificates handed out",
    location: "Thimphu",
    altText:
      "Two rows of participants holding certificates of completion on a covered wooden deck",
  },
  {
    id: "apr-24",
    src: ic3Apr24,
    date: "2026-04-24",
    title: "Mid-programme cohort",
    location: "Thimphu",
    altText:
      "Participants holding IC3 certificates inside a bright covered training space",
  },
  {
    id: "apr-14",
    src: ic3Apr14,
    date: "2026-04-14",
    title: "Cohort at iBEST Institute",
    location: "iBEST Institute, Thimphu",
    altText:
      "Participants in gho and kira holding certificates outside the iBEST Institute building",
  },
  {
    id: "apr-03",
    src: ic3Apr03,
    date: "2026-04-03",
    title: "A full house",
    location: "iBEST Institute, Thimphu",
    altText:
      "A large cohort of nearly thirty participants holding certificates outside the iBEST Institute",
    note: "One of the largest single groups I trained across the programme.",
  },
  {
    id: "mar-24",
    src: ic3Mar24,
    date: "2026-03-24",
    title: "The first cohort",
    location: "Thimphu",
    altText:
      "The first group of IC3 participants holding their certificates under a red and blue canopy",
    note: "Where the programme started — the group that shaped how I taught every session after it.",
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
    thumbnailUrl: ibestLogo,
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
