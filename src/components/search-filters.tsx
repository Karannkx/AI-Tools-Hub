'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { getAllCategories, pricingOptions, sortOptions } from '@/lib/data';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedPricing: string;
  onPricingChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPricing,
  onPricingChange,
  sortBy,
  onSortChange,
}: SearchFiltersProps) {
  const categories = getAllCategories();

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  ];

  const pricingOptionsList = pricingOptions.map((p) => ({
    value: p.toLowerCase(),
    label: p,
  }));

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search AI tools..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Select options={categoryOptions} value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} />
        <Select options={pricingOptionsList} value={selectedPricing} onChange={(e) => onPricingChange(e.target.value)} />
        <Select options={sortOptions} value={sortBy} onChange={(e) => onSortChange(e.target.value)} />
      </div>
    </div>
  );
}
