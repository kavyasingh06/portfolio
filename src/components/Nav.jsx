import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = ["about", "skills", "experience", "projects", "certifications", "education", "contact"];

const THEME_HINTS = [
  "Not vibing with this color? Try another!",
  "Click a dot to change the palette 🎨",
  "Psst... there are 10 color combos to try!",
  "Light or dark? You decide 🌙",
  "Each dot is a whole new mood!",
];

export default function Nav({ scrollY }) {
  const { t, mode, toggleMode, palette, setPalette, palettes } = useTheme();
  const scrolled = scrollY > 60;
  const [themeHint, setThemeHint] = useState(false);
  const [hintText, setHintText] = useState("");
  const [hintDismissed, setHintDismissed] = useState(false);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Show theme hint after 8 seconds, auto-dismiss after 18
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!hintDismissed) {
        setHintText(THEME_HINTS[Math.floor(Math.random() * THEME_HINTS.length)]);
        setThemeHint(true);
      }
    }, 8000);

    const hideTimer = setTimeout(() => {
      setThemeHint(false);
    }, 20000);

    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [hintDismissed]);

  const dismissHint = () => {
    setThemeHint(false);
    setHintDismissed(true);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? `${t.surface}dd` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "none",
        padding: "14px 28px", transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontSize: 24, fontWeight: 900, cursor: "pointer", color: t.primary, letterSpacing: -1 }}
          >
            Kavya Singh.
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 2, marginRight: 12 }}>
              {NAV_ITEMS.map(n => (
                <span
                  key={n}
                  onClick={() => go(n)}
                  style={{
                    padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                    fontSize: 13, fontWeight: 500, color: t.textSec,
                    transition: "all 0.2s", letterSpacing: 0.3,
                  }}
                  onMouseEnter={e => { e.target.style.color = t.primary; e.target.style.background = t.primaryLight; }}
                  onMouseLeave={e => { e.target.style.color = t.textSec; e.target.style.background = "transparent"; }}
                >
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </span>
              ))}
            </div>

            {/* Theme switcher */}
            <div style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                background: t.surface, padding: "5px 8px", borderRadius: 10,
                border: `1px solid ${themeHint && !hintDismissed ? t.primary + "50" : t.border}`,
                transition: "all 0.3s",
                animation: themeHint && !hintDismissed ? "themeBounce 2s ease-in-out infinite" : "none",
              }}>
                <span
                  onClick={() => { toggleMode(); dismissHint(); }}
                  style={{
                    cursor: "pointer", fontSize: 16, padding: "2px 4px", borderRadius: 6,
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.2) rotate(20deg)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1) rotate(0deg)"}
                  title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {mode === "light" ? "🌙" : "☀️"}
                </span>
                <span style={{ width: 1, height: 14, background: t.border }} />
                {Object.entries(palettes).map(([key, val]) => (
                  <span
                    key={key}
                    onClick={() => { setPalette(key); dismissHint(); }}
                    title={val.name}
                    style={{
                      width: 16, height: 16, borderRadius: "50%", background: val.swatch,
                      cursor: "pointer", transition: "all 0.2s",
                      border: palette === key ? `2.5px solid ${t.text}` : "2.5px solid transparent",
                      transform: palette === key ? "scale(1.2)" : "scale(1)",
                    }}
                    onMouseEnter={e => { if (palette !== key) e.target.style.transform = "scale(1.15)"; }}
                    onMouseLeave={e => { if (palette !== key) e.target.style.transform = "scale(1)"; }}
                  />
                ))}
              </div>

              {/* Theme hint bubble */}
              {themeHint && !hintDismissed && (
                <div style={{
                  position: "absolute", top: "calc(100% + 12px)", right: 0,
                  background: t.surface, border: `1px solid ${t.primary}30`,
                  borderRadius: 12, padding: "10px 14px", width: 220,
                  boxShadow: `0 8px 24px ${t.glow}`,
                  animation: "fadeUp 0.4s ease-out",
                  zIndex: 10,
                }}>
                  <p style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5, margin: 0 }}>
                    {hintText}
                  </p>
                  {/* Arrow pointing up */}
                  <div style={{
                    position: "absolute", top: -6, right: 20, width: 12, height: 12,
                    background: t.surface, border: `1px solid ${t.primary}30`,
                    borderBottom: "none", borderRight: "none",
                    transform: "rotate(45deg)",
                  }} />
                  <span
                    onClick={dismissHint}
                    style={{
                      position: "absolute", top: 4, right: 8, fontSize: 14,
                      color: t.textMuted, cursor: "pointer",
                    }}
                  >x</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes themeBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      `}</style>
    </>
  );
}