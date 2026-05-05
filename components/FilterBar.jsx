'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCategories, getSubCategories, getTypes, getDimensions } from '@/lib/products';

/* ─── shared select style ─── */
const SELECT_CLS =
  'bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-slate-100 ' +
  'border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 pr-9 ' +
  'text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 ' +
  'appearance-none cursor-pointer hover:border-emerald-500/50 ' +
  'transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ' +
  'dark:disabled:bg-[#111]';

function SelectWrapper({ label, value, onChange, disabled, children }) {
  return (
    <div className="flex flex-col gap-1 min-w-[150px] flex-1">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {label}
      </label>
      <div className="relative">
        <select
          className={SELECT_CLS}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}

export default function FilterBar({ totalCount, filteredCount }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  /* ── read initial state from URL ── */
  const [category,  setCategory]  = useState(searchParams.get('category')  || '');
  const [sub,       setSub]       = useState(searchParams.get('sub')        || '');
  const [type,      setType]      = useState(searchParams.get('type')       || '');
  const [dimension, setDimension] = useState(searchParams.get('dimension')  || '');

  /* ── derive cascaded options from the real data ── */
  const categories   = getCategories();
  const subCategories = category               ? getSubCategories(category)       : [];
  const types         = category && sub        ? getTypes(category, sub)          : [];
  const dimensions    = category && sub && type ? getDimensions(category, sub, type) : [];

  /* ── push URL whenever filters change ── */
  const pushURL = useCallback(
    (cat, s, t, dim) => {
      const params = new URLSearchParams();
      if (cat) params.set('category',  cat);
      if (s)   params.set('sub',       s);
      if (t)   params.set('type',      t);
      if (dim) params.set('dimension', dim);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    pushURL(category, sub, type, dimension);
  }, [category, sub, type, dimension, pushURL]);

  /* ── cascading handlers (each resets downstream) ── */
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

  const isFiltered = !!(category || sub || type || dimension);

  return (
    <div className="bg-white dark:bg-[#141414] border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-black/30 px-5 py-5 transition-colors duration-300">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Filter Products
          </h3>
          {isFiltered && (
            <span className="ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">{filteredCount}</span>
            {' '}/ {totalCount} products
          </span>
          {isFiltered && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg
                         bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400
                         border border-red-200 dark:border-red-800/40
                         hover:bg-red-100 dark:hover:bg-red-900/40
                         transition-all duration-200"
            >
              <span>✕</span> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Active breadcrumb trail */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-4 border-b border-slate-100 dark:border-white/5">
          {[
            { label: category,  color: 'blue' },
            { label: sub,       color: 'violet' },
            { label: type,      color: 'emerald' },
            { label: dimension, color: 'amber' },
          ]
            .filter((item) => item.label)
            .map((item, i) => (
              <span
                key={i}
                className={`
                  px-2.5 py-1 rounded-lg text-xs font-semibold border
                  ${item.color === 'blue'    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/30' : ''}
                  ${item.color === 'violet'  ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/30' : ''}
                  ${item.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/30' : ''}
                  ${item.color === 'amber'   ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/30' : ''}
                `}
              >
                {item.label}
              </span>
            ))}
        </div>
      )}

      {/* Filter dropdowns — 4 levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Level 1 — Category */}
        <SelectWrapper
          label="Category"
          value={category}
          onChange={handleCategory}
          disabled={false}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </SelectWrapper>

        {/* Level 2 — Sub-Category */}
        <SelectWrapper
          label="Sub-Category"
          value={sub}
          onChange={handleSub}
          disabled={!category}
        >
          <option value="">All Sub-Categories</option>
          {subCategories.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </SelectWrapper>

        {/* Level 3 — Type */}
        <SelectWrapper
          label="Type"
          value={type}
          onChange={handleType}
          disabled={!sub}
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </SelectWrapper>

        {/* Level 4 — Dimension */}
        <SelectWrapper
          label="Dimension / Size"
          value={dimension}
          onChange={(val) => setDimension(val)}
          disabled={!type}
        >
          <option value="">All Dimensions</option>
          {dimensions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </SelectWrapper>
      </div>

      {/* Quick-pick category chips */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
          Quick Pick
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategory(category === c ? '' : c)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${category === c
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400'}
              `}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
