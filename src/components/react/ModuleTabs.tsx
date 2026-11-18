import { useRef, useState } from 'react';

export type CaseModule = {
  id: string;
  tab: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bullets: string[];
};

interface Props {
  modules: CaseModule[];
}

export default function ModuleTabs({ modules }: Props) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const nextIndex = (index + modules.length) % modules.length;
    setActive(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(modules.length - 1);
        break;
    }
  }

  const current = modules[active];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
      <div className="overflow-x-auto border-b border-line bg-sand/70 px-2 pt-2 sm:px-4">
        <div role="tablist" aria-label="Módulos de EduGestionAR" className="flex min-w-max gap-1">
          {modules.map((module, index) => {
            const selected = index === active;
            return (
              <button
                key={module.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${module.id}`}
                aria-selected={selected}
                aria-controls={`panel-${module.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={
                  'relative rounded-t-md px-3.5 py-2.5 text-[0.82rem] font-semibold transition-colors sm:px-4 ' +
                  (selected
                    ? 'bg-white text-navy-900 shadow-[0_-1px_0_0_rgba(3,52,95,0.06)]'
                    : 'text-muted hover:bg-white/60 hover:text-navy-800')
                }
              >
                {module.tab}
                {selected && (
                  <span className="accent-line absolute inset-x-2 top-0 h-[2px] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={current.id}
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="panel-in grid gap-0 lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="order-2 flex items-center bg-navy-900 p-5 sm:p-7 lg:order-1">
          <figure className="w-full">
            <div className="overflow-hidden rounded-md border border-white/10 bg-navy-950 shadow-lift">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-white/25"></span>
                  <span className="h-2 w-2 rounded-full bg-white/25"></span>
                  <span className="h-2 w-2 rounded-full bg-white/25"></span>
                </span>
                <p className="ml-2 truncate text-[0.65rem] font-medium uppercase tracking-[0.14em] text-navy-200/80">
                  EduGestionAR · {current.tab}
                </p>
              </div>
              <img
                src={current.image}
                alt={current.alt}
                width="1382"
                height="736"
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </div>
          </figure>
        </div>

        <div className="order-1 flex flex-col justify-center p-6 sm:p-8 lg:order-2">
          <h3 className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">
            {current.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{current.description}</p>
          <ul className="mt-5 space-y-3">
            {current.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm leading-snug text-ink/85">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-azure-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
