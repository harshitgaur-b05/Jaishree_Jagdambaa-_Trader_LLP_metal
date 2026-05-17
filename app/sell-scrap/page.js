import ScrapForm from '@/components/ScrapForm';

export const metadata = {
  title: 'Sell Metal Scrap | Get Best Market Rates – Industrial Solutions',
  description:
    'Sell your MS Steel, Copper, Aluminium or other metal scrap at the best market rates. Submit your details and we\'ll get back to you instantly via WhatsApp.',
};

export default function SellScrapPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-[#121212] dark:to-[#1a1a1a] py-16 px-4 md:px-8 border-b border-emerald-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            ♻️ Scrap Trading
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            Sell Metal Scrap
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Get the best market rates for your MS Steel, Copper, Aluminium, and other metal scrap.
            Fill in the form below — we&apos;ll respond instantly on WhatsApp.
          </p>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['MS Steel', 'Structured Steel', 'Copper', 'Aluminium', 'Other Metals'].map((cat) => (
              <span
                key={cat}
                className="text-xs font-semibold bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits strip */}
      <div className="bg-[#007f5f] text-white py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold">
          <span>✅ Best Market Rates</span>
          <span>✅ Doorstep Pickup Available</span>
          <span>✅ Instant WhatsApp Response</span>
          <span>✅ Pan-India Service</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <ScrapForm />
      </div>
    </div>
  );
}
