'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCategories, getSubCategories, getTypes, getDimensions } from '@/lib/products';

const SELECT_CLS =
  'bg-[#1e3a5f] text-white border border-[#2d5a8e] rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#3b82f6] appearance-none cursor-pointer';

export default function FilterBar({ totalCount, filteredCount }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = getCategories();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sub, setSub] = useState(searchParams.get('sub') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [dimension, setDimension] = useState(searchParams.get('dimension') || '');

  const subCategories = category ? getSubCategories(category) : [];
  const types = category && sub ? getTypes(category, sub) : [];
  const dimensions = category && sub && type ? getDimensions(category, sub, type) : [];

  // Sync URL params whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (sub) params.set('sub', sub);
    if (type) params.set('type', type);
    if (dimension) params.set('dimension', dimension);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [category, sub, type, dimension, pathname, router]);

  function handleCategory(val) {
    setCategory(val);
    setSub('');
    setType('');
    setDimension('');
  }

  function handleSub(val) {
    setSub(val);
    setType('');
    setDimension('');
  }

  function handleType(val) {
    setType(val);
    setDimension('');
  }

  function handleClear() {
    setCategory('');
    setSub('');
    setType('');
    setDimension('');
  }

  return (
    <div className="bg-[#0f172a] border-b border-[#1e3a5f] py-4 px-4 md:px-8 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 items-end">
          {/* Category */}
          <div className="flex flex-col gap-1 min-w-[160px] flex-1">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Category</label>
            <div className="relative">
              <select className={SELECT_CLS} value={category} onChange={(e) => handleCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</span>
            </div>
          </div>

          {/* Sub-Category */}
          <div className="flex flex-col gap-1 min-w-[160px] flex-1">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Sub-Category</label>
            <div className="relative">
              <select
                className={SELECT_CLS}
                value={sub}
                onChange={(e) => handleSub(e.target.value)}
                disabled={!category}
              >
                <option value="">All Sub-Categories</option>
                {subCategories.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</span>
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1 min-w-[140px] flex-1">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Type</label>
            <div className="relative">
              <select
                className={SELECT_CLS}
                value={type}
                onChange={(e) => handleType(e.target.value)}
                disabled={!sub}
              >
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</span>
            </div>
          </div>

          {/* Dimension */}
          <div className="flex flex-col gap-1 min-w-[140px] flex-1">
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide">Dimension</label>
            <div className="relative">
              <select
                className={SELECT_CLS}
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                disabled={!type}
              >
                <option value="">All Dimensions</option>
                {dimensions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</span>
            </div>
          </div>

          {/* Clear + Count */}
          <div className="flex flex-col gap-1 items-start">
            <label className="text-xs text-transparent font-medium uppercase tracking-wide select-none">-</label>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm bg-[#1e3a5f] hover:bg-[#2d5a8e] text-white rounded-md border border-[#2d5a8e] transition-colors whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Count */}
        <div className="mt-3 text-sm text-slate-400">
          Showing <span className="text-white font-semibold">{filteredCount}</span> of {totalCount} products
        </div>
      </div>
    </div>
  );
}
