'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';

const EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@steelmart.in';
const PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 99999 99999';
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

export default function Footer() {
  const { t } = useTranslation();

  const QUICK_LINKS = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const PRODUCT_CATS = [
    'TMT Bars', 'MS Pipes', 'Steel Sheets', 'Angle Iron', 'Channel Steel', 'MS Flats & Rounds',
  ];

  return (
    <footer className="bg-muted border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image src="/logo.png" alt="Jaishree Jagdambaa Trader LLP" fill className="object-contain" sizes="40px" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#10b981] font-black text-sm uppercase tracking-tight leading-tight">
                  Jaishree Jagdambaa
                </span>
                <span className="text-[#10b981] font-black text-sm uppercase tracking-tight leading-tight">
                  Trader LLP
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-[#10b981] dark:hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2">
              {PRODUCT_CATS.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-muted-foreground hover:text-[#10b981] dark:hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.contact_info')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-0.5">📞</span>
                <a href={`tel:${PHONE}`} className="text-sm text-muted-foreground hover:text-[#10b981] dark:hover:text-[#10b981] transition-colors">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-0.5">✉️</span>
                <a href={`mailto:${EMAIL}`} className="text-sm text-muted-foreground hover:text-[#10b981] dark:hover:text-[#10b981] transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10b981] mt-0.5">💬</span>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#10b981] dark:hover:text-[#10b981] transition-colors"
                >
                  {t('footer.whatsapp_us')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Jaishree Jagdambaa Trader LLP. {t('footer.rights')}</p>
          <p>{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
