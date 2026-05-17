import CablesEnquiryForm from '@/components/CablesEnquiryForm';

export const metadata = {
  title: 'Cable Enquiry | Industrial & Electrical Cables – Industrial Solutions',
  description:
    'Enquire about Flexible, XLPE, Solar, HT, Armoured, Fire Survival, and all types of industrial cables. Get instant pricing via WhatsApp.',
};

export default function CablesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#121212] dark:to-[#1a1a1a] py-16 px-4 md:px-8 border-b border-blue-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            🔋 Cable Enquiry
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            Industrial Cables
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Flexible, XLPE, Solar, HT, Armoured, Fire Survival, BMS, RS 485 and more — 19 cable types available.
            Describe your exact need and get a quote instantly on WhatsApp.
          </p>

          {/* Cable type pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl mx-auto">
            {[
              'Single Core Flexible',
              'Multicore Flexible',
              'XLPE Armoured',
              'Solar Cables',
              'BMS Cables',
              'Welding Cables',
              'HT Cables',
              'Fire Survival',
              'Rubber Cables',
              'RS 485',
              'Instrumentation',
              '+ more',
            ].map((label) => (
              <span
                key={label}
                className="text-xs font-semibold bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <CablesEnquiryForm />
      </div>
    </div>
  );
}
