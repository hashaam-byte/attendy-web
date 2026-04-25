'use client'
import Nav from '../components/Nav'
import ScrollReveal from '../components/ScrollReveal'
import AnimatedCounter from '../components/AnimatedCounter'
import CustomRequestForm from '../components/CustomRequestForm'

/* ─── DATA ──────────────────────────────────────────────── */

const VERTICALS = [
  {
    id: 'edu',
    name: 'Attendy for Schools',
    short: 'Schools',
    tagline: 'QR attendance scanning, instant parent SMS alerts, admin dashboard and reports — built for Nigerian schools.',
    features: ['Student QR ID cards', 'Gate & teacher scanning', 'Live absence dashboard', 'Parent SMS/WhatsApp alerts'],
    url: 'https://attendy-edu.vercel.app',
    accent: '#22c55e',
    iconBg: 'rgba(34,197,94,0.1)',
    iconBorder: 'rgba(34,197,94,0.2)',
    ctaColor: '#86efac',
    status: 'Live',
    statusColor: '#4ade80',
    statusBg: 'rgba(34,197,94,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
        <path d="M12 3L1 9l4 2.18V17l7 4 7-4v-5.82L23 9 12 3z"/>
      </svg>
    ),
  },
  {
    id: 'bank',
    name: 'Attendy for Banks',
    short: 'Banks',
    tagline: 'Staff attendance, branch check-ins, compliance logs and shift management — built for financial institutions.',
    features: ['Branch-level check-in', 'Shift & overtime tracking', 'Compliance audit logs', 'Multi-branch reporting'],
    url: 'https://attendy-bank.vercel.app',
    accent: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.1)',
    iconBorder: 'rgba(59,130,246,0.2)',
    ctaColor: '#93c5fd',
    status: 'Live',
    statusColor: '#60a5fa',
    statusBg: 'rgba(59,130,246,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
  },
  {
    id: 'office',
    name: 'Attendy for Offices',
    short: 'Offices',
    tagline: 'Employee arrivals, hot desk bookings, visitor logs and hybrid work tracking for modern offices.',
    features: ['Employee check-in/out', 'Visitor management', 'Hot desk tracking', 'Remote/hybrid reporting'],
    url: 'https://attendy-office.vercel.app',
    accent: '#8b5cf6',
    iconBg: 'rgba(139,92,246,0.1)',
    iconBorder: 'rgba(139,92,246,0.2)',
    ctaColor: '#c4b5fd',
    status: 'Live',
    statusColor: '#a78bfa',
    statusBg: 'rgba(139,92,246,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    id: 'biz',
    name: 'Attendy for Businesses',
    short: 'Businesses',
    tagline: 'Payroll-linked attendance, contractor tracking and workforce analytics for growing SMEs.',
    features: ['Payroll-linked clock-in', 'Contractor tracking', 'Payroll CSV export', 'Workforce analytics'],
    url: 'https://attendy-biz.vercel.app',
    accent: '#f59e0b',
    iconBg: 'rgba(245,158,11,0.1)',
    iconBorder: 'rgba(245,158,11,0.2)',
    ctaColor: '#fcd34d',
    status: 'Live',
    statusColor: '#fbbf24',
    statusBg: 'rgba(245,158,11,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'events',
    name: 'Attendy for Events',
    short: 'Events',
    tagline: 'Guest check-in, ticket validation, real-time headcounts and post-event reports for any event.',
    features: ['QR ticket scanning', 'Real-time guest count', 'VIP & zone access', 'Post-event analytics'],
    url: 'https://attendy-events.vercel.app',
    accent: '#f43f5e',
    iconBg: 'rgba(244,63,94,0.1)',
    iconBorder: 'rgba(244,63,94,0.2)',
    ctaColor: '#fda4af',
    status: 'Live',
    statusColor: '#fb7185',
    statusBg: 'rgba(244,63,94,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
]

