'use client';

import Link from 'next/link';
import { ExternalLink, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolLogo } from '@/components/tool-logo';
import { AITool } from '@/types';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const getPricingVariant = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'success';
      case 'freemium':
        return 'info';
      case 'paid':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Link href={`/tools/${tool.slug}`} prefetch={false} className="group block">
      <Card className="h-full overflow-hidden hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
              <ToolLogo logoUrl={tool.logoUrl} name={tool.name} size={56} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{tool.category}</p>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{tool.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <Badge variant={getPricingVariant(tool.pricing)}>{tool.pricing}</Badge>
            {tool.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{tool.rating}</span>
                {tool.reviewCount && (
                  <span className="text-muted-foreground text-xs">
                    ({tool.reviewCount.toLocaleString()})
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}