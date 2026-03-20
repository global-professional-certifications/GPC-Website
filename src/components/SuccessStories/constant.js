// heroData.js
import arpitSir from "../../assets/arpit-garg.png"
import akshdeepSingh from "../../assets/akshdeep-singh.png"
export const heroData = {
  title: {
    line1: "Real people.",
    line2: "Real careers.",
    highlight: "Transformed."
  },
  subtitle:
    "Join thousands of professionals who breached their career glass ceilings through expert guidance.",

  stats: [
    { label: "Champions", value: "1200+" },
    { label: "Pass Rate", value: "94%" },
    { label: "Countries", value: "38+" },
    { label: "Salary Hike", value: "42%" }
  ],

  leftCircle: {
    name: "Arpit Garg",
    role: "Lead Mentor",
    tag: "15+ Yrs Exp.",
    img: arpitSir
  },

  rightCircle: {
    name: "Akshdeep Singh",
    role: "Internal Audit, KPMG",
    tag: "CIA Cleared",
    image: akshdeepSingh
  }
};

export const examTestimonialsData = [
  {
    name: "Akshdeep Singh",
    company: "Allstate",
    location: "Bengaluru",
    role: "Internal Audit Specialist",
    batch: "BATCH 2023-A",
    courseSlug: 'cia'
  },
  {
    name: "Wajiha Ansari",
    company: "Grant Thornton",
    location: "Bahrain",
    role: "IT Audit Manager",
    batch: "BATCH 2022-C",
    courseSlug: 'cisa'
  },
  {
    name: "Rahul Kumar",
    company: "Grant Thornton",
    location: "Delhi",
    role: "Senior Associate",
    batch: "BATCH 2023-B",
    courseSlug: 'cia'
  },
  {
    name: "Chahat Bhatia",
    company: "B2B Consulting",
    location: "Gurugram",
    role: "Compliance Head",
    batch: "BATCH 2023-A",
    courseSlug: 'cia'
  },
  {
    name: "Vijay Sharma",
    company: "Raymond Eng",
    location: "Bangalore",
    role: "IS Auditor",
    batch: "BATCH 2022-D",
    courseSlug: 'cisa'
  },
  {
    name: "Nitin Rawat",
    company: "HeidelbergCement",
    location: "Gurugram",
    role: "Finance Controller",
    batch: "BATCH 2023-C",
    courseSlug: 'cia'
  },
  {
    name: "Simranjeet Kaur",
    company: "LichtBlick SE",
    location: "Germany",
    role: "Risk Analyst",
    batch: "BATCH 2022-A",
    courseSlug: 'cisa'
  },
  {
    name: "Divya Mehta",
    company: "PwC",
    location: "Hyderabad",
    role: "Audit Consultant",
    batch: "BATCH 2022-A",
    courseSlug: 'cia'
  },
  {
    name: "Shakti Sharma",
    company: "EY",
    location: "Delhi",
    role: "Risk Advisory",
    batch: "BATCH 2023-B",
    courseSlug: 'cia'
  },
  {
    name: "Md Danish",
    company: "Sobha Realty",
    location: "Dubai",
    role: "Information Security",
    batch: "BATCH 2022-C",
    courseSlug: 'cisa'
  },
  {
    name: "Priya Kapoor",
    company: "Deloitte",
    location: "Mumbai",
    role: "Senior Auditor",
    batch: "BATCH 2023-A",
    courseSlug: 'cia'
  },
  {
    name: "Amarendra Babu",
    company: "Grant Thornton",
    location: "Bengaluru",
    role: "Assurance Manager",
    batch: "BATCH 2023-C",
    courseSlug: 'cia'
  }
];

// ── Video Vault dummy data (replace with Sanity later) ──────────────────────
export const videoVaultTabs = [
  { slug: 'cia',  label: 'CIA',  count: 47 },
  { slug: 'cisa', label: 'CISA', count: 23 },
];

const mkVideo = (name, role, duration, initials, slug) => ({
  name, role, duration, initials, slug,
});

