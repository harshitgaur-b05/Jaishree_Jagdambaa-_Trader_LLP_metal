import WiresEnquiryForm from '@/components/WiresEnquiryForm';

export const metadata = {
  title: 'Wire Enquiry | Electrical Wires – Industrial Solutions',
  description:
    'Enquire about FR, FRLF, and industrial wires in 0.75mm–6mm thickness. Get instant pricing via WhatsApp.',
};

export default function WiresPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-[#121212] dark:to-[#1a1a1a] py-16 px-4 md:px-8 border-b border-amber-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            ⚡ Wire Enquiry
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            Electrical Wires
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            FR / FRLF / HRFR / Copper wires — available in 0.75 mm to 6 mm gauge, 100 m to 300 m rolls.
            Submit your requirement and get a quote directly on WhatsApp.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <WiresEnquiryForm />
      </div>
    </div>
  );
}
