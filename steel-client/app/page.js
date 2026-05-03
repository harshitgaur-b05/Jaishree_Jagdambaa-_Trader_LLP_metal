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
      <section className="relative w-full min-h-[600px] flex items-center py-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/heroimage/unnamed.jpg')" }}
        >
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
          {/* Glassmorphism Card */}
          <div className="max-w-xl bg-white/85 backdrop-blur-lg border border-white/30 p-8 md:p-12 rounded-3xl shadow-xl">
            <h1 className="text-4xl md:text-[2.75rem] font-bold text-[#1e293b] leading-[1.15] mb-5 tracking-tight">
              Trusted, Verified, Globally Connected.
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Your fully compliant and accredited partner for worldwide sourcing and distribution.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#3b7c87] hover:bg-[#2c5e66] text-white font-medium px-8 py-3.5 rounded-lg transition-colors duration-200"
            >
              Explore Our Credentials
            </Link>
          </div>
        </div>
      </section>

      {/* ── Certificates ─────────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] uppercase tracking-wide">
              Our Verified Compliance & Accreditations
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Certificate of Incorporation - LLP',
                id: 'XXXXX-XXXX',
                file: 'Certificate of Incorporation LLP.pdf'
              },
              {
                title: 'GST Registration Certificate',
                id: '07AAXXXXXXXXXXZ',
                file: 'GST Certificate LLP.pdf'
              },
              {
                title: 'Import Export Code (IEC) Certificate',
                id: 'XXXXXXXXXX',
                file: 'IMPORT EXPORT CERTIFICATE LLP.pdf'
              },
              {
                title: 'MSME Registration Certificate',
                id: 'UDYAM-XX-XX-XXXXXXX',
                file: 'MSME CERTIFICATE.pdf'
              }
            ].map(({ title, id, file }) => (
              <div key={title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                {/* Certificate Thumbnail Placeholder */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-4 flex-grow flex items-center justify-center relative min-h-[160px]">
                  <div className="text-center opacity-40">
                    <span className="text-4xl mb-2 block">📄</span>
                    <span className="text-xs font-medium uppercase text-slate-500">Official Document</span>
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-3 -right-2 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    Verified
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-slate-500 mb-5">Verified ID: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded blur-[2px] select-none">{id}</span></p>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <a href={`/certificates/${encodeURIComponent(file)}`} target="_blank" rel="noopener noreferrer" className="text-center bg-[#3b7c87] hover:bg-[#2c5e66] text-white text-xs font-medium py-2.5 rounded transition-colors">
                    View Details
                  </a>
                  <a href={`/certificates/${encodeURIComponent(file)}`} download className="text-center bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 text-xs font-medium py-2.5 rounded transition-colors flex items-center justify-center gap-1">
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────── */}
      <section className="bg-[#18181b] py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Our Happy Partners
            </h2>
            <p className="text-slate-300 font-medium">
              Trusted by teams from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'KAMDHENU', sub: 'STEEL', color: 'text-red-600' },
              { name: 'TATA', sub: 'STEEL', color: 'text-blue-700' },
              { name: 'SAIL', sub: 'सेल', color: 'text-sky-800' },
              { name: 'JINDAL', sub: 'STEEL & POWER', color: 'text-emerald-700' },
              { name: 'Hi-TECH', sub: 'STEEL PIPES', color: 'text-orange-500' },
              { name: 'ESSAR', sub: 'STEEL', color: 'text-slate-800' },
              { name: 'JSW', sub: 'Steel', color: 'text-blue-900' },
              { name: 'BIRLA', sub: 'TMT STEEL', color: 'text-red-700' },
              { name: 'VIZAG', sub: 'STEEL', color: 'text-red-600' },
              { name: 'AMBA SHAKTI', sub: 'GROUP', color: 'text-red-500' },
              { name: 'APL APOLLO', sub: 'STEEL PIPES', color: 'text-sky-500' },
              { name: 'JYOTI', sub: 'TMT BARS', color: 'text-orange-600' },
            ].map(({ name, sub, color }) => (
              <div 
                key={name} 
                className="bg-white rounded-[1.25rem] aspect-[4/3] flex flex-col items-center justify-center p-4 shadow-sm hover:scale-105 transition-transform duration-300 cursor-default"
              >
                <div className="flex flex-col items-center justify-center select-none">
                  <span className={`font-black text-xl md:text-[1.35rem] text-center leading-none ${color}`}>
                    {name}
                  </span>
                  {sub && (
                    <span className="text-[10px] font-bold text-slate-500 mt-1 text-center uppercase tracking-[0.15em]">
                      {sub}
                    </span>
                  )}
                </div>
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
