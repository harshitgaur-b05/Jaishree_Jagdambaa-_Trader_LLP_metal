'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSingleProductWALink } from '@/lib/whatsapp';
import { useEnquiryCart } from '@/components/EnquiryCart';

function ProductInitials({ name }) {
  const words = name.trim().split(/\s+/);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#0f172a]">
      <span className="text-4xl font-bold text-slate-300 tracking-widest">{initials}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const { addToCart, isInCart } = useEnquiryCart();
  const waLink = getSingleProductWALink(product);
  const inCart = isInCart(product.id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col group">
      {/* Image */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <ProductInitials name={product.name} />
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-[#0f172a] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-bold text-slate-900 text-base leading-tight">{product.name}</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {product.dimension} · {product.type}
          </p>
        </div>

        {product.priceRange && (
          <div className="bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
            <span className="text-xs text-slate-400 block leading-none mb-0.5">Price Range</span>
            <span className="text-sm font-semibold text-[#0f172a]">{product.priceRange}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => addToCart(product)}
            className={`w-full text-sm font-medium py-2 rounded-lg border transition-colors duration-150 ${
              inCart
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 cursor-default'
                : 'bg-[#0f172a] hover:bg-[#1e3a5f] text-white border-transparent'
            }`}
            disabled={inCart}
          >
            {inCart ? '✓ Added to Enquiry' : 'Add to Enquiry'}
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-sm font-medium py-2 rounded-lg border border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-center transition-colors duration-150"
          >
            <span className="mr-1">💬</span> WhatsApp
          </a>
        </div>

        {/* View detail link */}
        <Link
          href={`/products/${product.slug}`}
          className="text-xs text-[#3b82f6] hover:underline text-center"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
