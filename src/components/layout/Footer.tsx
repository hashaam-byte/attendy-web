import Link from "next/link";
import { QrCode } from "lucide-react";
import { FiInstagram as Instagram } from "react-icons/fi";
import { FaTwitter as X, FaLinkedin as Linkedin } from "react-icons/fa";

const footerLinks = {
  Product: [
    { label: "Schools", href: "/#products" },
    { label: "Banks", href: "/#products" },
    { label: "Offices", href: "/#products" },
    { label: "Businesses", href: "/#products" },
    { label: "Events", href: "/#products" },
  ],
  Company: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact Us", href: "/contact" },
    { label: "Request a Demo", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: X, href: "#", label: "Twitter/X" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
                <QrCode size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-[var(--foreground)]">
                Attendy
              </span>
            </Link>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed max-w-xs">
              One scan. Instant notification. Complete record. Built for
              Nigerian schools, banks, offices, businesses, and events.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--foreground-muted)]">
            © {year} Attendy. All rights reserved. Built for Nigeria.
          </p>
          <p className="text-xs text-[var(--foreground-muted)]">
            Powered by{" "}
            <span className="text-[var(--brand-primary)] font-medium">
              Supabase
            </span>{" "}
            ·{" "}
            <span className="text-[var(--brand-primary)] font-medium">
              Termii
            </span>{" "}
            ·{" "}
            <span className="text-[var(--brand-primary)] font-medium">
              Vercel
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}