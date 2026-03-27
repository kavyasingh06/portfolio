import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import data from "../config/data";

export default function Contact() {
  const { t } = useTheme();

  const contacts = [
    { icon: "📧", value: data.email, href: `mailto:${data.email}` },
    { icon: "📱", value: data.phone, href: `tel:${data.phone}` },
    { icon: "📍", value: data.location, href: null },
  ];

  return (
    <Section id="contact">
      <SectionTitle sub="Say hello">Get In Touch</SectionTitle>
      <Glass hover={false} style={{
        textAlign: "center", padding: "56px 32px",
        background: `linear-gradient(135deg, ${t.primaryLight}, ${t.card})`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${t.gFrom}08, transparent)`,
          top: -80, right: -80, pointerEvents: "none",
        }} />

        <p style={{ fontSize: 20, color: t.text, fontWeight: 600, marginBottom: 8 }}>
          Looking for a Summer 2026 Co-op
        </p>
        <p style={{ fontSize: 15, color: t.textSec, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Got something interesting? I'd love to hear about it. Drop me a line and let's see if we're a good fit.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
          {contacts.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <span>{c.icon}</span>
              {c.href ? (
                <a href={c.href} style={{ color: t.primary, textDecoration: "none", fontWeight: 500 }}>{c.value}</a>
              ) : (
                <span style={{ color: t.textSec }}>{c.value}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
          <a href={`mailto:${data.email}`} style={{
            padding: "14px 36px", borderRadius: 12, fontWeight: 600, fontSize: 15,
            border: "none", textDecoration: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${t.gFrom}, ${t.gTo})`, color: "#fff",
            boxShadow: `0 4px 20px ${t.glow}`,
          }}>Say Hello</a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" style={{
            padding: "14px 36px", borderRadius: 12, fontWeight: 600, fontSize: 15,
            border: `2px solid ${t.primary}40`, background: "transparent",
            color: t.primary, textDecoration: "none", cursor: "pointer",
          }}>LinkedIn</a>
        </div>
      </Glass>
    </Section>
  );
}