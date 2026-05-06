'use client';

import React, { useState, Suspense } from 'react';
import ProductCard from './ProductCard';
import ScrapForm from './ScrapForm';
import FilterBar from './FilterBar';

export default function ProductTabs({ initialProducts, filteredProducts, totalCount }) {
  const [activeTab, setActiveTab] = useState('steel');

  const [visibleSteel, setVisibleSteel] = useState(24);
  const [visibleWires, setVisibleWires] = useState(24);

  // Filter steel products based on active filters, but ignore filters for Wires & Cables tab
  const steelProducts = (filteredProducts || initialProducts).filter(p => p.category !== 'Wires and Cables' && p.category !== 'Sheets/Plates');
  const wireProducts = initialProducts.filter(p => p.category === 'Wires and Cables');

  const displayedSteel = steelProducts.slice(0, visibleSteel);
  const displayedWires = wireProducts.slice(0, visibleWires);

  const tabs = [
    { id: 'steel', label: 'Steel Products', icon: '🏗️' },
    { id: 'wires', label: 'Wires & Cables', icon: '🔌' },
    { id: 'scrap', label: 'Sell Scrap', icon: '♻️' },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="grid grid-cols-3 md:flex md:flex-row md:flex-wrap md:justify-center gap-2 md:gap-4 mb-10 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-1 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full font-bold transition-all duration-300
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
        {activeTab === 'steel' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Re-inserting the Filter Bar for Steel Products */}
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">No steel products found</h3>
                  <p className="text-slate-500">Try adjusting your filters.</p>
                </div>
              )}
            </div>

            {visibleSteel < steelProducts.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setVisibleSteel(prev => prev + 24)}
                  className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-[#007f5f] hover:bg-[#007f5f] hover:text-white transition-all duration-300"
                >
                  Load More Steel Products ({steelProducts.length - visibleSteel} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wires' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedWires.length > 0 ? (
                displayedWires.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
                  <p className="text-slate-500">No wires & cables found matching your selection.</p>
                </div>
              )}
            </div>

            {visibleWires < wireProducts.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setVisibleWires(prev => prev + 24)}
                  className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-[#007f5f] hover:bg-[#007f5f] hover:text-white transition-all duration-300"
                >
                  Load More Wires ({wireProducts.length - visibleWires} remaining)
                </button>
              </div>
            )}
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
