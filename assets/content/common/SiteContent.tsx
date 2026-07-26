
import {
  creativerseWebsite,
  creditSystemWebsite,
  dgmLogo,
  educareSkillAboutUsWebsite,
  educareSkillWebsite,
  geoHazardsIndoSystemWebsite,
  ibestBhutanWebsite,
  ibestLogo,
  ibestStudiosWebsite,
  ic3Apr03,
  ic3Apr14,
  ic3Apr24,
  ic3Feb07,
  ic3Feb17,
  ic3Jun01,
  ic3Jun10,
  ic3Jun23,
  ic3Mar05,
  ic3Mar24,
  ic3May06,
  ic3May06Group,
  ic3May26,
  pemaPortrait,
  profileWebsite,
  rpisLogo,
  travel01,
  travel02,
  travel03,
} from "@/assets";
import type {
  Certificate,
  GalleryAlbum,
  GalleryPhoto,
  NavItem,
  Project,
  SkillGroup,
  Social,
  TimelineEntry,
} from "@/types/SiteProps";

export type {
  Certificate,
  GalleryAlbum,
  GalleryAlbumId,
  GalleryPhoto,
  NavItem,
  Project,
  SkillGroup,
  Social,
  SocialIcon,
  TimelineEntry,
} from "@/types/SiteProps";

