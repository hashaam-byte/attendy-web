import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07090a',
}

export const metadata: Metadata = {
  title: 'Attendy — Smart Attendance for Every Industry',
  description:
    'QR-powered presence tracking built for Africa. Schools, banks, offices, businesses, events — one system tailored for each.',
  keywords: ['attendance', 'QR code', 'Africa', 'Nigeria', 'schools', 'banks', 'offices', 'HR', 'payroll'],
  authors: [{ name: 'Attendy' }],
  creator: 'Attendy',
  openGraph: {
    title: 'Attendy — Smart Attendance for Every Industry',
    description: 'QR-powered presence tracking built for Africa.',
    type: 'website',
    url: 'https://attendy-web.vercel.app',
    siteName: 'Attendy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attendy — Smart Attendance for Every Industry',
    description: 'QR-powered presence tracking built for Africa.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}