export type Vertical = "education" | "banking" | "office" | "business" | "events";

export interface ProductCard {
  id: Vertical;
  name: string;
  tagline: string;
  description: string;
  color: string;
  darkColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  url: string;
  features: string[];
}

export interface PricingTier {
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface ContactFormData {
  organisation_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  industry_hint: string;
  size_hint: string;
  source: string;
  use_case: string;
}

export type Theme = "light" | "dark" | "system";