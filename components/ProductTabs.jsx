'use client';

import React, { useState, Suspense } from 'react';
import ProductCard from './ProductCard';
import ScrapForm from './ScrapForm';
import FilterBar from './FilterBar';
import WiresEnquiryForm from './WiresEnquiryForm';
import CablesEnquiryForm from './CablesEnquiryForm';
import { useTranslation } from '@/lib/i18n';

export default function ProductTabs({ initialProducts, filteredProducts, totalCount, initialTab = 'steel' }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [visibleSteel, setVisibleSteel] = useState(24);

  const steelProducts = (filteredProducts || initialProducts).filter(
    (p) => p.category !== 'Wires and Cables' && p.category !== 'Sheets/Plates'
  );
  const displayedSteel = steelProducts.slice(0, visibleSteel);

  const tabs = [
    { id: 'steel',  label: t('product_tabs.steel_products'), icon: '🏗️' },
    { id: 'wires',  label: 'Wires Enquiry',                  icon: '🔌' },
    { id: 'cables', label: 'Cables Enquiry',                 icon: '🔋' },
    { id: 'scrap',  label: 'Sell Metal Scrap',               icon: '♻️' },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap md:justify-center gap-2 md:gap-4 mb-10 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full font-bold transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-[#007f5f] text-white shadow-lg shadow-emerald-900/20 md:scale-105'
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-[#007f5f]/50'}
            `}
          >
            <span className="text-xl md:text-base mb-1 md:mb-0">{tab.icon}</span>
            <span className="text-[11px] min-[375px]:text-xs md:text-base leading-tight text-center md:whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500">

        {/* ── STEEL ── */}
        {activeTab === 'steel' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <Suspense fallback={<div className="h-20 bg-slate-100 animate-pulse rounded-xl" />}>
                <FilterBar totalCount={steelProducts.length} filteredCount={steelProducts.length} />
              </Suspense>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedSteel.length > 0 ? (
                displayedSteel.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('product_tabs.no_steel')}</h3>
                  <p className="text-slate-500">{t('product_tabs.adjust_filters')}</p>
                </div>
              )}
            </div>

            {visibleSteel < steelProducts.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleSteel((prev) => prev + 24)}
                  className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-[#007f5f] hover:bg-[#007f5f] hover:text-white transition-all duration-300"
                >
                  {t('product_tabs.load_more_steel')} ({steelProducts.length - visibleSteel} {t('product_tabs.remaining')})
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── WIRES ── */}
        {activeTab === 'wires' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Info banner */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 px-4 py-3 text-amber-800 dark:text-amber-200 text-sm text-center rounded-xl mb-8 shadow-sm">
              <span className="font-bold">Looking for wires?</span> Fill in the form below — we'll send you pricing and availability via WhatsApp instantly.
              <span className="ml-2">
                <a href="/wires" className="underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-100 font-semibold transition-colors">
                  Open full page →
                </a>
              </span>
            </div>
            <WiresEnquiryForm compact />
          </div>
        )}

        {/* ── CABLES ── */}
        {activeTab === 'cables' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Info banner */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 px-4 py-3 text-blue-800 dark:text-blue-200 text-sm text-center rounded-xl mb-8 shadow-sm">
              <span className="font-bold">19 cable types available.</span> Select your type, specify quantity, and describe your exact requirements below.
              <span className="ml-2">
                <a href="/cables" className="underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-100 font-semibold transition-colors">
                  Open full page →
                </a>
              </span>
            </div>
            <CablesEnquiryForm compact />
          </div>
        )}

        {/* ── SELL SCRAP ── */}
        {activeTab === 'scrap' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Info banner */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 px-4 py-3 text-emerald-800 dark:text-emerald-200 text-sm text-center rounded-xl mb-8 shadow-sm">
              <span className="font-bold">Get the best market rate for your metal scrap.</span> MS Steel, Copper, Aluminium and more.
              <span className="ml-2">
                <a href="/sell-scrap" className="underline underline-offset-2 hover:text-emerald-900 dark:hover:text-emerald-100 font-semibold transition-colors">
                  Open full page →
                </a>
              </span>
            </div>
            <ScrapForm />
          </div>
        )}

      </div>
    </div>
  );
}
