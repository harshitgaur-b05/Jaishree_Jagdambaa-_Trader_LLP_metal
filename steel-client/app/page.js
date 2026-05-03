import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || 'SteelMart India';
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

export const metadata = {
  title: `${COMPANY} | Steel Products Supplier in Delhi`,
  description:
    'Premium steel products — TMT Bars, MS Pipes, Steel Sheets, Angle Iron. Trusted supplier with 10+ years experience. Pan India delivery.',
  openGraph: {
    title: `${COMPANY} | Steel Products Supplier`,
    description: 'Quality steel for construction and industry. Get quotes on WhatsApp.',
  },
};

const STATS = [
  { value: '500+', label: 'Products Available' },
  { value: '10+', label: 'Years Experience' },
  { value: 'Pan India', label: 'Delivery Network' },
  { value: '1000+', label: 'Happy Clients' },
];

const CATEGORIES = [
  { name: 'TMT Bars', icon: '🏗️', desc: 'Fe-415, Fe-500, Fe-550 grades' },
  { name: 'MS Pipes', icon: '🔩', desc: 'Round, Square & Rectangular' },
  { name: 'Steel Sheets', icon: '📋', desc: 'HR, CR & Galvanized sheets' },
  { name: 'Angle Iron', icon: '📐', desc: 'Equal & Unequal angles' },
  { name: 'Channel Steel', icon: '⚙️', desc: 'C-Channel & U-Channel' },
  { name: 'MS Flats & Rounds', icon: '🔧', desc: 'Flat bars & round bars' },
];

export default function HomePage() {
  const allProducts = getAllProducts();
  const featured = allProducts.slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[#0f172a] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #3b82f6 0px,
                #3b82f6 1px,
                transparent 1px,
                transparent 40px
              )`,
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-[#1e3a5f] text-[#93c5fd] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-[#2d5a8e]">
              <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
              Trusted Steel Supplier Since 2010
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Quality Steel,
              <br />
              <span className="text-[#3b82f6]">On Time.</span>
              <br />
              Every Time.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
              India's trusted source for TMT bars, MS pipes, steel sheets, and structural steel.
              Competitive prices · Pan India delivery · WhatsApp ordering.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-150 text-sm"
              >
                View Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-150 text-sm"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="bg-[#1e3a5f] py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{value}</p>
                <p className="text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Our Product Range</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Comprehensive steel product catalogue for construction, fabrication, and industrial use.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map(({ name, icon, desc }) => (
              <Link
                key={name}
                href={`/products?category=${encodeURIComponent(name)}`}
                className="group flex items-start gap-4 p-5 rounded-xl border border-slate-200 hover:border-[#3b82f6] hover:shadow-md transition-all duration-200 bg-white"
              >
                <span className="text-3xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-[#3b82f6] transition-colors">{name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0f172a]">Featured Products</h2>
              <p className="text-slate-500 mt-1 text-sm">Popular picks from our catalogue</p>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#3b82f6] hover:underline font-medium hidden sm:block"
            >
              View all products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="text-sm text-[#3b82f6] hover:underline font-medium"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────── */}
      <section className="bg-[#0f172a] py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-3xl font-bold text-white mb-4">Get Instant Quotes on WhatsApp</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Skip the forms. Message us directly on WhatsApp for pricing, availability, and delivery info. Our team responds within minutes.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors duration-150 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6">
              <path d="M16.003 2.667C8.639 2.667 2.667 8.637 2.667 16c0 2.348.627 4.647 1.814 6.657L2.667 29.333l6.87-1.793A13.29 13.29 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.364-5.967-13.333-13.33-13.333zm0 24c-2.028 0-4.02-.549-5.755-1.587l-.413-.247-4.077 1.063 1.09-3.968-.269-.432A10.634 10.634 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667S26.667 10.118 26.667 16c0 5.883-4.784 10.667-10.664 10.667zm5.858-7.986c-.32-.16-1.894-.933-2.188-1.04-.294-.106-.508-.16-.722.16s-.829 1.04-1.015 1.254c-.187.213-.374.24-.694.08-.32-.16-1.351-.498-2.573-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.143-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.62-.524-.536-.72-.546l-.614-.01c-.213 0-.56.08-.853.4-.294.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.254 3.44 5.46 4.827.764.33 1.36.527 1.824.674.766.242 1.465.208 2.017.127.615-.092 1.894-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.294-.213-.614-.373z"/>
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a]">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✅', title: 'Verified Quality', desc: 'ISI marked and BIS certified steel products from trusted mills.' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Pan India delivery with reliable logistics partners.' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive market rates. Bulk discount available.' },
              { icon: '🤝', title: 'Dedicated Support', desc: '10+ years of industry experience. WhatsApp support 6 days a week.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-xl border border-slate-200">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
