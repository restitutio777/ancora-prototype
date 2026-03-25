"use client";

import { useState, useRef } from "react";

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
    icon: "💊",
    description:
      "Über 90% aller Medikamente enthalten petrochemische Grundstoffe. Tablettenhüllen, Salben, Infusionsbeutel, Spritzen — alles basiert auf Erdöl-Derivaten.",
    products: ["Aspirin-Beschichtung", "Infusionsbeutel", "Einwegspritzen", "Salbengrundlage", "Blisterverpackungen"],
    timeToImpact: "2–4 Wochen",
  },
  {
    id: "ernaehrung",
    label: "Ernährung",
    icon: "🌾",
    description:
      "Düngemittel, Pestizide, Verpackungen, Transport — die gesamte Lebensmittelkette hängt an fossilen Rohstoffen. Ohne Diesel keine Ernte, ohne Kunststoff keine Haltbarkeit.",
    products: ["Stickstoffdünger", "Lebensmittelfolie", "Kühltransport", "Pestizide", "Gewächshausheizung"],
    timeToImpact: "1–3 Wochen",
  },
  {
    id: "energie",
    label: "Energie",
    icon: "⚡",
    description:
      "Heizöl, Benzin, Diesel — aber auch Schmierstoffe für Windkraftanlagen und Isoliermaterial für Stromleitungen. Selbst erneuerbare Energien brauchen petrochemische Komponenten.",
    products: ["Heizöl", "Benzin/Diesel", "Schmierstoffe", "Kabelisolierung", "Solarpanel-Gehäuse"],
    timeToImpact: "Sofort",
  },
  {
    id: "hygiene",
    label: "Hygiene",
    icon: "🧴",
    description:
      "Seife, Shampoo, Windeln, Damenbinden, Desinfektionsmittel, Zahnbürsten — Körperhygiene ist fast vollständig petrochemisch.",
    products: ["Windeln", "Seife/Shampoo", "Zahnbürsten", "Desinfektionsmittel", "Damenhygiene"],
    timeToImpact: "3–6 Wochen",
  },
  {
    id: "kleidung",
    label: "Kleidung",
    icon: "👕",
    description:
      "Über 60% aller Textilien weltweit bestehen aus Polyester, Nylon oder Acryl — alles Erdölprodukte. Auch die Färbung und Veredelung von Baumwolle benötigt Chemikalien auf Erdölbasis.",
    products: ["Polyester", "Nylon", "Acryl", "Textilfarbstoffe", "Schuhsohlen"],
    timeToImpact: "2–6 Monate",
  },
  {
    id: "bauen",
    label: "Bauen & Wohnen",
    icon: "🏠",
    description:
      "Dämmung, Farben, Kleber, Rohre, Fensterrahmen, Dichtungen — modernes Bauen ist ohne Kunststoffe nicht denkbar.",
    products: ["PVC-Rohre", "Styropor-Dämmung", "Dispersionsfarbe", "Silikondichtung", "Kunststofffenster"],
    timeToImpact: "1–3 Monate",
  },
  {
    id: "kommunikation",
    label: "Kommunikation",
    icon: "📱",
    description:
      "Smartphones, Laptops, Kabel, Server-Gehäuse — die digitale Welt ist physisch aus Kunststoff gebaut. Ohne Petrochemie keine Chips, keine Platinen, keine Bildschirme.",
    products: ["Smartphone-Gehäuse", "Kabelummantelung", "Leiterplatten", "Display-Folien", "Glasfaserkabel"],
    timeToImpact: "3–12 Monate",
  },
  {
    id: "trinkwasser",
    label: "Trinkwasser",
    icon: "💧",
    description:
      "Wasseraufbereitung benötigt Pumpen (Schmierstoffe), Filter (Kunststoff), Chemikalien (petrochemisch) und Rohre (PVC). Ohne Strom keine Pumpen, ohne Pumpen kein Druck.",
    products: ["PVC-Wasserleitungen", "Filtergehäuse", "Aufbereitungschemie", "Pumpen-Schmierstoffe"],
    timeToImpact: "Stunden bis Tage",
    hidden: true,
  },
  {
    id: "kuehlkette",
    label: "Kühlkette",
    icon: "🧊",
    description:
      "Kühlmittel, Isoliermaterial, Transportdiesel — wenn die Kühlkette bricht, verderben Lebensmittel und Medikamente gleichzeitig.",
    products: ["Kühlmittel (FCKW-Ersatz)", "Isolierschaum", "Kühltransport-Diesel", "Verpackung"],
    timeToImpact: "Stunden",
    hidden: true,
  },
  {
    id: "brillen",
    label: "Brillen",
    icon: "👓",
    description:
      "60% der Bevölkerung tragen Sehhilfen. Brillengläser aus Polycarbonat, Fassungen aus Kunststoff, Kontaktlinsen — alles petrochemisch. Ohne Nachschub sehen Millionen schlecht.",
    products: ["Polycarbonat-Gläser", "Kunststoff-Fassungen", "Kontaktlinsen", "Kontaktlinsenflüssigkeit"],
    timeToImpact: "1–3 Monate",
    hidden: true,
  },
  {
    id: "landmaschinen",
    label: "Landmaschinen",
    icon: "🚜",
    description:
      "Traktoren, Mähdrescher, Bewässerungsanlagen — moderne Landwirtschaft ist vollständig von Diesel und Hydrauliköl abhängig. Ohne Maschinen keine Ernte im großen Maßstab.",
    products: ["Diesel-Treibstoff", "Hydrauliköl", "Reifen", "Schmierstoffe", "Kunststoffteile"],
    timeToImpact: "Sofort (Saison)",
    hidden: true,
  },
];

