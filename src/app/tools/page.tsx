export const dynamic = "force-dynamic";
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToolCard } from '@/components/tool-card';
import { SearchFilters } from '@/components/search-filters';
import { getAllTools, filterTools, sortTools, searchTools } from '@/lib/data';
import { AITool } from '@/types';

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialPricing = searchParams.get('pricing') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPricing, setSelectedPricing] = useState(initialPricing);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'newest'>('rating');

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSelectedPricing(searchParams.get('pricing') || 'all');
  }, [searchParams]);

  const allTools = getAllTools();

  const filteredTools = useMemo(() => {
    let tools: AITool[] = allTools;

    if (searchQuery) {
      tools = searchTools(searchQuery);
    }

    tools = filterTools(tools, {
      category: selectedCategory,
      pricing: selectedPricing,
    });

    tools = sortTools(tools, sortBy);

    return tools;
  }, [allTools, searchQuery, selectedCategory, selectedPricing, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">All AI Tools</h1>
        <p className="mt-2 text-muted-foreground">
          Discover {allTools.length}+ AI tools to supercharge your workflow
        </p>
      </div>

      <div className="mb-8">
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPricing={selectedPricing}
          onPricingChange={setSelectedPricing}
          sortBy={sortBy}
          onSortChange={(value) => setSortBy(value as 'name' | 'rating' | 'newest')}
        />
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredTools.length} tools
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No tools found matching your criteria.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
