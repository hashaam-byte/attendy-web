'use client'
import { useState, FormEvent } from 'react'

const styles = `
  .custom-form-wrap {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 40px 44px;
    text-align: center; max-width: 920px; margin: 0 auto;
    position: relative; overflow: hidden;
  }
  .custom-form-wrap::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent);
  }
  .custom-title {
    font-size: 24px; font-weight: 700; color: #fff;
    margin-bottom: 10px; letter-spacing: -0.5px;
  }
  .custom-sub {
    font-size: 15px; color: var(--muted); margin-bottom: 32px; line-height: 1.65;
    max-width: 540px; margin-left: auto; margin-right: auto;
  }
  .custom-form { display: flex; flex-direction: column; gap: 12px; max-width: 520px; margin: 0 auto; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .custom-input {
    background: var(--bg-card2); border: 1px solid var(--border);
    border-radius: 11px; padding: 13px 16px;
    font-size: 14px; font-family: var(--font-display);
    color: var(--text); outline: none; width: 100%;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .custom-input:focus {
    border-color: rgba(59,130,246,0.4);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
  }
  .custom-input::placeholder { color: var(--muted2); }
  .custom-textarea { resize: vertical; min-height: 88px; line-height: 1.55; }
  .custom-btn {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white; border: none; border-radius: 11px; padding: 14px;
    font-size: 15px; font-weight: 700; font-family: var(--font-display);
    cursor: pointer; transition: opacity 0.15s, transform 0.1s;
    letter-spacing: -0.2px; position: relative; overflow: hidden;
  }
  .custom-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .custom-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .custom-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1));
  }
  .success-msg {
    background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2);
    color: #86efac; border-radius: 12px; padding: 20px 24px;
    font-size: 14px; line-height: 1.65;
  }
  .success-icon {
    width: 48px; height: 48px; background: rgba(34,197,94,0.1);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px;
  }
  .error-msg {
    background: rgba(244,63,94,0.06); border: 1px solid rgba(244,63,94,0.2);
    color: #fda4af; border-radius: 10px; padding: 12px 16px;
    font-size: 13px; text-align: center;
  }
  .form-hint {
    font-size: 12px; color: var(--muted2); text-align: center;
    font-family: var(--font-mono); margin-top: 4px;
  }
  .char-count {
    font-size: 11px; color: var(--muted2); text-align: right;
    font-family: var(--font-mono); margin-top: -4px;
  }
  @media (max-width: 600px) {
    .custom-form-wrap { padding: 28px 20px; }
    .form-row { grid-template-columns: 1fr; }
  }
`

export default function CustomRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', use_case: '', details: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const valid = form.name.trim().length > 1 && form.email.includes('@') && form.use_case.trim().length > 2

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!valid || submitting) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function update(field: string, value: string) {
    setForm(p => ({ ...p, [field]: value }))
    if (error) setError('')
  }

  return (
    <>
      <style>{styles}</style>
      <div className="custom-form-wrap">
        <div className="custom-title">Don&apos;t see your use case?</div>
        <p className="custom-sub">
          Attendy can be adapted for clinics, universities, churches, warehouses, government agencies and more.
          Tell us what you need — we build custom verticals.
        </p>

        {submitted ? (
          <div className="success-msg">
            <div className="success-icon">
              <svg width="22" height="22" fill="none" stroke="#4ade80" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <strong style={{ display: 'block', marginBottom: 6, fontSize: 16 }}>Request received!</strong>
            We&apos;ll reach out within 48 hours at <strong>{form.email}</strong>. For faster support, email{' '}
            <a href="mailto:attendyofficial@gmail.com" style={{ color: '#86efac' }}>attendyofficial@gmail.com</a>.
          </div>
        ) : (
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="custom-input"
                type="text"
                placeholder="Your name *"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                required maxLength={80}
              />
              <input
                className="custom-input"
                type="email"
                placeholder="Email address *"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                required
              />
            </div>
            <input
              className="custom-input"
              type="text"
              placeholder="Your organisation / use case (e.g. clinic, church, warehouse) *"
              value={form.use_case}
              onChange={e => update('use_case', e.target.value)}
              required maxLength={120}
            />
            <div>
              <textarea
                className="custom-input custom-textarea"
                placeholder="Describe how you'd like Attendy to work for you..."
                value={form.details}
                onChange={e => update('details', e.target.value)}
                maxLength={800}
              />
              <div className="char-count">{form.details.length}/800</div>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button type="submit" className="custom-btn" disabled={!valid || submitting}>
              {submitting ? 'Sending your request…' : 'Submit request →'}
            </button>
            <p className="form-hint">We respond within 48 hours · No spam, ever</p>
          </form>
        )}
      </div>
    </>
  )
}