// Calculate positions for nodes in a circle
function getNodePositions(count: number, cx: number, cy: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  });
}

export default function DependencyMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mainDeps = dependencies.filter((d) => !d.hidden);
  const hiddenDeps = dependencies.filter((d) => d.hidden);
  const selectedNode = dependencies.find((d) => d.id === selected);

  // SVG uses a fixed viewBox; CSS controls actual rendered size
  const size = 700;
  const cx = size / 2;
  const cy = size / 2;
  const mainRadius = 200;
  const hiddenRadius = 260;
  const centerR = 40;
  const nodeR = 32;

  const mainPositions = getNodePositions(mainDeps.length, cx, cy, mainRadius);
  const hiddenPositions = getNodePositions(hiddenDeps.length, cx, cy, hiddenRadius);

  // Offset hidden nodes to sit between main nodes
  const hiddenOffset = Math.PI / mainDeps.length;
  const hiddenPositionsAdjusted = hiddenDeps.map((_, i) => {
    const angle = (i / hiddenDeps.length) * Math.PI * 2 - Math.PI / 2 + hiddenOffset;
    return {
      x: cx + Math.cos(angle) * hiddenRadius,
      y: cy + Math.sin(angle) * hiddenRadius,
    };
  });

  return (
    <section id="verstehen" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
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

        {/* Radial SVG Visualization */}
        <div ref={containerRef} className="flex justify-center mb-8 overflow-hidden">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[560px] mx-auto h-auto"
          >
            {/* Connection lines from center to main nodes */}
            {mainPositions.map((pos, i) => {
              const dep = mainDeps[i];
              const isSelected = selected === dep.id;
              return (
                <line
                  key={`line-${dep.id}`}
                  x1={cx}
                  y1={cy}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? "#9a7e62" : "#e8ddd0"}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray={isSelected ? "none" : "6 4"}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Connection lines to hidden nodes */}
            {showHidden &&
              hiddenPositionsAdjusted.map((pos, i) => {
                const dep = hiddenDeps[i];
                const isSelected = selected === dep.id;
                return (
                  <line
                    key={`hline-${dep.id}`}
                    x1={cx}
                    y1={cy}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isSelected ? "#c0392b" : "#f0d0c8"}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray="3 5"
                    className="transition-all duration-300"
                    style={{ opacity: 0.7 }}
                  />
                );
              })}

            {/* Center oil node */}
            <circle cx={cx} cy={cy} r={centerR + 6} fill="none" stroke="#d4c4ad" strokeWidth="1" className="pulse-soft" />
            <circle cx={cx} cy={cy} r={centerR} fill="#3f3224" className="cursor-pointer" onClick={() => setSelected(null)} />
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} className="pointer-events-none">
              🛢️
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              fontSize={10}
              fill="#e8ddd0"
              fontWeight="500"
              className="pointer-events-none"
            >
              Erdöl
            </text>

            {/* Main dependency nodes */}
            {mainPositions.map((pos, i) => {
              const dep = mainDeps[i];
              const isSelected = selected === dep.id;
              return (
                <g
                  key={dep.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(selected === dep.id ? null : dep.id)}
                >
                  {/* Highlight ring */}
                  {isSelected && (
                    <circle cx={pos.x} cy={pos.y} r={nodeR + 4} fill="none" stroke="#9a7e62" strokeWidth="2" />
                  )}
                  {/* Node bg */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeR}
                    fill={isSelected ? "#f3ede4" : "white"}
                    stroke={isSelected ? "#b8a086" : "#e8ddd0"}
                    strokeWidth="1.5"
                    className="transition-all duration-200"
                  />
                  {/* Icon */}
                  <text
                    x={pos.x}
                    y={pos.y - 4}
                    textAnchor="middle"
                    fontSize={18}
                    className="pointer-events-none"
                  >
                    {dep.icon}
                  </text>
                  {/* Label below node */}
                  <text
                    x={pos.x}
                    y={pos.y + nodeR + 16}
                    textAnchor="middle"
                    fontSize={10}
                    fill={isSelected ? "#3f3224" : "#9a7e62"}
                    fontWeight={isSelected ? "600" : "400"}
                    className="pointer-events-none"
                  >
                    {dep.label}
                  </text>
                  {/* Time label */}
                  <text
                    x={pos.x}
                    y={pos.y + nodeR + 28}
                    textAnchor="middle"
                    fontSize={8}
                    fill="#b8a086"
                    className="pointer-events-none"
                  >
                    {dep.timeToImpact}
                  </text>
                </g>
              );
            })}

            {/* Hidden dependency nodes */}
            {showHidden &&
              hiddenPositionsAdjusted.map((pos, i) => {
                const dep = hiddenDeps[i];
                const isSelected = selected === dep.id;
                return (
                  <g
                    key={dep.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(selected === dep.id ? null : dep.id)}
                  >
                    {isSelected && (
                      <circle cx={pos.x} cy={pos.y} r={nodeR + 4} fill="none" stroke="#c0392b" strokeWidth="2" />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={nodeR}
                      fill={isSelected ? "#fef2f2" : "white"}
                      stroke={isSelected ? "#e88" : "#f0d0c8"}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="transition-all duration-200"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 4}
                      textAnchor="middle"
                      fontSize={18}
                      className="pointer-events-none"
                    >
                      {dep.icon}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + nodeR + 16}
                      textAnchor="middle"
                      fontSize={10}
                      fill={isSelected ? "#c0392b" : "#d4a0a0"}
                      fontWeight={isSelected ? "600" : "400"}
                      className="pointer-events-none"
                    >
                      {dep.label}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + nodeR + 28}
                      textAnchor="middle"
                      fontSize={8}
                      fill="#d4a0a0"
                      className="pointer-events-none"
                    >
                      {dep.timeToImpact}
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Hidden risks toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              setShowHidden(!showHidden);
              if (showHidden) setSelected(null);
            }}
            className="px-6 py-2.5 text-sm text-warm-500 border border-dashed border-warm-300 rounded-full hover:bg-warm-100 transition-all"
          >
            {showHidden
              ? "Stille Risiken ausblenden"
              : "4 oft übersehene Abhängigkeiten zeigen"}
          </button>
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-warm-200 p-6 md:p-8 shadow-sm transition-all">
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
