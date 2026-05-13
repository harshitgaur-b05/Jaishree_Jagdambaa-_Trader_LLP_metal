'use client';

import { useTranslation } from '@/lib/i18n';

export default function ProductsHeader() {
  const { t } = useTranslation();
  return (
    <div className="bg-yellow-50 dark:bg-[#121212] py-16 px-4 md:px-8 border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">
          {t('products_page.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          {t('products_page.subtitle')}
        </p>
      </div>
    </div>
  );
}
