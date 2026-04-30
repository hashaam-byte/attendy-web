"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  { value: "education", label: "School / University" },
  { value: "banking", label: "Bank / Financial institution" },
  { value: "office", label: "Office / Corporate" },
  { value: "business", label: "Business / SME" },
  { value: "events", label: "Events / Conferences" },
  { value: "other", label: "Other" },
];

const sizes = [
  { value: "under_50", label: "Under 50 people" },
  { value: "50_200", label: "50 – 200 people" },
  { value: "200_500", label: "200 – 500 people" },
  { value: "500_plus", label: "500+ people" },
];

const sources = [
  { value: "google", label: "Google search" },
  { value: "referral", label: "Referral / Word of mouth" },
  { value: "social", label: "Social media" },
  { value: "other", label: "Other" },
];

interface FormState {
  organisation_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  industry_hint: string;
  size_hint: string;
  source: string;
  use_case: string;
}

const initialForm: FormState = {
  organisation_name: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  industry_hint: "",
  size_hint: "",
  source: "",
  use_case: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348000000000";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] mb-10 transition-colors"
          >
            <ChevronLeft size={14} />
            Back to home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — info */}
            <div>
              <span className="section-label">Get in touch</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4 mt-2">
                Let&apos;s get you <span className="gradient-text">scanning.</span>
              </h1>
              <p className="text-[var(--foreground-muted)] leading-relaxed mb-8">
                Fill in the form and we&apos;ll be in touch within 24 hours to
                set up a personal demo — or just WhatsApp us directly. We
                onboard most organisations in under two hours.
              </p>

              {/* Contact options */}
              <div className="space-y-4 mb-8">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Attendy%2C%20I%27d%20like%20to%20request%20a%20demo`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--background-card)] hover:border-green-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <MessageCircle size={18} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-green-500 transition-colors">
                      Chat on WhatsApp
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                      Fastest response — usually within 30 minutes
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--background-card)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-center">
                    <QrCode size={18} className="text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      Free first month
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                      No credit card required — cancel anytime
                    </p>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-3">
                  What happens next
                </p>
                <ol className="space-y-2">
                  {[
                    "We receive your request and review your use case",
                    "We WhatsApp or call you within 24 hours",
                    "We activate your free trial account same day",
                    "We walk you through onboarding — usually 1–2 hours",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--foreground-muted)]">
                      <span className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {success ? (
                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    Request received!
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    We&apos;ll be in touch within 24 hours. You can also WhatsApp us
                    directly for a faster response.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <MessageCircle size={15} />
                      WhatsApp us
                    </a>
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-secondary text-sm"
                    >
                      Submit another
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-8 space-y-5"
                  noValidate
                >
                  <h2 className="text-lg font-bold text-[var(--foreground)]">
                    Request a demo
                  </h2>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                      {error}
                    </div>
                  )}

                  {/* Row: org + name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                        Organisation name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="organisation_name"
                        value={form.organisation_name}
                        onChange={handleChange}
                        placeholder="Greenfield Academy"
                        required
                        className="input-attendy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                        Your name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="contact_name"
                        value={form.contact_name}
                        onChange={handleChange}
                        placeholder="Emeka Okafor"
                        required
                        className="input-attendy"
                      />
                    </div>
                  </div>

                  {/* Row: phone + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                        Phone (WhatsApp preferred) <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="contact_phone"
                        value={form.contact_phone}
                        onChange={handleChange}
                        placeholder="08012345678"
                        type="tel"
                        required
                        className="input-attendy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                        Email address
                      </label>
                      <input
                        name="contact_email"
                        value={form.contact_email}
                        onChange={handleChange}
                        placeholder="emeka@school.edu.ng"
                        type="email"
                        className="input-attendy"
                      />
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                      Sector / Industry
                    </label>
                    <select
                      name="industry_hint"
                      value={form.industry_hint}
                      onChange={handleChange}
                      className="input-attendy"
                    >
                      <option value="">Select your sector…</option>
                      {industries.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Size + source */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                        Approximate size
                      </label>
                      <select
                        name="size_hint"
                        value={form.size_hint}
                        onChange={handleChange}
                        className="input-attendy"
                      >
                        <option value="">How many people?</option>
                        {sizes.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                        How did you hear about us?
                      </label>
                      <select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        className="input-attendy"
                      >
                        <option value="">Select one…</option>
                        {sources.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Use case */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--foreground-muted)] mb-1.5">
                      Tell us about your needs <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="use_case"
                      value={form.use_case}
                      onChange={handleChange}
                      placeholder="E.g. We have 400 students and need to send daily SMS to parents about attendance…"
                      rows={4}
                      required
                      className="input-attendy resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "btn-primary w-full py-3.5 text-sm",
                      loading && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <>
                        <Send size={15} />
                        Send request
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-[var(--foreground-muted)]">
                    We respond within 24 hours. WhatsApp is faster.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}