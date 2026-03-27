import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import data from "../config/data";

export default function Experience() {
  const { t } = useTheme();

  return (
    <Section id="experience">
      <SectionTitle sub="Where I've worked">Experience</SectionTitle>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: 32, display: "flex", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              background: exp.current ? t.primary : t.gTo,
              border: `3px solid ${t.bg}`,
              boxShadow: `0 0 0 2px ${exp.current ? t.primary : t.gTo}`,
            }} />
            {i < data.experience.length - 1 && (
              <div style={{ flex: 1, width: 2, background: `linear-gradient(${t.gFrom}40, ${t.gTo}40)`, marginTop: 8 }} />
            )}
          </div>
          <Glass style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{exp.role}</h3>
              {exp.current && (
                <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${t.primary}18`, color: t.primary }}>
                  Current
                </span>
              )}
            </div>
            <p style={{ color: t.primary, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{exp.company}</p>
            <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 12 }}>{exp.location} · {exp.period}</p>
            <p style={{ color: t.textSec, fontSize: 14, fontStyle: "italic", marginBottom: 14 }}>{exp.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {exp.points.map((point, j) => (
                <div key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: t.textSec, lineHeight: 1.65 }}>
                  <span style={{ color: t.primary, flexShrink: 0, marginTop: 2 }}>▸</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Glass>
        </div>
      ))}
    </Section>
  );
}