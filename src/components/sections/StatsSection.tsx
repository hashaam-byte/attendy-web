"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const stats = [
  { value: 12000, suffix: "+", label: "Scans logged daily",       color: "#60a5fa" },
  { value: 340,   suffix: "+", label: "Organisations onboarded",  color: "#a78bfa" },
  { value: 5,     suffix: "",  label: "Industries served",         color: "#4ade80" },
  { value: 99.9,  suffix: "%", label: "Platform uptime",           color: "#fcd34d", decimals: 1 },
];

function AnimatedNumber({
  end,
  suffix,
  decimals = 0,
  color,
  started,
}: {
  end: number;
  suffix: string;
  decimals?: number;
  color: string;
  started: boolean;
}) {
  const [val, setVal] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * end);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [started, end]);

  const display =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString();

  return (
    <span
      className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-2 block"
      style={{ color }}
    >
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "stat-cell",
                inView ? "opacity-100" : "opacity-0",
                "transition-opacity duration-700"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <AnimatedNumber
                end={s.value}
                suffix={s.suffix}
                decimals={s.decimals}
                color={s.color}
                started={inView}
              />
              <span className="text-xs font-mono tracking-wide text-[var(--foreground-muted)] text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}