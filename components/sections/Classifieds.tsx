'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionFlag from '@/components/SectionFlag'
import SectionFiller from '@/components/SectionFiller'

const contacts = [
  { label: 'Primary Wire', value: 'hello@prasannar.com',      href: 'mailto:hello@prasannar.com',                primary: true  },
  { label: 'LinkedIn',     value: '/in/rajendranprasanna',    href: 'https://linkedin.com/in/rajendranprasanna', primary: false },
  { label: 'GitHub',       value: '@JuniorRaja',              href: 'https://github.com/JuniorRaja',             primary: false },
  { label: 'Instagram',    value: '@prasanna.it.seems',       href: 'https://instagram.com/prasanna.it.seems',  primary: false },
]

const fieldReport = [
  ['Station',   'Chennai, India'],
  ['Timezone',  'IST · UTC +5:30'],
  ['Languages', 'English, Tamil, Hindi, Telugu'],
  ['On File',   '7+ years, FinTech'],
]

const condensed = '"Barlow Condensed", sans-serif'
const serif   = '"Source Serif 4", serif'
const display = '"Bodoni Moda", serif'

function isValidContact(value: string): boolean {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const digits = value.replace(/\D/g, '')
  return emailRe.test(value.trim()) || (digits.length >= 7 && digits.length <= 15)
}