export const videoVaultData = {
  cia: {
    hero: {
      name: 'Akshdeep Singh',
      role: 'INTERNAL AUDIT MANAGER',
      quote: '"The structured approach at GPC made passing the CIA exam on my first attempt a reality."',
      initials: 'AS',
      duration: '4:12',
      tag: 'CIA HERO',
    },
    grid: [
      mkVideo('Rahul K',     'Internal Auditor',  '2:45', 'RK',  'cia'),
      mkVideo('Chahat B',    'Compliance Lead',   '1:50', 'CB',  'cia'),
      mkVideo('Nitin R',     'Sr. Associate',     '3:12', 'NR',  'cia'),
      mkVideo('Divya M',     'Junior Auditor',    '2:20', 'DM',  'cia'),
      mkVideo('Shakti S',    'Controller',        '1:58', 'SS',  'cia'),
      mkVideo('Amarendra B', 'Risk Analyst',      '3:40', 'AB',  'cia'),
      mkVideo('Priya K',     'Financial Auditor', '2:15', 'PK',  'cia'),
      mkVideo('Arjun T',     'Audit Consultant',  '4:05', 'AT',  'cia'),
    ],
  },
  cisa: {
    hero: {
      name: 'Wajiha Ansari',
      role: 'IT AUDIT MANAGER',
      quote: '"GPC\'s curriculum gave me the edge I needed to clear CISA in one attempt."',
      initials: 'WA',
      duration: '3:30',
      tag: 'CISA HERO',
    },
    grid: [
      mkVideo('Vijay S',      'IS Auditor',          '2:10', 'VS',  'cisa'),
      mkVideo('Simranjeet K', 'Risk Analyst',        '1:45', 'SK',  'cisa'),
      mkVideo('Md Danish',    'Information Security','2:55', 'MD',  'cisa'),
      mkVideo('Reshma P',     'IT Consultant',       '3:05', 'RP',  'cisa'),
      mkVideo('Karan M',      'Cyber Analyst',       '2:30', 'KM',  'cisa'),
      mkVideo('Sonal G',      'GRC Specialist',      '1:55', 'SG',  'cisa'),
      mkVideo('Deepak V',     'IT Auditor',          '3:20', 'DV',  'cisa'),
      mkVideo('Preeti J',     'Compliance Lead',     '2:40', 'PJ',  'cisa'),
    ],
  },
};

// ── Written Stories dummy data (replace with Sanity later) ──────────────────
export const writtenStoriesTabs = [
  { slug: 'all',           label: 'All' },
  { slug: 'cia-challenge', label: 'CIA Challenge' },
  { slug: 'cia-partwise',  label: 'CIA Partwise' },
  { slug: 'cisa',          label: 'CISA' },
];

export const writtenStoriesFeatured = {
  initials: 'HS',
  name: 'Harshdeep Singh',
  location: 'Ludhiana, India',
  avatarBg: 'linear-gradient(145deg, #4c2a8a 0%, #2d1b69 100%)',
  tag: 'CIA Class of 2023 · Allstate',
  quote:
    '"How I cleared CIA while working full-time at Allstate. The structure of the GPC curriculum was the only thing that kept me sane during the busy season…"',
  link: '#',
};

export const writtenStoriesGrid = [
  {
    initials: 'WA', name: 'Wajiha Ansari', location: 'Manama, Bahrain',
    avatarBg: 'linear-gradient(145deg, #0f2d4a 0%, #1a4068 100%)',
    tag: 'CISA',
    excerpt: 'Preparing from Bahrain while managing a demanding role… she shares her strategy for consistency.',
    link: '#',
  },
  {
    initials: 'VS', name: 'Vijay Singhal', location: 'Gurugram, India',
    avatarBg: 'linear-gradient(145deg, #2d1b69 0%, #3b2080 100%)',
    tag: 'Career Pivot',
    excerpt: 'A career pivot from engineering to internal audit at 34 was daunting until the right mentorship.',
    link: '#',
  },
  {
    initials: 'SK', name: 'Simranjeet Kaur', location: 'Berlin, Germany',
    avatarBg: 'linear-gradient(145deg, #0f2d4a 0%, #1a4068 100%)',
    tag: 'CISA',
    excerpt: 'Clearing CISA from Germany across time zones while managing her family life and new job.',
    link: '#',
  },
  {
    initials: 'AD', name: 'Ananya Das', location: 'KPMG · Delhi',
    avatarBg: 'linear-gradient(145deg, #0a3d2e 0%, #145c44 100%)',
    tag: 'CMA Cleared',
    excerpt: 'How CMA became the catalyst for a major promotion at KPMG. Navigating complex financial modules was a challenge…',
    link: '#',
  },
  {
    initials: 'RJ', name: 'Rohan Joshi', location: 'Deloitte · Pune',
    avatarBg: 'linear-gradient(145deg, #5a1a1a 0%, #7a2828 100%)',
    tag: 'ACCA Cleared',
    excerpt: 'The ACCA journey is a marathon, not a sprint. Here\'s how I managed to clear 4 papers in a single year at Deloitte.',
    link: '#',
  },
];

