import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Attendy terms of service, subscription terms, and acceptable use.",
};

export default function TermsPage() {
  const updated = "24th of April, 2026";

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

          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Terms of Service</h1>
          <p className="text-sm text-[var(--foreground-muted)] mb-10">
            Last updated: {updated}
          </p>

          <div className="prose prose-sm max-w-none space-y-8 text-[var(--foreground-muted)] leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">1. Acceptance</h2>
              <p>
                By creating an Attendy account or using any Attendy product (attendy-edu,
                attendy-bank, attendy-office, attendy-biz, attendy-events), you agree to
                these terms on behalf of yourself and your organisation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">2. Subscription and billing</h2>
              <p>
                Subscriptions are billed monthly in Nigerian Naira. Pricing is as displayed on
                the Attendy website at the time of activation. Prices may change with 30 days&apos;
                notice. Payments are made by bank transfer or mobile money as arranged with the
                Attendy team.
              </p>
              <p className="mt-3">
                Each plan includes hard limits on the number of members, monthly SMS messages,
                and admin accounts. These limits are enforced automatically. Adding members or
                admins beyond your plan limit will require an upgrade. SMS overage is blocked,
                not billed.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">3. Free trial</h2>
              <p>
                New organisations receive a free first month on the Standard plan. No payment
                is required to start the trial. At the end of the trial, an account will be
                suspended (not deleted) unless a paid subscription is activated. Data is
                retained for 90 days after suspension before permanent deletion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">4. Cancellation</h2>
              <p>
                You may cancel your subscription at any time by contacting Attendy via
                WhatsApp or email. Cancellation takes effect at the end of the current
                billing period. No refunds are issued for partial months.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">5. Acceptable use</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>You may not use Attendy to track individuals without their knowledge or appropriate consent</li>
                <li>You may not use Attendy for any illegal purpose under Nigerian law</li>
                <li>You may not attempt to reverse-engineer, scrape, or abuse the Attendy platform or API</li>
                <li>You are responsible for ensuring that the phone numbers you add to the system are accurate and that individuals consent to receiving SMS notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">6. Service availability</h2>
              <p>
                Attendy targets 99.5% monthly uptime. Planned maintenance will be announced
                at least 24 hours in advance via the admin dashboard. Attendy is not liable
                for downtime caused by third-party services including Supabase, Termii, or
                Vercel.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">7. Limitation of liability</h2>
              <p>
                Attendy is provided &quot;as is&quot;. To the maximum extent permitted by Nigerian law,
                Attendy is not liable for indirect, incidental, or consequential damages
                arising from use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">8. Changes to these terms</h2>
              <p>
                Attendy may update these terms. Material changes will be communicated via the
                admin dashboard or email with at least 14 days&apos; notice before they take effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">9. Contact</h2>
              <p>
                Questions about these terms? Reach us via the{" "}
                <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">
                  contact page
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}