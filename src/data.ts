import { Project, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Genesis',
    category: 'ecommerce',
    description: 'A premium, high-speed shopping experience featuring a sleek dark-mode aesthetic, dynamic cart operations, and instant stripe-ready checkout integration.',
    image: '/src/assets/images/ecommerce_preview_1782888038444.jpg',
    tags: ['React', 'Vite', 'Tailwind v4', 'Lucide Icons'],
    price: 560,
    deliveryTime: '3 Days',
    liveUrl: '#'
  },
  {
    id: 'proj-2',
    title: 'Nova SaaS Dashboard',
    category: 'saas',
    description: 'A stunning metrics and analytics system equipped with glassmorphic cards, fluid data charts, and responsive viewport sizing.',
    image: '/src/assets/images/saas_preview_1782888056013.jpg',
    tags: ['React', 'Tailwind CSS', 'Recharts', 'Motion'],
    price: 560,
    deliveryTime: '3 Days',
    liveUrl: '#'
  },
  {
    id: 'proj-3',
    title: 'Omni Neural Landing',
    category: 'landing',
    description: 'An interactive single-page marketing landing page with gorgeous scroll-linked animations, high-contrast typography, and beautiful layout grids.',
    image: '/src/assets/images/agency_preview_1782888069781.jpg',
    tags: ['React', 'Vite', 'Motion', 'Tailwind CSS'],
    price: 560,
    deliveryTime: '3 Days',
    liveUrl: '#'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'CEO & Founder',
    company: 'Luminate Cosmetics',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    text: 'DRK2FOK built our complete online store in just 3 days for exactly $560. I was skeptical of the flat rate at first, but the quality of the React application completely blew us away. Highly professional!',
    rating: 5,
    date: 'June 15, 2026'
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    role: 'Tech Lead',
    company: 'ScribeAI Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    text: 'We needed a highly responsive marketing site and dashboard prototype. DRK2FOK designed it with perfect precision using Tailwind CSS. The motion effects are clean, and the source code is extremely structured.',
    rating: 5,
    date: 'May 28, 2026'
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Growth Lead',
    company: 'Apex Digital Corp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    text: 'Best $560 we’ve ever spent. Our previous agency quoted us $5,000 and 4 weeks. DRK2FOK leveraged AI developer frameworks to spin up our high-converting page in under 72 hours. Incredible speed.',
    rating: 5,
    date: 'April 10, 2026'
  }
];

export const FAQS = [
  {
    question: 'How can you deliver high-fidelity websites for exactly $560?',
    answer: 'By leveraging specialized AI-driven design & development workflows, DRK2FOK automates high-overhead engineering tasks (like initial boilerplate setup, responsive grids, and standard components) to focus entirely on custom feature orchestration, brand styling, and high-performance polishing.'
  },
  {
    question: 'Are there any hidden costs or recurring platform fees?',
    answer: 'None. The $560 is a flat rate for design and development of your React web application. Hosting and custom domains can be deployed to zero-cost cloud tiers (e.g., Netlify, Vercel, Cloud Run) which you own 100%.'
  },
  {
    question: 'Can I request custom integrations or special libraries?',
    answer: 'Yes! Every project includes custom components, Stripe checkout portals, form handlers, analytics, and interactive charts. We build fully functional websites tailored to your specifications.'
  },
  {
    question: 'What is the revision and delivery process?',
    answer: 'Once you submit your project parameters, we compile the specification and build it in 3 days. You get a interactive review link, and we offer 1 round of refining revisions to ensure the site matches your exact vision.'
  }
];
