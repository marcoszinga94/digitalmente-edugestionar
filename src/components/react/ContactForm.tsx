import { useState } from 'react';

interface Props {
  email: string;
  /** Endpoint opcional (Formspree, Netlify, API propia). Vacío = mailto. */
  endpoint?: string;
}

type Fields = {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  message: string;
  consent: boolean;
  website: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const projectTypes = [
  'Quiero una demo',
  'Consulta sobre funciones',
  'Instalación y puesta en marcha',
  'Soporte de la demo',
  'Licencias y uso institucional',
  'Otro',
];

const emptyForm: Fields = {
  name: '',
  email: '',
  organization: '',
  projectType: projectTypes[0],
  message: '',
  consent: false,
  website: '',
};

const inputClass =
  'w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-navy-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-azure-600';

export default function ContactForm({ email, endpoint = '' }: Props) {
  const [fields, setFields] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const [mailtoLink, setMailtoLink] = useState('');

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== 'idle') setStatus('idle');
  }

  function validate(): Errors {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = 'Ingresá tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      next.email = 'Ingresá un correo válido.';
    if (fields.message.trim().length < 20)
      next.message = 'Contanos un poco más (al menos 20 caracteres).';
    if (!fields.consent) next.consent = 'Necesitamos tu consentimiento para responder.';
    return next;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: si viene completo, es un bot.
    if (fields.website) {
      setStatus('sent');
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`contacto-${first}`)?.focus();
      return;
    }

    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      organization: fields.organization.trim(),
      projectType: fields.projectType,
      message: fields.message.trim(),
      consent: fields.consent,
      source: window.location.href,
    };

    if (!endpoint) {
      const subject = `Consulta sobre EduGestionAR — ${payload.projectType}`;
      const body = [
        `Nombre: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.organization ? `Institución / empresa: ${payload.organization}` : '',
        `Motivo: ${payload.projectType}`,
        '',
        payload.message,
      ]
        .filter(Boolean)
        .join('\n');

      const link = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setMailtoLink(link);
      setStatus('mailto');
      window.location.href = link;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('sent');
      setFields(emptyForm);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-lg border border-azure-200 bg-azure-50 p-6" role="status">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-azure-600 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy-900">Mensaje recibido</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Gracias por escribirnos. Te respondemos dentro de las próximas 48 horas hábiles.
            </p>
            <button
              type="button"
              onClick={() => {
                setFields(emptyForm);
                setStatus('idle');
              }}
              className="mt-4 text-sm font-semibold text-navy-700 underline decoration-navy-300 underline-offset-4 hover:decoration-navy-700"
            >
              Enviar otra consulta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contacto-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy-700">
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            id="contacto-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={inputClass}
            placeholder="Nombre y apellido"
          />
          {errors.name && (
            <p id="error-name" className="mt-1.5 text-xs font-medium text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contacto-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy-700">
            Correo <span aria-hidden="true">*</span>
          </label>
          <input
            id="contacto-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={inputClass}
            placeholder="nombre@institucion.edu.ar"
          />
          {errors.email && (
            <p id="error-email" className="mt-1.5 text-xs font-medium text-red-700">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contacto-organization" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy-700">
            Institución o empresa
          </label>
          <input
            id="contacto-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={fields.organization}
            onChange={(event) => update('organization', event.target.value)}
            className={inputClass}
            placeholder="Opcional"
          />
        </div>

        <div>
          <label htmlFor="contacto-projectType" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy-700">
            Motivo de contacto
          </label>
          <select
            id="contacto-projectType"
            name="projectType"
            value={fields.projectType}
            onChange={(event) => update('projectType', event.target.value)}
            className={inputClass}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contacto-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-navy-700">
          Contanos qué necesitás <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contacto-message"
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : 'hint-message'}
          className={inputClass + ' resize-y'}
          placeholder="Contanos qué institución representás, cuántos alumnos manejan y qué necesitás resolver."
        />
        {errors.message ? (
          <p id="error-message" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.message}
          </p>
        ) : (
          <p id="hint-message" className="mt-1.5 text-xs text-muted">
            Con un par de líneas alcanza. Si querés coordinar una demo, contanos qué días te quedan cómodos.
          </p>
        )}
      </div>

      {/* Honeypot anti spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contacto-website">No completar</label>
        <input
          id="contacto-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contacto-consent" className="flex items-start gap-3 text-sm leading-snug text-muted">
          <input
            id="contacto-consent"
            name="consent"
            type="checkbox"
            checked={fields.consent}
            onChange={(event) => update('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'error-consent' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-navy-800 focus:ring-azure-600"
          />
          <span>
            Autorizo a DigitalMente a usar estos datos únicamente para responder mi consulta.
            Ver <a href="/privacidad" className="font-medium text-navy-700 underline decoration-navy-300 underline-offset-2">política de privacidad</a>.
          </span>
        </label>
        {errors.consent && (
          <p id="error-consent" className="mt-1.5 text-xs font-medium text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <div aria-live="polite">
        {status === 'mailto' && (
          <p className="rounded-md border border-azure-200 bg-azure-50 px-4 py-3 text-sm text-navy-800">
            Abrimos tu cliente de correo con el mensaje listo para enviar. Si no se abrió,{' '}
            <a href={mailtoLink} className="font-semibold underline decoration-navy-300 underline-offset-2">
              usá este enlace
            </a>{' '}
            o escribinos a{' '}
            <a href={`mailto:${email}`} className="font-semibold underline decoration-navy-300 underline-offset-2">
              {email}
            </a>.
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            No pudimos enviar el formulario. Escribinos directamente a{' '}
            <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
              {email}
            </a>.
          </p>
        )}
      </div>
    </form>
  );
}
