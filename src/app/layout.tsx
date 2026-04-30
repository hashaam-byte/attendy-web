import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Attendy — QR Attendance for Schools, Banks, Offices & Events",
    template: "%s | Attendy",
  },
  description:
    "One scan. Instant notification. Complete record. Attendy powers QR-based attendance tracking for Nigerian schools, banks, offices, businesses, and events.",
  keywords: [
    "QR attendance",
    "school attendance Nigeria",
    "bank attendance",
    "employee check-in",
    "parent SMS notification",
    "Nigerian SaaS",
    "attendance tracking",
  ],
  authors: [{ name: "Attendy" }],
  creator: "Hash cody",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://attendy-web.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://attendy-web.vercel.app",
    siteName: "Attendy",
    title: "Attendy — QR Attendance for Every Sector",
    description:
      "One scan. Instant notification. Complete record. Built for Nigeria.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Attendy — QR Attendance for Every Sector",
    description: "One scan. Instant notification. Complete record.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon1.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}