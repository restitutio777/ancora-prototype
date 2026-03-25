export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-warm-800 text-warm-300">
      <div className="max-w-3xl mx-auto text-center">
        <svg
          className="w-8 h-8 mx-auto mb-6 text-warm-500"
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

        <p className="text-warm-400 text-sm leading-relaxed max-w-md mx-auto italic mb-8">
          &bdquo;Macht euch nicht verrückt mit der Frage: Was essen wir morgen?
          Kümmert euch zuerst um das, was wirklich zählt — und das Nötige wird
          sich finden.&ldquo;
        </p>
        <p className="text-warm-500 text-xs mb-8">nach Matthäus 6,31–33</p>

        <div className="border-t border-warm-700 pt-8">
          <p className="text-warm-500 text-xs">
            Ancora — Ein digitales Hausbuch für unsichere Zeiten
          </p>
          <p className="text-warm-600 text-xs mt-2">
            Kein Tracking. Kein Account. Kein Upsell. Ein Geschenk.
          </p>
        </div>
      </div>
    </footer>
  );
}
