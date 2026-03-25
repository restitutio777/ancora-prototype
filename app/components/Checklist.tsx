"use client";

import { useState, useEffect, useCallback } from "react";

interface CheckItem {
  id: string;
  label: string;
  why: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  items: CheckItem[];
}

const categories: Category[] = [
  {
    id: "vorrat",
    label: "Vorrat",
    icon: "\u{1FAD9}",
    items: [
      {
        id: "wasser",
        label: "Trinkwasser (2L pro Person/Tag, für 14 Tage)",
        why: "Wasser ist die erste Ressource, die bei Infrastrukturproblemen knapp wird.",
      },
      {
        id: "getreide",
        label: "Reis, Nudeln, Haferflocken (Grundvorrat 14 Tage)",
        why: "Trockene Grundnahrungsmittel halten Jahre und bilden die Kalorienbasis.",
      },
      {
        id: "konserven",
        label: "Konserven (Gemüse, Hülsenfrüchte, Fisch)",
        why: "Proteinquelle ohne Kühlkette. Jahrelang haltbar.",
      },
      {
        id: "oel",
        label: "Speiseöl und Essig",
        why: "Fett ist essenziell für die Nährstoffaufnahme. Essig konserviert.",
      },
      {
        id: "salz",
        label: "Salz, Zucker, Mehl",
        why: "Grundzutaten zum Kochen und Konservieren.",
      },
      {
        id: "kekse",
        label: "Energieriegel, Trockenfrüchte, Nüsse",
        why: "Sofort essbar, hohe Energiedichte, keine Zubereitung nötig.",
      },
    ],
  },
  {
    id: "hausapotheke",
    label: "Hausapotheke",
    icon: "\u{1FA79}",
    items: [
      {
        id: "schmerz",
        label: "Schmerzmittel (Ibuprofen, Paracetamol)",
        why: "Basismedikamente werden bei Lieferengpässen sofort knapp.",
      },
      {
        id: "verband",
        label: "Verbandsmaterial und Pflaster",
        why: "Wundversorgung ist die häufigste medizinische Maßnahme.",
      },
      {
        id: "desinfektion",
        label: "Desinfektionsmittel (Wunden & Flächen)",
        why: "Infektionsprävention, wenn ärztliche Versorgung verzögert ist.",
      },
      {
        id: "rezept",
        label: "Verschreibungspflichtige Medikamente (Vorrat)",
        why: "Chronisch Kranke sind bei Engpässen am stärksten betroffen.",
      },
      {
        id: "fieber",
        label: "Fieberthermometer",
        why: "Krankheitsverläufe einschätzen können, ohne zum Arzt zu müssen.",
      },
      {
        id: "elektrolyte",
        label: "Elektrolytlösung (ORS)",
        why: "Bei Durchfall oder Erbrechen lebensrettend, besonders für Kinder.",
      },
    ],
  },
  {
    id: "energie",
    label: "Energie",
    icon: "\u{1F526}",
    items: [
      {
        id: "taschenlampe",
        label: "Taschenlampe + Ersatzbatterien",
        why: "Stromausfälle sind das wahrscheinlichste Krisenszenario.",
      },
      {
        id: "kerzen",
        label: "Kerzen und Streichhölzer",
        why: "Licht und Wärme ohne Strom. Einfach, zuverlässig.",
      },
      {
        id: "radio",
        label: "Kurbelradio oder batteriebetriebenes Radio",
        why: "Informationsquelle, wenn Internet und Mobilfunk ausfallen.",
      },
      {
        id: "powerbank",
        label: "Powerbank (geladen halten)",
        why: "Handy bleibt erreichbar für Notrufe und Koordination.",
      },
      {
        id: "kocher",
        label: "Campingkocher + Brennstoff",
        why: "Warme Mahlzeiten ohne Strom oder Gas.",
      },
    ],
  },
  {
    id: "hygiene",
    label: "Hygiene",
    icon: "\u{1F9FC}",
    items: [
      {
        id: "seife",
        label: "Seife (Stück, nicht Flüssig)",
        why: "Stückseife hält länger, braucht keine Verpackung, ist vielseitig.",
      },
      {
        id: "toilettenpapier",
        label: "Toilettenpapier",
        why: "Psychologisch wichtig. Zu den ersten Dingen, die gehamstert werden.",
      },
      {
        id: "mullbeutel",
        label: "Müllbeutel",
        why: "Hygiene aufrechterhalten, wenn Abfuhr ausfällt.",
      },
      {
        id: "zahnpflege",
        label: "Zahnbürste, Zahnpasta",
        why: "Zahnprobleme ohne Zahnarzt werden schnell ernst.",
      },
      {
        id: "waschmittel",
        label: "Waschmittel (kleine Menge)",
        why: "Kleidung von Hand waschen können.",
      },
    ],
  },
  {
    id: "dokumente",
    label: "Dokumente",
    icon: "\u{1F4CB}",
    items: [
      {
        id: "ausweise",
        label: "Kopien: Ausweis, Reisepass, Geburtsurkunde",
        why: "Originale können verloren gehen. Kopien ermöglichen Identifikation.",
      },
      {
        id: "versicherung",
        label: "Versicherungspolicen (Kopie)",
        why: "Im Schadensfall brauchen Sie die Nummer, nicht das Original.",
      },
      {
        id: "kontakte",
        label: "Notfallkontakte auf Papier",
        why: "Wenn das Handy leer ist, brauchen Sie Telefonnummern analog.",
      },
      {
        id: "bargeld",
        label: "Bargeld (kleine Scheine)",
        why: "Kartenzahlung fällt bei Stromausfall sofort aus.",
      },
      {
        id: "stadtplan",
        label: "Lokaler Stadtplan / Landkarte",
        why: "Navigation ohne GPS. Kennen Sie den Weg ohne Google Maps?",
      },
    ],
  },
];

