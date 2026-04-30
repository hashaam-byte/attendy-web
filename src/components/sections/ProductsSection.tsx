"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "education",
    icon: GraduationCap,
    name: "Schools",
    tagline: "Real-time gate scanning & parent SMS",
    description:
      "Students scan their QR ID card at the gate. Parents instantly know their child arrived — or didn't. Teachers take class attendance from their phone.",
    color: "#22c55e",
    darkColor: "#16a34a",
    accentBg: "rgba(34,197,94,0.08)",
    accentBorder: "rgba(34,197,94,0.2)",
    features: [
      "Parent SMS on arrival & absence",
      "QR ID card designer",
      "Class & gate attendance",
      "Welfare alerts",
      "Term reports & PDF export",
    ],
    url: "https://attendy-edu.vercel.app",
    badge: "Flagship",
  },
  {
    id: "banking",
    icon: Building2,
    name: "Banks",
    tagline: "Staff check-in & compliance reporting",
    description:
      "Branch staff clock in and out. Shift management, overtime tracking, and compliance-ready reports for auditors — all in one place.",
    color: "#3b82f6",
    darkColor: "#1d4ed8",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.2)",
    features: [
      "Clock in & clock out",
      "Shift scheduling",
      "Overtime calculator",
      "Branch comparison",
      "PDF compliance reports",
    ],
    url: "https://attendy-bank.vercel.app",
    badge: "Coming soon",
  },
  {
    id: "office",
    icon: Briefcase,
    name: "Offices",
    tagline: "Hybrid work tracking & visitor sign-in",
    description:
      "Track in-office vs remote employees. Visitor sign-in on a reception tablet. Hot desk booking. Emergency headcount mode with a single button.",
    color: "#8b5cf6",
    darkColor: "#6d28d9",
    accentBg: "rgba(139,92,246,0.08)",
    accentBorder: "rgba(139,92,246,0.2)",
    features: [
      "Visitor badge generation",
      "Hot desk map",
      "Remote work logging",
      "Emergency headcount",
      "Occupancy analytics",
    ],
    url: "/contact",
    badge: "Coming soon",
  },
  {
    id: "business",
    icon: Users,
    name: "Businesses",
    tagline: "Workforce attendance with payroll export",
    description:
      "SME workforce attendance with a payroll-ready CSV export. Every employee, every day, clock-in and out, late flags, total hours — ready for payroll.",
    color: "#f59e0b",
    darkColor: "#b45309",
    accentBg: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.2)",
    features: [
      "Payroll-ready CSV export",
      "Leave management",
      "Late deduction flagging",
      "WhatsApp notifications",
      "Contractor support",
    ],
    url: "/contact",
    badge: "Coming soon",
  },
  {
    id: "events",
    icon: Calendar,
    name: "Events",
    tagline: "Live headcount for conferences & events",
    description:
      "Guest check-in for conferences, graduations, and ceremonies. Zone access control, live headcount dashboard, and automatic post-event PDF reports.",
    color: "#f43f5e",
    darkColor: "#be185d",
    accentBg: "rgba(244,63,94,0.08)",
    accentBorder: "rgba(244,63,94,0.2)",
    features: [
      "Zone-based access control",
      "Live headcount dashboard",
      "Ticket transfer / resale",
      "Offline scanner mode",
      "Post-event PDF analytics",
    ],
    url: "/contact",
    badge: "Coming soon",
  },
];

function ProductCard({
  product,
  index,
  inView,
}: {
  product: (typeof products)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = product.icon;
  const isLive = product.id === "education";

  return (
    <div
      className={cn(
        "group relative rounded-2xl border p-6 transition-all duration-700 cursor-pointer",
        "bg-[var(--background-card)] border-[var(--border)]",
        "hover:shadow-lg hover:-translate-y-1",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
        // On hover, border glows with product color
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${product.color}, ${product.darkColor})` }}
      />

      {/* Badge */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: product.accentBg, border: `1px solid ${product.accentBorder}` }}
        >
          <Icon size={22} style={{ color: product.color }} />
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
          style={{
            background: isLive ? "rgba(34,197,94,0.12)" : "var(--background-secondary)",
            color: isLive ? "#22c55e" : "var(--foreground-muted)",
            border: `1px solid ${isLive ? "rgba(34,197,94,0.25)" : "var(--border)"}`,
          }}
        >
          {product.badge}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
        {product.name}
      </h3>
      <p className="text-sm font-medium mb-3" style={{ color: product.color }}>
        {product.tagline}
      </p>
      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-5">
        {product.description}
      </p>

      {/* Features list */}
      <ul className="space-y-1.5 mb-6">
        {product.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: product.color }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={isLive ? product.url : "/contact"}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: product.color }}
      >
        {isLive ? "Try it now" : "Request access"}
        <ChevronRight size={14} />
      </Link>
    </div>
  );
}

export function ProductsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="products" className="py-24 bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Five verticals, one engine</span>
          <h2 className="section-title mb-4">Built for every sector</h2>
          <p className="section-subtitle mx-auto">
            The same proven QR core, purpose-built for each industry. Every
            vertical shares one database — so your admin panel sees everything.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}