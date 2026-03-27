import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Glass({ children, style = {}, hover = true, ...props }) {
  const { t } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.card,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16,
        padding: 28,
        border: `1px solid ${hovered && hover ? t.primary + "40" : t.border}`,
        boxShadow: hovered && hover
          ? `0 8px 32px ${t.glow}, inset 0 0 0 1px ${t.primary}20`
          : `0 2px 12px ${t.border}`,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered && hover ? "translateY(-4px)" : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}