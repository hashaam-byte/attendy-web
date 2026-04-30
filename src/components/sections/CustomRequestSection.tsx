"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Send, CheckCircle2 } from "lucide-react";

export function CustomRequestSection() {
  const [form, setForm] = useState({ name: "", email: "", use_case: "", details: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const valid =
    form.name.trim().length > 1 &&
    form.email.includes("@") &&
    form.use_case.trim().length > 2;

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    if (error) setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/custom-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-8 py-12 text-center overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent)" }}
          />

          {submitted ? (
            <div className="max-w-md mx-auto">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Request received!</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                We&apos;ll reach out within 48 hours at{" "}
                <strong className="text-[var(--foreground)]">{form.email}</strong>. For faster
                support, WhatsApp us directly.
              </p>
            </div>
          ) : (
            <>
              <span className="section-label">Custom request</span>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Don&apos;t see your use case?
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
                Attendy can be adapted for clinics, universities, churches, warehouses,
                government agencies and more. Tell us what you need — we build custom verticals.
              </p>

              <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto flex flex-col gap-4"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="input-attendy"
                    type="text"
                    placeholder="Your name *"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    maxLength={80}
                  />
                  <input
                    className="input-attendy"
                    type="email"
                    placeholder="Email address *"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                </div>
                <input
                  className="input-attendy"
                  type="text"
                  placeholder="Your organisation / use case (e.g. clinic, church, warehouse) *"
                  value={form.use_case}
                  onChange={(e) => update("use_case", e.target.value)}
                  required
                  maxLength={120}
                />
                <div>
                  <textarea
                    className="input-attendy resize-none"
                    placeholder="Describe how you'd like Attendy to work for you…"
                    value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    maxLength={800}
                    rows={4}
                  />
                  <p className="text-right text-[10px] text-[var(--foreground-muted)] mt-1 font-mono">
                    {form.details.length}/800
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className={cn(
                    "btn-primary w-full py-3.5 text-sm",
                    (!valid || submitting) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit request
                    </>
                  )}
                </button>
                <p className="text-xs text-[var(--foreground-muted)] font-mono">
                  We respond within 48 hours · No spam, ever
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}