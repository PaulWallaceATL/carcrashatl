import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AnalyticsWrapper } from '@/components/layout/analytics-wrapper';

// Mobile-optimized font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  // Mobile-first: Only essential weights
  weight: ['400', '600'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: false, // Don't preload on mobile to save bandwidth
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  // Mobile-first: Minimal weights
  weight: ['600'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#FFD700' }
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover'
};

// Comprehensive SEO metadata for perfect scores
export const metadata: Metadata = {
  metadataBase: new URL('https://www.carcrashatl.com'),
  title: {
    default: 'Car Crashes in Atlanta - Your Legal Resource for Car Accident Help',
    template: '%s | Car Crashes in Atlanta'
  },
  description: 'Comprehensive resource for car crash victims in Atlanta. Connect with experienced attorneys, understand your rights, and get the legal help you deserve. Free consultations available 24/7.',
  keywords: [
    'car accident attorney Atlanta',
    'car crash lawyer Georgia', 
    'car accident help Atlanta',
    'Atlanta car accident lawyer',
    'Georgia car crash attorney',
    'car accident legal advice',
    'Atlanta personal injury lawyer',
    'free car accident consultation'
  ],
  authors: [{ name: 'Car Crashes in Atlanta' }],
  creator: 'Car Crashes in Atlanta',
  publisher: 'Car Crashes in Atlanta',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.carcrashatl.com',
    siteName: 'Car Crashes in Atlanta',
    title: 'Car Crashes in Atlanta - Your Legal Resource for Car Accident Help',
    description: 'Comprehensive resource for car crash victims in Atlanta. Connect with experienced attorneys, understand your rights, and get the legal help you deserve.',
    images: [
      {
        url: '/images/og-social.png',
        width: 1200,
        height: 630,
        alt: 'Car Crashes in Atlanta - Your Legal Resource',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Crashes in Atlanta - Your Legal Resource for Car Accident Help',
    description: 'Comprehensive resource for car crash victims in Atlanta. Connect with experienced attorneys and understand your rights.',
    images: ['/images/og-social.png'],
    creator: '@CarCrashATL',
    site: '@CarCrashATL',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.carcrashatl.com'
  },
  category: 'Legal Services',
  classification: 'Law Firm',
  referrer: 'origin-when-cross-origin'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Critical resource hints - mobile optimized */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon - optimized */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Minimal critical CSS for mobile-first performance */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;margin:0;padding:0}
            html{-webkit-text-size-adjust:100%}
            body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6;background:#fff;color:#111}
            .hero-section{min-height:100vh;background:#000}
            img{max-width:100%;height:auto;display:block}
          `
        }} />
        
        {/* Performance optimizations */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      
      <body className="antialiased no-horizontal-scroll">
        {/* Main application content */}
        <div id="root" className="min-h-screen mobile-safe-width">
          {children}
        </div>
        
        {/* Mobile-optimized analytics loading */}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
