import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import data from "../config/data";

export default function Education() {
  const { t } = useTheme();

  return (
    <Section id="education">
      <SectionTitle sub="Academics">Education</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {data.education.map((ed, i) => (
          <Glass key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{ed.degree}</h3>
              <span style={{
                padding: "5px 14px", borderRadius: 20, fontSize: 12,
                fontWeight: 600, background: t.primaryLight, color: t.primary,
              }}>{ed.period}</span>
            </div>
            <p style={{ color: t.primary, fontWeight: 600, marginBottom: 10, fontSize: 15 }}>
              {ed.school}, {ed.location}
            </p>
            <p style={{ color: t.textSec, fontSize: 14, lineHeight: 1.65 }}>{ed.note}</p>
          </Glass>
        ))}
      </div>
    </Section>
  );
}