const SCAN_ENTRIES = [
  { name: 'Chidi Nwosu', meta: 'JSS 2 · 07:51 AM', status: 'ON TIME', dot: '#22c55e', badgeBg: 'rgba(34,197,94,0.08)', badgeColor: '#4ade80', badgeBorder: 'rgba(34,197,94,0.2)' },
  { name: 'Fatima Bello', meta: 'First Bank HQ · 08:02 AM', status: 'ON TIME', dot: '#3b82f6', badgeBg: 'rgba(59,130,246,0.08)', badgeColor: '#93c5fd', badgeBorder: 'rgba(59,130,246,0.2)' },
  { name: 'Olumide Adesanya', meta: 'Office Floor 3 · 09:14 AM', status: 'LATE', dot: '#f59e0b', badgeBg: 'rgba(245,158,11,0.08)', badgeColor: '#fcd34d', badgeBorder: 'rgba(245,158,11,0.2)' },
  { name: 'Ngozi Obiora', meta: 'TechSummit Lagos · 14:30 PM', status: 'CHECKED IN', dot: '#f43f5e', badgeBg: 'rgba(244,63,94,0.08)', badgeColor: '#fda4af', badgeBorder: 'rgba(244,63,94,0.2)' },
]

const PLANS = [
  {
    name: 'Basic',
    price: '₦120,000',
    period: '/year',
    desc: 'Perfect for small organisations just getting started.',
    features: ['Up to 100 members', '1 admin account', 'QR scanning & logging', 'SMS notifications', 'Basic reports', 'Email support'],
    cta: 'Get started',
    color: '#3b82f6',
    colorDim: 'rgba(59,130,246,0.1)',
    colorBorder: 'rgba(59,130,246,0.2)',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '₦200,000',
    period: '/year',
    desc: 'The most popular plan for growing teams.',
    features: ['Up to 500 members', '3 admin accounts', 'Everything in Basic', 'Advanced analytics', 'CSV & PDF exports', 'Priority support', 'Custom branding'],
    cta: 'Get started',
    color: '#8b5cf6',
    colorDim: 'rgba(139,92,246,0.12)',
    colorBorder: 'rgba(139,92,246,0.3)',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large organisations with complex requirements.',
    features: ['Unlimited members', 'Unlimited admins', 'Everything in Standard', 'API access', 'SLA guarantees', 'Dedicated account manager', 'Custom integrations'],
    cta: 'Contact us',
    color: '#f59e0b',
    colorDim: 'rgba(245,158,11,0.1)',
    colorBorder: 'rgba(245,158,11,0.2)',
    highlight: false,
  },
]

const FEATURES = [
  { icon: '⚡', title: 'Real-time dashboards', desc: 'Presence data streams live. No refreshing, no manual counts — just truth, the moment it happens.' },
  { icon: '📱', title: 'Any smartphone', desc: "No dedicated scanners. Any Android or iPhone camera works out of the box — no app download needed." },
  { icon: '💬', title: 'SMS & WhatsApp', desc: 'Automated notifications reach the right people the moment a scan happens. Parents, managers, HR — all covered.' },
  { icon: '📊', title: 'Exportable reports', desc: 'CSV, PDF and Excel exports. Payroll-ready or compliance-ready in one click, every time.' },
  { icon: '🔐', title: 'Role-based access', desc: 'Admins, managers, staff and guests all see exactly what they need to — nothing more, nothing less.' },
  { icon: '☁️', title: 'Cloud & offline sync', desc: 'Works in low-connectivity environments. Syncs automatically when back online, with zero data loss.' },
  { icon: '🏢', title: 'Multi-location', desc: 'Manage dozens of branches, classrooms or sites from one central dashboard without context-switching.' },
  { icon: '🔗', title: 'API & integrations', desc: 'Connect to HR software, payroll systems and custom workflows via our REST API.' },
]

