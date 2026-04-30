"use client";

import Link from "next/link";
import { ChevronRight, Zap, Shield, BarChart3 } from "lucide-react";
import { ScanCounter } from "@/components/ui/ScanCounter";

const floatingBadges = [
  { icon: Zap,        text: "Instant SMS alerts", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20", position: "top-[18%] left-[4%] md:left-[7%]",   delay: "0.8s" },
  { icon: Shield,     text: "Offline scanner",    color: "text-green-500",  bg: "bg-green-500/10 border-green-500/20",   position: "top-[18%] right-[4%] md:right-[7%]", delay: "1.0s" },
  { icon: BarChart3,  text: "Live dashboard",     color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",     position: "bottom-[22%] left-[2%] md:left-[5%]", delay: "1.2s" },
];

const trustItems = [
  { dot: "#22c55e", label: "No hardware needed" },
  { dot: "#3b82f6", label: "Setup in under a day" },
  { dot: "#8b5cf6", label: "Works offline" },
  { dot: "#f59e0b", label: "5 industries covered" },
];

export function HeroSection() {
  return (
    <section className="relative hero-bg min-h-[94vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />

      {/* Floating badges */}
      {floatingBadges.map(({ icon: Icon, text, color, bg, position, delay }) => (
        <div
          key={text}
          className={`absolute hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium backdrop-blur-sm ${bg} ${position}`}
          style={{ animation: `float 4s ease-in-out infinite`, animationDelay: delay, opacity: 0, animationFillMode: "forwards" }}
        >
          <Icon size={13} className={color} />
          <span className="text-[var(--foreground)]">{text}</span>
        </div>
      ))}

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Live counter */}
        <div className="flex justify-center mb-8 animate-in delay-100">
          <ScanCounter />
        </div>

        {/* Eyebrow */}
        <div className="flex justify-center mb-6 animate-in delay-100">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wide border" style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.2)", color: "#93c5fd" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Built for Africa · QR-powered presence tracking
          </span>
        </div>

        {/* Headline — best of both versions */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] mb-6 animate-in"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          <span className="text-[var(--foreground)]">Track who shows up.</span>
          <br />
          <span className="gradient-text">Everywhere.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10 leading-relaxed animate-in"
          style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
        >
          One QR scan. Instant SMS to parents or HR. Complete records on your
          dashboard. Purpose-built for schools, banks, offices, businesses, and events.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-in"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        >
          <Link href="/#products" className="btn-primary text-base px-7 py-3.5 w-full sm:w-auto">
            See all products
            <ChevronRight size={16} />
          </Link>
          <Link href="/contact" className="btn-secondary text-base px-7 py-3.5 w-full sm:w-auto">
            Request a demo
          </Link>
        </div>

        {/* Trust strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 animate-in"
          style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
        >
          {trustItems.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] font-mono">
              {i !== 0 && <span className="hidden sm:inline w-px h-3.5 bg-[var(--border)]" />}
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.dot }} />
              {item.label}
            </span>
          ))}
        </div>

        {/* Phone mockup */}
        <div
          className="mt-16 relative mx-auto max-w-xs animate-in"
          style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="relative rounded-3xl border-2 border-[var(--border)] bg-[var(--background-card)] p-6 shadow-xl" style={{ boxShadow: "var(--glow-brand)" }}>
            <div className="relative z-10 space-y-4">
              {/* Scanner area */}
              <div className="aspect-square rounded-2xl bg-[var(--background-secondary)] flex items-center justify-center border border-[var(--border)] relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-[var(--brand-primary)] rounded-xl opacity-40" />
                <div
                  className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent"
                  style={{ animation: "scanLine 2s ease-in-out infinite" }}
                />
                <div className="text-center z-10">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-[var(--background)] border border-[var(--border)] grid grid-cols-3 gap-0.5 p-2">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="rounded-[2px]" style={{ background: [0,1,3,5,6,7,8].includes(i) ? "var(--brand-primary)" : "transparent" }} />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)]">Scanning…</p>
                </div>
              </div>

              {/* Success */}
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 text-green-500 font-bold">✓</div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-green-500">On time</p>
                  <p className="text-xs text-[var(--foreground-muted)]">Emeka Okafor · JSS 2B · 7:34 AM</p>
                </div>
              </div>

              {/* SMS */}
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                SMS sent to parent · +234 803 *** 5467
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}