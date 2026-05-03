import Link from 'next/link';

const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || 'SteelMart India';
const EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@steelmart.in';
const PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 99999 99999';
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-[#1e3a5f] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="3" width="20" height="4" rx="1"/>
                  <rect x="2" y="17" width="20" height="4" rx="1"/>
                  <rect x="10" y="7" width="4" height="10" rx="1"/>
                </svg>
              </div>
              <span className="text-white font-bold text-base">{COMPANY}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted partner for quality steel products. Serving industries across India with premium TMT bars, MS pipes, sheets, and structural steel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Products' },
                { href: '/contact', label: 'Contact Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              {[
                'TMT Bars',
                'MS Pipes',
                'Steel Sheets',
                'Angle Iron',
                'Channel Steel',
                'MS Flats & Rounds',
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6] mt-0.5">📞</span>
                <a href={`tel:${PHONE}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3b82f6] mt-0.5">✉️</span>
                <a href={`mailto:${EMAIL}`} className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#25D366] mt-0.5">💬</span>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1e3a5f] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          <p>Quality Steel Products | Pan India Delivery</p>
        </div>
      </div>
    </footer>
  );
}
