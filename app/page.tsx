'use client'
import { useState, FormEvent } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07090a;
    --bg-card: #0d1014;
    --bg-card2: #12161a;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.13);
    --text: #eef0f4;
    --muted: #6a7280;
    --muted2: #404856;
    --font-display: 'Bricolage Grotesque', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    --blue: #3b82f6;
    --blue-dim: rgba(59,130,246,0.1);
    --blue-border: rgba(59,130,246,0.25);

    --purple: #8b5cf6;
    --purple-dim: rgba(139,92,246,0.1);
    --purple-border: rgba(139,92,246,0.25);

    --amber: #f59e0b;
    --amber-dim: rgba(245,158,11,0.1);
    --amber-border: rgba(245,158,11,0.25);

    --teal: #14b8a6;
    --teal-dim: rgba(20,184,166,0.1);
    --teal-border: rgba(20,184,166,0.25);

    --rose: #f43f5e;
    --rose-dim: rgba(244,63,94,0.1);
    --rose-border: rgba(244,63,94,0.25);

    --green: #22c55e;
    --green-dim: rgba(34,197,94,0.1);
    --green-border: rgba(34,197,94,0.25);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .noise-overlay {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .grid-overlay {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .container { max-width: 1160px; margin: 0 auto; padding: 0 2rem; }

  /* ── NAV ── */
  .nav-wrap {
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(20px) saturate(150%);
    background: rgba(7,9,10,0.82);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    max-width: 1160px; margin: 0 auto; padding: 0 2rem;
    height: 62px; display: flex; align-items: center; justify-content: space-between;
  }
  .logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: var(--text);
    font-weight: 700; font-size: 19px; letter-spacing: -0.5px;
  }
  .logo-mark {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link {
    color: var(--muted); text-decoration: none; font-size: 14px;
    padding: 7px 13px; border-radius: 8px;
    transition: color 0.15s, background 0.15s;
  }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .nav-cta {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--text); color: #07090a;
    text-decoration: none; font-size: 14px; font-weight: 600;
    padding: 8px 18px; border-radius: 9px; margin-left: 6px;
    transition: opacity 0.15s, transform 0.1s;
  }
  .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    position: relative; z-index: 1;
    max-width: 1160px; margin: 0 auto;
    padding: 120px 2rem 100px;
    text-align: center;
    overflow: hidden;
  }
  .hero-glow-blue {
    position: absolute; top: -120px; left: 30%; transform: translateX(-50%);
    width: 500px; height: 480px;
    background: radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow-purple {
    position: absolute; top: -100px; right: 20%; transform: translateX(50%);
    width: 400px; height: 380px;
    background: radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.2);
    color: #93c5fd;
    font-size: 12px; font-family: var(--font-mono);
    padding: 5px 14px; border-radius: 100px;
    margin-bottom: 28px; letter-spacing: 0.5px;
  }
  .eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #60a5fa;
    animation: blink 2.5s infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .hero h1 {
    font-size: clamp(3rem, 6.5vw, 5.5rem);
    font-weight: 800; letter-spacing: -3px; line-height: 1.0;
    color: #fff; margin-bottom: 22px; position: relative; z-index: 1;
  }
  .hero h1 .grad {
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 18px; color: var(--muted); max-width: 580px;
    margin: 0 auto 50px; line-height: 1.7; font-weight: 400;
    position: relative; z-index: 1;
  }

  .hero-ctas {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; flex-wrap: wrap; margin-bottom: 70px;
    position: relative; z-index: 1;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--text); color: #07090a;
    text-decoration: none; font-size: 15px; font-weight: 700;
    padding: 13px 26px; border-radius: 10px;
    transition: all 0.15s; border: none; cursor: pointer;
    letter-spacing: -0.3px;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--text);
    text-decoration: none; font-size: 15px; font-weight: 500;
    padding: 12px 22px; border-radius: 10px;
    border: 1px solid var(--border-hover);
    transition: all 0.15s; cursor: pointer;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.05); }

  /* ── SCROLL BADGE ── */
  .scroll-indicator {
    position: relative; z-index: 1;
    font-size: 11px; font-family: var(--font-mono);
    color: var(--muted2); letter-spacing: 2px;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px; justify-content: center;
  }
  .scroll-line {
    width: 1px; height: 28px;
    background: linear-gradient(to bottom, transparent, var(--muted2));
    margin: 0 auto;
    display: block; margin-bottom: 10px;
  }

  /* ── PROBLEM SECTION ── */
  .section { position: relative; z-index: 1; padding: 100px 0; }
  .section-label {
    font-family: var(--font-mono); font-size: 11px;
    text-transform: uppercase; letter-spacing: 2px;
    color: var(--muted2); margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::after {
    content: ''; flex: 1; max-width: 60px; height: 1px;
    background: var(--border);
  }
  .section-title {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 700; letter-spacing: -1.2px; color: #fff;
    line-height: 1.1; margin-bottom: 16px;
  }
  .section-sub { font-size: 17px; color: var(--muted); max-width: 560px; line-height: 1.7; }

  .problems-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border); border-radius: 18px;
    overflow: hidden; margin-top: 56px;
  }
  .problem-card {
    background: var(--bg-card); padding: 34px 30px;
    transition: background 0.2s;
  }
  .problem-card:hover { background: var(--bg-card2); }
  .problem-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; font-size: 18px;
  }
  .problem-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 10px; letter-spacing: -0.3px; }
  .problem-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* ── HOW IT WORKS ── */
  .how-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center; margin-top: 56px;
  }
  .how-steps { display: flex; flex-direction: column; gap: 32px; }
  .how-step { display: flex; gap: 20px; align-items: flex-start; }
  .step-num {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: var(--bg-card2); border: 1px solid var(--border-hover);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 12px; color: var(--muted);
    font-weight: 500;
  }
  .step-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 5px; letter-spacing: -0.2px; }
  .step-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }

  .how-visual {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 32px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .scan-card {
    background: var(--bg-card2); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px 18px;
    display: flex; align-items: center; gap: 14px;
  }
  .scan-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .scan-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .scan-meta { font-size: 12px; color: var(--muted); font-family: var(--font-mono); margin-top: 2px; }
  .scan-badge {
    margin-left: auto; font-size: 10px; font-family: var(--font-mono);
    padding: 4px 10px; border-radius: 5px; letter-spacing: 0.5px;
    text-transform: uppercase; white-space: nowrap;
  }

  /* ── VERTICALS ── */
  .verticals-section { padding: 100px 0; position: relative; z-index: 1; }
  .verticals-header { text-align: center; margin-bottom: 60px; }
  .verticals-header .section-label { justify-content: center; }
  .verticals-header .section-label::after { display: none; }
  .verticals-header .section-sub { margin: 0 auto; }

  .verticals-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 16px; margin-bottom: 16px;
  }
  .verticals-grid.row2 {
    grid-template-columns: repeat(2, 1fr);
    max-width: 640px; margin: 0 auto 16px;
  }

  .vertical-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 18px; padding: 28px 26px;
    display: flex; flex-direction: column; gap: 16px;
    text-decoration: none; color: inherit;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    position: relative; overflow: hidden; cursor: pointer;
  }
  .vertical-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--card-accent, transparent);
    opacity: 0.8; transition: opacity 0.2s;
  }
  .vertical-card:hover {
    border-color: var(--border-hover);
    background: var(--bg-card2);
    transform: translateY(-3px);
  }
  .vertical-card:hover::before { opacity: 1; }

  .vertical-icon {
    width: 44px; height: 44px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .vertical-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.4px; }
  .vertical-tagline { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .vertical-features { display: flex; flex-direction: column; gap: 6px; }
  .vertical-feature {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: var(--muted2); font-family: var(--font-mono);
  }
  .vertical-feature::before {
    content: ''; width: 4px; height: 4px;
    border-radius: 50%; background: var(--muted2); flex-shrink: 0;
  }
  .vertical-cta {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; margin-top: auto;
    padding-top: 4px;
  }
  .vertical-cta-arrow {
    width: 16px; height: 16px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
  }

  .custom-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 18px; padding: 32px 36px;
    text-align: center; max-width: 900px; margin: 0 auto;
  }
  .custom-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; letter-spacing: -0.4px; }
  .custom-sub { font-size: 15px; color: var(--muted); margin-bottom: 28px; line-height: 1.6; }
  .custom-form { display: flex; flex-direction: column; gap: 14px; max-width: 520px; margin: 0 auto; }
  .custom-input {
    background: var(--bg-card2); border: 1px solid var(--border);
    border-radius: 10px; padding: 13px 16px;
    font-size: 14px; font-family: var(--font-display);
    color: var(--text); outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .custom-input:focus { border-color: var(--blue-border); }
  .custom-input::placeholder { color: var(--muted2); }
  .custom-textarea {
    resize: vertical; min-height: 90px; line-height: 1.5;
  }
  .custom-btn {
    background: var(--text); color: var(--bg);
    border: none; border-radius: 10px; padding: 13px;
    font-size: 14px; font-weight: 700; font-family: var(--font-display);
    cursor: pointer; transition: opacity 0.15s;
  }
  .custom-btn:hover { opacity: 0.85; }
  .custom-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .success-msg {
    background: var(--green-dim); border: 1px solid var(--green-border);
    color: #86efac; border-radius: 10px; padding: 14px 18px;
    font-size: 14px; text-align: center; line-height: 1.6;
  }

  /* ── FEATURES STRIP ── */
  .features-strip { padding: 80px 0; position: relative; z-index: 1; }
  .features-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
    background: var(--border); border: 1px solid var(--border);
    border-radius: 18px; overflow: hidden; margin-top: 50px;
  }
  .feature-cell {
    background: var(--bg-card); padding: 30px 26px;
    transition: background 0.2s;
  }
  .feature-cell:hover { background: var(--bg-card2); }
  .feature-icon { font-size: 20px; margin-bottom: 14px; display: block; }
  .feature-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 8px; letter-spacing: -0.2px; }
  .feature-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

  /* ── CTA ── */
  .cta-section {
    padding: 120px 2rem; text-align: center;
    position: relative; z-index: 1; overflow: hidden;
  }
  .cta-glow {
    position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%);
    width: 700px; height: 450px;
    background: radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-section h2 {
    font-size: clamp(2rem, 4vw, 3.6rem);
    font-weight: 800; letter-spacing: -2px; color: #fff;
    max-width: 700px; margin: 0 auto 18px; line-height: 1.08;
    position: relative; z-index: 1;
  }
  .cta-section p {
    font-size: 17px; color: var(--muted); max-width: 480px;
    margin: 0 auto 40px; line-height: 1.65; position: relative; z-index: 1;
  }
  .cta-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border); padding: 28px 2rem;
    position: relative; z-index: 1;
  }
  .footer-inner {
    max-width: 1160px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .footer-copy { font-size: 13px; color: var(--muted2); }
  .footer-links { display: flex; gap: 20px; }
  .footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.15s; font-family: var(--font-mono); }
  .footer-links a:hover { color: var(--text); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .problems-grid { grid-template-columns: 1fr; }
    .how-grid { grid-template-columns: 1fr; }
    .how-visual { display: none; }
    .verticals-grid { grid-template-columns: 1fr 1fr; }
    .features-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .verticals-grid { grid-template-columns: 1fr; }
    .verticals-grid.row2 { grid-template-columns: 1fr; max-width: none; }
    .features-grid { grid-template-columns: 1fr; }
    .nav-link.hide-sm { display: none; }
    .hero h1 { letter-spacing: -2px; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .f1 { animation: fadeUp 0.6s ease 0.05s both; }
  .f2 { animation: fadeUp 0.6s ease 0.15s both; }
  .f3 { animation: fadeUp 0.6s ease 0.25s both; }
  .f4 { animation: fadeUp 0.6s ease 0.35s both; }
  .f5 { animation: fadeUp 0.6s ease 0.45s both; }
`

const VERTICALS = [
  {
    id: 'edu',
    name: 'Attendy for Schools',
    tagline: 'QR attendance scanning, instant parent SMS alerts, admin dashboard and reports — built for Nigerian schools.',
    features: ['Student QR ID cards', 'Gate & teacher scanning', 'Live absence dashboard', 'Parent SMS/WhatsApp alerts'],
    url: 'https://attendy-edu.vercel.app',
    accentColor: '#22c55e',
    iconBg: 'rgba(34,197,94,0.1)',
    iconBorder: 'rgba(34,197,94,0.2)',
    ctaColor: '#86efac',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
        <path d="M12 3L1 9l4 2.18V17l7 4 7-4v-5.82L23 9 12 3z"/>
      </svg>
    ),
  },
  {
    id: 'bank',
    name: 'Attendy for Banks',
    tagline: 'Staff attendance, branch check-ins, compliance logs and shift management — built for financial institutions.',
    features: ['Branch-level check-in', 'Shift & overtime tracking', 'Compliance audit logs', 'Multi-branch reporting'],
    url: 'https://attendy-bank.vercel.app',
    accentColor: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.1)',
    iconBorder: 'rgba(59,130,246,0.2)',
    ctaColor: '#93c5fd',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M3 21l18 0M3 10l18 0M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
  },
  {
    id: 'office',
    name: 'Attendy for Offices',
    tagline: 'Employee arrivals, hot desk bookings, visitor logs and hybrid work tracking for modern offices.',
    features: ['Employee check-in/out', 'Visitor management', 'Hot desk tracking', 'Remote/hybrid reporting'],
    url: 'https://attendy-office.vercel.app',
    accentColor: '#8b5cf6',
    iconBg: 'rgba(139,92,246,0.1)',
    iconBorder: 'rgba(139,92,246,0.2)',
    ctaColor: '#c4b5fd',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    id: 'business',
    name: 'Attendy for Businesses',
    tagline: 'Payroll-linked attendance, client visit logs, contractor tracking and workforce analytics for growing businesses.',
    features: ['Payroll-linked clock-in', 'Contractor & temp tracking', 'Client site logs', 'Workforce analytics'],
    url: 'https://attendy-biz.vercel.app',
    accentColor: '#f59e0b',
    iconBg: 'rgba(245,158,11,0.1)',
    iconBorder: 'rgba(245,158,11,0.2)',
    ctaColor: '#fcd34d',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'events',
    name: 'Attendy for Events',
    tagline: 'Guest check-in, ticket validation, real-time headcounts and post-event reports for conferences and ceremonies.',
    features: ['QR ticket scanning', 'Real-time guest count', 'VIP & zone access', 'Post-event analytics'],
    url: 'https://attendy-events.vercel.app',
    accentColor: '#f43f5e',
    iconBg: 'rgba(244,63,94,0.1)',
    iconBorder: 'rgba(244,63,94,0.2)',
    ctaColor: '#fda4af',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
]

const SCAN_ENTRIES = [
  { name: 'Chidi Nwosu', meta: 'JSS 2 · 07:51 AM', status: 'ON TIME', dot: '#22c55e', badgeBg: 'rgba(34,197,94,0.08)', badgeColor: '#4ade80', badgeBorder: 'rgba(34,197,94,0.2)' },
  { name: 'Fatima Bello', meta: 'Branch 004 · 08:02 AM', status: 'ON TIME', dot: '#3b82f6', badgeBg: 'rgba(59,130,246,0.08)', badgeColor: '#93c5fd', badgeBorder: 'rgba(59,130,246,0.2)' },
  { name: 'Olumide Adesanya', meta: 'Office A · 09:14 AM', status: 'LATE', dot: '#f59e0b', badgeBg: 'rgba(245,158,11,0.08)', badgeColor: '#fcd34d', badgeBorder: 'rgba(245,158,11,0.2)' },
  { name: 'Ngozi Obiora', meta: 'Event · 14:30 PM', status: 'CHECKED IN', dot: '#f43f5e', badgeBg: 'rgba(244,63,94,0.08)', badgeColor: '#fda4af', badgeBorder: 'rgba(244,63,94,0.2)' },
]

export default function AttendyWebHome() {
  const [formData, setFormData] = useState({ name: '', email: '', use_case: '', details: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleVerticalClick(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function handleCustomSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.use_case) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 900))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <>
      <style>{styles}</style>
      <div style={{ position: 'relative' }}>
        <div className="noise-overlay" />
        <div className="grid-overlay" />

        {/* NAV */}
        <nav className="nav-wrap">
          <div className="nav-inner">
            <a href="#" className="logo">
              <div className="logo-mark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              Attendy
            </a>
            <div className="nav-links">
              <a href="#how" className="nav-link hide-sm">How it works</a>
              <a href="#verticals" className="nav-link hide-sm">Products</a>
              <a href="#custom" className="nav-link hide-sm">Custom</a>
              <a href="mailto:attendyofficial@gmail.com?subject=Hello from Attendy" className="nav-link hide-sm">Contact</a>
              <a href="#verticals" className="nav-cta">
                Explore products
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-glow-blue" />
          <div className="hero-glow-purple" />

          <div className="eyebrow f1">
            <span className="eyebrow-dot" />
            Smart attendance for every industry
          </div>

          <h1 className="f2">
            Track who shows up.<br />
            <span className="grad">Everywhere.</span>
          </h1>

          <p className="hero-sub f3">
            Attendy is a QR-powered presence tracking platform built for Africa. Schools, banks, offices, businesses, events — one system, tailored for each.
          </p>

          <div className="hero-ctas f4">
            <a href="#verticals" className="btn-primary">
              See all products
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#how" className="btn-outline">How it works</a>
          </div>

          <div className="f5">
            <span className="scroll-line" />
            <span className="scroll-indicator">Scroll to explore</span>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" style={{ paddingTop: 60 }}>
          <div className="container">
            <div className="section-label">The problem</div>
            <h2 className="section-title">Manual attendance is<br />costing everyone.</h2>
            <p className="section-sub">
              From school gates to office floors, organisations across Africa are still running on paper registers, Excel sheets and phone calls. It's slow, inaccurate and unscalable.
            </p>
            <div className="problems-grid">
              {[
                { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', color: '#4ade80', icon: '📋', title: 'Paper registers get lost', desc: 'Attendance records are inconsistent, undated, and impossible to query. End-of-month reports take days to compile manually.' },
                { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', color: '#93c5fd', icon: '🔒', title: 'No real-time visibility', desc: 'Managers and parents have no idea who is present until someone manually counts a register — sometimes hours later.' },
                { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', color: '#fcd34d', icon: '⏰', title: 'Time fraud goes undetected', desc: 'Without timestamped, device-verified check-ins, buddy punching and ghost workers are nearly impossible to catch.' },
              ].map(p => (
                <div className="problem-card" key={p.title}>
                  <div className="problem-icon" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                    <span style={{ fontSize: 18 }}>{p.icon}</span>
                  </div>
                  <div className="problem-title">{p.title}</div>
                  <div className="problem-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="container">
            <div className="section-label">How it works</div>
            <h2 className="section-title">Simple in every context.</h2>
            <p className="section-sub">
              Whether it's a school gate or a bank branch, the core flow is the same — scan a QR code, log the event, notify who needs to know.
            </p>
            <div className="how-grid">
              <div className="how-steps">
                {[
                  { n: '01', title: 'Person gets a QR identity', desc: 'Every user — student, staff, visitor or guest — is issued a unique QR code. Print it on an ID card or share it digitally.' },
                  { n: '02', title: 'QR is scanned on arrival', desc: 'Any smartphone camera serves as the scanner. No dedicated hardware. Works offline and syncs when connected.' },
                  { n: '03', title: 'Event is logged instantly', desc: 'Time-stamped, location-tagged, and stored securely. The live dashboard updates in real time for whoever needs to see it.' },
                  { n: '04', title: 'The right people are notified', desc: 'Parents get an SMS. Managers see a report. HR gets a payroll-ready export. All automatic — zero manual steps.' },
                ].map(s => (
                  <div className="how-step" key={s.n}>
                    <div className="step-num">{s.n}</div>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="how-visual">
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted2)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
                  Live scan feed
                </div>
                {SCAN_ENTRIES.map((entry, i) => (
                  <div className="scan-card" key={i}>
                    <span className="scan-dot" style={{ background: entry.dot, boxShadow: `0 0 5px ${entry.dot}` }} />
                    <div>
                      <div className="scan-name">{entry.name}</div>
                      <div className="scan-meta">{entry.meta}</div>
                    </div>
                    <span className="scan-badge" style={{ background: entry.badgeBg, color: entry.badgeColor, border: `1px solid ${entry.badgeBorder}` }}>
                      {entry.status}
                    </span>
                  </div>
                ))}
                <div style={{ textAlign: 'center', paddingTop: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted2)' }}>
                    4 scans across 4 products — one platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VERTICALS */}
        <section className="verticals-section" id="verticals">
          <div className="container">
            <div className="verticals-header">
              <div className="section-label" style={{ justifyContent: 'center' }}>Products</div>
              <h2 className="section-title" style={{ textAlign: 'center' }}>Attendy for every industry.</h2>
              <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>
                Each product is purpose-built for its context — same reliable engine, different interface, different workflows.
              </p>
            </div>

            <div className="verticals-grid">
              {VERTICALS.slice(0, 3).map(v => (
                <div
                  key={v.id}
                  className="vertical-card"
                  style={{ '--card-accent': v.accentColor } as any}
                  onClick={() => handleVerticalClick(v.url)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleVerticalClick(v.url)}
                >
                  <div className="vertical-icon" style={{ background: v.iconBg, border: `1px solid ${v.iconBorder}` }}>
                    {v.icon}
                  </div>
                  <div>
                    <div className="vertical-name">{v.name}</div>
                    <div className="vertical-tagline" style={{ marginTop: 6 }}>{v.tagline}</div>
                  </div>
                  <div className="vertical-features">
                    {v.features.map(f => (
                      <div className="vertical-feature" key={f}>{f}</div>
                    ))}
                  </div>
                  <div className="vertical-cta" style={{ color: v.ctaColor }}>
                    Open {v.name.split(' ').pop()}
                    <div className="vertical-cta-arrow" style={{ background: v.iconBg, border: `1px solid ${v.iconBorder}` }}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="verticals-grid row2">
              {VERTICALS.slice(3).map(v => (
                <div
                  key={v.id}
                  className="vertical-card"
                  style={{ '--card-accent': v.accentColor } as any}
                  onClick={() => handleVerticalClick(v.url)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleVerticalClick(v.url)}
                >
                  <div className="vertical-icon" style={{ background: v.iconBg, border: `1px solid ${v.iconBorder}` }}>
                    {v.icon}
                  </div>
                  <div>
                    <div className="vertical-name">{v.name}</div>
                    <div className="vertical-tagline" style={{ marginTop: 6 }}>{v.tagline}</div>
                  </div>
                  <div className="vertical-features">
                    {v.features.map(f => (
                      <div className="vertical-feature" key={f}>{f}</div>
                    ))}
                  </div>
                  <div className="vertical-cta" style={{ color: v.ctaColor }}>
                    Open {v.name.split(' ').pop()}
                    <div className="vertical-cta-arrow" style={{ background: v.iconBg, border: `1px solid ${v.iconBorder}` }}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOM REQUEST */}
        <section className="section" id="custom" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="custom-card">
              <div className="custom-title">Don't see your use case?</div>
              <div className="custom-sub">
                Attendy can be adapted for clinics, universities, churches, warehouses, government agencies and more. Tell us what you need.
              </div>

              {submitted ? (
                <div className="success-msg">
                  Thanks! We've received your request and will reach out within 48 hours. If you need faster support, email us at <strong>attendyofficial@gmail.com</strong>.
                </div>
              ) : (
                <form className="custom-form" onSubmit={handleCustomSubmit}>
                  <input
                    className="custom-input"
                    type="text"
                    placeholder="Your name *"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <input
                    className="custom-input"
                    type="email"
                    placeholder="Your email address *"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                  <input
                    className="custom-input"
                    type="text"
                    placeholder="Your organisation / use case (e.g. clinic, warehouse, church) *"
                    value={formData.use_case}
                    onChange={e => setFormData(p => ({ ...p, use_case: e.target.value }))}
                    required
                  />
                  <textarea
                    className="custom-input custom-textarea"
                    placeholder="Describe how you'd like Attendy to work for you..."
                    value={formData.details}
                    onChange={e => setFormData(p => ({ ...p, details: e.target.value }))}
                  />
                  <button
                    type="submit"
                    className="custom-btn"
                    disabled={submitting || !formData.name || !formData.email || !formData.use_case}
                  >
                    {submitting ? 'Sending request...' : 'Submit request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FEATURES STRIP */}
        <section className="features-strip">
          <div className="container">
            <div className="section-label">Platform features</div>
            <h2 className="section-title">One engine. Every context.</h2>
            <div className="features-grid">
              {[
                { icon: '⚡', title: 'Real-time dashboards', desc: 'Presence data streams live. No refreshing, no manual counts — just truth.' },
                { icon: '📱', title: 'Any smartphone', desc: 'No dedicated scanners. Any Android or iPhone camera works out of the box.' },
                { icon: '💬', title: 'SMS & WhatsApp alerts', desc: 'Automated notifications reach the right people the moment a scan happens.' },
                { icon: '📊', title: 'Exportable reports', desc: 'CSV, PDF and Excel exports. Payroll-ready or compliance-ready in one click.' },
                { icon: '🔐', title: 'Role-based access', desc: 'Admins, managers, staff and guests all see exactly what they need to — nothing more.' },
                { icon: '☁️', title: 'Cloud & offline sync', desc: 'Works in low-connectivity environments. Syncs automatically when back online.' },
                { icon: '🏢', title: 'Multi-location ready', desc: 'Manage dozens of branches, classrooms or sites from one central dashboard.' },
                { icon: '🔗', title: 'API & integrations', desc: 'Connect to HR software, payroll systems, ERPs and custom workflows via REST API.' },
              ].map(f => (
                <div className="feature-cell" key={f.title}>
                  <span className="feature-icon">{f.icon}</span>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-glow" />
          <h2>Your attendance problem is solved. Pick your industry.</h2>
          <p>Setup in under a day. No hardware needed. Built for Africa, works anywhere.</p>
          <div className="cta-actions">
            <a href="#verticals" className="btn-primary">
              See all products
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="mailto:attendyofficial@gmail.com?subject=I want a demo of Attendy" className="btn-outline">
              Book a demo
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--muted)' }}>
              <div style={{ width: 24, height: 24, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Attendy</span>
            </a>
            <p className="footer-copy">© {new Date().getFullYear()} Attendy. Presence tracking for Africa.</p>
            <div className="footer-links">
              <a href="mailto:attendyofficial@gmail.com">Support</a>
              <a href="mailto:hashcody63@gmail.com">Developer</a>
              <a href="https://attendy-edu.vercel.app" target="_blank" rel="noopener noreferrer">Schools</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}