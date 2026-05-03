import { Suspense } from 'react';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import { filterProducts, getAllProducts } from '@/lib/products';

export const metadata = {
  title: 'Steel Products | TMT Bars, MS Pipes, Steel Sheets',
  description:
    'Browse our full range of steel products — TMT bars (Fe-415, Fe-500, Fe-550), MS pipes, HR/CR/GP sheets, angle iron, channel steel and more.',
  openGraph: {
    title: 'Steel Products Catalogue',
    description: 'Complete steel product range. Get quotes on WhatsApp.',
  },
};

// FilterBar uses useSearchParams → must be inside Suspense
function FilterBarWrapper({ total, filtered }) {
  return (
    <Suspense fallback={
      <div className="bg-[#0f172a] py-6 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto h-14 animate-pulse bg-[#1e3a5f] rounded-lg" />
      </div>
    }>
      <FilterBar totalCount={total} filteredCount={filtered} />
    </Suspense>
  );
}

export default async function ProductsPage({ searchParams }) {
  // In this Next.js version params is a Promise — await it
  const resolvedParams = await searchParams;

  const category = resolvedParams?.category || '';
  const sub = resolvedParams?.sub || '';
  const type = resolvedParams?.type || '';
  const dimension = resolvedParams?.dimension || '';

  const allProducts = getAllProducts();
  const products = filterProducts({ category, sub, type, dimension });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-[#0f172a] py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Steel Products</h1>
          <p className="text-slate-400 text-sm mt-1">
            Browse and enquire for any product directly on WhatsApp
          </p>
        </div>
      </div>

      {/* Filter bar — uses useSearchParams inside, needs Suspense */}
      <FilterBarWrapper total={allProducts.length} filtered={products.length} />

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">No products found</h2>
            <p className="text-slate-400 text-sm">Try clearing your filters to see all products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
