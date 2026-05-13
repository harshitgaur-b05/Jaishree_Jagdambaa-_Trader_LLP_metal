import { Suspense } from 'react';
import { getAllProducts, filterProducts } from '@/lib/products';
import ProductTabs from '@/components/ProductTabs';
import ProductsHeader from '@/components/ProductsHeader';

export const metadata = {
  title: 'Our Products | Steel, Wires & Cables, Scrap Solutions',
  description:
    'Explore our comprehensive range of steel products, electrical wires & cables, or sell your scrap metal at the best market rates.',
  openGraph: {
    title: 'Product Catalogue & Scrap Solutions',
    description: 'Steel products, wires, cables, and scrap metal trading.',
  },
};

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || '';
  const sub = resolvedParams?.sub || '';
  const type = resolvedParams?.type || '';
  const dimension = resolvedParams?.dimension || '';

  const allProducts = getAllProducts();
  const filteredProducts = filterProducts({ category, sub, type, dimension });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-300">
      <ProductsHeader />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <Suspense fallback={<div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#007f5f] border-t-transparent rounded-full animate-spin"></div></div>}>
          <ProductTabs 
            initialProducts={allProducts} 
            filteredProducts={filteredProducts}
            totalCount={allProducts.length}
          />
        </Suspense>
      </div>
    </div>
  );
}
