'use client';

import React, { useState, Suspense, useMemo, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import ScrapForm from './ScrapForm';
import FilterBar from './FilterBar';
import { useTranslation } from '@/lib/i18n';
import polycabData from '../data/polycab_wires_cables.json';

const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9.\s]/g, '') ?? '';

const formatWirePrice = (p) => {
  if (p.pricePerCoil_INR) {
    return `₹${p.pricePerCoil_INR.toLocaleString('en-IN')} / coil (${p.coilLength_mtrs}m)`;
  }
  if (p.pricePer100m_INR) {
    return `₹${p.pricePer100m_INR.toLocaleString('en-IN')} / 100m`;
  }
  return 'Price on request';
};

const getSubCategoryColor = (subCat) => {
  switch (subCat) {
    case 'House Wires': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
    case 'Flexible Cables': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
    case 'Multicore Flexible Cables': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
    default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
};

export default function ProductTabs({ initialProducts, filteredProducts, totalCount }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('steel');

  const [visibleSteel, setVisibleSteel] = useState(24);
  const [visibleWires, setVisibleWires] = useState(24);

  // Filter steel products based on active filters, but ignore filters for Wires & Cables tab
  const steelProducts = (filteredProducts || initialProducts).filter(p => p.category !== 'Wires and Cables' && p.category !== 'Sheets/Plates');
  const wireProducts = initialProducts.filter(p => p.category === 'Wires and Cables');

  // Combine initial wire products with Polycab products
  const combinedWireProducts = useMemo(() => [
    ...wireProducts,
    ...(polycabData?.products || []).map(p => ({ ...p, category: 'Wires and Cables' }))
  ], [wireProducts]);

  // Search and Filter State for Wires
  const [wireSearchQuery, setWireSearchQuery] = useState('');
  const [debouncedWireQuery, setDebouncedWireQuery] = useState('');
  const [selectedWireSubCategory, setSelectedWireSubCategory] = useState('');
  const [selectedWireType, setSelectedWireType] = useState('');
  const [selectedWireSize, setSelectedWireSize] = useState('');
  const [selectedWireCores, setSelectedWireCores] = useState('');
  const [selectedWireSort, setSelectedWireSort] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedWireQuery(wireSearchQuery), 200);
    return () => clearTimeout(timer);
  }, [wireSearchQuery]);

  // Extract unique filter options
  const wireSubCategories = useMemo(() => [...new Set(combinedWireProducts.map(p => p.subCategory).filter(Boolean))], [combinedWireProducts]);
  const wireTypes = useMemo(() => [...new Set(combinedWireProducts.map(p => p.type).filter(Boolean))], [combinedWireProducts]);
  const wireSizes = useMemo(() => [...new Set(combinedWireProducts.map(p => p.size).filter(Boolean))], [combinedWireProducts]);
  const wireCores = ['2', '3', '4'];
  const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Size: Small to Large'];

  // Filter wires based on state
  const filteredWireProducts = useMemo(() => {
    let result = combinedWireProducts;

    if (debouncedWireQuery.trim()) {
      const tokens = normalize(debouncedWireQuery).split(/\s+/).filter(Boolean);
      result = result.filter(product => {
        const blob = normalize([
          product.name,
          product.type,
          product.subCategory,
          product.description,
          product.size,
          product.unit,
          ...(product.tags ?? []),
          product.cores ? `${product.cores} core` : '',
          product.conductorConstruction ?? '',
        ].join(' '));
        return tokens.every(token => blob.includes(token));
      });
    }

    if (selectedWireSubCategory !== '') result = result.filter(p => p.subCategory === selectedWireSubCategory);
    if (selectedWireType !== '') result = result.filter(p => p.type === selectedWireType);
    if (selectedWireSize !== '') result = result.filter(p => String(p.size) === selectedWireSize);
    if (selectedWireCores !== '') result = result.filter(p => String(p.cores) === selectedWireCores);

    result = [...result];
    if (selectedWireSort === 'Price: Low to High') {
      result.sort((a, b) => (a.pricePerCoil_INR || a.pricePer100m_INR || 0) - (b.pricePerCoil_INR || b.pricePer100m_INR || 0));
    } else if (selectedWireSort === 'Price: High to Low') {
      result.sort((a, b) => (b.pricePerCoil_INR || b.pricePer100m_INR || 0) - (a.pricePerCoil_INR || a.pricePer100m_INR || 0));
    } else if (selectedWireSort === 'Size: Small to Large') {
      result.sort((a, b) => parseFloat(a.size || 0) - parseFloat(b.size || 0));
    }

    return result;
  }, [combinedWireProducts, debouncedWireQuery, selectedWireSubCategory, selectedWireType, selectedWireSize, selectedWireCores, selectedWireSort]);

  const displayedSteel = steelProducts.slice(0, visibleSteel);
  const displayedWires = filteredWireProducts.slice(0, visibleWires);

  const tabs = [
    { id: 'steel', label: t('product_tabs.steel_products'), icon: '🏗️' },
    { id: 'wires', label: t('product_tabs.wires_cables'), icon: '🔌' },
    { id: 'scrap', label: t('product_tabs.sell_scrap'), icon: '♻️' },
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('product_tabs.no_steel')}</h3>
                  <p className="text-slate-500">{t('product_tabs.adjust_filters')}</p>
                </div>
              )}
            </div>

            {visibleSteel < steelProducts.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setVisibleSteel(prev => prev + 24)}
                  className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-[#007f5f] hover:bg-[#007f5f] hover:text-white transition-all duration-300"
                >
                  {t('product_tabs.load_more_steel')} ({steelProducts.length - visibleSteel} {t('product_tabs.remaining')})
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wires' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Wires Note Banner */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/30 px-4 py-3 text-amber-800 dark:text-amber-200 text-sm text-center rounded-xl mb-6 shadow-sm">
              <span className="font-bold">Note:</span> {polycabData.note}
            </div>

            {/* Wires Filters & Search */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={t('product_tabs.search_wires') || 'Search e.g. "2 core copper 2.5" or "FRLF 10 sqmm"...'} 
                  value={wireSearchQuery}
                  onChange={(e) => {
                    setWireSearchQuery(e.target.value);
                    setVisibleWires(24);
                  }}
                  className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-slate-200 focus:border-[#E8001D] focus:ring-2 focus:ring-[#E8001D]/20 outline-none transition-all dark:bg-white/5 dark:border-white/10 dark:text-white"
                />
                <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
                {wireSearchQuery && (
                  <button 
                    onClick={() => { setWireSearchQuery(''); setVisibleWires(24); }} 
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex flex-nowrap overflow-x-auto pb-2 gap-3 hide-scrollbar">
                <select 
                  value={selectedWireSubCategory}
                  onChange={(e) => { setSelectedWireSubCategory(e.target.value); setVisibleWires(24); }}
                  className="min-w-max px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#E8001D] outline-none transition-all dark:bg-slate-800 dark:border-white/10 dark:text-white"
                >
                  <option value="">{t('product_tabs.all_categories') || 'All Categories'}</option>
                  {wireSubCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <select 
                  value={selectedWireType}
                  onChange={(e) => { setSelectedWireType(e.target.value); setVisibleWires(24); }}
                  className="min-w-max px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#E8001D] outline-none transition-all dark:bg-slate-800 dark:border-white/10 dark:text-white"
                >
                  <option value="">{t('product_tabs.all_types') || 'All Types'}</option>
                  {wireTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>

                <select 
                  value={selectedWireSize}
                  onChange={(e) => { setSelectedWireSize(e.target.value); setVisibleWires(24); }}
                  className="min-w-max px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#E8001D] outline-none transition-all dark:bg-slate-800 dark:border-white/10 dark:text-white"
                >
                  <option value="">{t('product_tabs.all_sizes') || 'All Sizes'}</option>
                  {wireSizes.map(size => <option key={size} value={size}>{size} sq.mm</option>)}
                </select>

                <select 
                  value={selectedWireCores}
                  onChange={(e) => { setSelectedWireCores(e.target.value); setVisibleWires(24); }}
                  disabled={selectedWireSubCategory !== '' && selectedWireSubCategory !== 'Multicore Flexible Cables' && !selectedWireType.includes('Multicore')}
                  className="min-w-max px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#E8001D] outline-none transition-all dark:bg-slate-800 dark:border-white/10 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Cores</option>
                  {wireCores.map(c => <option key={c} value={c}>{c} Cores</option>)}
                </select>

                <select 
                  value={selectedWireSort}
                  onChange={(e) => { setSelectedWireSort(e.target.value); setVisibleWires(24); }}
                  className="min-w-max px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#E8001D] outline-none transition-all dark:bg-slate-800 dark:border-white/10 dark:text-white"
                >
                  <option value="">Sort By: Default</option>
                  {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>

                {(selectedWireSubCategory || selectedWireType || selectedWireSize || selectedWireCores || selectedWireSort) && (
                  <button 
                    onClick={() => {
                      setSelectedWireSubCategory('');
                      setSelectedWireType('');
                      setSelectedWireSize('');
                      setSelectedWireCores('');
                      setSelectedWireSort('');
                    }}
                    className="min-w-max px-4 py-2.5 text-sm font-bold text-[#E8001D] bg-red-50 hover:bg-red-100 dark:bg-[#E8001D]/10 dark:hover:bg-[#E8001D]/20 rounded-xl transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                {filteredWireProducts.length === 0 ? 'No products found' : `Showing ${filteredWireProducts.length} ${filteredWireProducts.length === 1 ? 'product' : 'products'}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedWires.length > 0 ? (
                displayedWires.map((product) => (
                  <div key={product._id || product.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E8001D]/30 transition-all duration-300 border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col group">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getSubCategoryColor(product.subCategory)}`}>
                          {product.subCategory || product.category}
                        </span>
                        {product.type && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full uppercase tracking-wider text-right">
                            {product.type}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 group-hover:text-[#E8001D] transition-colors leading-tight">
                        {product.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 mt-auto">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Size</p>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{product.size} {product.unit}</p>
                        </div>
                        {product.cores && (
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Cores</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{product.cores} Core</p>
                          </div>
                        )}
                        {product.conductorConstruction && (
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Conductor</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{product.conductorConstruction}</p>
                          </div>
                        )}
                        {product.currentCapacity_Amps && (
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Capacity</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{product.currentCapacity_Amps}A</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-2 mb-6">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 font-semibold">Price</p>
                        <p className="text-2xl font-black text-[#E8001D]">{formatWirePrice(product)}</p>
                      </div>
                      
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                          {product.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700/50 dark:text-slate-400 border border-slate-200 dark:border-slate-600 px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <a 
                        href={`https://wa.me/919999999999?text=${encodeURIComponent(product.whatsappText || `Hi, I'm interested in ${product.name}. Please share price and availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-[#25D366]/20 hover:shadow-lg hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                      >
                        <span className="text-xl leading-none">💬</span> Get a Quote
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 shadow-sm">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matches found</h3>
                  <p className="text-slate-500 mb-6 max-w-md mx-auto">
                    We couldn't find any products matching your search or filters.
                  </p>
                  <button 
                    onClick={() => {
                      setWireSearchQuery('');
                      setSelectedWireSubCategory('');
                      setSelectedWireType('');
                      setSelectedWireSize('');
                      setSelectedWireCores('');
                      setSelectedWireSort('');
                    }}
                    className="bg-[#E8001D] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-red-500/30"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {visibleWires < filteredWireProducts.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setVisibleWires(prev => prev + 24)}
                  className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-bold text-[#E8001D] hover:bg-[#E8001D] hover:text-white hover:border-[#E8001D] transition-all duration-300 shadow-sm"
                >
                  Load More Wires ({filteredWireProducts.length - visibleWires} remaining)
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
