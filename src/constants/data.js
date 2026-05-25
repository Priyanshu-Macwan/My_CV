// ============================================================
// data.js — Priyanshu Macwan Portfolio · All Constants
// Drop this file into: src/constants/data.js
// ============================================================

// ─── PERSONAL INFO ───────────────────────────────────────────
export const PERSONAL = {
  name: "Priyanshu Macwan",
  initials: "PM",
  photo: "/photo.jpg", // Place your photo at public/photo.jpg
  eyebrow: "Open to Internships",
  titles: [
    "Full-Stack Developer",
    "IoT & Embedded Systems Builder",
    "Data Science Learner",
    "GATE-CS Aspirant",
  ],
  tagline: "I build real things — from web apps to ESP32 hardware.",
  about: [
    "I'm a second-year CSE student at CHARUSAT, passionate about building software that solves real problems — not just academic exercises.",
    "I've independently shipped 5+ projects spanning full-stack web apps, IoT hardware systems, and decentralized architecture — without waiting for coursework to catch up.",
    "Currently deepening my skills in Data Science and ML, preparing for GATE-CS, and looking for internship opportunities to contribute to real engineering teams.",
  ],
  location: "Nadiad, Gujarat, India",
  university: "CHARUSAT University (Gujarat Technological University)",
  degree: "B.Tech Computer Science & Engineering",
  duration: "2024 – 2028 · Currently 2nd Year, Semester 4",
  email: "priyanshumacwan1604@gmail.com",
  github: "https://github.com/24CS049Priyanshu",
  linkedin: "https://www.linkedin.com/in/priyanshu-macwan-697b72324",
  resumeUrl: "/resume/Priyanshu_Macwan_resume.pdf", // Place resume at public/resume/Priyanshu_Macwan_resume.pdf
};

// ─── STATS (hero/about counters) ─────────────────────────────
export const STATS = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 2, suffix: "",  label: "Hackathons" },
  { value: 6, suffix: "+", label: "Tech Stacks" },
];

// ─── SKILLS ──────────────────────────────────────────────────
export const SKILLS = [
  {
    group: "Languages",
    accent: "blue", // #3B82F6
    items: ["C", "C++", "Java", "JavaScript", "Python", "HTML5", "CSS3"],
  },
  {
    group: "Frameworks & Tools",
    accent: "purple", // #8B5CF6
    items: [
      "React.js",
      "FastAPI",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
      "Firebase",
      "Google Sheets API",
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "npm",
    ],
  },
  {
    group: "Embedded & Data",
    accent: "cyan", // #06B6D4
    items: [
      "ESP32",
      "Arduino IDE",
      "Tinkercad",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Scikit-learn",
      "Jupyter Notebooks",
    ],
  },
];

// ─── HERO ORBITING PILLS ─────────────────────────────────────
// These orbit around the photo in the hero section
export const ORBIT_PILLS = [
  { label: "React",    orbitDuration: "18s", orbitRadius: 130, startAngle: 0   },
  { label: "C++",      orbitDuration: "22s", orbitRadius: 140, startAngle: 60  },
  { label: "Firebase", orbitDuration: "16s", orbitRadius: 125, startAngle: 120 },
  { label: "ESP32",    orbitDuration: "20s", orbitRadius: 145, startAngle: 180 },
  { label: "FastAPI",  orbitDuration: "24s", orbitRadius: 135, startAngle: 240 },
  { label: "Python",   orbitDuration: "19s", orbitRadius: 128, startAngle: 300 },
];

