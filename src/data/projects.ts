export type ProjectCategory = 'civic' | 'web'

export interface ProjectMedia {
  src: string
  alt: string
  caption: string
  fit?: 'cover' | 'contain'
}

export interface ProjectItem {
  id: string
  shortLabel: string
  title: string
  category: ProjectCategory
  categoryLabel: string
  featured?: boolean
  tags: string[]
  image: string
  alt: string
  description: string
  gallery?: ProjectMedia[]
  /** Drop in your live demo or GitHub URLs whenever ready */
  liveUrl?: string
  repoUrl?: string
}

export const projects: ProjectItem[] = [
  {
    id: 'barangay-health-monitor',
    shortLabel: 'Barangay Health',
    title: 'Barangay Health Monitor & Smart Kiosk',
    category: 'civic',
    categoryLabel: 'Defended Capstone · IoT + Web',
    featured: true,
    tags: ['IoT Hardware', 'Web System', 'Vitals & BMI', 'CPSC & RHU Mahinog'],
    image: '/assets/barangay-health-monitor.jpg',
    alt: 'Screenshot of the Barangay Health Monitor dual-role citizen and health worker portal',
    description:
      'Completed and defended IoT + web capstone system built for Camiguin Polytechnic State College and the Rural Health Unit of Mahinog. Combines a standalone vital-signs & BMI kiosk (touchscreen, blood pressure cuff, height sensor, and weight scale) with a dual-role web portal for residents and Barangay Health Workers.',
    gallery: [
      {
        src: '/assets/barangay-health-monitor.jpg',
        alt: 'Barangay Health Monitor citizen and health worker web portal sign-in screen',
        caption: 'Web System — Dual-role portal for Citizens and Barangay Health Workers',
        fit: 'contain',
      },
      {
        src: '/assets/capstone/kiosk-rhu-1.jpg',
        alt: 'Built Smart Barangay Health Monitoring Kiosk deployed at the Rural Health Unit with touchscreen, BP cuff, and weight scale',
        caption: 'IoT Prototype — Deployed at RHU Mahinog with touchscreen, BP cuff, and weight platform',
        fit: 'contain',
      },
      {
        src: '/assets/capstone/kiosk-rhu-2.jpg',
        alt: 'Full view of the Smart Barangay Health Monitoring Kiosk showing overhead height sensor, RHU Mahinog seal, and QR code',
        caption: 'Full Hardware Unit — Overhead height sensor, QR web portal access, and clinic seals',
        fit: 'contain',
      },
      {
        src: '/assets/capstone/kiosk-blueprint.png',
        alt: 'Front elevation design blueprint of the Smart Barangay Health Monitoring Kiosk hardware prototype',
        caption: 'Hardware Design — Front elevation schematic showing display, height arm, BP cuff, and scale base',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'clinicsync',
    shortLabel: 'ClinicSync',
    title: 'ClinicSync — Outpatient Clinic',
    category: 'civic',
    categoryLabel: 'Campus Healthcare',
    tags: ['Web System', 'Queue & Triage', 'EMR'],
    image: '/assets/clinicsync.jpg',
    alt: 'Screenshot of ClinicSync outpatient clinic management portal for CPSC',
    description:
      'Outpatient clinic management system for Camiguin Polytechnic State College coordinating scheduled appointments, live walk-in triage queues, physician consultations, e-prescriptions, and medical records.',
  },
  {
    id: 'payroll-management',
    shortLabel: 'LGU Payroll',
    title: 'Payroll Management System',
    category: 'civic',
    categoryLabel: 'LGU-Mahinog',
    tags: ['CodeIgniter', 'PHP', 'MySQL'],
    image: '/assets/payroll-management.jpg',
    alt: 'Screenshot of the Municipality of Mahinog Payroll Management System',
    description:
      'Centralized municipal payroll platform for LGU-Mahinog featuring office-based filtering, instant payslip generation, role-based access, and activity audit logging.',
  },
  {
    id: 'camiguin-tourism',
    shortLabel: 'Camiguin Map',
    title: 'Camiguin Tourism',
    category: 'web',
    categoryLabel: 'Interactive Map',
    tags: ['Next.js', 'React', 'Leaflet', 'Tailwind CSS'],
    image: '/assets/camiguin-tourism.webp',
    alt: 'Screenshot of the Camiguin Tourism interactive map website',
    description:
      'A tourism guide that plots Camiguin destinations on an interactive Leaflet map with guided navigation.',
  },
  {
    id: 'pacudan-bakeshop',
    shortLabel: 'Pacudan Bakeshop',
    title: "Pacudan's Bakeshop & Coffee",
    category: 'web',
    categoryLabel: 'Local Storefront',
    tags: ['E-Commerce', 'HTML', 'CSS', 'JavaScript'],
    image: '/assets/pacudan-bakeshop.jpg',
    alt: "Screenshot of the redesigned Pacudan's Bakeshop & Coffee storefront in Mambajao, Camiguin",
    description:
      'An online bakery and coffee storefront in Mambajao, Camiguin where customers browse freshly baked cakes, pastries, and espresso drinks and place orders for local delivery.',
  },
  {
    id: 'voting-system',
    shortLabel: 'Voting System',
    title: 'Voting System',
    category: 'web',
    categoryLabel: 'Campus Elections',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS'],
    image: '/assets/voting-system.webp',
    alt: 'Screenshot of the PHP and MySQL Voting System interface',
    description:
      'A browser-based voting system built on PHP and MySQL for casting ballots and tallying results.',
  },
]
