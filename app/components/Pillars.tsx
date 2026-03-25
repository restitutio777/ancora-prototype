"use client";

import { useState } from "react";

interface Pillar {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
}

const pillars: Pillar[] = [
  {
    id: "ordnung",
    number: 1,
    title: "Ordnung im Eigenen schaffen",
    subtitle: "Wer sich selbst trägt, kann andere stützen.",
    description:
      "Finanzen sortieren. Beziehungen klären. Gesundheit nicht aufschieben. Nicht weil morgen alles zusammenbricht, sondern weil innere Ordnung die Voraussetzung für äußere Handlungsfähigkeit ist.",
    practices: [
      "Einen finanziellen Puffer aufbauen",
      "Offene Konflikte ansprechen, nicht aussitzen",
      "Den eigenen Gesundheitszustand kennen",
      "Wissen, was man braucht — und was nicht",
    ],
  },
  {
    id: "wahrheit",
    number: 2,
    title: "Wahrheit im Umfeld sprechen",
    subtitle:
      "Eine Gesellschaft bleibt zusammenhaltfähig, solange Menschen die Wahrheit aussprechen.",
    description:
      "Nicht bei offensichtlichen Lügen mitspielen. Nicht schweigen, wenn Schweigen Zustimmung signalisiert. Das bedeutet nicht, ständig zu belehren — sondern im eigenen Kreis ehrlich zu bleiben.",
    practices: [
      "Unbequeme Wahrheiten nicht vermeiden",
      "Fakten prüfen, bevor man sie weitergibt",
      "Eigene Irrtümer eingestehen können",
      "Zwischen Meinung und Tatsache unterscheiden",
    ],
  },
  {
    id: "verlaesslich",
    number: 3,
    title: "Verlässlich sein",
    subtitle:
      "Verlässlichkeit wird zur kostbarsten Währung.",
    description:
      "Versprechen halten. Termine einhalten. Da sein, wenn man gebraucht wird. In Krisenzeiten wird Verlässlichkeit wichtiger als Talent, Charme oder Status.",
    practices: [
      "Nur versprechen, was man halten kann",
      "Für andere erreichbar sein",
      "Verantwortung übernehmen, nicht delegieren",
      "Konsistent handeln, auch wenn keiner zuschaut",
    ],
  },
  {
    id: "kompetenz",
    number: 4,
    title: "Kompetenz entwickeln",
    subtitle:
      "Wer Probleme lösen kann, wird zur Ressource.",
    description:
      "Praktische, soziale und intellektuelle Fähigkeiten. Etwas reparieren können. Erste Hilfe leisten können. Einen Garten anlegen können. Zuhören können. Konflikte schlichten können.",
    practices: [
      "Eine handwerkliche Fähigkeit vertiefen",
      "Erste-Hilfe-Kurs auffrischen",
      "Kochen mit einfachen Grundzutaten lernen",
      "Grundlagen der Konfliktlösung kennen",
    ],
  },
  {
    id: "gemeinschaft",
    number: 5,
    title: "Gemeinschaft pflegen",
    subtitle:
      "Wenn große Strukturen versagen, überleben kleine Gemeinschaften.",
    description:
      "Nachbarn kennen. Netzwerke bauen. Nicht warten, bis die Krise da ist, um sich umzuschauen, wer nebenan wohnt. Gemeinschaft ist keine Romantik — sie ist Infrastruktur.",
    practices: [
      "Die eigenen Nachbarn mit Namen kennen",
      "Etwas teilen: Werkzeug, Wissen, Zeit",
      "Lokale Initiativen unterstützen oder gründen",
      "Vertrauen aufbauen, bevor man es braucht",
    ],
  },
];

export default function Pillars() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="haltung" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase text-warm-400 mb-4 block">
            Raum III
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-warm-800 mb-4">
            Was darüber hinausgeht
          </h2>
          <p className="text-warm-500 max-w-xl mx-auto leading-relaxed mb-6">
            Vorsorge ist nicht nur eine Frage des Vorrats. Es ist eine Frage der
            Haltung: Wer will ich sein, wenn es ernst wird?
          </p>
          <div className="max-w-lg mx-auto bg-warm-100 rounded-2xl p-6 text-sm text-warm-600 leading-relaxed">
            Es gibt einen Unterschied zwischen{" "}
            <em className="text-warm-800">Tragödie</em> und{" "}
            <em className="text-warm-800">Hölle</em>. Eine Tragödie ist schwer —
            aber durchstehbar. Hölle ist Tragödie plus Zerfall, plus
            gegenseitiges Zerfleischen. Der Unterschied liegt an den Menschen,
            die integer bleiben.
          </div>
        </div>

        {/* Five pillars */}
        <div className="space-y-4">
          {pillars.map((pillar) => {
            const isExpanded = expanded === pillar.id;

            return (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl border border-warm-200 overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : pillar.id)
                  }
                  className="w-full p-6 text-left flex items-start gap-5"
                >
                  <span className="text-2xl font-light text-warm-300 mt-0.5 w-8 flex-shrink-0">
                    {pillar.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-warm-800 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-warm-500">{pillar.subtitle}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-warm-400 transition-transform flex-shrink-0 mt-1 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pl-19">
                    <div className="pl-13 border-l-2 border-warm-100 ml-0.5">
                      <p className="text-sm text-warm-600 leading-relaxed mb-4 pl-4">
                        {pillar.description}
                      </p>
                      <div className="pl-4">
                        <h4 className="text-xs uppercase tracking-widest text-warm-400 mb-3">
                          Konkret
                        </h4>
                        <ul className="space-y-2">
                          {pillar.practices.map((p, i) => (
                            <li
                              key={i}
                              className="text-sm text-warm-600 flex items-start gap-2"
                            >
                              <span className="text-accent mt-0.5 flex-shrink-0">
                                &rarr;
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Kulturgärten */}
        <div className="mt-16 bg-accent/5 rounded-2xl p-8 md:p-10 border border-accent/20">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-2xl">{"\u{1F331}"}</span>
            <div>
              <h3 className="text-xl font-medium text-warm-800 mb-2">
                Kulturgärten
              </h3>
              <p className="text-sm text-warm-600 leading-relaxed">
                Überschaubare Mikro-Projekte, die Sie in Ihrem direkten Umfeld
                starten können. Keine utopischen Entwürfe, sondern Keimzellen —
                Lernprojekte, die wachsen dürfen.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
              {
                title: "Nachbarschafts-Werkstatt",
                desc: "Einmal im Monat gemeinsam reparieren. Werkzeug teilen, Wissen teilen.",
              },
              {
                title: "Notfall-Kochgruppe",
                desc: "Zusammen lernen, mit Grundvorrat gute Mahlzeiten zu kochen.",
              },
              {
                title: "Lern-Tandem",
                desc: "Zwei Menschen bringen sich gegenseitig etwas bei. Sprache, Handwerk, Technik.",
              },
              {
                title: "Quartier-Karte",
                desc: "Wer kann was? Wer hat was? Eine analoge Ressourcen-Karte der Nachbarschaft.",
              },
            ].map((garden) => (
              <div
                key={garden.title}
                className="bg-white rounded-xl p-4 border border-warm-200"
              >
                <h4 className="text-sm font-medium text-warm-700 mb-1">
                  {garden.title}
                </h4>
                <p className="text-xs text-warm-500 leading-relaxed">
                  {garden.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
