import { useState, useEffect, useCallback } from "react";

const SECTION_EMOJIS = {
  hero: ["🚀", "⚡", "✨"],
  about: ["👋", "🌍", "✈️"],
  skills: ["💻", "⌨️", "🖥️"],
  experience: ["💼", "🏢", "📈"],
  projects: ["🔨", "⚙️", "🛠️"],
  certifications: ["📜", "🏅", "🎓"],
  education: ["🎓", "📚", "🧠"],
  contact: ["📧", "👋", "🤝"],
};

const DEFAULT_EMOJIS = ["✨", "⚡", "💫"];

export default function useCursorTrail(maxParticles = 12, spawnRate = 60) {
  const [particles, setParticles] = useState([]);
  const [currentSection, setCurrentSection] = useState("hero");

  // Detect which section is in view
  useEffect(() => {
    const sections = Object.keys(SECTION_EMOJIS);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Spawn particles on mouse move
  useEffect(() => {
    let lastSpawn = 0;

    const handler = (e) => {
      const now = Date.now();
      if (now - lastSpawn < spawnRate) return;
      lastSpawn = now;

      const emojis = SECTION_EMOJIS[currentSection] || DEFAULT_EMOJIS;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      const particle = {
        id: now + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        emoji,
        //size: 10 + Math.random() * 8,
        size: 18 + Math.random() * 10,
        rotation: Math.random() * 360,
        vx: (Math.random() - 0.5) * 2,
        vy: -1 - Math.random() * 2,
      };

      setParticles((prev) => [...prev.slice(-maxParticles), particle]);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [currentSection, maxParticles, spawnRate]);

  // Remove expired particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [particles]);

  return { particles, currentSection };
}