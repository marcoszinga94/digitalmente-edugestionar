import { useCallback, useEffect, useRef, useState } from 'react';

export type Shot = {
  src: string;
  title: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
};

interface Props {
  shots: Shot[];
}

export default function ScreenshotGallery({ shots }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(
    () => setIndex((current) => (current === null ? current : (current + 1) % shots.length)),
    [shots.length]
  );

  const previous = useCallback(
    () =>
      setIndex((current) =>
        current === null ? current : (current - 1 + shots.length) % shots.length
      ),
    [shots.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
      if (event.key !== 'Tab') return;

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]'
      );
      if (!nodes || nodes.length === 0) return;

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
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen, close, next, previous]);

  const shot = index === null ? null : shots[index];

  return (
    <div>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {shots.map((item, i) => (
          <div key={item.src} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setIndex(i);
              }}
              className="group block w-full overflow-hidden rounded-lg border border-line bg-white text-left shadow-card transition-colors hover:border-navy-200"
            >
              <span className="sr-only">Ampliar captura: </span>
              <span className="relative block overflow-hidden border-b border-line bg-sand">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-navy-950/25 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded bg-white/95 px-2 py-1 text-[0.7rem] font-semibold text-navy-800">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                    Ampliar
                  </span>
                </span>
              </span>
              <span className="block px-4 py-3.5">
                <span className="block font-display text-sm font-semibold text-navy-900">
                  {item.title}
                </span>
                <span className="mt-1 block text-[0.8rem] leading-snug text-muted">
                  {item.caption}
                </span>
              </span>
            </button>
          </div>
        ))}
      </div>

      {shot && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex flex-col bg-navy-950/95 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Captura ampliada: ${shot.title}`}
        >
          <div className="flex items-center justify-between gap-4 text-white">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold sm:text-base">{shot.title}</p>
              <p className="mt-0.5 text-xs text-navy-200">
                {(index ?? 0) + 1} de {shots.length}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Cerrar imagen ampliada"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 items-center justify-center">
            <img
              src={shot.src}
              alt={shot.alt}
              className="max-h-full max-w-full rounded-md border border-white/10 object-contain shadow-lift"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Captura anterior"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Anterior
            </button>
            <p className="hidden max-w-md text-center text-xs leading-snug text-navy-200 sm:block">
              {shot.caption}
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Captura siguiente"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              Siguiente
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
