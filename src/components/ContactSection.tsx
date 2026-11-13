import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, MessageCircle, Phone, X } from 'lucide-react';
import {
  ACTIVE_WORLDS,
  BRAND_STATEMENTS,
  buildWhatsAppUrl,
  CONTACT_INFO,
} from '../data/wontweData';
import { BrandMark } from './BrandMark';
import './ContactSection.css';

interface ContactSectionProps {
  preselectedDivision?: string | null;
  preselectedService?: string | null;
  preselectedBrief?: string | null;
  onClearPreselection?: () => void;
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

type SubmissionState = 'idle' | 'submitting' | 'sent' | 'local-only' | 'error';

const DIVISION_CHOICES = [
  ...ACTIVE_WORLDS.map((w) => w.name),
  'Integrated Software & Digital',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ENQUIRY_ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT?.trim() || '';

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedDivision,
  preselectedService,
  preselectedBrief,
  onClearPreselection,
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
  const [submitState, setSubmitState] = useState<SubmissionState>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedBrief) {
      setValues((prev) => ({
        ...prev,
        divisions: preselectedDivision && DIVISION_CHOICES.includes(preselectedDivision) ? [preselectedDivision] : prev.divisions,
        brief: preselectedBrief,
      }));
      setValidatedPayload(null);
      setSubmitState('idle');
    } else if (preselectedDivision && DIVISION_CHOICES.includes(preselectedDivision)) {
      setValues((prev) => ({
        ...prev,
        divisions: [preselectedDivision],
        brief:
          preselectedService &&
          (!prev.brief.trim() || prev.brief.startsWith('Enquiry regarding '))
            ? `Enquiry regarding ${preselectedService} (${preselectedDivision}): `
            : prev.brief,
      }));
      setValidatedPayload(null);
      setSubmitState('idle');
    }
  }, [preselectedDivision, preselectedService, preselectedBrief]);

  const handleClearFocus = () => {
    setValues((prev) => ({
      ...prev,
      brief: prev.brief.startsWith('Enquiry regarding ') ? '' : prev.brief,
    }));
    onClearPreselection?.();
  };

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
    setSubmitState('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setValidatedPayload(null);
      setSubmitState('idle');
      return;
    }

    const payload = { ...values };
    setValidatedPayload(payload);

    if (!ENQUIRY_ENDPOINT) {
      setSubmitState('local-only');
      return;
    }

    setSubmitState('submitting');
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          company: payload.company || undefined,
          divisions: payload.divisions.join(', '),
          service: preselectedService || undefined,
          message: payload.brief,
        }),
      });

      if (!res.ok) {
        setSubmitState('error');
        return;
      }

      setSubmitState('sent');
    } catch {
      setSubmitState('error');
    }
  };

  const formatBriefText = (payload: FormValues) =>
    [
      `WONTWE ENQUIRY BRIEF`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company ? `Organization: ${payload.company}` : null,
      `Divisions: ${payload.divisions.join(', ')}`,
      preselectedService ? `Capability: ${preselectedService}` : null,
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

  const submitLabel = ENQUIRY_ENDPOINT
    ? submitState === 'submitting'
      ? 'SENDING ENQUIRY...'
      : 'SUBMIT ENQUIRY'
    : 'PREPARE WHATSAPP BRIEF';

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
          </div>
        </div>

        <div className="w-contact__form-panel">
          {preselectedService && (
            <div className="w-contact__prefill-pill" role="status">
              <span>
                Selected capability: <strong>{preselectedService}</strong>
              </span>
              <button
                type="button"
                className="w-contact__prefill-clear"
                onClick={handleClearFocus}
                aria-label="Clear selected capability"
              >
                <X size={13} aria-hidden="true" />
                <span>Clear</span>
              </button>
            </div>
          )}

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
                    setSubmitState('idle');
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
                    setSubmitState('idle');
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
                  setSubmitState('idle');
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
                  setSubmitState('idle');
                }}
              />
              {errors.brief && (
                <span id="contact-brief-error" className="w-contact__error" role="alert">
                  {errors.brief}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: 'fit-content' }}
              disabled={submitState === 'submitting'}
            >
              <span>{submitLabel}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </form>

          {validatedPayload && submitState !== 'submitting' && (
            <div className="w-contact__result-box" role="status" aria-live="polite">
              <h3 className="w-contact__result-title">
                {submitState === 'sent'
                  ? 'Enquiry Submitted'
                  : submitState === 'error'
                  ? 'Endpoint Unavailable — Send via WhatsApp'
                  : 'Ready to Send via WhatsApp'}
              </h3>
              <p className="w-contact__result-text">
                {submitState === 'sent' ? (
                  <>
                    Your enquiry for <strong>{validatedPayload.divisions.join(', ')}</strong> has
                    been delivered. You can also send a copy directly on WhatsApp.
                  </>
                ) : submitState === 'error' ? (
                  <>
                    The configured submission endpoint could not be reached. Send your formatted brief
                    for <strong>{validatedPayload.divisions.join(', ')}</strong> directly on
                    WhatsApp or copy it below.
                  </>
                ) : (
                  <>
                    Your enquiry brief for{' '}
                    <strong>{validatedPayload.divisions.join(', ')}</strong> is formatted locally — no
                    background server submission occurs. Click below to open WhatsApp or copy your
                    brief.
                  </>
                )}
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
