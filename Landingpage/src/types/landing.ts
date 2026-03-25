import { LucideIcon } from 'lucide-react';

export interface NavLink {
  name: string;
  href: string;
}

export interface NavigationData {
  brandName: string;
  navLinks: NavLink[];
}

export interface HeroData {
  badge: string;
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  description: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface FeatureCard {
  icon: string; // Icon name from lucide
  label: string;
  color: string;
}

export interface CrisisData {
  title: string;
  description: string;
  issues: string[];
  statusBadge: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessData {
  title: string;
  description: string;
  steps: ProcessStep[];
}

export interface BetaData {
  title: string;
  description: string;
  waitlistPrompt: string;
  benefits: string[];
  cta: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqData {
  title: string;
  faqs: FaqItem[];
}

export interface NewsArticle {
  date: string;
  title: string;
  category: string;
}

export interface NewsData {
  title: string;
  subtitle: string;
  cta: string;
  articles: NewsArticle[];
}

export interface ContactData {
  title: string;
  description: string;
  email: string;
  form: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    submit: string;
  };
}

export interface FooterData {
  brand: string;
  links: NavLink[];
  copyright: string;
}

export interface LandingPageData {
  navigation: NavigationData;
  hero: HeroData;
  featureCards: FeatureCard[];
  crisis: CrisisData;
  process: ProcessData;
  beta: BetaData;
  faq: FaqData;
  news: NewsData;
  contact: ContactData;
  footer: FooterData;
}
