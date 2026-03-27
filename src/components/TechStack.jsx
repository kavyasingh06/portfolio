import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Section from "./common/Section";
import SectionTitle from "./common/SectionTitle";
import Glass from "./common/Glass";
import data from "../config/data";

// Tech icon mapping using CDN logos
const ICONS = {
  ".NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Angular": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "IntelliJ": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
};

export default function TechStack() {
  const { t } = useTheme();
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(data.stack.map(s => s.cat))];
  const filtered = filter === "All" ? data.stack : data.stack.filter(s => s.cat === filter);

  return (
    <Section id="skills">
      <SectionTitle sub="What I use">Tech Stack</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {categories.map(c => (
          <span
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "8px 18px", borderRadius: 20, cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              background: filter === c ? `linear-gradient(135deg, ${t.gFrom}, ${t.gTo})` : t.primaryLight,
              color: filter === c ? "#fff" : t.primary,
              transition: "all 0.25s", border: "none",
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12 }}>
        {filtered.map((s, i) => (
          <Glass
            key={s.name}
            style={{
              textAlign: "center", padding: "20px 12px", cursor: "default",
              opacity: 0, animation: `fadeUp 0.4s ${i * 0.04}s forwards`,
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12, margin: "0 auto 10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              {ICONS[s.name] ? (
                <img
                  src={ICONS[s.name]}
                  alt={s.name}
                  style={{ width: 36, height: 36, objectFit: "contain" }}
                  loading="lazy"
                />
              ) : (
                <span style={{ fontSize: 20, fontWeight: 700, color: t.primary }}>
                  {s.name.slice(0, 2)}
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{s.name}</div>
            <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{s.cat}</div>
          </Glass>
        ))}
      </div>
    </Section>
  );
}