// ─── PROJECTS ────────────────────────────────────────────────
// variant: "featured" | "medium" | "compact"
export const PROJECTS = [
  {
    id: "sonicdna",
    variant: "featured",
    name: "SonicDNA",
    tag: "Web App · AI",
    tagAccent: "purple",
    year: "2024",
    description:
      "Cinematic Spotify analytics platform with AI-powered music insights. Transforms raw Spotify listening data into emotional visual storytelling — featuring glassmorphism UI, real-time top-tracks, audio feature analysis, and AI-generated personality roasts powered by GPT-4o-mini.",
    stack: ["Next.js 15", "Spotify API", "OpenAI GPT-4o-mini", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/24CS049Priyanshu/sonicdna",
    demo: "https://sonicdna.vercel.app/",
    image: "/images/projects/sonicdna.png",
    gradientFrom: "#3B82F6",
    gradientTo: "#8B5CF6",
    highlight: "Live on Vercel ↗",
  },
  {
    id: "restaurantai",
    variant: "medium",
    name: "Restaurant-AI",
    tag: "AI · Full-Stack",
    tagAccent: "cyan",
    year: "2024",
    description:
      "AI-powered restaurant assistant that handles menu browsing, intelligent order recommendations, and customer queries. Built to demonstrate practical LLM integration in a real-world hospitality context.",
    stack: ["JavaScript", "HTML5", "CSS3", "AI Integration", "REST APIs"],
    github: "https://github.com/24CS049Priyanshu/RestaurantAI",
    demo: null,
    gradientFrom: "#8B5CF6",
    gradientTo: "#06B6D4",
    highlight: "AI Integration",
  },
  {
    id: "ecoh2",
    variant: "medium",
    name: "EcoH2",
    tag: "Green Tech",
    tagAccent: "blue",
    year: "2024",
    description:
      "An eco-focused project exploring hydrogen as a sustainable energy alternative. Features data visualizations and informational interfaces around green hydrogen production, storage, and usage.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/24CS049Priyanshu/EcoH2",
    demo: null,
    image: "/images/projects/h2-infrastructure.png",
    gradientFrom: "#06B6D4",
    gradientTo: "#3B82F6",
    highlight: "Green Energy Focus",
  },
  {
    id: "facedetection",
    variant: "compact",
    name: "Face Detection",
    tag: "Math · CV",
    tagAccent: "purple",
    year: "2024",
    description:
      "A mathematics-focused face detection project developed as part of a college research assignment to understand the mathematical foundations behind facial recognition systems, image processing, and detection algorithms.",
    stack: ["Python", "OpenCV", "NumPy", "Mathematics"],
    github: "https://github.com/24CS049Priyanshu/Face_Detection",
    demo: null,
    image: "/images/projects/face-detection.png",
    gradientFrom: "#8B5CF6",
    gradientTo: "#3B82F6",
    highlight: "Research-oriented",
  },
  {
    id: "student-portal",
    variant: "compact",
    name: "Student Portal",
    tag: "Academic Tool",
    tagAccent: "blue",
    year: "2024",
    description:
      "Student data management system covering grades, attendance, courses, and assignments — clean multi-page HTML/CSS dashboard built for academic tracking.",
    stack: ["HTML5", "CSS3"],
    github: "https://github.com/24CS049Priyanshu/Student-portal",
    demo: null,
    image: "/images/projects/student-portal.png",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    highlight: "Clean UI",
  },
];

// ─── TIMELINE ────────────────────────────────────────────────
// side: "left" | "right" — alternate for desktop layout
export const TIMELINE = [
  {
    year: "2024",
    side: "right",
    title: "Started B.Tech CSE",
    detail: "Enrolled at CHARUSAT University, Gujarat Technological University. Began learning DSA, OOP, and Digital Electronics.",
    icon: "🎓",
  },
  {
    year: "2024",
    side: "left",
    title: "Shipped Biometric Attendance System",
    detail: "Built my first IoT project end-to-end — ESP32 hardware to Firebase cloud to Google Sheets dashboard.",
    icon: "🔌",
  },
  {
    year: "2024",
    side: "right",
    title: "Built Space Station Storage PWA",
    detail: "First full-stack project: React frontend + FastAPI backend + Firebase real-time database. Learned PWA patterns.",
    icon: "🚀",
  },
  {
    year: "2024",
    side: "left",
    title: "Launched ReWear Platform",
    detail: "Multi-page sustainable fashion exchange app — now live on Vercel. First deployed production project.",
    icon: "👗",
  },
  {
    year: "2024",
    side: "right",
    title: "Competed in Hackathon",
    detail: "Submitted Blockchain Athlete Management System — chose an underexplored domain for maximum differentiation.",
    icon: "🏆",
  },
  {
    year: "2024",
    side: "left",
    title: "ALU Design & Digital Circuits",
    detail: "Designed and simulated logic circuits in Tinkercad — half-adder, MUX, flip-flops, and a working ALU prototype.",
    icon: "⚡",
  },
  {
    year: "2025",
    side: "right",
    title: "Started Data Science Self-Study",
    detail: "Building proficiency in NumPy, Pandas, Matplotlib, and core ML algorithms (regression, classification, model evaluation).",
    icon: "📊",
  },
  {
    year: "2025",
    side: "left",
    title: "DSA Practice for GATE & Interviews",
    detail: "Solving problems daily on LeetCode and GeeksforGeeks. Targeting GATE-CS alongside coursework.",
    icon: "🧠",
  },
  {
    year: "2025",
    side: "right",
    title: "Exploring TypeScript & Docker",
    detail: "Leveling up to production-ready tooling. Planning first open-source contributions and portfolio expansion.",
    icon: "🛠️",
  },
];

// ─── NAV LINKS ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Journey",  href: "#timeline" },
  { label: "Contact",  href: "#contact"  },
];

// ─── CONTACT LINKS ───────────────────────────────────────────
export const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/24CS049Priyanshu",
    icon: "github",         // use react-icons: FaGithub
    color: "#6B7280",
    hoverColor: "#F1F5F9",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyanshu-macwan-697b72324",
    icon: "linkedin",       // use react-icons: FaLinkedin
    color: "#3B82F6",
    hoverColor: "#60A5FA",
  },
  {
    label: "Email",
    href: "mailto:priyanshumacwan1604@gmail.com",
    icon: "mail",           // use react-icons: HiMail
    color: "#8B5CF6",
    hoverColor: "#A78BFA",
  },
];

// ─── DESIGN TOKENS (CSS reference) ───────────────────────────
// Reference these in your index.css :root block
export const DESIGN_TOKENS = {
  colors: {
    bgPrimary:   "#0f172a",
    bgSecondary: "#111827",
    bgTertiary:  "#1e293b",
    accentBlue:  "#3B82F6",
    accentPurple:"#8B5CF6",
    accentCyan:  "#06B6D4",
    textPrimary: "#F1F5F9",
    textMuted:   "#94A3B8",
    textFaint:   "#475569",
    glassBg:     "rgba(255, 255, 255, 0.03)",
    glassBorder: "rgba(255, 255, 255, 0.08)",
  },
  glass: {
    background:     "rgba(255, 255, 255, 0.03)",
    border:         "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    borderRadius:   "16px",
  },
  hover: {
    glow:        "0 0 20px rgba(59, 130, 246, 0.15)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    transition:  "all 300ms ease",
  },
};

// ─── COURSEWORK ──────────────────────────────────────────────
export const COURSEWORK = [
  "Data Structures & Algorithms",
  "Digital Electronics",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Discrete Mathematics",
  "Computer Networks",
  "Operating Systems",
];
