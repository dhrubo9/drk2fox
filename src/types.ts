export interface Project {
  id: string;
  title: string;
  category: 'ecommerce' | 'saas' | 'landing' | 'custom';
  description: string;
  image: string;
  tags: string[];
  price: number;
  deliveryTime: string;
  liveUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  projectType: string;
  description: string;
  date: string;
  status: 'Received' | 'AI Analyzing' | 'Drafting Schema' | 'Building' | 'Review Ready';
}
