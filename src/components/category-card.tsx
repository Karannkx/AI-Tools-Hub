import Link from 'next/link';
import {
  MessageSquare,
  Image as ImageIcon,
  Code,
  FileText,
  Zap,
  Mic,
  Video,
  Palette,
  Search,
  BarChart,
  ImagePlus,
  Settings,
  TrendingUp,
  Headphones,
  Terminal,
  Music,
  Presentation,
  Globe,
  ShoppingCart,
  LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Image: ImageIcon,
  Code,
  FileText,
  Zap,
  Mic,
  Video,
  Palette,
  Search,
  BarChart,
  ImagePlus,
  Settings,
  TrendingUp,
  Headphones,
  Terminal,
  Music,
  Presentation,
  Globe,
  ShoppingCart,
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Zap;

  return (
    <Link href={`/tools?category=${category.slug}`} className="group block">
      <Card className="h-full hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground">{category.count} tools</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
