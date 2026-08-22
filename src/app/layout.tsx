import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import IntroAnimation from "@/components/IntroAnimation";
import { SITE } from "@/lib/site-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brandName} — ${SITE.tagline}`,
    template: `%s — ${SITE.brandName}`,
  },
  description:
    "EYE-NEWS INDIAN TIMES is the political strategy and public communication practice of EYE NEWS INDIA — grassroots intelligence, campaign strategy and media, guided by Truth. Insight. Impact.",
  openGraph: {
    title: `${SITE.brandName} — ${SITE.tagline}`,
    description:
      "Political strategy, grassroots intelligence and public communication — Truth. Insight. Impact.",
    url: SITE.url,
    siteName: SITE.brandName,
    images: [{ url: "/og/default-og.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandName} — ${SITE.tagline}`,
    images: ["/og/default-og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <IntroAnimation />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
