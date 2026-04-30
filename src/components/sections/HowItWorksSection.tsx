"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const steps = [
  { n: "01", title: "Person gets a QR identity", desc: "Every user — student, staff member, or guest — is issued a unique QR code. Print it on an ID card or share it digitally. One card, every door." },
  { n: "02", title: "QR is scanned on arrival", desc: "Any smartphone camera serves as the scanner. No dedicated hardware needed. Works offline and syncs automatically when connected." },
  { n: "03", title: "Event is logged instantly", desc: "Time-stamped and stored securely. The live dashboard updates in real time for whoever needs to see it — parent, HR, or event organiser." },
  { n: "04", title: "The right people are notified", desc: "Parents get an SMS. Managers see a report. HR gets a payroll-ready export. All automatic — zero manual steps required." },
];

const scanFeed = [
  { name: "Chidi Nwosu",      meta: "JSS 2 · 07:51 AM",           status: "ON TIME",    dot: "#22c55e", badgeBg: "rgba(34,197,94,0.10)",   badgeColor: "#4ade80", badgeBorder: "rgba(34,197,94,0.25)"   },
  { name: "Fatima Bello",     meta: "First Bank HQ · 08:02 AM",    status: "ON TIME",    dot: "#3b82f6", badgeBg: "rgba(59,130,246,0.10)",  badgeColor: "#93c5fd", badgeBorder: "rgba(59,130,246,0.25)"  },
  { name: "Olumide Adesanya", meta: "Office Floor 3 · 09:14 AM",   status: "LATE",       dot: "#f59e0b", badgeBg: "rgba(245,158,11,0.10)", badgeColor: "#fcd34d", badgeBorder: "rgba(245,158,11,0.25)" },
  { name: "Ngozi Obiora",     meta: "TechSummit Lagos · 14:30",    status: "CHECKED IN", dot: "#f43f5e", badgeBg: "rgba(244,63,94,0.10)",  badgeColor: "#fda4af", badgeBorder: "rgba(244,63,94,0.25)"  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: feedRef, inView: feedInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="how-it-works" className="py-24 bg-[var(--background-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="section-label">How it works</span>
          <h2 className="section-title mb-4">Simple in every context.</h2>
          <p className="section-subtitle">Whether it&apos;s a school gate or a bank branch, the core flow is the same — scan, log, notify.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className="flex flex-col gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className={cn("flex gap-5 transition-all duration-700", inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6")} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-[var(--background-card)] border border-[var(--border)] text-[11px] font-mono font-semibold text-[var(--foreground-muted)]">{s.n}</div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-1.5">{s.title}</h3>
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={feedRef} className={cn("rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6 transition-all duration-700", feedInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6")} style={{ boxShadow: "var(--shadow-lg)" }}>
            <div className="flex items-center gap-2 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)]">Live scan feed</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {scanFeed.map((entry, i) => (
                <div key={entry.name} className={cn("scan-card transition-all duration-500", feedInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{ transitionDelay: `${i * 80 + 200}ms` }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.dot, boxShadow: `0 0 6px ${entry.dot}` }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">{entry.name}</p>
                    <p className="text-xs font-mono text-[var(--foreground-muted)]">{entry.meta}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0" style={{ background: entry.badgeBg, color: entry.badgeColor, border: `1px solid ${entry.badgeBorder}` }}>{entry.status}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] font-mono text-[var(--foreground-muted)] mt-5 pt-4 border-t border-[var(--border)]">
              4 scans · 4 products · 1 platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}