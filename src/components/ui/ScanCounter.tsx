"use client";

import { useEffect, useState, useRef } from "react";
import { Activity } from "lucide-react";

interface ScanCounterProps {
  className?: string;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
  return n.toLocaleString();
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (target === 0) return;
    const start = Date.now();
    const startVal = count;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + (target - startVal) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return count;
}

export function ScanCounter({ className }: ScanCounterProps) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const displayed = useCountUp(total);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/scan-count");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setTotal(data.count ?? 0);
      } catch {
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }
    fetchCount();
    // Re-fetch every 5 minutes
    const id = setInterval(fetchCount, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={className}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-secondary)] border border-[var(--border)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <Activity size={13} className="text-[var(--foreground-muted)]" />
        <span className="text-sm font-medium text-[var(--foreground)]">
          {loading ? (
            <span className="inline-block w-20 h-4 rounded skeleton" />
          ) : (
            <>
              <span className="gradient-text font-bold">{formatNumber(displayed)}</span>
              <span className="text-[var(--foreground-muted)] font-normal ml-1">
                scans logged across Nigeria
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}