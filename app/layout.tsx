import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Attendy — Smart Attendance for Every Industry',
  description: 'QR-powered presence tracking built for Africa. Schools, banks, offices, businesses, events — one system tailored for each.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Attendy — Smart Attendance for Every Industry',
    description: 'QR-powered presence tracking built for Africa.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}