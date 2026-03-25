"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "Ancora" },
  { id: "verstehen", label: "Verstehen" },
  { id: "handeln", label: "Handeln" },
  { id: "haltung", label: "Haltung" },
];

export default function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: el.getBoundingClientRect().top };
      });

      const current = offsets.reduce((closest, section) =>
        Math.abs(section.top) < Math.abs(closest.top) ? section : closest
      );
      setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-50/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-warm-700 font-medium tracking-wide text-lg"
        >
          Ancora
        </a>
        <div className="hidden sm:flex gap-8">
          {sections.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-sm tracking-wide transition-colors ${
                active === s.id
                  ? "text-warm-800 font-medium"
                  : "text-warm-400 hover:text-warm-600"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
        {/* Mobile: subtle dots indicator */}
        <div className="flex sm:hidden gap-2">
          {sections.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                active === s.id ? "bg-warm-600" : "bg-warm-300"
              }`}
              aria-label={s.label}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