// ── Hero Section – Student Slideshow Dummy Data (replace with Sanity later) ─
// Each entry maps to the fields shown in the student ring:
//   image       → photo URL / imported asset (swap for Sanity image)
//   name        → displayed below the ring
//   designation → displayed below the name
//   company     → shown in the "Placed at" bubble
//   courseTag   → label on the top-left badge  (e.g. "CIA CLEARED")
//   attempt     → text on the top-left badge   (e.g. "1st Attempt")
//   quote       → italic text in the dark quote card
export const heroStudents = [
  {
    image: akshdeepSingh,
    initials: 'AS',
    avatarBg: 'linear-gradient(135deg, #2D1B69 0%, #4c2a8a 100%)',
    name: 'Akshdeep Singh',
    designation: 'Internal Audit',
    company: 'KPMG',
    courseTag: 'CIA CLEARED',
    attempt: '1st Attempt',
    quote: '"The structured curriculum and mentorship were game-changers."',
  },
  {
    image: null,
    initials: 'WA',
    avatarBg: 'linear-gradient(135deg, #0f2d4a 0%, #1a5276 100%)',
    name: 'Wajiha Ansari',
    designation: 'IT Audit Manager',
    company: 'Deloitte',
    courseTag: 'CISA CLEARED',
    attempt: '1st Attempt',
    quote: '"GPC\'s practice tests were exactly what I needed to stay consistent from Bahrain."',
  },
  {
    image: null,
    initials: 'SK',
    avatarBg: 'linear-gradient(135deg, #1a4a2e 0%, #1e8449 100%)',
    name: 'Simranjeet Kaur',
    designation: 'Risk Analyst',
    company: 'Grant Thornton',
    courseTag: 'CIA CLEARED',
    attempt: '2nd Attempt',
    quote: '"Balancing a new job in Berlin and CIA prep — GPC made it possible."',
  },
  {
    image: null,
    initials: 'VS',
    avatarBg: 'linear-gradient(135deg, #4a1942 0%, #7d3c98 100%)',
    name: 'Vijay Singhal',
    designation: 'Sr. IS Auditor',
    company: 'PwC',
    courseTag: 'CISA CLEARED',
    attempt: '1st Attempt',
    quote: '"From engineering to IT audit at 34 — GPC bridged the knowledge gap perfectly."',
  },
  {
    image: null,
    initials: 'AD',
    avatarBg: 'linear-gradient(135deg, #5a1a1a 0%, #a93226 100%)',
    name: 'Ananya Das',
    designation: 'Finance Manager',
    company: 'KPMG',
    courseTag: 'CMA CLEARED',
    attempt: '1st Attempt',
    quote: '"CMA with GPC was the catalyst for my promotion at KPMG."',
  },
];

// ── Voices of Excellence dummy data (replace with Sanity later) ─────────────
export const voicesOfExcellenceData = [
  {
    quote: "For anyone preparing for the CIA Challenge Exam, I cannot recommend the Prep Course enough. This program is designed to simplify the learning process and help you stay disciplined with your studies. Arpit Garg, who led the sessions, brought an incredible level of dedication, passion, enthusiasm and expertise to the table.",
    name: "Pinky Agarwal",
    designation: "Head Internal Audit | Emami Limited",
    initials: "PA",
    avatarBg: "#2D1B69" // dark purple
  },
  {
    quote: "The CIA Challenge Exam Crash Course, offered and delivered by faculty member Arpit Garg, played a key role in helping me clear the CIA Challenge Exam on my first attempt after just 2 months of preparation. The crash course sessions, held over weekends, were well-planned, thorough, and provided attendees with opportunities.",
    name: "Akshdeep Singh",
    designation: "Manager | KPMG",
    initials: "AS",
    avatarBg: "#0F172A" // dark slate
  },
  {
    quote: "Attended the 'CIA Challenge Exam' crash course conducted by Mr. Arpit, and it was truly an outstanding learning experience. The sessions were thoughtfully structured, covering the entire syllabus with a perfect balance of depth and clarity. The interactive approach ensured key topics were highlighted.",
    name: "Starwin PJ",
    designation: "AVP | Wells Fargo",
    initials: "SP",
    avatarBg: "#B48B31" // gold/mustard
  }
];