import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import data from "../config/data";

export default function Projects() {
  const { t } = useTheme();
  const accents = [t.gFrom, t.gTo, t.primary];
  const [showNotice, setShowNotice] = useState(false);
  const [noticeUrl, setNoticeUrl] = useState("");

  const handleLiveDemo = (url, isMediNexus) => {
    if (isMediNexus) {
      setNoticeUrl(url);
      setShowNotice(true);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <Section id="projects">
      <SectionTitle sub="What I've built">Projects</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {data.projects.map((p, i) => (
          <Glass key={i} style={{ position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg, ${accents[p.accent % 3]}, ${accents[(p.accent + 1) % 3]})`,
            }} />
            <div style={{ paddingTop: 8 }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 2 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: t.primary, fontWeight: 600, marginBottom: 12 }}>{p.sub}</p>
              <p style={{ color: t.textSec, fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {p.tech.map(tc => (
                  <span key={tc} style={{
                    padding: "5px 14px", borderRadius: 8, fontSize: 12,
                    fontWeight: 600, background: t.primaryLight, color: t.primary,
                  }}>{tc}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {p.live && (
                  <span
                    onClick={() => handleLiveDemo(p.live, p.title === "MediNexus")}
                    style={{
                      color: t.primary, fontSize: 14, fontWeight: 600,
                      textDecoration: "none", borderBottom: `1px solid ${t.primary}40`,
                      cursor: "pointer",
                    }}
                  >Live Demo ↗</span>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" style={{
                    color: t.textSec, fontSize: 14, fontWeight: 500,
                    textDecoration: "none", borderBottom: `1px dashed ${t.textMuted}40`,
                  }}>Source Code ↗</a>
                )}
              </div>
            </div>
          </Glass>
        ))}
      </div>

      {/* MediNexus loading notice */}
      {showNotice && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        }}>
          <div style={{
            background: t.surface, borderRadius: 20, padding: 32,
            border: `1px solid ${t.border}`, maxWidth: 440, textAlign: "center",
            boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 }}>
              Heads up!
            </h3>
            <p style={{ fontSize: 14, color: t.textSec, lineHeight: 1.7, marginBottom: 8 }}>
              This project runs on Azure's free student tier, so the backend takes about
              <strong style={{ color: t.primary }}> 30-45 seconds</strong> to wake up on first load.
            </p>
            <p style={{ fontSize: 14, color: t.textSec, lineHeight: 1.7, marginBottom: 24 }}>
              Meanwhile, you can always enjoy a game! Head to the
              <strong style={{ color: t.primary }}> terminal {">"} </strong>
              in the bottom left corner, type <code style={{
                background: t.primaryLight, padding: "2px 6px", borderRadius: 4,  
                fontFamily: "monospace", fontSize: 13, color: t.primary,
              }}>games</code> and pick what you'd like to play.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a
                href={noticeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowNotice(false)}
                style={{
                  padding: "12px 28px", borderRadius: 12, fontWeight: 600, fontSize: 14,
                  border: "none", textDecoration: "none", cursor: "pointer",
                  background: `linear-gradient(135deg, ${t.gFrom}, ${t.gTo})`, color: "#fff",
                  boxShadow: `0 4px 16px ${t.glow}`,
                }}
              >
                Go to Website ↗
              </a>
              <button
                onClick={() => setShowNotice(false)}
                style={{
                  padding: "12px 28px", borderRadius: 12, fontWeight: 600, fontSize: 14,
                  border: `1px solid ${t.border}`, background: "transparent",
                  color: t.textSec, cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}