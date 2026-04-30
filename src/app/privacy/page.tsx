import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Attendy collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  const updated = "1 January 2025";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-20">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] mb-10 transition-colors"
          >
            <ChevronLeft size={14} />
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[var(--foreground-muted)] mb-10">
            Last updated: {updated}
          </p>

          <div className="prose prose-sm max-w-none space-y-8 text-[var(--foreground-muted)] leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">1. Who we are</h2>
              <p>
                Attendy is a QR-based attendance tracking platform built for Nigerian schools,
                banks, offices, businesses, and events. This policy explains how we collect,
                use, store, and protect the personal data you or your organisation provide
                when using Attendy products.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">2. What data we collect</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Organisation details: name, address, contact email, and phone number</li>
                <li>Member records: full name, phone number (and parent phone for students), employee ID, department or class</li>
                <li>Attendance logs: scan timestamps, scan type (entry/exit/class), device ID, and optional GPS coordinates</li>
                <li>Notification records: SMS and WhatsApp delivery logs</li>
                <li>Contact form submissions from attendy-web.vercel.app</li>
                <li>Login and session data for staff accounts via Supabase Auth</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">3. How we use your data</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To provide the attendance tracking service your organisation signed up for</li>
                <li>To send SMS or WhatsApp notifications to parents, HR staff, or event organisers</li>
                <li>To generate attendance reports and analytics within your dashboard</li>
                <li>To manage your subscription and enforce plan limits</li>
                <li>To respond to demo or support requests submitted via the contact form</li>
              </ul>
              <p className="mt-3">
                We do not sell your data to third parties. We do not display advertising.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">4. Data storage</h2>
              <p>
                All data is stored in Supabase, a SOC 2 Type II compliant platform. Data is
                hosted in the EU (Frankfurt) region by default. Row Level Security (RLS) is
                enforced at the database level — each organisation only ever reads and writes
                its own data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">5. SMS notifications and parent consent</h2>
              <p>
                When a school activates parent SMS notifications, they are responsible for
                obtaining appropriate consent from parents or guardians before adding their
                phone numbers to the system. Attendy transmits messages on behalf of the
                organisation; the organisation is the data controller for its members&apos; records.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">6. Data retention</h2>
              <p>
                Attendance records are retained for the life of the organisation&apos;s account.
                When an account is deleted, all associated member records, attendance logs,
                and notification history are permanently removed within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">7. Your rights</h2>
              <p>
                You may request a copy, correction, or deletion of your personal data at any
                time by contacting us via WhatsApp or email. We will respond within 5 business
                days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">8. Contact</h2>
              <p>
                For privacy-related questions, email us or message us on WhatsApp at the number
                listed on the <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}