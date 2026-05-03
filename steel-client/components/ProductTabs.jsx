'use client';

import React, { useState, Suspense } from 'react';
import ProductCard from './ProductCard';
import ScrapForm from './ScrapForm';
import FilterBar from './FilterBar';

export default function ProductTabs({ initialProducts, filteredProducts, totalCount }) {
  const [activeTab, setActiveTab] = useState('steel');

  // We use filteredProducts for the display, but we need to split them by category
  // unless we want the filter bar to only affect the active tab's domain.
  // Given the user's feedback, the FilterBar should definitely be in the Steel tab.
  const steelProducts = (filteredProducts || initialProducts).filter(p => p.category !== 'Wires & Cables');
  const wireProducts = (filteredProducts || initialProducts).filter(p => p.category === 'Wires & Cables');

  const tabs = [
    { id: 'steel', label: 'Steel Products', icon: '🏗️' },
    { id: 'wires', label: 'Wires & Cables', icon: '🔌' },
    { id: 'scrap', label: 'Sell Scrap', icon: '♻️' },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-2 md:gap-4 mb-10 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0
              ${activeTab === tab.id 
                ? 'bg-[#007f5f] text-white shadow-lg shadow-emerald-900/20 scale-105' 
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-[#007f5f]/50'}
            `}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500">
        {activeTab === 'steel' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Re-inserting the Filter Bar for Steel Products */}
            <div className="mb-8">
              <Suspense fallback={<div className="h-20 bg-slate-100 animate-pulse rounded-xl" />}>
                <FilterBar totalCount={totalCount} filteredCount={filteredProducts?.length || 0} />
              </Suspense>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steelProducts.length > 0 ? (
                steelProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">No steel products found</h3>
                  <p className="text-slate-500">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'wires' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wireProducts.length > 0 ? (
                wireProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
                  <p className="text-slate-500">No wires & cables found matching your selection.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'scrap' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ScrapForm />
          </div>
        )}
      </div>
    </div>
  );
}
