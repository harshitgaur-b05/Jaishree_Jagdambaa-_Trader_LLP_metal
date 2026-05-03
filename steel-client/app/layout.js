import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EnquiryCart, { EnquiryCartProvider } from '@/components/EnquiryCart';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || 'SteelMart India';

export const metadata = {
  title: {
    template: `%s | ${COMPANY}`,
    default: `${COMPANY} | Steel Products Supplier in Delhi`,
  },
  description:
    'Premium steel products supplier — TMT Bars, MS Pipes, Steel Sheets, Angle Iron, Channel Steel. Pan India delivery. Get a quote on WhatsApp.',
  keywords: ['TMT bars', 'MS pipes', 'steel sheets', 'angle iron', 'steel supplier', 'Delhi'],
  openGraph: {
    type: 'website',
    siteName: COMPANY,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-50 text-slate-900 flex flex-col min-h-screen antialiased">
        <EnquiryCartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <EnquiryCart />
        </EnquiryCartProvider>
      </body>
    </html>
  );
}