export default function Classifieds() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [contactError, setContactError] = useState('')
  const [sent, setSent] = useState(false)

  const handleContactBlur = () => {
    if (form.contact && !isValidContact(form.contact))
      setContactError('Enter a valid email address or phone number')
    else
      setContactError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidContact(form.contact)) {
      setContactError('Enter a valid email address or phone number')
      return
    }
    const subject = `Letter to the Editor — from ${form.name}`
    const body = `From: ${form.name}\nContact: ${form.contact}\n\n${form.message}`
    window.open(
      `mailto:hello@prasannar.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_self'
    )
    setSent(true)
  }

  return (
    <section id="contact" style={{ borderBottom: '3px solid var(--fg)' }}>
      <style>{`
        /* Theme-aware border/chrome tokens */
        :root, [data-theme="newsprint"], [data-theme="aged"] {
          --cl-border:         rgba(14,14,12,0.18);
          --cl-border-light:   rgba(14,14,12,0.12);
          --cl-border-subtle:  rgba(14,14,12,0.15);
          --cl-placeholder:    rgba(14,14,12,0.28);
          --cl-scissors-color: rgba(14,14,12,0.30);
          --cl-coupon-border:  rgba(14,14,12,0.32);
          --cl-header-bg:      rgba(14,14,12,0.035);
        }
        [data-theme="ink"] {
          --cl-border:         rgba(244,239,230,0.28);
          --cl-border-light:   rgba(244,239,230,0.18);
          --cl-border-subtle:  rgba(244,239,230,0.15);
          --cl-placeholder:    rgba(244,239,230,0.35);
          --cl-scissors-color: rgba(244,239,230,0.35);
          --cl-coupon-border:  rgba(244,239,230,0.28);
          --cl-header-bg:      rgba(244,239,230,0.04);
        }

        .cl-main-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 36px;
        }
        @media (min-width: 768px) {
          .cl-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (min-width: 1024px) {
          .cl-main-grid { grid-template-columns: 1fr 1fr 1fr 1fr; column-gap: 24px; align-items: start; }
        }

        /* Tablet/mobile column ordering: Col1 | Photo | Col2 | Form */
        @media (max-width: 1023px) {
          .cl-col1 { order: 1; }
          .cl-col4 { order: 2; }
          .cl-col2 { order: 3; }
          .cl-col3 { order: 4; }
        }

        /* How to Reach + Field Report side by side on tablet/mobile */
        .cl-col2-inner { display: flex; flex-direction: column; }
        @media (max-width: 1023px) {
          .cl-col2-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
        }

        /* Field report rows */
        .cl-status-row { display: flex; flex-direction: column; border-bottom: 1px dotted var(--cl-border-subtle); padding: 8px 0; gap: 2px; }

        /* Contact links */
        .cl-primary-link { display: flex; flex-direction: column; text-decoration: none; gap: 2px; padding: 10px 0; border-bottom: 1px solid var(--cl-border-light); }
        .cl-primary-link:hover span:last-child { opacity: 0.7; }
        .cl-social-link { display: flex; justify-content: space-between; align-items: center; text-decoration: none; padding: 7px 0; border-bottom: 1px dotted var(--cl-border-light); }
        .cl-social-link:hover .cl-social-val { color: var(--accent) !important; }
        @media (max-width: 767px) {
          .cl-social-link { flex-direction: column; align-items: flex-start; gap: 2px; }
        }

        /* Coupon form */
        .cl-coupon {
          border: 1.5px dashed var(--cl-coupon-border);
          position: relative;
          background: transparent;
        }
        .cl-scissors {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg);
          padding: 0 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: default;
          user-select: none;
          white-space: nowrap;
          font-size: 13px;
          line-height: 1;
        }
        .cl-scissors-text {
          font-family: ${condensed};
          font-size: 7px;
          color: var(--cl-scissors-color);
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        /* Form header block */
        .cl-form-header {
          border-bottom: 2px solid var(--fg);
          padding: 10px 14px 9px;
          background: var(--cl-header-bg);
        }
        .cl-form-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 3px;
        }

        /* Form body */
        .cl-form-body { padding: 14px 14px 14px; }

        /* Fields */
        .cl-field-wrap { margin-bottom: 14px; }
        .cl-field-label-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }
        .cl-field-label {
          font-family: ${condensed};
          font-size: 7.5px;
          color: var(--sepia);
          text-transform: uppercase;
          letter-spacing: .12em;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
        }
        .cl-field-rule { flex: 1; height: 1px; background: var(--cl-border-subtle); }
        .cl-field {
          display: block;
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--cl-border);
          padding: 6px 0;
          font-family: ${serif};
          font-size: 13px;
          color: var(--fg);
          outline: none;
          box-sizing: border-box;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .cl-field::placeholder { color: var(--cl-placeholder); font-style: italic; }
        .cl-field:focus { border-bottom-color: var(--accent); }
        textarea.cl-field {
          resize: none;
          line-height: 1.7em;
          padding-top: 4px;
        }

        /* Submit */
        .cl-submit {
          display: block;
          width: 100%;
          background: var(--fg);
          color: var(--bg);
          border: none;
          outline: 2px solid var(--fg);
          outline-offset: 3px;
          font-family: ${display};
          font-size: 12px;
          font-style: italic;
          font-weight: 700;
          letter-spacing: .04em;
          padding: 10px 16px;
          cursor: pointer;
          transition: background .18s, outline-color .18s;
          text-align: center;
          box-sizing: border-box;
        }
        .cl-submit:hover { background: var(--accent); outline-color: var(--accent); }

        /* Received stamp */
        .cl-stamp {
          display: inline-block;
          border: 2.5px solid var(--accent);
          color: var(--accent);
          font-family: ${display};
          font-size: 22px;
          font-weight: 900;
          letter-spacing: .08em;
          padding: 4px 14px;
          transform: rotate(-4deg);
          margin-bottom: 14px;
        }
      `}</style>

      <SectionFlag pageLabel="Contact · Page 10" subtitle="Correspondence Welcomed" />

      <div className="section-padding-x section-padding-y">
        <div className="cl-main-grid">

          {/* Col 1 — From the Desk */}
          <div className="cl-col1">
            <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>From the Desk</div>
            <h3 style={{ fontFamily: display, fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 20px' }}>
              The desk is open.<br /><span style={{ color: 'var(--accent)' }}>File your dispatch.</span>
            </h3>
            <blockquote style={{ margin: 0, padding: 'clamp(12px, 2.5vw, 14px) clamp(14px, 3vw, 16px)', borderTop: '2px solid var(--accent)', borderBottom: '1px solid rgba(193,39,45,0.15)', background: 'rgba(193,39,45,0.04)' }}>
              <p style={{ fontFamily: serif, fontSize: 'clamp(13px, 2.5vw, 13.5px)', lineHeight: 1.72, fontStyle: 'italic', color: 'var(--fg)', margin: '0 0 10px' }}>
                &ldquo;Prasanna Rajendran does not have a dramatic origin story. No garage startup, no dropout mythology. Just a man in Chennai who got very good at one thing, then quietly got good at several others.&rdquo;
              </p>
              <p style={{ fontFamily: serif, fontSize: 'clamp(13px, 2.5vw, 13.5px)', lineHeight: 1.72, fontStyle: 'italic', color: 'var(--fg)', margin: 0 }}>
                &ldquo;The code still compiles. The curiosity never shipped a bug.&rdquo;
              </p>
              <div style={{ fontFamily: condensed, fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.12em', marginTop: '10px' }}>The Editor</div>
            </blockquote>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2a7a3b', flexShrink: 0 }} />
              <div style={{ fontFamily: condensed, fontSize: '7.5px', color: '#2a7a3b', fontWeight: 700, letterSpacing: '.06em', lineHeight: 1.5 }}>
                ON ASSIGNMENT &nbsp;·&nbsp; <span style={{ color: 'var(--sepia)', fontWeight: 400 }}>Open to distinguished opportunities</span>
              </div>
            </div>
          </div>

          {/* Col 2 — How to Reach + Field Report */}
          <div className="cl-col2">
            <div className="cl-col2-inner">

              {/* Reach the Desk */}
              <div>
                <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Reach the Desk</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {contacts.map(({ label, value, href, primary }) => (
                    primary
                      ? <a key={label} href={href} className="cl-primary-link">
                          <span style={{ fontFamily: condensed, fontSize: '7.5px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
                          <span style={{ fontFamily: display, fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 700, color: 'var(--accent)' }}>{value}</span>
                        </a>
                      : <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="cl-social-link">
                          <span style={{ fontFamily: condensed, fontSize: '7.5px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
                          <span className="cl-social-val" style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--fg)', transition: 'color .15s' }}>
                            {value} ↗
                          </span>
                        </a>
                  ))}
                </div>
              </div>

              {/* Field Report */}
              <div>
                <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Field Report</div>
                {fieldReport.map(([k, v]) => (
                  <div key={k} className="cl-status-row">
                    <span style={{ fontFamily: condensed, fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k}</span>
                    <span style={{ fontFamily: serif, fontSize: 'clamp(11px, 2.2vw, 12px)', color: 'var(--fg)', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Col 3 — Wire Submission Form */}
          <div className="cl-col3">
            <div style={{ fontFamily: condensed, fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: '4px', marginBottom: '16px' }}>Letters to the Editor</div>

            <div className="cl-coupon">
              <span className="cl-scissors">
                <span className="cl-scissors-text">cut here</span>
                ✂
                <span className="cl-scissors-text">cut here</span>
              </span>

              <div className="cl-form-header">
                <div className="cl-form-header-row">
                  <span style={{ fontFamily: condensed, fontSize: '10px', fontWeight: 700, color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '.15em' }}>The PR Gazette</span>
                  <span style={{ fontFamily: condensed, fontSize: '7.5px', color: 'var(--sepia)', letterSpacing: '.1em' }}>FORM E-01</span>
                </div>
                <div style={{ fontFamily: condensed, fontSize: '7px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.14em' }}>Editorial Correspondence</div>
              </div>

              {sent ? (
                <div className="cl-form-body" style={{ textAlign: 'center' }}>
                  <div className="cl-stamp">READY TO SEND</div>
                  <p style={{ fontFamily: serif, fontSize: '12.5px', lineHeight: 1.65, color: 'var(--fg)', fontStyle: 'italic', margin: '0 0 10px' }}>
                    Your dispatch is prepared. A mail window should have opened — hit send from there.
                  </p>
                  <p style={{ fontFamily: condensed, fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em', lineHeight: 1.8, margin: '0' }}>
                    Mail window didn&apos;t open?{' '}
                    <a href="mailto:hello@prasannar.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                      hello@prasannar.com
                    </a>
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', contact: '', message: '' }); setContactError('') }}
                    style={{ fontFamily: condensed, fontSize: '8px', color: 'var(--sepia)', textTransform: 'uppercase', letterSpacing: '.1em', background: 'none', border: 'none', cursor: 'pointer', marginTop: '16px', textDecoration: 'underline' }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div className="cl-form-body">
                  <form onSubmit={handleSubmit}>
                    <div className="cl-field-wrap">
                      <div className="cl-field-label-row">
                        <label className="cl-field-label" htmlFor="cl-name">Your name</label>
                        <div className="cl-field-rule" />
                      </div>
                      <input
                        id="cl-name"
                        className="cl-field"
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="cl-field-wrap">
                      <div className="cl-field-label-row">
                        <label className="cl-field-label" htmlFor="cl-contact">Email / Mobile</label>
                        <div className="cl-field-rule" />
                      </div>
                      <input
                        id="cl-contact"
                        className="cl-field"
                        type="text"
                        placeholder="So the editor can write back"
                        value={form.contact}
                        onChange={e => { setForm(f => ({ ...f, contact: e.target.value })); if (contactError) setContactError('') }}
                        onBlur={handleContactBlur}
                        style={{ borderBottomColor: contactError ? 'var(--accent)' : undefined }}
                        required
                      />
                      {contactError && (
                        <div style={{ fontFamily: condensed, fontSize: '7.5px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '5px' }}>
                          ✕ {contactError}
                        </div>
                      )}
                    </div>

                    <div className="cl-field-wrap">
                      <div className="cl-field-label-row">
                        <label className="cl-field-label" htmlFor="cl-message">Message</label>
                        <div className="cl-field-rule" />
                      </div>
                      <textarea
                        id="cl-message"
                        className="cl-field"
                        rows={3}
                        placeholder="Say what's on your mind…"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        required
                      />
                    </div>

                    <div style={{ borderTop: '1px dotted var(--cl-border)', margin: '16px 0 14px' }} />

                    <button type="submit" className="cl-submit">
                      Write to the Editor
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Col 4 — Photo */}
          <div className="cl-col4" style={{ position: 'relative', minHeight: '420px', overflow: 'hidden', border: '1px solid var(--cl-border-subtle)' }}>
            <Image
              src="/pr-contact-still.webp"
              alt="Prasanna Rajendran"
              fill
              style={{ objectFit: 'cover', filter: 'grayscale(0.85) sepia(0.4) contrast(1.1) brightness(0.88)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(14,14,12,0.72))', padding: '32px 12px 10px' }}>
              <span style={{ fontFamily: condensed, fontSize: '8px', color: 'rgba(244,239,230,0.78)', letterSpacing: '.08em' }}>Prasanna R. · Chennai</span>
            </div>
          </div>

        </div>

        {/* Bottom colophon bar */}
        <div style={{ borderTop: '2px solid var(--fg)', paddingTop: '6px', marginTop: '-28px' }}>
          <div style={{ fontFamily: serif, fontSize: '12px', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.6 }}>
            The PR Gazette · Chennai · Est. 1998
          </div>
        </div>
      </div>
      <SectionFiller watermark="CONTACT" footnote="Vol. PR · No. 1 · Correspondence · Chennai" page="10" accent="#00AFEC" />

    </section>
  )
}
