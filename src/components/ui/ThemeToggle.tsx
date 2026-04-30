"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
] as const;

interface ThemeToggleProps {
  className?: string;
  compact?: boolean; // show icons only, no labels
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a skeleton to avoid layout shift
    return (
      <div
        className={cn(
          "flex items-center rounded-xl border p-1 gap-0.5",
          "border-[var(--border)] bg-[var(--background-secondary)]",
          className
        )}
        aria-hidden
      >
        {themes.map((t) => (
          <div
            key={t.value}
            className={cn(
              "rounded-lg flex items-center justify-center",
              compact ? "w-8 h-8" : "px-3 py-1.5"
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-xl border p-1 gap-0.5",
        "border-[var(--border)] bg-[var(--background-secondary)]",
        className
      )}
      role="group"
      aria-label="Theme selector"
    >
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
            aria-label={`${label} mode`}
            className={cn(
              "rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
              compact
                ? "w-8 h-8 flex items-center justify-center"
                : "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium",
              isActive
                ? "bg-[var(--background-card)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-card)]"
            )}
          >
            <Icon size={14} />
            {!compact && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}