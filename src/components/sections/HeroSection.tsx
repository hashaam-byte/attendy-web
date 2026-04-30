"use client";

import Link from "next/link";
import { ChevronRight, Zap, Shield, BarChart3 } from "lucide-react";
import { ScanCounter } from "@/components/ui/ScanCounter";

const floatingBadges = [
  {
    icon: Zap,
    text: "Instant SMS alerts",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    position: "top-[15%] left-[5%] md:left-[8%]",
    delay: "0.8s",
  },
  {
    icon: Shield,
    text: "Offline scanner",
    color: "text-green-500",
    bg: "bg-green-500/10 border-green-500/20",
    position: "top-[20%] right-[5%] md:right-[8%]",
    delay: "1.0s",
  },
  {
    icon: BarChart3,
    text: "Live dashboard",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    position: "bottom-[25%] left-[3%] md:left-[6%]",
    delay: "1.2s",
  },
];

export function HeroSection() {
  return (
    <section className="relative hero-bg min-h-[92vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Floating badges — hidden on very small screens */}
      {floatingBadges.map(({ icon: Icon, text, color, bg, position, delay }) => (
        <div
          key={text}
          className={`absolute hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium backdrop-blur-sm ${bg} ${position}`}
          style={{
            animation: `float 4s ease-in-out infinite`,
            animationDelay: delay,
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <Icon size={13} className={color} />
          <span className="text-[var(--foreground)]">{text}</span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live scan counter */}
        <div className="flex justify-center mb-8 animate-in" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
          <ScanCounter />
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 animate-in"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          <span className="text-[var(--foreground)]">Attendance tracking</span>
          <br />
          <span className="gradient-text">built for Nigeria.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10 leading-relaxed animate-in"
          style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
        >
          One QR scan. Instant SMS to parents or HR. Complete records on your
          dashboard. Purpose-built for schools, banks, offices, businesses, and
          events.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        >
          <Link href="/contact" className="btn-primary text-base px-7 py-3.5 w-full sm:w-auto">
            Request a Demo
            <ChevronRight size={16} />
          </Link>
          <Link href="/#products" className="btn-secondary text-base px-7 py-3.5 w-full sm:w-auto">
            See Products
          </Link>
        </div>

        {/* Trust line */}
        <p
          className="mt-8 text-xs text-[var(--foreground-muted)] animate-in"
          style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
        >
          Free first month · No setup fee · Cancel anytime
        </p>

        {/* Mock phone mockup showing scan success */}
        <div
          className="mt-16 relative mx-auto max-w-sm animate-in"
          style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="relative rounded-3xl border-2 border-[var(--border)] bg-[var(--background-card)] p-6 shadow-xl">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: "var(--glow-brand)" }} />

            {/* Screen content */}
            <div className="relative z-10 space-y-4">
              {/* Scanner area */}
              <div className="aspect-square rounded-2xl bg-[var(--background-secondary)] flex items-center justify-center border border-[var(--border)] relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-[var(--brand-primary)] rounded-xl opacity-40" />
                {/* Scan line animation */}
                <div
                  className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent"
                  style={{ animation: "scanLine 2s ease-in-out infinite" }}
                />
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-[var(--background)] border border-[var(--border)] grid grid-cols-3 gap-1 p-2">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm"
                        style={{
                          background: [0,1,3,4,5,8].includes(i)
                            ? "var(--brand-primary)"
                            : "transparent",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)]">Scanning…</p>
                </div>
              </div>

              {/* Success card */}
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <span className="text-lg">✓</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-green-500">On time</p>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Emeka Okafor · JSS 2B · 7:34 AM
                  </p>
                </div>
              </div>

              {/* SMS sent indicator */}
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                SMS sent to parent · +234 803 *** 5467
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0%   { top: 16px; }
          50%  { top: calc(100% - 16px); }
          100% { top: 16px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50%       { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}