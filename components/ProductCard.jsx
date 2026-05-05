'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSingleProductWALink } from '@/lib/whatsapp';
import { useEnquiryCart } from '@/components/EnquiryCart';

import { motion, AnimatePresence } from 'framer-motion';

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
  // Support both MongoDB _id and legacy id fields
  const productId = product._id || product.id;
  // Slug: use existing slug field or fall back to _id
  const productSlug = product.slug || productId;
  // Normalise so cart functions always have a consistent `id`
  const normalised = { ...product, id: productId };
  const waLink = getSingleProductWALink(normalised);
  const inCart = isInCart(productId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-md dark:shadow-lg border border-slate-200 dark:border-white/5 overflow-hidden hover:border-[#10b981]/50 transition-colors flex flex-col group"
    >
      {/* Image */}
      <div className="relative h-48 bg-slate-50 dark:bg-[#121212] overflow-hidden border-b border-slate-100 dark:border-white/5 transition-colors duration-300">
        {!imgError ? (
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            onError={() => setImgError(true)}
          />
        ) : (
          <ProductInitials name={product.name} />
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-[#10b981] text-white dark:text-[#121212] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
          {product.category}
        </span>
        {/* Sub-Category badge */}
        {product.subCategory && (
          <span className="absolute top-3 right-3 bg-slate-900/70 dark:bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.subCategory}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-200 text-lg leading-tight group-hover:text-[#10b981] transition-colors">{product.name}</h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {product.subCategory && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30">
                {product.subCategory}
              </span>
            )}
            {product.type && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                {product.type}
              </span>
            )}
            {product.dimension && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {product.dimension}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-2">
          <motion.button
            onClick={() => addToCart(normalised)}
            whileTap={{ scale: 0.95 }}
            className={`w-full text-sm font-bold py-2.5 rounded-xl border transition-all duration-300 overflow-hidden relative ${
              inCart
                ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981] cursor-default'
                : 'bg-slate-50 dark:bg-white/5 hover:bg-[#10b981] hover:text-white dark:hover:text-[#121212] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-transparent'
            }`}
            disabled={inCart}
          >
            <AnimatePresence mode="wait">
              {inCart ? (
                <motion.div
                  key="added"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    ✓
                  </motion.span>
                  Added to Enquiry
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  Add to Enquiry
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w-full text-sm font-bold py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 text-center transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-base">💬</span> WhatsApp
          </motion.a>
        </div>

        {/* View detail link */}
        <Link
          href={`/products/${productSlug}`}
          className="text-xs text-slate-500 hover:text-[#10b981] dark:hover:text-[#10b981] uppercase tracking-wider font-semibold text-center mt-1 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}
