export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Anchor icon */}
      <svg
        className="w-12 h-12 text-warm-300 mb-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="8" x2="12" y2="22" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      </svg>

      <h1 className="text-5xl md:text-7xl font-light text-warm-800 tracking-tight mb-6">
        Ancora
      </h1>

      <p className="text-lg md:text-xl text-warm-500 max-w-lg leading-relaxed mb-2">
        Ein digitales Hausbuch für unsichere Zeiten
      </p>

      <p className="text-warm-400 text-sm max-w-md leading-relaxed mb-8">
        Drei Dinge, die jeder Haushalt haben sollte: einen klaren Blick auf die
        eigene Verwundbarkeit, einen konkreten Plan — und eine Haltung, die
        trägt.
      </p>

      <p className="text-warm-400 max-w-md text-sm leading-relaxed italic">
        Verstehen, was auf dem Spiel steht.
        <br />
        Handeln, wo es möglich ist.
        <br />
        Haltung finden, wenn es darauf ankommt.
      </p>

      <p className="text-warm-300 text-xs max-w-sm leading-relaxed mt-8">
        Kostenlos. Ohne Registrierung. Ohne Tracking.
        <br />
        Funktioniert auch ohne Internet, wenn Sie es ausdrucken.
      </p>

      <div className="mt-12 flex flex-col items-center gap-2">
        <span className="text-xs text-warm-300 tracking-widest uppercase">
          Entdecken
        </span>
        <svg
          className="w-5 h-5 text-warm-300 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
