import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowUpRight, Check, Copy, MessageCircle, Phone } from 'lucide-react';
import {
  BRAND_STATEMENTS,
  buildWhatsAppUrl,
  CONTACT_INFO,
  WORLDS,
} from '../data/wontweData';
import { BrandMark } from './BrandMark';
import './ContactSection.css';

interface ContactSectionProps {
  preselectedDivision?: string | null;
  preselectedService?: string | null;
}

interface FormValues {
  name: string;
  email: string;
  company: string;
  divisions: string[];
  brief: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  divisions?: string;
  brief?: string;
}

const DIVISION_CHOICES = [
  ...WORLDS.map((w) => w.name),
  'Integrated Multi-Division',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedDivision,
  preselectedService,
}) => {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    company: '',
    divisions: ['WONTWE Tech'],
    brief: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [validatedPayload, setValidatedPayload] = useState<FormValues | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedDivision && DIVISION_CHOICES.includes(preselectedDivision)) {
      setValues((prev) => ({
        ...prev,
        divisions: prev.divisions.includes(preselectedDivision)
          ? prev.divisions
          : [...prev.divisions, preselectedDivision],
        brief:
          preselectedService && !prev.brief.includes(preselectedService)
            ? `Enquiry regarding ${preselectedService} (${preselectedDivision}): `
            : prev.brief,
      }));
    }
  }, [preselectedDivision, preselectedService]);

  const toggleDivision = (division: string) => {
    setValues((prev) => {
      const exists = prev.divisions.includes(division);
      const next = exists
        ? prev.divisions.filter((d) => d !== division)
        : [...prev.divisions, division];
      return { ...prev, divisions: next };
    });
    setErrors((prev) => ({ ...prev, divisions: undefined }));
    setValidatedPayload(null);
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }
    if (values.divisions.length === 0) {
      nextErrors.divisions = 'Select at least one WONTWE division for your enquiry.';
    }
    if (values.brief.trim().length < 20) {
      nextErrors.brief = 'Please share a brief overview of your project (at least 20 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setValidatedPayload(null);
      return;
    }

    // Strict honesty: do not fake backend submission; report that no backend is connected.
    setValidatedPayload({ ...values });
  };

  const formatBriefText = (payload: FormValues) =>
    [
      `WONTWE ENQUIRY BRIEF`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company ? `Organization: ${payload.company}` : null,
      `Divisions: ${payload.divisions.join(', ')}`,
      `Brief:\n${payload.brief}`,
    ]
      .filter(Boolean)
      .join('\n');

  const handleCopyBrief = async () => {
    if (!validatedPayload) return;
    const summaryText = formatBriefText(validatedPayload);

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const directWhatsAppHref = buildWhatsAppUrl(
    preselectedService
      ? `Hello WONTWE, I would like to enquire about ${preselectedService} (${preselectedDivision ?? 'WONTWE'}).`
      : undefined
  );

  const payloadWhatsAppHref = validatedPayload
    ? buildWhatsAppUrl(formatBriefText(validatedPayload))
    : directWhatsAppHref;

  return (
    <section id="contact" className="w-contact" aria-labelledby="contact-heading">
      <div className="w-container w-contact__grid">
        <div className="w-contact__intro">
          <span className="telemetry-kicker">INITIATE COLLABORATION</span>
          <h2 id="contact-heading" className="headline-world">
            {BRAND_STATEMENTS.contactHeadline}
          </h2>
          <p className="text-lead">{BRAND_STATEMENTS.contactSupport}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.25rem' }}>
            <BrandMark variant="horizontal" height={24} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--accent-ice)',
              }}
            >
              {BRAND_STATEMENTS.tagline}
            </span>
          </div>

          <div className="w-contact__channels">
            <div>
              <span className="w-contact__channel-label">DIRECT CALL &amp; WHATSAPP</span>
              <p className="w-contact__email-placeholder">{CONTACT_INFO.phoneDisplay}</p>
              <div className="w-contact__direct-actions">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="w-contact__direct-btn"
                  aria-label={`Call WONTWE at ${CONTACT_INFO.phoneDisplay}`}
                >
                  <Phone size={15} style={{ color: 'var(--accent-ice)' }} aria-hidden="true" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-contact__direct-btn w-contact__direct-btn--whatsapp"
                  aria-label={`Chat with WONTWE on WhatsApp at ${CONTACT_INFO.phoneDisplay}`}
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>WHATSAPP CHAT</span>
                </a>
              </div>
            </div>

            <div>
              <span className="w-contact__channel-label">BUSINESS EMAIL (PLACEHOLDER)</span>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                hello@wontwe.example
              </p>
              <p className="w-contact__email-note">
                Placeholder corporate email — use Call or WhatsApp above for immediate direct contact.
              </p>
            </div>

            <div>
              <span className="w-contact__channel-label">SOCIAL CHANNELS (PLACEHOLDERS)</span>
              <div className="w-contact__socials">
                {['LinkedIn', 'Instagram', 'Vimeo', 'X'].map((network) => (
                  <a
                    key={network}
                    href="#contact"
                    className="w-contact__social-link"
                    aria-label={`WONTWE ${network} placeholder link`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>{network}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-contact__form-panel">
          <div className="w-contact__system-notice" role="note">
            <AlertCircle size={18} style={{ flexShrink: 0, color: 'var(--accent-ice)', marginTop: '2px' }} aria-hidden="true" />
            <span>
              <strong>WhatsApp Enquiry Preparation:</strong> Validate your details below to format
              your project brief and send it directly to WONTWE on WhatsApp ({CONTACT_INFO.phoneDisplay}).
              No background server submission occurs.
            </span>
          </div>

          <form className="w-contact__form" onSubmit={handleSubmit} noValidate>
            <div className="w-contact__row">
              <div className="w-contact__field">
                <label htmlFor="contact-name" className="w-contact__label">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="w-contact__input"
                  placeholder="Your name"
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, name: e.target.value }));
                    setErrors((err) => ({ ...err, name: undefined }));
                    setValidatedPayload(null);
                  }}
                />
                {errors.name && (
                  <span id="contact-name-error" className="w-contact__error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="w-contact__field">
                <label htmlFor="contact-email" className="w-contact__label">
                  Business Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="w-contact__input"
                  placeholder="name@company.com"
                  value={values.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, email: e.target.value }));
                    setErrors((err) => ({ ...err, email: undefined }));
                    setValidatedPayload(null);
                  }}
                />
                {errors.email && (
                  <span id="contact-email-error" className="w-contact__error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="w-contact__field">
              <label htmlFor="contact-company" className="w-contact__label">
                Organization / Brand (Optional)
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                className="w-contact__input"
                placeholder="Company or venture name"
                value={values.company}
                onChange={(e) => {
                  setValues((v) => ({ ...v, company: e.target.value }));
                  setValidatedPayload(null);
                }}
              />
            </div>

            <div className="w-contact__field">
              <span className="w-contact__label" id="division-group-label">
                Division Enquiry Options *
              </span>
              <div
                className="w-contact__division-options"
                role="group"
                aria-labelledby="division-group-label"
              >
                {DIVISION_CHOICES.map((division) => {
                  const selected = values.divisions.includes(division);
                  return (
                    <button
                      key={division}
                      type="button"
                      aria-pressed={selected}
                      className={`w-contact__div-chip ${
                        selected ? 'w-contact__div-chip--selected' : ''
                      }`}
                      onClick={() => toggleDivision(division)}
                    >
                      {division}
                    </button>
                  );
                })}
              </div>
              {errors.divisions && (
                <span className="w-contact__error" role="alert">
                  {errors.divisions}
                </span>
              )}
            </div>

            <div className="w-contact__field">
              <label htmlFor="contact-brief" className="w-contact__label">
                Project Vision / Brief *
              </label>
              <textarea
                id="contact-brief"
                name="brief"
                rows={4}
                className="w-contact__textarea"
                placeholder="Describe what you are looking to engineer, produce, or stage..."
                value={values.brief}
                aria-invalid={Boolean(errors.brief)}
                aria-describedby={errors.brief ? 'contact-brief-error' : undefined}
                onChange={(e) => {
                  setValues((v) => ({ ...v, brief: e.target.value }));
                  setErrors((err) => ({ ...err, brief: undefined }));
                  setValidatedPayload(null);
                }}
              />
              {errors.brief && (
                <span id="contact-brief-error" className="w-contact__error" role="alert">
                  {errors.brief}
                </span>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
              <span>VALIDATE ENQUIRY BRIEF</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </form>

          {validatedPayload && (
            <div className="w-contact__result-box" role="status" aria-live="polite">
              <h3 className="w-contact__result-title">
                Form Not Connected — Ready to Send via WhatsApp
              </h3>
              <p className="w-contact__result-text">
                Your enquiry passed local validation for{' '}
                <strong>{validatedPayload.divisions.join(', ')}</strong>. No background backend
                transmitted this automatically — click below to send your complete brief directly on
                WhatsApp or copy it.
              </p>
              <div className="w-contact__result-actions">
                <a
                  href={payloadWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-contact__direct-btn w-contact__direct-btn--whatsapp"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>SEND ON WHATSAPP ({CONTACT_INFO.phoneRaw})</span>
                </a>

                <button type="button" className="w-contact__copy-btn" onClick={handleCopyBrief}>
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  <span>{copied ? 'BRIEF COPIED' : 'COPY BRIEF'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

