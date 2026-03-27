import { useTheme } from "../context/ThemeContext";
import data from "../config/data";

export default function Footer() {
  const { t } = useTheme();

  return (
    <footer style={{ textAlign: "center", padding: "40px 24px", borderTop: `1px solid ${t.border}` }}>
      <p style={{ color: t.textMuted, fontSize: 13 }}>
        Built with React · Deployed on Netlify · {new Date().getFullYear()} {data.name}
      </p>
      <p style={{
        color: t.textMuted, fontSize: 11, marginTop: 8, opacity: 0.4,
        fontFamily: "monospace", letterSpacing: 1,
      }}>
        psst... gamers know the code ↑↑↓↓←→←→BA
      </p>
    </footer>
  );
}