const STORAGE_KEY = "ancora-checklist";

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "vorrat"
  );

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setChecked(JSON.parse(stored));
    } catch {
      // localStorage not available
    }
  }, []);

  // Save to localStorage on change
  const toggleItem = useCallback(
    (id: string) => {
      const next = { ...checked, [id]: !checked[id] };
      setChecked(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage not available
      }
    },
    [checked]
  );

  // Calculate progress
  const totalItems = categories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  const checkedItems = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  const categoryProgress = (cat: Category) => {
    const done = cat.items.filter((i) => checked[i.id]).length;
    return { done, total: cat.items.length };
  };

  // PDF export
  const handlePdfExport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Ancora — Checkliste</title>
  <style>
    body { font-family: Georgia, serif; color: #2c2418; max-width: 600px; margin: 40px auto; padding: 0 20px; }
    h1 { font-size: 24px; font-weight: normal; margin-bottom: 4px; }
    .subtitle { color: #9a7e62; font-size: 14px; margin-bottom: 32px; }
    h2 { font-size: 16px; margin-top: 28px; margin-bottom: 12px; border-bottom: 1px solid #e8ddd0; padding-bottom: 6px; }
    .item { display: flex; gap: 8px; margin-bottom: 8px; font-size: 13px; }
    .checkbox { width: 14px; height: 14px; border: 1.5px solid #b8a086; border-radius: 2px; flex-shrink: 0; margin-top: 2px; }
    .checked .checkbox { background: #6b7c5e; border-color: #6b7c5e; }
    .why { color: #9a7e62; font-size: 11px; margin-left: 22px; margin-bottom: 6px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e8ddd0; font-size: 11px; color: #9a7e62; text-align: center; }
  </style>
</head>
<body>
  <h1>Ancora — Checkliste</h1>
  <p class="subtitle">Persönliche Vorsorge-Checkliste</p>
  ${categories
    .map(
      (cat) => `
    <h2>${cat.icon} ${cat.label}</h2>
    ${cat.items
      .map(
        (item) => `
      <div class="item ${checked[item.id] ? "checked" : ""}">
        <div class="checkbox"></div>
        <span>${item.label}</span>
      </div>
      <div class="why">${item.why}</div>
    `
      )
      .join("")}
  `
    )
    .join("")}
  <div class="footer">
    ancora.org — Kein Tracking. Kein Account. Ein Geschenk.<br/>
    Erstellt am ${new Date().toLocaleDateString("de-DE")}
  </div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <section id="handeln" className="py-24 md:py-32 px-6 bg-warm-100/50">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-warm-400 mb-4 block">
            Raum II
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-warm-800 mb-4">
            Was ich tun kann
          </h2>
          <p className="text-warm-500 max-w-xl mx-auto leading-relaxed">
            Eine persönliche Checkliste. Keine Registrierung — Ihre Daten
            bleiben ausschließlich in Ihrem Browser.
          </p>
        </div>

        {/* Overall progress */}
        <div className="mb-10 bg-white rounded-2xl p-6 border border-warm-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-warm-600">Ihr Fortschritt</span>
            <span className="text-sm text-warm-400">
              {checkedItems} von {totalItems}
            </span>
          </div>
          <div className="h-2 bg-warm-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* PDF Export button */}
          <button
            onClick={handlePdfExport}
            className="mt-4 text-xs text-warm-500 hover:text-warm-700 transition-colors flex items-center gap-1.5 mx-auto"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Als PDF drucken / exportieren
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const { done, total } = categoryProgress(cat);
            const isExpanded = expandedCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-warm-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedCategory(isExpanded ? null : cat.id)
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-medium text-warm-800">
                      {cat.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-warm-400">
                      {done}/{total}
                    </span>
                    <svg
                      className={`w-4 h-4 text-warm-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-1">
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-warm-50 cursor-pointer transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={!!checked[item.id]}
                          onChange={() => toggleItem(item.id)}
                          className="mt-0.5 w-5 h-5 rounded border-warm-300 text-accent focus:ring-accent/30 cursor-pointer flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-sm block ${
                              checked[item.id]
                                ? "text-warm-400 line-through"
                                : "text-warm-700"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="text-xs text-warm-400 mt-0.5 block opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.why}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Privacy note */}
        <p className="text-center text-warm-400 text-xs mt-8">
          🔒 Alle Daten bleiben lokal in Ihrem Browser. Kein Server speichert,
          was Sie ankreuzen.
        </p>
      </div>
    </section>
  );
}
