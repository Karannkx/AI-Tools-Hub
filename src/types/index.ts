export interface AITool {
  id: string;
  name: string;
  slug: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Free Trial';
  description: string;
  longDescription?: string;
  logoUrl: string;
  websiteUrl: string;
  features?: string[];
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
  description: string;
}

export interface FilterState {
  search: string;
  category: string;
  pricing: string;
  sortBy: 'name' | 'rating' | 'newest';
}

export interface CuratedCollection {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaDescription: string;
  toolIds: string[];
}
