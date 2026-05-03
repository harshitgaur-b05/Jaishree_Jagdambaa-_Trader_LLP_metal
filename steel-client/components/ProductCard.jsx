'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSingleProductWALink } from '@/lib/whatsapp';
import { useEnquiryCart } from '@/components/EnquiryCart';

function ProductInitials({ name }) {
  const words = name.trim().split(/\s+/);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
      <span className="text-4xl font-bold text-[#10b981] tracking-widest opacity-50">{initials}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const { addToCart, isInCart } = useEnquiryCart();
  const waLink = getSingleProductWALink(product);
  const inCart = isInCart(product.id);

  return (
    <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-md dark:shadow-lg border border-slate-200 dark:border-white/5 overflow-hidden hover:border-[#10b981]/50 transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 bg-slate-50 dark:bg-[#121212] overflow-hidden border-b border-slate-100 dark:border-white/5 transition-colors duration-300">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            onError={() => setImgError(true)}
          />
        ) : (
          <ProductInitials name={product.name} />
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-[#10b981] text-white dark:text-[#121212] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider transition-colors duration-300">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-200 text-lg leading-tight group-hover:text-[#10b981] transition-colors">{product.name}</h3>
          <p className="text-sm text-slate-500 mt-1">
            {product.dimension} · {product.type}
          </p>
        </div>



        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-2">
          <button
            onClick={() => addToCart(product)}
            className={`w-full text-sm font-bold py-2.5 rounded-xl border transition-all duration-300 ${
              inCart
                ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981] cursor-default'
                : 'bg-slate-50 dark:bg-white/5 hover:bg-[#10b981] hover:text-white dark:hover:text-[#121212] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-transparent'
            }`}
            disabled={inCart}
          >
            {inCart ? '✓ Added to Enquiry' : 'Add to Enquiry'}
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-sm font-bold py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 text-center transition-all duration-300"
          >
            <span className="mr-1">💬</span> WhatsApp
          </a>
        </div>

        {/* View detail link */}
        <Link
          href={`/products/${product.slug}`}
          className="text-xs text-slate-500 hover:text-[#10b981] dark:hover:text-[#10b981] uppercase tracking-wider font-semibold text-center mt-1 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
