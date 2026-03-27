import { useTheme } from "../../context/ThemeContext";

export default function SectionTitle({ children, sub }) {
  const { t } = useTheme();

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
        <div style={{
          height: 2, width: 48, borderRadius: 2,
          background: `linear-gradient(90deg, ${t.gFrom}, ${t.gTo})`,
        }} />
        <span style={{
          fontSize: 13, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: 2, color: t.primary,
        }}>
          {sub}
        </span>
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>
        {children}
      </h2>
    </div>
  );
}