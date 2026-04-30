"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, QrCode, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Products", href: "/#products" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] shadow-md group-hover:scale-105 transition-transform duration-200">
                <QrCode size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                Attendy
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle compact />
              <Link
                href="/contact"
                className="btn-primary text-sm px-4 py-2"
              >
                Get Started
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle compact />
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--foreground-muted)] hover:bg-[var(--background-secondary)] hover:text-[var(--foreground)] transition-all"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 border-t border-[var(--border)]",
            "bg-[var(--background)]/95 backdrop-blur-xl",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-all duration-200"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary mt-2 text-sm justify-center"
            >
              Get Started <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}