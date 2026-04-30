"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    q: "Do students or staff need a smartphone to use Attendy?",
    a: "No. Members only need their printed QR card — a small laminated card or a sticker. The scanner device (a phone or tablet held by the gateman, security, or receptionist) is the only device that needs to be online.",
  },
  {
    q: "What happens if the internet goes down at the gate?",
    a: "The scanner page works offline. It caches the full member list when it loads. If the internet drops, scans are queued locally in the browser and sync automatically when the connection returns. A yellow banner shows 'Offline — syncing when connected'.",
  },
  {
    q: "How do parents receive notifications?",
    a: "Parents receive an SMS (and optionally a WhatsApp message) the moment their child's QR card is scanned at the gate. If the child hasn't arrived by a configurable time (e.g. 9:00 AM), an absence alert is sent automatically. No app needed on the parent's phone.",
  },
  {
    q: "Is our data secure?",
    a: "Yes. Data is stored in Supabase, a SOC 2 Type II compliant platform. Row Level Security (RLS) is enforced at the database level — each school or business only ever sees its own data. Attendy staff can see aggregate platform statistics but never individual student or employee records without explicit access.",
  },
  {
    q: "Can we use Attendy for multiple branches or campuses?",
    a: "Yes. Multi-branch support is available on Standard and Premium plans. Each branch is a separate organisation in the system, and a head-office admin can compare attendance across all branches in the dashboard.",
  },
  {
    q: "How long does setup take?",
    a: "For a typical school: 1–2 hours. You sign up, we activate your account (same day), you bulk-import your students via CSV, print their QR cards, and the gateman is scanning by the next morning. No hardware purchase needed.",
  },
  {
    q: "What happens when we reach our plan's member or SMS limit?",
    a: "Limits are enforced automatically. When you try to add more members than your plan allows, the system prompts you to upgrade. SMS overage is blocked (not charged) — you'll see a warning in your dashboard. This means you're never surprised by a large bill.",
  },
  {
    q: "Can we try Attendy before paying?",
    a: "Yes. Every new organisation gets a free first month on the Standard plan. No credit card required to start. After the trial, you choose and pay for the plan that fits.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors duration-200">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-[var(--foreground-muted)] transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-48 pb-5" : "max-h-0"
        )}
      >
        <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">FAQ</span>
          <h2 className="section-title mb-4">Common questions</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know before getting started.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "max-w-3xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-8 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}