const STATS = [
  { value: 12000, suffix: '+', label: 'Scans logged daily', color: '#60a5fa' },
  { value: 340, suffix: '+', label: 'Organisations onboarded', color: '#a78bfa' },
  { value: 5, suffix: '', label: 'Industries served', color: '#4ade80' },
  { value: 99.9, suffix: '%', label: 'Platform uptime', color: '#fcd34d', decimals: 1 },
]

/* ─── STYLES ─────────────────────────────────────────────── */

const styles = `
  .noise-overlay {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.35;
  }
  .grid-overlay {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .container { max-width: 1160px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1; }

  /* ─ HERO ─ */
  .hero {
    position: relative; z-index: 1;
    max-width: 1160px; margin: 0 auto;
    padding: 130px 2rem 110px;
    text-align: center; overflow: hidden;
  }
  .hero-glow-blue {
    position: absolute; top: -100px; left: 25%; transform: translateX(-50%);
    width: 520px; height: 500px;
    background: radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow-purple {
    position: absolute; top: -80px; right: 18%; transform: translateX(50%);
    width: 420px; height: 380px;
    background: radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2);
    color: #93c5fd; font-size: 12px; font-family: var(--font-mono);
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px; letter-spacing: 0.5px;
    animation: fadeUp 0.5s ease 0.05s both;
  }
  .eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #60a5fa; animation: blink 2.5s infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

  .hero h1 {
    font-size: clamp(3.2rem, 6.8vw, 5.8rem);
    font-weight: 800; letter-spacing: -3px; line-height: 1.0;
    color: #fff; margin-bottom: 22px;
    animation: fadeUp 0.6s ease 0.15s both;
  }
  .hero h1 .grad {
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-sub {
    font-size: 18px; color: var(--muted); max-width: 580px;
    margin: 0 auto 50px; line-height: 1.7; font-weight: 400;
    animation: fadeUp 0.6s ease 0.25s both;
  }
  .hero-ctas {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; flex-wrap: wrap; margin-bottom: 80px;
    animation: fadeUp 0.6s ease 0.35s both;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--text); color: #07090a;
    text-decoration: none; font-size: 15px; font-weight: 700;
    padding: 13px 26px; border-radius: 10px;
    transition: all 0.15s; border: none; cursor: pointer;
    letter-spacing: -0.3px;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--text);
    text-decoration: none; font-size: 15px; font-weight: 500;
    padding: 12px 22px; border-radius: 10px;
    border: 1px solid var(--border-hover);
    transition: all 0.15s; cursor: pointer;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.05); transform: translateY(-1px); }

  /* ─ TRUST STRIP ─ */
  .trust-strip {
    animation: fadeUp 0.6s ease 0.45s both;
    display: flex; align-items: center; justify-content: center;
    gap: 28px; flex-wrap: wrap;
    padding: 0 2rem;
  }
  .trust-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: var(--muted); font-family: var(--font-mono);
    letter-spacing: 0.2px;
  }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; }
  .trust-divider { width: 1px; height: 16px; background: var(--border); }

  /* ─ SECTION COMMONS ─ */
  .section { padding: 100px 0; }
  .section-label {
    font-family: var(--font-mono); font-size: 11px;
    text-transform: uppercase; letter-spacing: 2px;
    color: var(--muted2); margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::after {
    content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--border);
  }
  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
    font-weight: 700; letter-spacing: -1.2px; color: #fff;
    line-height: 1.1; margin-bottom: 16px;
  }
  .section-sub { font-size: 17px; color: var(--muted); max-width: 560px; line-height: 1.7; }

  /* ─ STATS ─ */
  .stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border); border-radius: 18px; overflow: hidden;
    margin-top: 60px;
  }
  .stat-cell {
    background: var(--bg-card); padding: 36px 32px;
    text-align: center; transition: background 0.2s;
  }
  .stat-cell:hover { background: var(--bg-card2); }
  .stat-number {
    font-size: clamp(2.2rem, 3.8vw, 3.2rem);
    font-weight: 800; letter-spacing: -2px; line-height: 1;
    margin-bottom: 10px; display: block;
  }
  .stat-label { font-size: 13px; color: var(--muted); font-family: var(--font-mono); letter-spacing: 0.3px; }

  /* ─ PROBLEMS ─ */
  .problems-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border); border-radius: 18px;
    overflow: hidden; margin-top: 56px;
  }
  .problem-card {
    background: var(--bg-card); padding: 34px 30px; transition: background 0.2s;
  }
  .problem-card:hover { background: var(--bg-card2); }
  .problem-icon {
    width: 42px; height: 42px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; font-size: 20px;
  }
  .problem-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 10px; letter-spacing: -0.3px; }
  .problem-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* ─ HOW IT WORKS ─ */
  .how-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: center; margin-top: 56px;
  }
  .how-steps { display: flex; flex-direction: column; gap: 34px; }
  .how-step { display: flex; gap: 20px; align-items: flex-start; }
  .step-num {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    background: var(--bg-card2); border: 1px solid var(--border-hover);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 12px; color: var(--muted); font-weight: 500;
  }
  .step-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 5px; letter-spacing: -0.2px; }
  .step-desc { font-size: 14px; color: var(--muted); line-height: 1.65; }

  .how-visual {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 28px; display: flex;
    flex-direction: column; gap: 12px;
    position: relative;
  }
  .how-visual-label {
    font-size: 11px; font-family: var(--font-mono);
    color: var(--muted2); letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .live-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34,197,94,0.4);
    animation: pulse-live 2s infinite;
  }
  @keyframes pulse-live {
    0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
    70% { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
  }
  .scan-card {
    background: var(--bg-card2); border: 1px solid var(--border);
    border-radius: 11px; padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    transition: border-color 0.2s;
  }
  .scan-card:hover { border-color: var(--border-hover); }
  .scan-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .scan-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .scan-meta { font-size: 11px; color: var(--muted); font-family: var(--font-mono); margin-top: 2px; }
  .scan-badge {
    margin-left: auto; font-size: 10px; font-family: var(--font-mono);
    padding: 4px 10px; border-radius: 5px; letter-spacing: 0.5px;
    text-transform: uppercase; white-space: nowrap; border-width: 1px; border-style: solid;
  }

  /* ─ VERTICALS ─ */
  .verticals-header { text-align: center; margin-bottom: 60px; }
  .verticals-header .section-label { justify-content: center; }
  .verticals-header .section-label::after { display: none; }

  .verticals-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;
  }
  .verticals-grid.row2 {
    grid-template-columns: repeat(2, 1fr);
    max-width: 660px; margin: 0 auto 16px;
  }

  .vertical-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 18px; padding: 28px 26px;
    display: flex; flex-direction: column; gap: 16px;
    text-decoration: none; color: inherit;
    transition: border-color 0.22s, background 0.22s, transform 0.22s, box-shadow 0.22s;
    position: relative; overflow: hidden; cursor: pointer;
  }
  .vertical-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--card-accent, transparent); opacity: 0.7; transition: opacity 0.2s;
  }
  .vertical-card:hover {
    border-color: var(--border-hover); background: var(--bg-card2);
    transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3);
  }
  .vertical-card:hover::before { opacity: 1; }
  .vertical-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }

  .vert-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .vertical-icon {
    width: 44px; height: 44px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    border-width: 1px; border-style: solid;
  }
  .vert-badge {
    font-size: 10px; font-family: var(--font-mono);
    padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px;
    border-width: 1px; border-style: solid; white-space: nowrap; height: fit-content;
  }
  .vertical-name { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.4px; }
  .vertical-tagline { font-size: 13px; color: var(--muted); line-height: 1.62; }
  .vertical-features { display: flex; flex-direction: column; gap: 7px; }
  .vertical-feature {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: var(--muted2); font-family: var(--font-mono);
  }
  .vertical-feature::before {
    content: ''; width: 4px; height: 4px; border-radius: 50%;
    background: var(--muted2); flex-shrink: 0;
  }
  .vertical-cta {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600; margin-top: auto; padding-top: 4px;
  }
  .vertical-cta-arrow {
    width: 18px; height: 18px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border-width: 1px; border-style: solid;
    transition: transform 0.2s;
  }
  .vertical-card:hover .vertical-cta-arrow { transform: translateX(3px); }

  /* ─ FEATURES ─ */
  .features-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
    background: var(--border); border: 1px solid var(--border);
    border-radius: 18px; overflow: hidden; margin-top: 50px;
  }
  .feature-cell {
    background: var(--bg-card); padding: 30px 26px; transition: background 0.2s;
  }
  .feature-cell:hover { background: var(--bg-card2); }
  .feature-icon { font-size: 22px; margin-bottom: 14px; display: block; }
  .feature-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 8px; letter-spacing: -0.2px; }
  .feature-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

  /* ─ PRICING ─ */
  .pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 56px;
  }
  .pricing-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 32px 28px;
    display: flex; flex-direction: column; gap: 20px;
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .pricing-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.28); }
  .pricing-card.highlight {
    border-color: rgba(139,92,246,0.35);
    background: rgba(139,92,246,0.04);
  }
  .pricing-card.highlight::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #a78bfa);
  }
  .popular-badge {
    position: absolute; top: 20px; right: 20px;
    background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3);
    color: #c4b5fd; font-size: 10px; font-family: var(--font-mono);
    padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px;
  }
  .plan-name { font-size: 14px; color: var(--muted); font-family: var(--font-mono); letter-spacing: 1px; text-transform: uppercase; }
  .plan-price {
    font-size: clamp(2rem, 3vw, 2.6rem);
    font-weight: 800; letter-spacing: -1.5px; color: #fff;
    line-height: 1; display: flex; align-items: baseline; gap: 4px;
  }
  .plan-period { font-size: 14px; font-weight: 400; color: var(--muted); letter-spacing: 0; }
  .plan-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }
  .plan-features { display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .plan-feature {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; color: var(--text);
  }
  .plan-feature-check {
    width: 18px; height: 18px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .plan-cta {
    display: block; text-align: center; text-decoration: none;
    border-radius: 10px; padding: 13px;
    font-size: 14px; font-weight: 700; font-family: var(--font-display);
    transition: opacity 0.15s, transform 0.1s; cursor: pointer;
    border: none;
  }
  .plan-cta:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ─ CTA SECTION ─ */
  .cta-section {
    padding: 130px 2rem; text-align: center; position: relative; z-index: 1; overflow: hidden;
  }
  .cta-glow {
    position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%);
    width: 700px; height: 450px;
    background: radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-section h2 {
    font-size: clamp(2rem, 4.2vw, 3.8rem);
    font-weight: 800; letter-spacing: -2px; color: #fff;
    max-width: 720px; margin: 0 auto 18px; line-height: 1.08;
    position: relative; z-index: 1;
  }
  .cta-section p {
    font-size: 17px; color: var(--muted); max-width: 480px;
    margin: 0 auto 44px; line-height: 1.65; position: relative; z-index: 1;
  }
  .cta-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }

  /* ─ FOOTER ─ */
  .footer {
    border-top: 1px solid var(--border); padding: 40px 2rem;
    position: relative; z-index: 1;
  }
  .footer-inner {
    max-width: 1160px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr auto auto; align-items: start; gap: 48px;
  }
  .footer-brand p { font-size: 13px; color: var(--muted2); margin-top: 10px; line-height: 1.6; max-width: 280px; }
  .footer-col-title { font-size: 11px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted2); margin-bottom: 14px; }
  .footer-links { display: flex; flex-direction: column; gap: 8px; }
  .footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.15s; }
  .footer-links a:hover { color: var(--text); }
  .footer-bottom {
    max-width: 1160px; margin: 28px auto 0;
    border-top: 1px solid var(--border); padding-top: 22px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }
  .footer-copy { font-size: 12px; color: var(--muted2); font-family: var(--font-mono); }
  .footer-social { display: flex; gap: 12px; align-items: center; }
  .social-link {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--bg-card); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); text-decoration: none;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .social-link:hover { color: var(--text); border-color: var(--border-hover); background: var(--bg-card2); }

  /* ─ RESPONSIVE ─ */
  @media (max-width: 1000px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .pricing-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
  }
  @media (max-width: 900px) {
    .problems-grid { grid-template-columns: 1fr; }
    .how-grid { grid-template-columns: 1fr; }
    .how-visual { display: none; }
    .verticals-grid { grid-template-columns: 1fr 1fr; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .hero { padding: 90px 1.25rem 80px; }
    .verticals-grid, .verticals-grid.row2 { grid-template-columns: 1fr; max-width: none; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .features-grid { grid-template-columns: 1fr; }
    .trust-strip { gap: 14px; }
    .trust-divider { display: none; }
    .footer-inner { grid-template-columns: 1fr; gap: 28px; }
  }
`

