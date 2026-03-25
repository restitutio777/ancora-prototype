"use client";

import { useState } from "react";

interface DependencyNode {
  id: string;
  label: string;
  icon: string;
  description: string;
  products: string[];
  timeToImpact: string;
  hidden?: boolean;
}

const dependencies: DependencyNode[] = [
  {
    id: "medizin",
    label: "Medizin",
    icon: "\u{1F48A}",
    description:
      "Über 90% aller Medikamente enthalten petrochemische Grundstoffe. Tablettenhüllen, Salben, Infusionsbeutel, Spritzen — alles basiert auf Erdöl-Derivaten.",
    products: [
      "Aspirin-Beschichtung",
      "Infusionsbeutel",
      "Einwegspritzen",
      "Salbengrundlage",
      "Blisterverpackungen",
    ],
    timeToImpact: "2–4 Wochen",
  },
  {
    id: "ernaehrung",
    label: "Ernährung",
    icon: "\u{1F33E}",
    description:
      "Düngemittel, Pestizide, Verpackungen, Transport — die gesamte Lebensmittelkette hängt an fossilen Rohstoffen. Ohne Diesel keine Ernte, ohne Kunststoff keine Haltbarkeit.",
    products: [
      "Stickstoffdünger",
      "Lebensmittelfolie",
      "Kühltransport",
      "Pestizide",
      "Gewächshausheizung",
    ],
    timeToImpact: "1–3 Wochen",
  },
  {
    id: "energie",
    label: "Energie",
    icon: "\u26A1",
    description:
      "Heizöl, Benzin, Diesel — aber auch Schmierstoffe für Windkraftanlagen und Isoliermaterial für Stromleitungen. Selbst erneuerbare Energien brauchen petrochemische Komponenten.",
    products: [
      "Heizöl",
      "Benzin/Diesel",
      "Schmierstoffe",
      "Kabelisolierung",
      "Solarpanel-Gehäuse",
    ],
    timeToImpact: "Sofort",
  },
  {
    id: "hygiene",
    label: "Hygiene",
    icon: "\u{1F9F4}",
    description:
      "Seife, Shampoo, Windeln, Damenbinden, Desinfektionsmittel, Zahnbürsten — Körperhygiene ist fast vollständig petrochemisch.",
    products: [
      "Windeln",
      "Seife/Shampoo",
      "Zahnbürsten",
      "Desinfektionsmittel",
      "Damenhygiene",
    ],
    timeToImpact: "3–6 Wochen",
  },
  {
    id: "kleidung",
    label: "Kleidung",
    icon: "\u{1F455}",
    description:
      "Über 60% aller Textilien weltweit bestehen aus Polyester, Nylon oder Acryl — alles Erdölprodukte. Auch die Färbung und Veredelung von Baumwolle benötigt Chemikalien auf Erdölbasis.",
    products: [
      "Polyester",
      "Nylon",
      "Acryl",
      "Textilfarbstoffe",
      "Schuhsohlen",
    ],
    timeToImpact: "2–6 Monate",
  },
  {
    id: "bauen",
    label: "Bauen & Wohnen",
    icon: "\u{1F3E0}",
    description:
      "Dämmung, Farben, Kleber, Rohre, Fensterrahmen, Dichtungen — modernes Bauen ist ohne Kunststoffe nicht denkbar.",
    products: [
      "PVC-Rohre",
      "Styropor-Dämmung",
      "Dispersionsfarbe",
      "Silikondichtung",
      "Kunststofffenster",
    ],
    timeToImpact: "1–3 Monate",
  },
  {
    id: "kommunikation",
    label: "Kommunikation",
    icon: "\u{1F4F1}",
    description:
      "Smartphones, Laptops, Kabel, Server-Gehäuse — die digitale Welt ist physisch aus Kunststoff gebaut. Ohne Petrochemie keine Chips, keine Platinen, keine Bildschirme.",
    products: [
      "Smartphone-Gehäuse",
      "Kabelummantelung",
      "Leiterplatten",
      "Display-Folien",
      "Glasfaserkabel",
    ],
    timeToImpact: "3–12 Monate",
  },
  // Hidden dependencies
  {
    id: "trinkwasser",
    label: "Trinkwasser",
    icon: "\u{1F4A7}",
    description:
      "Wasseraufbereitung benötigt Pumpen (Schmierstoffe), Filter (Kunststoff), Chemikalien (petrochemisch) und Rohre (PVC). Ohne Strom keine Pumpen, ohne Pumpen kein Druck.",
    products: [
      "PVC-Wasserleitungen",
      "Filtergehäuse",
      "Aufbereitungschemie",
      "Pumpen-Schmierstoffe",
    ],
    timeToImpact: "Stunden bis Tage",
    hidden: true,
  },
  {
    id: "kuehlkette",
    label: "Kühlkette",
    icon: "\u{1F9CA}",
    description:
      "Kühlmittel, Isoliermaterial, Transportdiesel — wenn die Kühlkette bricht, verderben Lebensmittel und Medikamente gleichzeitig.",
    products: [
      "Kühlmittel (FCKW-Ersatz)",
      "Isolierschaum",
      "Kühltransport-Diesel",
      "Verpackung",
    ],
    timeToImpact: "Stunden",
    hidden: true,
  },
  {
    id: "brillen",
    label: "Brillen & Kontaktlinsen",
    icon: "\u{1F453}",
    description:
      "60% der Bevölkerung tragen Sehhilfen. Brillengläser aus Polycarbonat, Fassungen aus Kunststoff, Kontaktlinsen — alles petrochemisch. Ohne Nachschub sehen Millionen schlecht.",
    products: [
      "Polycarbonat-Gläser",
      "Kunststoff-Fassungen",
      "Kontaktlinsen",
      "Kontaktlinsenflüssigkeit",
    ],
    timeToImpact: "1–3 Monate",
    hidden: true,
  },
  {
    id: "landmaschinen",
    label: "Landmaschinen",
    icon: "\u{1F69C}",
    description:
      "Traktoren, Mähdrescher, Bewässerungsanlagen — moderne Landwirtschaft ist vollständig von Diesel und Hydrauliköl abhängig. Ohne Maschinen keine Ernte im großen Maßstab.",
    products: [
      "Diesel-Treibstoff",
      "Hydrauliköl",
      "Reifen",
      "Schmierstoffe",
      "Kunststoffteile",
    ],
    timeToImpact: "Sofort (Saison)",
    hidden: true,
  },
];