export const profile = {
  name: "Pema Lepcha",
  brand: "pema.dev",
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
  { label: "GitHub", href: "https://github.com/Pema-Lepex/", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pema-lepcha-047297376/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/share/1Botrjzt6a/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/its_lepex.pl.022?utm_source=qr&igsh=MTRyaGNqcXN3enNmcQ==", icon: "instagram" },
  { label: "Email", href: "mailto:pemalepchapema@gmail.com", icon: "mail" },
];

export const stats = [
  { value: 11, suffix: "+", label: "Projects shipped" },
  { value: 2, suffix: "+", label: "Years experience" },
  { value: 3, suffix: "", label: "Languages spoken" },
  { value: 200, suffix: "+", label: "Students Trained" },
];

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

export const techMarquee = [
  "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS",
  "GraphQL", "Apollo Client", "Redux", "REST APIs", "Node.js",
  "Git", "HTML5", "CSS3", "Bhutan NDI",
];

export const projects: Project[] = [
  {
    id: "geo-hazards",
    title: "GeoHazard Information System",
    year: "2025",
    category: "GovTech",
    description:
      "Created data-driven, responsive interfaces for national hazard monitoring, turning complex environmental data into accessible tools for government use.",
    logo: dgmLogo,
    cover: geoHazardsIndoSystemWebsite,
    altText: "Department of Geology & Mines logo",
    tags: ["Next.js", "GraphQL", "Data Viz", "Tailwind"],
    url: "https://geohazards.systems.gov.bt/",
    featured: true,
    showcase: true,
    role: "Frontend Developer",
    client: "Department of Geology & Mines",
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
    logo: rpisLogo,
    altText: "Royal Project Initiative System logo",
    tags: ["Next.js", "Bhutan NDI", "RBAC", "Payments"],
    url: "https://rpis.systems.gov.bt/",
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
    id: "creativerse",
    title: "Creativerse",
    year: "2026",
    category: "Corporate · Marketing site",
    description:
      "The public site for Creativerse, a Bhutan-based outsourcing partner. A navy-and-amber identity carried across a hero carousel, service breakdowns, and contact funnels — built mobile-first so the pitch reads the same on a phone as on a boardroom screen.",
    cover: creativerseWebsite,
    altText:
      "The Creativerse website shown on a laptop, tablet, and phone",
    tags: ["Next.js", "Tailwind CSS", "Responsive"],
    url: "https://www.creativerse.com/",
    showcase: true,
    role: "Frontend Developer",
    client: "iBEST",
    highlights: [
      "Built the hero carousel, service sections, and enquiry funnel from design to production",
      "Carried one brand system across a utility bar, navigation, and every content block",
      "Tuned layout and typography across laptop, tablet, and phone breakpoints",
    ],
  },
  {
    id: "ibest-studios",
    title: "iBEST Studios",
    year: "2026",
    category: "Multimedia · Studio site",
    description:
      "A dark-themed showcase for iBEST's animation and film studio — 'We give life to stories'. Project spotlights such as Dragon Tales and the Legend of Pemi Tshewang Tashi sit alongside filterable service tags for 2D and 3D animation, VFX, and design.",
    cover: ibestStudiosWebsite,
    altText: "The iBEST Studios website shown on a laptop, tablet, and phone",
    tags: ["Next.js", "Tailwind CSS", "Motion", "Dark UI"],
    url: "https://ibeststudios.com/",
    showcase: true,
    role: "Frontend Developer",
    client: "iBEST Studios",
    highlights: [
      "Designed a dark interface that keeps artwork and showreels the loudest thing on the page",
      "Built the work spotlight and service-tag filtering for the studio's portfolio",
      "Kept large media assets from wrecking load time on Bhutanese connections",
    ],
  },
  {
    id: "ibest-bhutan",
    title: "iBEST Institute & Consultancy",
    year: "2026",
    category: "Corporate · Training",
    description:
      "The public site for iBEST's training and consulting arm: course streams, an enrolment path, and the numbers behind the institute — 400+ professionals trained and 150+ consulting clients since 2014.",
    cover: ibestBhutanWebsite,
    altText:
      "The iBEST Institute & Consultancy website shown on a laptop, tablet, and phone",
    tags: ["Next.js", "Tailwind CSS", "Responsive", "Forms"],
    url: "https://www.ibestbhutan.com/",
    role: "Frontend Developer",
    client: "iBEST Institute",
    highlights: [
      "Built the course catalogue and registration flow end to end",
      "Turned institute credentials into a scannable stat band above the fold",
      "Shipped a full dark palette that holds contrast over photographic backdrops",
    ],
  },
  {
    id: "credit-system",
    title: "Credit Manager",
    year: "2026",
    category: "Product · Internal tool",
    description:
      "A credit and repayment tracker for small merchants. Customer ledgers carry outstanding balances and a reliability score, payments are filterable by status and overdue window, and the whole thing stays readable on a counter-top tablet as much as on desktop.",
    cover: creditSystemWebsite,
    altText: "The Credit Manager dashboard shown on a desktop, tablet, and phone",
    tags: ["Next.js", "TypeScript", "Data Tables", "Dashboard"],
    url: "https://credit-system-xi.vercel.app/",
    role: "Frontend Developer",
    client:"Self",
    highlights: [
      "Built dense customer and payment tables with search, status filters, and pagination",
      "Surfaced outstanding balance and reliability scoring where staff actually look first",
      "Kept one component system across dashboard, catalogue, and reporting screens",
    ],
  },
  {
    id: "educare",
    title: "Educare Skill",
    year: "2024",
    category: "EdTech · In-house",
    description:
      "Bhutan's pioneering online learning platform, built to transform learning and skilling in Bhutan and beyond. Educare Skill lets learners master Dzongkha through more than 1,000 engaging, curriculum-aligned episodes.",
    cover: educareSkillWebsite,
    logo: ibestLogo,
    altText:
      "Educare Skill artwork showing the video learning platform on a laptop and a phone",
    tags: ["React", "GraphQL", "Apollo Client", "Offline Video"],
    url: "https://educareskill.com/",
    showcase: true,
    role: "Frontend Developer",
    client: "iBEST Institute",
    highlights: [
      "Built the learner-facing frontend for 1,000+ curriculum-aligned Dzongkha episodes",
      "Wired up content delivery with GraphQL and Apollo Client",
      "Shipped offline viewing and a two-device limit against one account",
      "Tuned the episode browsing experience for low-bandwidth connections",
    ],
  },
  {
    id: "educare-site",
    title: "Educare Skill Website",
    year: "2026",
    category: "EdTech · Marketing site",
    description:
      "A separate build from the learning platform: the public face of Educare Skill. An illustrated, character-led landing page routes visitors to the registration guide, the content library, membership plans, and gift coupons, with the About, Impact, Team, Career, and Blog sections behind it.",
    cover: educareSkillAboutUsWebsite,
    // logo: ibestLogo,
    altText:
      "The Educare Skill marketing website shown on a laptop, tablet, and phone",
    tags: ["React", "Tailwind CSS", "Illustration", "Responsive"],
    url: "https://www.educareskill.com/aboutus/",
    role: "Frontend Developer",
    client: "iBEST Technologies",
    highlights: [
      "Built the illustrated landing page and the four entry cards that feed sign-ups",
      "Kept a heavily illustrated layout from costing load time on mobile",
      "Shipped the gift-coupon and membership routes alongside the editorial pages",
    ],
  },
  {
    id: "educare-cms",
    title: "Educare Skill CMS",
    year: "2024",
    category: "Platform · In-house",
    description:
      "The administrative core of the Educare Skill ecosystem, managing high-volume data and user permissions. I implemented dynamic role assignment, membership management, and an integrated media system handling video and imagery across web and mobile.",
    logo: ibestLogo,
    altText: "iBEST logo",
    tags: ["React", "Redux", "Media Pipeline"],
    url: "https://admin.educareskill.com/",
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
    altText: "MindFullness Guide project",
    tags: ["Squarespace", "SimplyBook", "Animation"],
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
    cover: profileWebsite,
    altText:
      "The pema.dev portfolio shown on a laptop, tablet, and phone",
    tags: ["Next.js", "Tailwind v4", "Framer Motion"],
    repoUrl: "https://github.com/Pema-Lepex/my-profile",
    url: "https://profile-psi-liart.vercel.app/",
    role: "Designer & Developer",
    highlights: [
      "Token-based theming layer driving light and dark from one source",
      "Scroll-linked animations that respect prefers-reduced-motion",
      "A reusable component library rather than one-off page markup",
    ],
  },
];

/**
 * Albums the gallery can hold. Only the ones with photos in them show up on
 * the page, so a new album goes live the moment its first photo is tagged.
 */
export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "training",
    label: "Training",
    description:
      "IC3 digital-literacy certification delivered for GovTech's Digital Program for Hotels and Homestays. These are the cohorts, photographed on certification day across Thimphu.",
    note: "200+ participants certified",
  },
  {
    id: "travel",
    label: "Travel",
    description: "Places I have carried a laptop to, and a few I have not.",
  },
  {
    id: "work",
    label: "Work",
    description: "The desks, teams, and rooms the projects actually got built in.",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Work in progress — screens, sketches, and things mid-build.",
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "jun-23",
    album: "training",
    src: ic3Jun23,
    date: "2026-06-23",
    title: "Batch Gedu",
    location: "Gedu College of Business Studies Students | Chhukha",
    altText:
      "Around twenty-five IC3 participants in Bhutanese national dress holding their certificates on the steps of a traditional building",
    note: "The final cohort of the spring intake, photographed after the closing assessment.",
  },
  {
    id: "jun-10",
    album: "training",
    src: ic3Jun10,
    date: "2026-06-10",
    title: "Batch 12-A",
    location: "Thimphu",
    altText:
      "A cohort of women participants in kira holding IC3 certificates of completion on a wooden veranda",
    note: "Every participant in this group passed the certification on the first attempt.",
  },
  {
    id: "jun-01",
    album: "training",
    src: ic3Jun01,
    date: "2026-06-01",
    title: "Hospitality staff intake",
    location: "Royal Institute for Tourism and Hospitality | Thimphu",
    altText:
      "Hotel and homestay staff, several in chef whites, holding certificates on the stone steps of a traditional Bhutanese building",
    note: "Front-of-house and kitchen staff trained together under the Digital Program for Hotels and Homestays.",
  },
  {
    id: "may-26",
    album: "training",
    src: ic3May26,
    date: "2026-05-26",
    title: "Batch 11",
    location: "Thimphu",
    altText:
      "Participants in national dress holding IC3 certificates in front of a wooden lodge",
    note: "A lodge veranda in the late May light, and eleven batches' worth of practice standing behind this one.",
  },
  {
    id: "may-06-group",
    album: "training",
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
    album: "training",
    src: ic3May06,
    date: "2026-05-06",
    title: "Batch 10",
    location: "Thimphu",
    altText:
      "Two rows of participants holding certificates of completion on a covered wooden deck",
    note: "Two neat rows on the deck, full of energy right to the last photo.",
  },
  {
    id: "apr-24",
    album: "training",
    src: ic3Apr24,
    date: "2026-04-24",
    title: "Batch 9",
    location: "Thimphu",
    altText:
      "Participants holding IC3 certificates inside a bright covered training space",
    note: "Held indoors under a bright roof — the kind of room where you can hear every keyboard at once.",
  },
  {
    id: "apr-14",
    album: "training",
    src: ic3Apr14,
    date: "2026-04-14",
    title: "Batch 8",
    location: "iBEST Institute, Thimphu",
    altText:
      "Participants in gho and kira holding certificates outside the iBEST Institute building",
    note: "Straight out of the classroom and onto the front step, still in gho and kira.",
  },
  {
    id: "apr-03",
    album: "training",
    src: ic3Apr03,
    date: "2026-04-03",
    title: "Batch 7",
    location: "iBEST Institute, Thimphu",
    altText:
      "A large cohort of nearly thirty participants holding certificates outside the iBEST Institute",
    note: "Nearly thirty in one frame. Getting everybody to look at the same camera took longer than the last module.",
  },
  {
    id: "mar-24",
    album: "training",
    src: ic3Mar24,
    date: "2026-03-24",
    title: "Batch 6",
    location: "Thimphu",
    altText:
      "A group of IC3 participants holding their certificates under a red and blue canopy",
    note: "Under the red and blue canopy — the batch where the running order finally clicked into place.",
  },
  {
    id: "mar-05",
    album: "training",
    src: ic3Mar05,
    date: "2026-03-05",
    title: "Batch 4",
    location: "iBEST Institute, Thimphu",
    altText:
      "A long line of participants in gho and kira holding certificates outside the iBEST Institute",
    note: "March light, a longer line-up, and the same grin at both ends of it.",
  },
  {
    id: "feb-17",
    album: "training",
    src: ic3Feb17,
    date: "2026-02-17",
    title: "Batch 3",
    location: "iBEST Institute, Thimphu",
    altText:
      "Two rows of participants holding certificates in the forecourt of the iBEST Institute, some kneeling at the front",
    note: "Out on the forecourt in the February cold, certificates held tight against the wind.",
  },
  {
    id: "feb-07",
    album: "training",
    src: ic3Feb07,
    date: "2026-02-07",
    title: "Batch 2",
    location: "iBEST Institute, Thimphu",
    altText:
      "A small group of participants holding certificates in a training room, standing in front of a wall-mounted screen",
    note: "An evening batch — the clock had gone past six and nobody moved until every certificate was in a hand.",
  },

  /* ---------------------------------------------------------------- */
  /* Travel — dates and locations are guesses; correct them as you go. */
  /* ---------------------------------------------------------------- */
  {
    id: "travel-01",
    album: "travel",
    src: travel01,
    date: "2025-11-22",
    title: "Somewhere new, phone out",
    location: "On the road",
    altText:
      "Two travellers with backpacks looking at a phone together on a sunlit city street",
    note: "Two heads, one screen, and no real idea which way the street runs.",
  },
  {
    id: "travel-02",
    album: "travel",
    src: travel02,
    date: "2025-10-05",
    title: "Paper beats signal",
    location: "On the road",
    altText:
      "Two travellers with backpacks reading a paper map at a busy city crossing",
    note: "The map came out the moment the signal did not.",
  },
  {
    id: "travel-03",
    album: "travel",
    src: travel03,
    date: "2025-08-17",
    title: "Above the cloud line",
    location: "On the road",
    altText:
      "A traveller in a wide-brimmed hat sitting on a dry ridge, looking out over a sea of cloud",
    note: "The part of the walk where you stop, sit down, and let the view do the talking.",
  },
];

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

export const certificates: Certificate[] = [
  // {
  //   id: "ic3",
  //   title: "IC3 Digital Literacy Certification",
  //   issuer: "GovTech Digital Program",
  //   year: "2023",
  //   fileUrl: "/certificates/ic3.pdf",
  //   thumbnailUrl: ibestLogo,
  // },
];

export const contact = {
  email: "pemalepchapema@gmail.com",
  emailNote: "I usually reply within a day",
  location: "Babesa, Thimphu",
  locationNote: "Bhutan 🇧🇹",
  languages: ["Dzongkha", "English", "Lotshomkha"],
  languagesNote: "Happy to talk in any of these",
};
