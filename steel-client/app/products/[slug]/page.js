import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSlugs, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { getSingleProductWALink } from '@/lib/whatsapp';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from './AddToCartButton';

export async function generateStaticParams() {
  return getAllSlugs();
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

function ProductImageOrPlaceholder({ product }) {
  const initials = product.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <div className="relative w-full aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] flex items-center justify-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="hidden absolute inset-0 items-center justify-center">
        <span className="text-7xl font-bold text-slate-400 tracking-widest">{initials}</span>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, product.category);
  const waLink = getSingleProductWALink(product);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-[#0f172a] py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-300 truncate">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div>
            <ProductImageOrPlaceholder product={product} />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Category badge */}
            <span className="inline-flex w-fit items-center bg-[#0f172a] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {product.category}
            </span>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-500 mt-2 text-base">
                {product.dimension} · {product.type}
                {product.subCategory && ` · ${product.subCategory}`}
              </p>
            </div>

            {/* Price */}
            {product.priceRange && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Price Range</p>
                <p className="text-2xl font-bold text-[#0f172a]">{product.priceRange}</p>
                <p className="text-xs text-slate-400 mt-1">*Prices vary with market. Contact us for latest rates.</p>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</h2>
              <p className="text-slate-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Specs table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Category', product.category],
                    ['Sub-Category', product.subCategory],
                    ['Type', product.type],
                    ['Dimension', product.dimension],
                  ].map(([label, val]) => (
                    <tr key={label} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-3 text-slate-400 font-medium bg-slate-50 w-1/3">{label}</td>
                      <td className="px-4 py-3 text-slate-800 font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                💬 Enquire on WhatsApp
              </a>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
