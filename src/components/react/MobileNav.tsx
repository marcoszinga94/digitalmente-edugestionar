import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type NavItem = { label: string; href: string };

interface Props {
  items: NavItem[];
  pathname: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaDownload?: boolean;
}

export default function MobileNav({
  items,
  pathname,
  ctaLabel = 'Contacto',
  ctaHref = '/contacto',
  ctaDownload = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener('change', onDesktop);

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const nodes = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
      document.body.style.overflow = previousOverflow;
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label="Abrir menú de navegación"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy-800 transition-colors hover:border-navy-200 hover:bg-navy-50"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="absolute inset-x-0 top-0 border-b border-line bg-white p-5 shadow-lift"
          >
            <div className="flex items-center justify-between">
              <img
                src="/brand/digitalmente.png"
                alt="DigitalMente — Tech Solutions"
                width="300"
                height="137"
                className="h-9 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy-800 transition-colors hover:bg-navy-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="mt-6" aria-label="Navegación principal">
              <ul className="divide-y divide-line">
                {items.map((item) => {
                  const active =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={
                          'flex items-center justify-between py-3.5 font-display text-lg font-semibold tracking-tight transition-colors ' +
                          (active ? 'text-navy-800' : 'text-ink hover:text-navy-700')
                        }
                      >
                        {item.label}
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-navy-300" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <a
              href={ctaHref}
              download={ctaDownload ? '' : undefined}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-900"
            >
              {ctaLabel}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ctaDownload ? (
                  <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
                ) : (
                  <path d="M5 12h14M13 6l6 6-6 6" />
                )}
              </svg>
            </a>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