/* ─── PAGE ───────────────────────────────────────────────── */

export default function AttendyWebHome() {
  function openUrl(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <style>{styles}</style>
      <div style={{ position: 'relative' }}>
        <div className="noise-overlay" />
        <div className="grid-overlay" />

        <Nav />

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-glow-blue" />
          <div className="hero-glow-purple" />

          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Built for Africa · QR-powered presence tracking
          </div>

          <h1>
            Track who shows up.<br />
            <span className="grad">Everywhere.</span>
          </h1>

          <p className="hero-sub">
            Attendy is a QR-powered presence platform built for African organisations.
            Schools, banks, offices, businesses, events — one reliable engine, purpose-built for each.
          </p>

          <div className="hero-ctas">
            <a href="#verticals" className="btn-primary">
              See all products
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#how" className="btn-outline">How it works</a>
            <a href="mailto:attendyofficial@gmail.com?subject=I want a demo of Attendy" className="btn-outline">
              Book a demo
            </a>
          </div>

          <div className="trust-strip">
            {[
              { dot: '#22c55e', label: 'No hardware needed' },
              null,
              { dot: '#3b82f6', label: 'Setup in under a day' },
              null,
              { dot: '#8b5cf6', label: 'Works offline' },
              null,
              { dot: '#f59e0b', label: '5 industries covered' },
            ].map((item, i) =>
              item === null ? (
                <span key={i} className="trust-divider" />
              ) : (
                <span key={i} className="trust-item">
                  <span className="trust-dot" style={{ background: item.dot }} />
                  {item.label}
                </span>
              )
            )}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="section" style={{ paddingTop: 40, paddingBottom: 60 }}>
          <div className="container">
            <div className="stats-grid">
              {STATS.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 80}>
                  <div className="stat-cell">
                    <span className="stat-number" style={{ color: s.color }}>
                      <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                    </span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-label">The problem</div>
              <h2 className="section-title">Manual attendance is<br />costing everyone.</h2>
              <p className="section-sub">
                From school gates to office floors, organisations across Africa are still running on paper registers,
                Excel sheets and phone calls. It&apos;s slow, inaccurate and unscalable.
              </p>
            </ScrollReveal>
            <div className="problems-grid">
              {[
                { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', icon: '📋', title: 'Paper registers get lost', desc: 'Attendance records are inconsistent, undated, and impossible to query. End-of-month reports take days to compile manually.' },
                { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', icon: '🔒', title: 'No real-time visibility', desc: 'Managers and parents have no idea who is present until someone manually counts a register — sometimes hours later.' },
                { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', icon: '⏰', title: 'Time fraud goes undetected', desc: 'Without timestamped, device-verified check-ins, buddy punching and ghost workers are nearly impossible to catch.' },
              ].map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 100}>
                  <div className="problem-card">
                    <div className="problem-icon" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                      <span>{p.icon}</span>
                    </div>
                    <div className="problem-title">{p.title}</div>
                    <div className="problem-desc">{p.desc}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section" id="how">
          <div className="container">
            <ScrollReveal>
              <div className="section-label">How it works</div>
              <h2 className="section-title">Simple in every context.</h2>
              <p className="section-sub">
                Whether it&apos;s a school gate or a bank branch, the core flow is the same —
                scan a QR code, log the event, notify who needs to know.
              </p>
            </ScrollReveal>
            <div className="how-grid">
              <div className="how-steps">
                {[
                  { n: '01', title: 'Person gets a QR identity', desc: 'Every user — student, staff, visitor or guest — is issued a unique QR code. Print it on an ID card or share it digitally.' },
                  { n: '02', title: 'QR is scanned on arrival', desc: 'Any smartphone camera serves as the scanner. No dedicated hardware needed. Works offline and syncs when connected.' },
                  { n: '03', title: 'Event is logged instantly', desc: 'Time-stamped, location-tagged, and stored securely. The live dashboard updates in real time for whoever needs to see it.' },
                  { n: '04', title: 'The right people are notified', desc: 'Parents get an SMS. Managers see a report. HR gets a payroll-ready export. All automatic — zero manual steps.' },
                ].map((s, i) => (
                  <ScrollReveal key={s.n} delay={i * 100} direction="left">
                    <div className="how-step">
                      <div className="step-num">{s.n}</div>
                      <div>
                        <div className="step-title">{s.title}</div>
                        <div className="step-desc">{s.desc}</div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal direction="right">
                <div className="how-visual">
                  <div className="how-visual-label">
                    <span className="live-dot" />
                    Live scan feed
                  </div>
                  {SCAN_ENTRIES.map((entry, i) => (
                    <div className="scan-card" key={i}>
                      <span className="scan-dot" style={{ background: entry.dot, boxShadow: `0 0 6px ${entry.dot}` }} />
                      <div>
                        <div className="scan-name">{entry.name}</div>
                        <div className="scan-meta">{entry.meta}</div>
                      </div>
                      <span className="scan-badge" style={{ background: entry.badgeBg, color: entry.badgeColor, borderColor: entry.badgeBorder }}>
                        {entry.status}
                      </span>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', paddingTop: 6 }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>
                      4 scans · 4 products · 1 platform
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── VERTICALS ── */}
        <section className="section" id="verticals" style={{ paddingTop: 60 }}>
          <div className="container">
            <ScrollReveal>
              <div className="verticals-header">
                <div className="section-label" style={{ justifyContent: 'center' }}>Products</div>
                <h2 className="section-title" style={{ textAlign: 'center' }}>Attendy for every industry.</h2>
                <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
                  Each product is purpose-built for its context — same reliable engine, different interface, different workflows.
                </p>
              </div>
            </ScrollReveal>

            <div className="verticals-grid">
              {VERTICALS.slice(0, 3).map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 80}>
                  <div
                    className="vertical-card"
                    style={{ '--card-accent': v.accent } as React.CSSProperties}
                    onClick={() => openUrl(v.url)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openUrl(v.url)}
                  >
                    <div className="vert-header">
                      <div className="vertical-icon" style={{ background: v.iconBg, borderColor: v.iconBorder }}>
                        {v.icon}
                      </div>
                      <span className="vert-badge" style={{ background: v.statusBg, color: v.statusColor, borderColor: v.iconBorder }}>
                        {v.status}
                      </span>
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
                      Open {v.short}
                      <div className="vertical-cta-arrow" style={{ background: v.iconBg, borderColor: v.iconBorder }}>
                        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="verticals-grid row2">
              {VERTICALS.slice(3).map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 80}>
                  <div
                    className="vertical-card"
                    style={{ '--card-accent': v.accent } as React.CSSProperties}
                    onClick={() => openUrl(v.url)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openUrl(v.url)}
                  >
                    <div className="vert-header">
                      <div className="vertical-icon" style={{ background: v.iconBg, borderColor: v.iconBorder }}>
                        {v.icon}
                      </div>
                      <span className="vert-badge" style={{ background: v.statusBg, color: v.statusColor, borderColor: v.iconBorder }}>
                        {v.status}
                      </span>
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
                      Open {v.short}
                      <div className="vertical-cta-arrow" style={{ background: v.iconBg, borderColor: v.iconBorder }}>
                        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-label">Platform features</div>
              <h2 className="section-title">One engine. Every context.</h2>
            </ScrollReveal>
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 50}>
                  <div className="feature-cell">
                    <span className="feature-icon">{f.icon}</span>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="section" id="pricing">
          <div className="container">
            <ScrollReveal>
              <div className="section-label">Pricing</div>
              <h2 className="section-title">Simple, transparent pricing.</h2>
              <p className="section-sub">
                All plans include full access to your chosen product. No setup fees, no hidden costs.
                Annual billing in Naira.
              </p>
            </ScrollReveal>
            <div className="pricing-grid">
              {PLANS.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 90}>
                  <div className={`pricing-card${plan.highlight ? ' highlight' : ''}`}>
                    {plan.highlight && <div className="popular-badge">MOST POPULAR</div>}
                    <div>
                      <div className="plan-name">{plan.name}</div>
                      <div className="plan-price">
                        {plan.price}
                        {plan.period && <span className="plan-period">{plan.period}</span>}
                      </div>
                    </div>
                    <p className="plan-desc">{plan.desc}</p>
                    <div className="plan-features">
                      {plan.features.map(f => (
                        <div className="plan-feature" key={f}>
                          <div
                            className="plan-feature-check"
                            style={{ background: `${plan.colorDim}`, border: `1px solid ${plan.colorBorder}` }}
                          >
                            <svg width="10" height="10" fill="none" stroke={plan.color} strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          </div>
                          {f}
                        </div>
                      ))}
                    </div>
                    <a
                      href={plan.name === 'Enterprise' ? 'mailto:attendyofficial@gmail.com?subject=Enterprise enquiry' : '#verticals'}
                      className="plan-cta"
                      style={
                        plan.highlight
                          ? { background: `linear-gradient(135deg, ${plan.color}, #a78bfa)`, color: '#fff' }
                          : { background: plan.colorDim, color: plan.color, border: `1px solid ${plan.colorBorder}` }
                      }
                    >
                      {plan.cta} →
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUSTOM REQUEST ── */}
        <section className="section" id="custom" style={{ paddingTop: 20 }}>
          <div className="container">
            <ScrollReveal>
              <CustomRequestForm />
            </ScrollReveal>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="cta-section">
          <div className="cta-glow" />
          <ScrollReveal>
            <h2>Your attendance problem is solved.<br />Pick your industry.</h2>
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
          </ScrollReveal>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', color: 'var(--text)' }}>
                <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.4px' }}>Attendy</span>
              </a>
              <p>QR-powered presence tracking for African organisations. Schools, banks, offices, businesses, events.</p>
            </div>

            <div>
              <div className="footer-col-title">Products</div>
              <div className="footer-links">
                {VERTICALS.map(v => (
                  <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer">
                    {v.short}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <div className="footer-links">
                <a href="#how">How it works</a>
                <a href="#pricing">Pricing</a>
                <a href="#custom">Custom request</a>
                <a href="mailto:attendyofficial@gmail.com">Support</a>
                <a href="mailto:hashcody63@gmail.com">Developer</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">© {new Date().getFullYear()} Attendy · Presence tracking for Africa</p>
            <div className="footer-social">
              <a href="mailto:attendyofficial@gmail.com" className="social-link" aria-label="Email">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://attendy-edu.vercel.app" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Schools product">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3L1 9l4 2.18V17l7 4 7-4v-5.82L23 9 12 3z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}