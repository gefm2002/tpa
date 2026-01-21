export type EventStatus = "upcoming" | "past" | "cancelled";
export type EventType = "nocturna" | "diurna" | "escapada" | "especial";

export interface EventImage {
  id: string;
  dataUrl: string;
  alt: string;
  order: number;
  isCover: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  status: EventStatus;
  type: EventType;
  isFree: boolean;
  price: number | null;
  currency: "ARS";
  date: string;
  time: string;
  endTime?: string;
  meetupNote: string;
  locationName: string;
  address: string;
  city: string;
  zone?: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  capacity?: number;
  ageMin?: number;
  dressCode?: string;
  includes?: string[];
  agenda?: string[];
  ctaLabel?: string;
  waMessage?: string;
  images: EventImage[];
  isActive: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface RecapPost {
  id: string;
  title: string;
  date: string;
  description: string;
  images: EventImage[];
  isActive: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  isActive: boolean;
  order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  order: number;
}

export interface Settings {
  communityName: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  instagramUrl: string;
  zonesText: string;
  ageRuleText: string;
  mentionText: string;
}

export interface Snapshot {
  events: EventItem[];
  recaps: RecapPost[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
  settings: Settings;
}
