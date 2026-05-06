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
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-20">
        {/* Background Image & Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/heroimage/unnamed.jpg')" }}
        >
          {/* Unified overlay — slightly heavier in light mode for text readability */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 dark:from-[#18181b]/60 dark:via-transparent dark:to-[#18181b]/80"></div>
        </div>

        {/* Main Hero Content — centered for BOTH modes */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 md:mt-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

            {/* Eyebrow tag */}
            <div className="flex flex-col items-center mb-8 group">
              <span className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/5 backdrop-blur-sm text-[10px] font-black text-[#10b981] uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                Official Supplier
              </span>
              <h2 className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase leading-none drop-shadow-lg">
                Jaishree <span className="text-[#10b981]">Jagdambaa</span>
                <span className="block text-[10px] md:text-xs text-white/60 font-bold tracking-[0.3em] mt-1">Trader LLP</span>
              </h2>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-[1.1] mb-5 tracking-tight uppercase">
              {/* Main Title */}
              <span className="text-white inline-block">Your Global & Domestic Partner in</span><br />
              <span className="animate-brand-shimmer drop-shadow-md inline-block">Metal Supply,</span>{' '}
              <span className="text-white inline-block">Trade</span><br />
              <span className="text-white inline-block">
                &amp; Distribution
              </span>
            </h1>

            <p className="text-white/75 text-base md:text-lg tracking-wide mb-10 max-w-2xl leading-relaxed">
              Trusted suppliers, merchandisers &amp; domestic traders of steel, MS pipes, TMT bars and scrap — sourcing, processing and delivering essential materials across India and worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#007f5f] hover:bg-[#005f47] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white font-semibold rounded-full transition-colors duration-300 shadow-lg"
              >
                Request a Quote
              </a>
              <Link
                href="/products"
                className="px-8 py-3.5 bg-transparent border border-white/60 text-white hover:bg-white/10 font-medium rounded-full transition-colors duration-300"
              >
                Explore Inventory
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80 font-medium tracking-wide">
              <span className="flex items-center gap-2"><span className="text-[#007f5f] dark:text-[#10b981] text-lg">✓</span> Worldwide Logistics</span>
              <span className="flex items-center gap-2"><span className="text-[#007f5f] dark:text-[#10b981] text-lg">✓</span> ISRI Certified</span>
              <span className="flex items-center gap-2"><span className="text-[#007f5f] dark:text-[#10b981] text-lg">✓</span> Ethical Sourcing</span>
              <span className="flex items-center gap-2"><span className="text-[#007f5f] dark:text-[#10b981] text-lg">✓</span> Pan India Delivery</span>
            </div>
          </div>
        </div>


      </section>

      {/* ── Certificates ─────────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] dark:bg-[#121212] py-16 px-4 md:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              Our Verified Compliance & Accreditations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Certificate of Incorporation - LLP',
                id: 'XXXXX-XXXX',
                file: 'Certificate of Incorporation LLP.pdf',
                imgNum: 1
              },
              {
                title: 'GST Registration Certificate',
                id: '07AAXXXXXXXXXXZ',
                file: 'GST Certificate LLP.pdf',
                imgNum: 2
              },
              {
                title: 'Import Export Code (IEC) Certificate',
                id: 'XXXXXXXXXX',
                file: 'IMPORT EXPORT CERTIFICATE LLP.pdf',
                imgNum: 3
              },
              {
                title: 'MSME Registration Certificate',
                id: 'UDYAM-XX-XX-XXXXXXX',
                file: 'MSME CERTIFICATE.pdf',
                imgNum: 4
              }
            ].map(({ title, id, file, imgNum }) => (
              <div key={title} className="bg-white dark:bg-[#18181b] rounded-xl shadow-sm border border-slate-200 dark:border-white/10 p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                {/* Certificate Thumbnail Image */}
                <div className="bg-slate-50 dark:bg-[#121212] border border-slate-100 dark:border-white/5 rounded-lg mb-4 flex-grow relative min-h-[160px] max-h-[200px] overflow-visible group">
                  <div className="w-full h-full overflow-hidden rounded-lg relative">
                    <img
                      src={`/certificates/${imgNum}.png`}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    Verified
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-slate-200 text-sm mb-5 leading-snug">{title}</h3>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <a href={`/certificates/${encodeURIComponent(file)}`} target="_blank" rel="noopener noreferrer" className="text-center bg-[#10b981] hover:bg-[#059669] text-white text-xs font-medium py-2.5 rounded transition-colors shadow-sm">
                    View Details
                  </a>
                  <a href={`/certificates/${encodeURIComponent(file)}`} download className="text-center bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-white/10 text-xs font-medium py-2.5 rounded transition-colors flex items-center justify-center gap-1">
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-yellow-50 dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Our Product Range</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Comprehensive steel product catalogue for construction, fabrication, and industrial use.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {CATEGORIES.map(({ name, icon, desc }) => (
              <Link
                key={name}
                href={`/products?category=${encodeURIComponent(name)}`}
                className="group flex items-start gap-4 p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-[#10b981] dark:hover:border-[#10b981] bg-white dark:bg-[#18181b] hover:shadow-md dark:hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-3xl flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">{icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-200 text-sm group-hover:text-[#10b981] transition-colors">{name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#18181b] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Popular picks from our catalogue</p>
            </div>
            <Link
              href="/products"
              className="text-sm text-[#10b981] hover:text-[#059669] border border-[#10b981] hover:bg-[#10b981]/10 px-5 py-2.5 rounded-full font-medium transition-colors hidden sm:block"
            >
              View all products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/products"
              className="text-sm text-[#10b981] hover:text-[#059669] border border-[#10b981] hover:bg-[#10b981]/10 px-6 py-3 rounded-full font-medium transition-colors inline-block"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────── */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-yellow-50 dark:bg-[#121212] transition-colors duration-300">
        <div className="absolute inset-0 bg-[#10b981] opacity-[0.03] dark:opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:from-[#121212] dark:to-[#121212]"></div>

        <div className="relative max-w-2xl mx-auto text-center z-10">
          <div className="text-5xl mb-6 opacity-80">💬</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get Instant Quotes on WhatsApp</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
            Skip the forms. Message us directly on WhatsApp for pricing, availability, and delivery info. Our team responds within minutes.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#10b981] hover:bg-[#059669] text-[#121212] font-bold px-8 py-4 rounded-full text-lg transition-colors duration-300 shadow-[0_0_20px_rgba(194,155,116,0.3)] hover:shadow-[0_0_30px_rgba(194,155,116,0.5)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6">
              <path d="M16.003 2.667C8.639 2.667 2.667 8.637 2.667 16c0 2.348.627 4.647 1.814 6.657L2.667 29.333l6.87-1.793A13.29 13.29 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.364-5.967-13.333-13.33-13.333zm0 24c-2.028 0-4.02-.549-5.755-1.587l-.413-.247-4.077 1.063 1.09-3.968-.269-.432A10.634 10.634 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667S26.667 10.118 26.667 16c0 5.883-4.784 10.667-10.664 10.667zm5.858-7.986c-.32-.16-1.894-.933-2.188-1.04-.294-.106-.508-.16-.722.16s-.829 1.04-1.015 1.254c-.187.213-.374.24-.694.08-.32-.16-1.351-.498-2.573-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.143-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.62-.524-.536-.72-.546l-.614-.01c-.213 0-.56.08-.853.4-.294.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.254 3.44 5.46 4.827.764.33 1.36.527 1.824.674.766.242 1.465.208 2.017.127.615-.092 1.894-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.294-.213-.614-.373z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────── */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#18181b] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✅', title: 'Verified Quality', desc: 'ISI marked and BIS certified steel products from trusted mills.' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Pan India delivery with reliable logistics partners.' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive market rates. Bulk discount available.' },
              { icon: '🤝', title: 'Dedicated Support', desc: '10+ years of industry experience. WhatsApp support 6 days a week.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-8 rounded-2xl bg-yellow-50 dark:bg-[#121212] border border-slate-100 dark:border-white/5 hover:border-[#10b981]/30 transition-colors duration-300">
                <div className="text-4xl mb-4 opacity-80">{icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-slate-200 mb-3">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
