import { useTheme } from "../context/ThemeContext";
import useTypingEffect from "../hooks/useTypingEffect";
import useMouse from "../hooks/useMouse";
import data from "../config/data";

export default function Hero({ scrollY }) {
  const { t, mode } = useTheme();
  const typed = useTypingEffect(data.roles);
  const mouse = useMouse();

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "120px 24px 80px", position: "relative",
    }}>
      {/* Cursor glow */}
      <div style={{
        position: "fixed", width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(circle, ${t.glow}, transparent 70%)`,
        left: mouse.x - 300, top: mouse.y - 300,
        transition: "left 0.3s ease-out, top 0.3s ease-out", zIndex: 0,
      }} />

      {/* Parallax orbs */}
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${t.gFrom}12, transparent)`, top: `calc(10% - ${scrollY * 0.15}px)`, right: "5%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${t.gTo}10, transparent)`, bottom: `calc(15% + ${scrollY * 0.1}px)`, left: "8%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle, ${t.primary}08, transparent)`, top: `calc(50% - ${scrollY * 0.2}px)`, left: "45%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <div style={{ flex: "1 1 440px" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: t.primaryLight, border: `1px solid ${t.primary}20`, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: t.primary }}>Open to Summer 2026 Co-op</span>
          </div>

          <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.05, marginBottom: 12, letterSpacing: -2 }}>
            Hey, I'm{" "}
            <span style={{ color: t.primary }}>Kavya Singh</span>
          </h1>

          <div style={{ fontSize: 22, fontWeight: 500, color: t.textSec, marginBottom: 20, minHeight: 32 }}>
            {typed}<span style={{ color: t.primary, animation: "blink 1s infinite" }}>_</span>
          </div>

          <p style={{ color: t.textSec, fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
            {data.bio}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={data.resume} download style={{
              padding: "14px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15,
              cursor: "pointer", border: "none", textDecoration: "none",
              background: `linear-gradient(135deg, ${t.gFrom}, ${t.gTo})`, color: "#fff",
              boxShadow: `0 4px 20px ${t.glow}`, transition: "all 0.3s",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              Resume ↓
            </a>
            <span onClick={() => go("contact")} style={{
              padding: "14px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15,
              cursor: "pointer", border: `2px solid ${t.primary}40`,
              background: "transparent", color: t.primary, transition: "all 0.3s",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              Let's Talk
            </span>
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 28 }}>
            {[{ l: "GitHub", u: data.github }, { l: "LinkedIn", u: data.linkedin }].map(s => (
              <a key={s.l} href={s.u} target="_blank" rel="noreferrer"
                style={{ color: t.textMuted, fontSize: 13, textDecoration: "none", fontWeight: 500, transition: "color 0.2s", borderBottom: `1px dashed ${t.textMuted}40` }}
                onMouseEnter={e => e.target.style.color = t.primary}
                onMouseLeave={e => e.target.style.color = t.textMuted}
              >{s.l}</a>
            ))}
          </div>
        </div>

        {/* Code editor headshot */}
        <div style={{ flex: "0 0 320px", position: "relative" }}>
          <div style={{
            borderRadius: 20, overflow: "hidden", border: `1px solid ${t.border}`,
            background: t.surface, boxShadow: `0 20px 60px ${t.glow}`,
          }}>
            <div style={{ padding: "10px 16px", background: t.primaryLight, display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${t.border}` }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: t.textMuted, fontFamily: "monospace" }}>Kavya Singh.dev</span>
            </div>
            <div style={{ width: "100%", height: 340, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${t.gFrom}15, ${t.gTo}15)`, overflow: "hidden" }}>
              <img
                src={mode === "dark" ? "/headshot.jpeg" : "/headshot2.jpeg"}
                alt="Kavya Singh Sakhare"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div style={{ textAlign: "center", color: t.textMuted, fontSize: 13, display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>👨‍💻</div>
                your photo here
              </div>
            </div>
            <div style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: 12, color: t.textSec, lineHeight: 1.8 }}>
              <span style={{ color: t.primary }}>class</span> <span style={{ color: t.gTo }}>Kavya Singh</span> extends <span style={{ color: "#22c55e" }}>Engineer</span> {"{"}<br />
              &nbsp;&nbsp;learning = <span style={{ color: t.gFrom }}>true</span>;<br />
              &nbsp;&nbsp;coffee = <span style={{ color: t.gFrom }}>true</span>;<br />
              &nbsp;&nbsp;planeSpotter = <span style={{ color: t.gFrom }}>true</span>;<br />
              &nbsp;&nbsp;<span style={{ color: t.primary }}>evolve</span>() {"{"} <span style={{ color: t.textMuted }}>/* always */</span> {"}"}<br />
              {"}"};
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}