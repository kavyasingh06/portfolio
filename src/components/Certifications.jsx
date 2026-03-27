import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import data from "../config/data";

export default function Certifications() {
  const { t } = useTheme();
  const accents = [t.gFrom, t.gTo, t.primary];
  const [copied, setCopied] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewName, setPreviewName] = useState("");

  const copyId = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <Section id="certifications">
      <SectionTitle sub="Credentials">Certifications</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {data.certifications.map((c, i) => (
          <Glass key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: 20 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${accents[i % 3]}15, ${accents[(i + 1) % 3]}15)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, border: `1px solid ${accents[i % 3]}20`,
            }}>🏅</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 3 }}>{c.name}</h4>
              <p style={{ fontSize: 12, color: t.textMuted }}>{c.issuer} · {c.date}</p>

              {c.licenseId && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <span style={{
                    fontSize: 11, color: t.textSec, fontFamily: "monospace",
                    background: t.primaryLight, padding: "3px 8px", borderRadius: 6,
                  }}>
                    ID: {c.licenseId}
                  </span>
                  <button
                    onClick={() => copyId(c.licenseId, i)}
                    style={{
                      background: copied === i ? t.primary : "transparent",
                      color: copied === i ? "#fff" : t.textMuted,
                      border: `1px solid ${copied === i ? t.primary : t.border}`,
                      borderRadius: 6, padding: "2px 8px", fontSize: 11,
                      cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
                    }}
                  >
                    {copied === i ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noreferrer" style={{
                    fontSize: 12, color: t.primary, fontWeight: 600,
                    textDecoration: "none",
                  }}>Verify ↗</a>
                )}
                {!c.url && c.preview && (
                  <span
                    onClick={() => { setPreviewUrl(c.preview); setPreviewName(c.name); }}
                    style={{
                      fontSize: 12, color: t.primary, fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >View Certificate ↗</span>
                )}
                {c.url && c.preview && (
                  <span
                    onClick={() => { setPreviewUrl(c.preview); setPreviewName(c.name); }}
                    style={{
                      fontSize: 12, color: t.textSec, fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >Preview</span>
                )}
              </div>
            </div>
          </Glass>
        ))}
      </div>

      {/* Certificate Preview Modal */}
      {previewUrl && (
        <div
          onClick={() => setPreviewUrl(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: t.surface, borderRadius: 20, padding: 24,
              border: `1px solid ${t.border}`, maxWidth: 700, width: "90vw",
              maxHeight: "85vh", display: "flex", flexDirection: "column",
              boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{previewName}</h3>
              <span
                onClick={() => setPreviewUrl(null)}
                style={{ color: t.textMuted, cursor: "pointer", fontSize: 20, fontWeight: 700 }}
              >x</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden", borderRadius: 12, border: `1px solid ${t.border}` }}>
              {previewUrl.endsWith(".pdf") ? (
                <iframe
                  src={previewUrl}
                  title={previewName}
                  style={{ width: "100%", height: "60vh", border: "none" }}
                />
              ) : (
                <img
                  src={previewUrl}
                  alt={previewName}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              )}
            </div>
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 13, color: t.primary, fontWeight: 600,
                  textDecoration: "none",
                }}
              >Open Full Size ↗</a>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}