'use client';

import { useState } from 'react';

export default function ProductImage({ product }) {
  const [imgError, setImgError] = useState(false);

  const initials = product.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <div className="relative w-full aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#121212] flex items-center justify-center border border-slate-200 dark:border-white/5 transition-colors duration-300">
      {!imgError ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-90"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-bold text-[#10b981] tracking-widest opacity-50">{initials}</span>
        </div>
      )}
    </div>
  );
}
