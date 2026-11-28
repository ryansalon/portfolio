export type ProjectCategory = 'civic' | 'web'

export interface ProjectMedia {
  src: string
  alt: string
  caption: string
  thumbLabel?: string
}

export interface ProjectItem {
  id: string
  title: string
  category: ProjectCategory
  categoryLabel: string
  featured?: boolean
  role: string
  tags: string[]
  image: string
  alt: string
  description: string
  highlights: string[]
  deploymentNote: string
  gallery?: ProjectMedia[]
  /** Drop in your live demo or GitHub URLs whenever ready */
  liveUrl?: string
  repoUrl?: string
}

export const projects: ProjectItem[] = [
  {
    id: 'barangay-health-monitor',
    title: 'Barangay Health Monitor & Smart Kiosk',
    category: 'civic',
    categoryLabel: 'Defended Capstone · IoT + Web',
    featured: true,
    role: 'Web Developer · BSIT Capstone Team',
    tags: ['IoT Hardware', 'Web System', 'Vitals & BMI', 'CPSC & RHU Mahinog'],
    image: '/assets/barangay-health-monitor.jpg',
    alt: 'Screenshot of the Barangay Health Monitor dual-role citizen and health worker portal',
    description:
      'Completed and defended IoT + web capstone system built for Camiguin Polytechnic State College and the Rural Health Unit of Mahinog. Combines a standalone vital-signs & BMI kiosk with a dual-role web portal for residents and Barangay Health Workers.',
    highlights: [
      'Standalone physical kiosk combining a touchscreen interface, blood pressure cuff, overhead height sensor, and weight scale for automated BMI computation.',
      'Dual-role web portal separating resident health tracking from Barangay Health Worker intake and monitoring tools.',
      'Built and physically deployed on-site at the Rural Health Unit of Mahinog with QR code portal access.',
    ],
    deploymentNote:
      'Defended BSIT capstone system built for CPSC & RHU Mahinog — live walkthrough available upon request.',
    gallery: [
      {
        src: '/assets/barangay-health-monitor.jpg',
        alt: 'Barangay Health Monitor citizen and health worker web portal sign-in screen',
        caption: 'Web System — Dual-role portal for Citizens and Barangay Health Workers',
        thumbLabel: 'Web Portal',
      },
      {
        src: '/assets/capstone/kiosk-rhu-1.jpg',
        alt: 'Built Smart Barangay Health Monitoring Kiosk deployed at the Rural Health Unit with touchscreen, BP cuff, and weight scale',
        caption: 'IoT Prototype — Deployed at RHU Mahinog with touchscreen, BP cuff, and weight platform',
        thumbLabel: 'Prototype 1',
      },
      {
        src: '/assets/capstone/kiosk-rhu-2.jpg',
        alt: 'Full view of the Smart Barangay Health Monitoring Kiosk showing overhead height sensor, RHU Mahinog seal, and QR code',
        caption: 'Full Hardware Unit — Overhead height sensor, QR web portal access, and clinic seals',
        thumbLabel: 'Prototype 2',
      },
      {
        src: '/assets/capstone/kiosk-blueprint.png',
        alt: 'Front elevation design blueprint of the Smart Barangay Health Monitoring Kiosk hardware prototype',
        caption: 'Hardware Design — Front elevation schematic showing display, height arm, BP cuff, and scale base',
        thumbLabel: 'Blueprint',
      },
    ],
  },
  {
    id: 'clinicsync',
    title: 'ClinicSync — Outpatient Clinic',
    category: 'civic',
    categoryLabel: 'Campus Healthcare',
    role: 'Web Developer',
    tags: ['Web System', 'Queue & Triage', 'EMR'],
    image: '/assets/clinicsync.jpg',
    alt: 'Screenshot of ClinicSync outpatient clinic management portal for CPSC',
    description:
      'Outpatient clinic management system for Camiguin Polytechnic State College coordinating scheduled appointments, live walk-in triage queues, physician consultations, e-prescriptions, and medical records.',
    highlights: [
      'Handles both pre-scheduled student/staff appointments and live walk-in triage queues from one desk view.',
      'Tracks physician consultations, e-prescriptions, and electronic medical records (EMR) across visits.',
    ],
    deploymentNote:
      'Campus clinic web application built for CPSC — walkthrough and screenshots available upon request.',
  },
  {
    id: 'payroll-management',
    title: 'Payroll Management System',
    category: 'civic',
    categoryLabel: 'LGU-Mahinog',
    role: 'Web Developer',
    tags: ['CodeIgniter', 'PHP', 'MySQL'],
    image: '/assets/payroll-management.jpg',
    alt: 'Screenshot of the Municipality of Mahinog Payroll Management System',
    description:
      'Centralized municipal payroll platform for LGU-Mahinog featuring office-based filtering, instant payslip generation, role-based access, and activity audit logging.',
    highlights: [
      'Office-based employee filtering and automated payslip generation structured around municipal workflows.',
      'Role-based access controls and activity audit logging to maintain accountability on payroll records.',
    ],
    deploymentNote:
      'Internal municipal platform for LGU-Mahinog — private repository; architecture walkthrough available upon request.',
  },
  {
    id: 'camiguin-tourism',
    title: 'Camiguin Tourism',
    category: 'web',
    categoryLabel: 'Interactive Map',
    role: 'Web Developer',
    tags: ['Next.js', 'React', 'Leaflet', 'Tailwind CSS'],
    image: '/assets/camiguin-tourism.webp',
    alt: 'Screenshot of the Camiguin Tourism interactive map website',
    description:
      'An interactive island tourism guide that plots Camiguin destinations on a Leaflet map with guided navigation from key entry points.',
    highlights: [
      'Interactive React-Leaflet map plotting major Camiguin tourist spots with guided route navigation.',
      'Responsive Next.js + Tailwind CSS layout designed for travelers exploring the island on mobile or desktop.',
    ],
    deploymentNote: 'Personal web project — source walkthrough and demo available upon request.',
  },
  {
    id: 'pacudan-bakeshop',
    title: "Pacudan's Bakeshop & Coffee",
    category: 'web',
    categoryLabel: 'Local Storefront',
    role: 'Web Developer',
    tags: ['E-Commerce', 'HTML', 'CSS', 'JavaScript'],
    image: '/assets/pacudan-bakeshop.jpg',
    alt: "Screenshot of the redesigned Pacudan's Bakeshop & Coffee storefront in Mambajao, Camiguin",
    description:
      'An online bakery and coffee storefront in Mambajao, Camiguin where customers browse freshly baked cakes, pastries, and espresso drinks and place orders for local delivery.',
    highlights: [
      'Structured product catalog separating cakes, pastries, and espresso drinks for quick mobile ordering.',
      'Lightweight vanilla HTML, CSS, and JavaScript storefront tailored for a local Mambajao business.',
    ],
    deploymentNote: 'Local business storefront project — live walkthrough available upon request.',
  },
  {
    id: 'voting-system',
    title: 'Voting System',
    category: 'web',
    categoryLabel: 'Campus Elections',
    role: 'Web Developer',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS'],
    image: '/assets/voting-system.webp',
    alt: 'Screenshot of the PHP and MySQL Voting System interface',
    description:
      'A browser-based voting system built on PHP and MySQL for casting ballots and tallying campus election results cleanly.',
    highlights: [
      'Structured ballot casting flow backed by relational MySQL tables to prevent duplicate votes.',
      'Automated result tallying view for administrators to review election counts immediately.',
    ],
    deploymentNote: 'Academic PHP & MySQL system — code walkthrough available upon request.',
  },
]
