import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";
import { PageTransition } from "@/components/PageTransition";

// Optimized font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Cube Post | Postproduccion de imagen en Barcelona",
    template: "%s | Cube Post",
  },
  description:
    "Somos una empresa de postproduccion de imagen en Barcelona que ofrece servicios de diseno de workflow, backup de rodaje, ciencia de color, calibracion, conformado online, grading para cine en HDR y SDR, grading remoto, mastering y deliveries.",
  keywords: [
    "postproduccion",
    "cine",
    "Barcelona",
    "color grading",
    "HDR",
    "SDR",
    "DCP",
    "mastering",
    "conformado online",
    "colorista",
    "etalonaje",
    "workflow",
    "LUT",
    "Dolby Vision",
    "IMF",
  ],
  authors: [{ name: "Cube Post" }],
  creator: "Cube Post",
  publisher: "Cube Post",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cube-post.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: "https://cube-post.com",
    siteName: "Cube Post",
    title: "Cube Post | Postproduccion de imagen en Barcelona",
    description:
      "Empresa de postproduccion de imagen en Barcelona. Color grading, conformado online, mastering DCP, Dolby Vision y mas.",
    images: [
      {
        url: "https://ext.same-assets.com/2561987519/2642917339.jpeg",
        width: 1200,
        height: 630,
        alt: "Cube Post - Postproduccion de imagen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cube Post | Postproduccion de imagen en Barcelona",
    description:
      "Empresa de postproduccion de imagen en Barcelona. Color grading, conformado online, mastering DCP, Dolby Vision y mas.",
    images: ["https://ext.same-assets.com/2561987519/2642917339.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/cube-logo-original.jpg" />
        <meta name="theme-color" content="#020205" />
        {/* Mobile optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Cube Post" />
        <meta name="format-detection" content="telephone=no" />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <link rel="preconnect" href="https://ext.same-assets.com" />
        <link rel="dns-prefetch" href="https://ext.same-assets.com" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <LanguageProvider>
          <Header />
          <main className="pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
