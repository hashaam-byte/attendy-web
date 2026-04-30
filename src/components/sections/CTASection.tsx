"use client";

import Link from "next/link";
import { MessageCircle, ChevronRight } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348000000000";

export function CTASection() {
  return (
    <section className="py-24 bg-[var(--background-secondary)] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-30 dark:opacity-10" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-label">Ready to start?</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
          <span className="text-[var(--foreground)]">Let&apos;s get your organisation</span>
          <br />
          <span className="gradient-text">scanning by tomorrow.</span>
        </h2>
        <p className="text-lg text-[var(--foreground-muted)] max-w-xl mx-auto mb-10">
          Free first month. Personal onboarding. We&apos;ll have your school, bank, or
          office live in under two hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
            Request a Demo
            <ChevronRight size={16} />
          </Link>
          <a
            href={`https://wa.me/${+2348077291745}?text=Hi%20Attendy%2C%20I%27d%20like%20to%20learn%20more`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} className="text-green-500" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-8 text-xs text-[var(--foreground-muted)]">
          Nigerian-built · Supabase-powered · Response within 24 hours
        </p>
      </div>
    </section>
  );
}