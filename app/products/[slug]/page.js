import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSlugs, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { getSingleProductWALink } from '@/lib/whatsapp';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from './AddToCartButton';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  console.log('Static Params Count:', slugs.length);
  if (slugs.length > 0) {
    console.log('Sample Slug:', slugs[0]);
  }
  return slugs.map(s => ({
    slug: String(s.slug)
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || 'SteelMart India';
  return {
    title: `${product.name} ${product.dimension}`,
    description: product.description,
    openGraph: {
      title: `${product.name} (${product.dimension}) | ${COMPANY}`,
      description: product.description,
    },
  };
}

import ProductImage from './ProductImage';

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, product.category);
  const waLink = getSingleProductWALink(product);

  return (
    <div className="min-h-screen bg-white dark:bg-[#18181b] transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="bg-slate-50 dark:bg-[#121212] border-b border-slate-200 dark:border-white/5 py-4 px-4 md:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-[#10b981] transition-colors uppercase tracking-wider">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/products" className="hover:text-[#10b981] transition-colors uppercase tracking-wider">Products</Link>
          <span className="opacity-50">/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#10b981] transition-colors uppercase tracking-wider">
            {product.category}
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-slate-600 dark:text-slate-300 truncate uppercase tracking-wider">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div>
            <ProductImage product={product} />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Category badge */}
            <span className="inline-flex w-fit items-center bg-[#10b981] text-white dark:text-[#121212] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider transition-colors duration-300">
              {product.category}
            </span>

            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                {product.dimension} · {product.type}
                {product.subCategory && ` · ${product.subCategory}`}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h2 className="text-sm font-bold text-[#10b981] uppercase tracking-widest mb-3">Description</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Specs table */}
            <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden mt-2 bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Category', product.category],
                    ['Sub-Category', product.subCategory],
                    ['Type', product.type],
                    ['Dimension', product.dimension],
                  ].map(([label, val]) => (
                    <tr key={label} className="border-b border-slate-200 dark:border-white/5 last:border-0">
                      <td className="px-5 py-4 text-slate-500 font-medium w-1/3 uppercase tracking-wider text-xs">{label}</td>
                      <td className="px-5 py-4 text-slate-700 dark:text-slate-200 font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-transparent font-bold py-4 rounded-xl transition-all duration-300 text-sm tracking-wide"
              >
                💬 Enquire on WhatsApp
              </a>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-white/5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
