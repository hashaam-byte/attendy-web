"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { Check, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Basic",
    price: 12000,
    description: "Small schools and businesses just getting started.",
    limits: {
      members: 100,
      sms: 500,
      admins: 2,
    },
    features: [
      { text: "Up to 100 members / students", included: true },
      { text: "500 SMS alerts per month", included: true },
      { text: "2 admin accounts", included: true },
      { text: "Gate / entry scanning", included: true },
      { text: "Parent portal", included: true },
      { text: "CSV export", included: true },
      { text: "Class attendance (edu)", included: false },
      { text: "PDF reports", included: false },
      { text: "QR card designer", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Standard",
    price: 20000,
    description: "Growing schools, branches, and SMEs that need full features.",
    limits: {
      members: 500,
      sms: 2000,
      admins: 10,
    },
    features: [
      { text: "Up to 500 members / students", included: true },
      { text: "2,000 SMS alerts per month", included: true },
      { text: "10 admin / staff accounts", included: true },
      { text: "Gate / entry scanning", included: true },
      { text: "Parent portal", included: true },
      { text: "CSV export", included: true },
      { text: "Class attendance (edu)", included: true },
      { text: "PDF reports & QR card designer", included: true },
      { text: "WhatsApp notifications", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start free trial",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Premium",
    price: 35000,
    description:
      "Multi-branch organisations that need advanced analytics and priority support.",
    limits: {
      members: 2000,
      sms: 10000,
      admins: 50,
    },
    features: [
      { text: "Up to 2,000 members / students", included: true },
      { text: "10,000 SMS alerts per month", included: true },
      { text: "50 admin / staff accounts", included: true },
      { text: "Gate / entry scanning", included: true },
      { text: "Parent portal", included: true },
      { text: "CSV & PDF export", included: true },
      { text: "Class attendance (edu)", included: true },
      { text: "QR card designer", included: true },
      { text: "WhatsApp notifications", included: true },
      { text: "Priority WhatsApp support", included: true },
    ],
    cta: "Start free trial",
    highlighted: false,
  },
];

function PriceCard({
  tier,
  index,
  inView,
}: {
  tier: (typeof tiers)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-8 transition-all duration-700 flex flex-col",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        tier.highlighted
          ? "border-[var(--brand-primary)] bg-gradient-to-b from-[var(--background-card)] to-[rgba(99,102,241,0.04)] shadow-[var(--shadow-xl)]"
          : "border-[var(--border)] bg-[var(--background-card)]"
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Popular badge */}
      {tier.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
            <Zap size={10} />
            {(tier as typeof tiers[1]).badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{tier.name}</h3>
        <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[var(--foreground-muted)]">₦</span>
          <span className="text-4xl font-bold text-[var(--foreground)]">
            {tier.price.toLocaleString()}
          </span>
          <span className="text-sm text-[var(--foreground-muted)]">/month</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Members", value: tier.limits.members.toLocaleString() },
            { label: "SMS/mo", value: tier.limits.sms.toLocaleString() },
            { label: "Admins", value: tier.limits.admins },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="text-center px-2 py-2 rounded-lg bg-[var(--background-secondary)]"
            >
              <div className="text-sm font-bold text-[var(--foreground)]">{value}</div>
              <div className="text-[10px] text-[var(--foreground-muted)]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-8">
        {tier.features.map(({ text, included }) => (
          <li key={text} className="flex items-start gap-2.5 text-sm">
            {included ? (
              <Check size={15} className="text-green-500 shrink-0 mt-0.5" />
            ) : (
              <X size={15} className="text-[var(--border-strong)] shrink-0 mt-0.5" />
            )}
            <span
              className={
                included ? "text-[var(--foreground)]" : "text-[var(--foreground-muted)] line-through"
              }
            >
              {text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className={cn(
          "text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 border",
          tier.highlighted
            ? "btn-primary border-transparent"
            : "btn-secondary hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
        )}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

export function PricingSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" className="py-24 bg-[var(--background-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Transparent pricing</span>
          <h2 className="section-title mb-4">Simple plans, all in Naira</h2>
          <p className="section-subtitle mx-auto">
            Every plan includes a free first month. Limits are enforced per
            organisation — upgrade anytime from your dashboard.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {tiers.map((tier, i) => (
            <PriceCard key={tier.name} tier={tier} index={i} inView={inView} />
          ))}
        </div>

        {/* Enterprise */}
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
              Enterprise
            </h3>
            <p className="text-sm text-[var(--foreground-muted)] max-w-lg">
              Unlimited members, custom SMS volumes, multi-branch setup, and a
              dedicated account manager. Starting at ₦80,000/month.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0 text-sm">
            Talk to us
          </Link>
        </div>

        {/* Note on limits */}
        <p className="text-center text-xs text-[var(--foreground-muted)] mt-6">
          Subscription limits are automatically enforced. Adding more members than your
          plan allows will prompt an upgrade. SMS overage is blocked — not billed.
        </p>
      </div>
    </section>
  );
}