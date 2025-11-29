import toolsData from '../../data/aitools.json';
import { AITool, Category, CuratedCollection } from '@/types';

// Cache the data to avoid repeated JSON parsing
let cachedTools: AITool[] | null = null;
let cachedCategories: Category[] | null = null;
let cachedCollections: CuratedCollection[] | null = null;

export function getAllTools(): AITool[] {
  if (!cachedTools) {
    cachedTools = toolsData.tools as AITool[];
  }
  return cachedTools;
}

export function getToolBySlug(slug: string): AITool | undefined {
  return toolsData.tools.find((tool) => tool.slug === slug) as AITool | undefined;
}

export function getToolById(id: string): AITool | undefined {
  return toolsData.tools.find((tool) => tool.id === id) as AITool | undefined;
}

export function getToolsByCategory(category: string): AITool[] {
  return toolsData.tools.filter(
    (tool) => tool.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  ) as AITool[];
}

export function getToolsByPricing(pricing: string): AITool[] {
  return toolsData.tools.filter(
    (tool) => tool.pricing.toLowerCase() === pricing.toLowerCase()
  ) as AITool[];
}

export function getAllCategories(): Category[] {
  if (!cachedCategories) {
    cachedCategories = toolsData.categories as Category[];
  }
  return cachedCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return toolsData.categories.find((cat) => cat.slug === slug) as Category | undefined;
}

export function getAllCollections(): CuratedCollection[] {
  if (!cachedCollections) {
    cachedCollections = toolsData.collections as CuratedCollection[];
  }
  return cachedCollections;
}

export function getCollectionBySlug(slug: string): CuratedCollection | undefined {
  return toolsData.collections.find((col) => col.slug === slug) as CuratedCollection | undefined;
}

export function getToolsForCollection(collectionSlug: string): AITool[] {
  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) return [];
  return collection.toolIds
    .map((id) => getToolById(id))
    .filter((tool): tool is AITool => tool !== undefined);
}

export function searchTools(query: string): AITool[] {
  const lowercaseQuery = query.toLowerCase();
  return toolsData.tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.category.toLowerCase().includes(lowercaseQuery) ||
      tool.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  ) as AITool[];
}

export function filterTools(
  tools: AITool[],
  filters: { category?: string; pricing?: string }
): AITool[] {
  return tools.filter((tool) => {
    if (
      filters.category &&
      filters.category !== 'all' &&
      tool.category.toLowerCase().replace(/\s+/g, '-') !== filters.category.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.pricing &&
      filters.pricing !== 'all' &&
      tool.pricing.toLowerCase() !== filters.pricing.toLowerCase()
    ) {
      return false;
    }
    return true;
  });
}

export function sortTools(tools: AITool[], sortBy: 'name' | 'rating' | 'newest'): AITool[] {
  const sorted = [...tools];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return sorted.reverse();
    default:
      return sorted;
  }
}

export function getFeaturedTools(count: number = 8): AITool[] {
  return [...toolsData.tools]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, count) as AITool[];
}

export function getRelatedTools(tool: AITool, count: number = 4): AITool[] {
  return toolsData.tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, count) as AITool[];
}

export const pricingOptions = ['All', 'Free', 'Freemium', 'Paid', 'Free Trial'];

export const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];