export default function DependencyMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);

  const mainDeps = dependencies.filter((d) => !d.hidden);
  const hiddenDeps = dependencies.filter((d) => d.hidden);
  const selectedNode = dependencies.find((d) => d.id === selected);

  return (
    <section id="verstehen" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-warm-400 mb-4 block">
            Raum I
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-warm-800 mb-4">
            Was auf dem Spiel steht
          </h2>
          <p className="text-warm-500 max-w-xl mx-auto leading-relaxed">
            Unser Alltag ruht auf einem unsichtbaren Fundament. Wählen Sie einen
            Bereich, um die Abhängigkeiten sichtbar zu machen.
          </p>
        </div>

        {/* Dependency visualization */}
        <div className="relative flex flex-col items-center">
          {/* Center: Oil */}
          <div className="relative mb-12">
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-warm-800 flex items-center justify-center shadow-lg cursor-default"
              onClick={() => setSelected(null)}
            >
              <div className="text-center">
                <span className="text-2xl md:text-3xl block">{"\u{1F6E2}\uFE0F"}</span>
                <span className="text-warm-200 text-xs mt-1 block font-medium">
                  Erdöl
                </span>
              </div>
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-warm-400 pulse-soft -m-3" />
          </div>

          {/* Main dependency nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl mb-8">
            {mainDeps.map((dep) => (
              <button
                key={dep.id}
                onClick={() =>
                  setSelected(selected === dep.id ? null : dep.id)
                }
                className={`group relative p-4 md:p-5 rounded-2xl border transition-all duration-300 text-left ${
                  selected === dep.id
                    ? "bg-warm-100 border-warm-400 shadow-md scale-[1.02]"
                    : "bg-white border-warm-200 hover:border-warm-300 hover:shadow-sm"
                }`}
              >
                <span className="text-2xl block mb-2">{dep.icon}</span>
                <span className="text-sm font-medium text-warm-700 block">
                  {dep.label}
                </span>
                <span className="text-xs text-warm-400 mt-1 block">
                  {dep.timeToImpact}
                </span>
                {/* Connection line hint */}
                <div
                  className={`absolute -top-3 left-1/2 w-px h-3 transition-colors ${
                    selected === dep.id ? "bg-warm-400" : "bg-warm-200"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Hidden risks toggle */}
          <button
            onClick={() => setShowHidden(!showHidden)}
            className="mb-8 px-6 py-2.5 text-sm text-warm-500 border border-dashed border-warm-300 rounded-full hover:bg-warm-100 transition-all"
          >
            {showHidden
              ? "Stille Risiken ausblenden"
              : "4 oft übersehene Abhängigkeiten zeigen"}
          </button>

          {/* Hidden dependencies */}
          {showHidden && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-8">
              {hiddenDeps.map((dep) => (
                <button
                  key={dep.id}
                  onClick={() =>
                    setSelected(selected === dep.id ? null : dep.id)
                  }
                  className={`group relative p-4 rounded-2xl border-2 border-dashed transition-all duration-300 text-left ${
                    selected === dep.id
                      ? "bg-red-50 border-red-300 shadow-md"
                      : "bg-white border-warm-300 hover:border-red-300 hover:bg-red-50/50"
                  }`}
                >
                  <span className="text-2xl block mb-2">{dep.icon}</span>
                  <span className="text-sm font-medium text-warm-700 block">
                    {dep.label}
                  </span>
                  <span className="text-xs text-red-400 mt-1 block">
                    {dep.timeToImpact}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Detail panel */}
          {selectedNode && (
            <div className="w-full max-w-2xl bg-white rounded-2xl border border-warm-200 p-6 md:p-8 shadow-sm transition-all">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{selectedNode.icon}</span>
                <div>
                  <h3 className="text-xl font-medium text-warm-800">
                    {selectedNode.label}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedNode.hidden
                        ? "bg-red-100 text-red-600"
                        : "bg-warm-100 text-warm-600"
                    }`}
                  >
                    Spürbar in: {selectedNode.timeToImpact}
                  </span>
                </div>
              </div>
              <p className="text-warm-600 leading-relaxed mb-4 text-sm">
                {selectedNode.description}
              </p>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-warm-400 mb-2">
                  Betroffene Produkte
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.products.map((p) => (
                    <span
                      key={p}
                      className="text-xs bg-warm-100 text-warm-600 px-3 py-1 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Closing note */}
        <p className="text-center text-warm-400 text-sm mt-12 max-w-lg mx-auto italic">
          Diese Zusammenhänge gelten unabhängig vom Anlass — ob blockierte
          Seewege, geopolitische Konflikte oder Produktionsausfälle. Die
          Strukturen bleiben dieselben.
        </p>
      </div>
    </section>
  );
}
