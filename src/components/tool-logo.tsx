'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ToolLogoProps {
  logoUrl?: string;
  name: string;
  size?: number;
}

export function ToolLogo({ logoUrl, name, size = 40 }: ToolLogoProps) {
  const [imageError, setImageError] = useState(false);

  const fallback = (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg font-bold text-primary"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );

  // Show fallback immediately if no URL
  if (!logoUrl || imageError) {
    return fallback;
  }

  return (
    <div style={{ width: size, height: size }} className="relative">
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        fill
        className="object-contain"
        onError={() => setImageError(true)}
        loading="lazy"
        unoptimized
        sizes={`${size}px`}
      />
    </div>
  );
}