import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import useFadeIn from "../hooks/useFadeIn";
import useCountUp from "../hooks/useCountUp";
import data from "../config/data";

function StatCard({ stat, delay }) {
  const { t } = useTheme();
  const [ref, visible] = useFadeIn(0.3);
  const count = useCountUp(stat.val, 1500, visible);

  return (
    <Glass
      style={{
        gridColumn: "span 2", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        opacity: 0, animation: visible ? `scaleIn 0.5s ${delay}s forwards` : "none",
      }}
    >
      <div ref={ref} />
      <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: t.primary, fontFamily: "monospace" }}>
        {count}
      </div>
      <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>{stat.label}</div>
    </Glass>
  );
}

export default function About() {
  const { t } = useTheme();

  return (
    <Section id="about">
      <SectionTitle sub="Who I am">A bit about me</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, gridAutoRows: "minmax(120px, auto)" }}>
        <Glass style={{ gridColumn: "span 4", gridRow: "span 2", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: t.textSec }}>
            I started out in electronics engineering in Mumbai, got fascinated by code, and never looked back. Spent 3.5 years at AuroPay building the payment infrastructure that banks depend on. Now I'm at Northeastern, going deeper into systems design and data engineering.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: t.textSec, marginTop: 12 }}>
            When I'm not coding, I'm probably at the gym (I work there too), spotting planes at Logan, or hunting for deals at Costco.
          </p>
        </Glass>

        {data.stats.map((s, i) => (
          <StatCard key={i} stat={s} delay={0.1 + i * 0.1} />
        ))}

        <Glass style={{ gridColumn: "span 2", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>📍</span>
          <div>
            <div style={{ fontWeight: 700, color: t.text }}>Boston, MA</div>
            <div style={{ fontSize: 12, color: t.textMuted }}>Originally from Mumbai</div>
            <div style={{ fontSize: 11, color: t.primary, marginTop: 4, fontWeight: 600 }}>
              Open to relocate anywhere in the US
            </div>
          </div>
        </Glass>
      </div>
    </Section>
  );
}