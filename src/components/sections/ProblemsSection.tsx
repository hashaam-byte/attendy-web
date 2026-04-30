"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const problems = [
  {
    icon: "📋",
    iconBg: "rgba(34,197,94,0.08)",
    iconBorder: "rgba(34,197,94,0.2)",
    title: "Paper registers get lost",
    description:
      "Attendance records are inconsistent, undated, and impossible to query. End-of-month reports take days to compile manually.",
  },
  {
    icon: "🔒",
    iconBg: "rgba(59,130,246,0.08)",
    iconBorder: "rgba(59,130,246,0.2)",
    title: "No real-time visibility",
    description:
      "Managers and parents have no idea who is present until someone manually counts a register — sometimes hours later.",
  },
  {
    icon: "⏰",
    iconBg: "rgba(245,158,11,0.08)",
    iconBorder: "rgba(245,158,11,0.2)",
    title: "Time fraud goes undetected",
    description:
      "Without timestamped, device-verified check-ins, buddy punching and ghost workers are nearly impossible to catch.",
  },
];

export function ProblemSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="section-label">The problem</span>
          <h2 className="section-title mb-4">
            Manual attendance is<br className="hidden sm:block" /> costing everyone.
          </h2>
          <p className="section-subtitle">
            From school gates to office floors, organisations across Nigeria are still
            running on paper registers, Excel sheets and phone calls. It&apos;s slow,
            inaccurate and unscalable.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                "problem-card transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-xl"
                style={{
                  background: p.iconBg,
                  border: `1px solid ${p.iconBorder}`,
                }}
              >
                {p.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}