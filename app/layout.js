import { Inter, Noto_Sans_JP, Noto_Sans_SC, Noto_Sans_Devanagari, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EnquiryCart, { EnquiryCartProvider } from '@/components/EnquiryCart';
import { ThemeProvider } from '@/components/ThemeProvider';
import { I18nProvider } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const notoJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-jp', weight: ['400', '700'] });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-zh', weight: ['400', '700'] });
const notoDev = Noto_Sans_Devanagari({ subsets: ['latin', 'devanagari'], variable: '--font-hi', weight: ['400', '700'] });
const notoAr = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-ar', weight: ['400', '700'] });

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
    <html lang="en" className={`${inter.variable} ${notoJP.variable} ${notoSC.variable} ${notoDev.variable} ${notoAr.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-[#10b981]/30 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <EnquiryCartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
              <EnquiryCart />
            </EnquiryCartProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
