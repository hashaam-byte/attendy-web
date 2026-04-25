'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'How it works', href: '#how' },
    { label: 'Products', href: '#verticals' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Custom', href: '#custom' },
    { label: 'Contact', href: 'mailto:attendyofficial@gmail.com' },
  ]

  return (
    <>
      <style>{`
        .nav-wrap {
          position: sticky; top: 0; z-index: 100;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .nav-wrap.scrolled {
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          background: rgba(7,9,10,0.88);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 1px 40px rgba(0,0,0,0.4);
        }
        .nav-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 2rem;
          height: 64px; display: flex; align-items: center; justify-content: space-between;
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
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(59,130,246,0.3);
        }
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-link {
          color: var(--muted); text-decoration: none; font-size: 14px;
          padding: 7px 13px; border-radius: 8px;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.05); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--text); color: #07090a;
          text-decoration: none; font-size: 14px; font-weight: 600;
          padding: 8px 18px; border-radius: 9px; margin-left: 8px;
          transition: opacity 0.15s, transform 0.1s;
          white-space: nowrap;
        }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .nav-mobile-btn {
          display: none; background: none; border: none; cursor: pointer;
          color: var(--muted); padding: 6px;
          flex-direction: column; gap: 4px; align-items: flex-end;
        }
        .hamburger-line {
          display: block; height: 2px; background: currentColor;
          border-radius: 2px; transition: all 0.2s;
        }
        .mobile-menu {
          position: fixed; inset: 0; top: 64px; z-index: 99;
          background: rgba(7,9,10,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          padding: 2rem; gap: 8px;
          transform: translateY(-100%); opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          pointer-events: none;
        }
        .mobile-menu.open {
          transform: translateY(0); opacity: 1;
          pointer-events: all;
        }
        .mobile-nav-link {
          color: var(--text); text-decoration: none;
          font-size: 22px; font-weight: 600; padding: 12px 0;
          border-bottom: 1px solid var(--border);
          display: block; letter-spacing: -0.5px;
          transition: color 0.15s;
        }
        .mobile-nav-link:hover { color: #60a5fa; }
        .mobile-cta {
          margin-top: 16px; display: block; text-align: center;
          background: var(--text); color: var(--bg);
          text-decoration: none; font-weight: 700; font-size: 16px;
          padding: 16px; border-radius: 12px;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-mobile-btn { display: flex; }
        }
      `}</style>

      <nav className={`nav-wrap${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            Attendy
          </a>

          <div className="nav-links">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a href="#verticals" className="nav-cta">
              Explore products
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(p => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="hamburger-line" style={{ width: menuOpen ? 22 : 22, transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span className="hamburger-line" style={{ width: 16, opacity: menuOpen ? 0 : 1 }} />
            <span className="hamburger-line" style={{ width: menuOpen ? 22 : 22, transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#verticals" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Explore all products →
        </a>
      </div>
    </>
  )
}