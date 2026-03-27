import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const TECHS = [".NET", "React", "Python", "AWS", "Docker", "SQL", "Java", "Git"];

export default function MemoryGame({ onClose }) {
  const { t } = useTheme();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const shuffle = () => {
    const shuffled = [...TECHS, ...TECHS]
      .sort(() => Math.random() - 0.5)
      .map((val, id) => ({ id, val }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => { shuffle(); }, []);

  const flip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves(m => m + 1);
      if (cards[next[0]].val === cards[next[1]].val) {
        setMatched(prev => [...prev, next[0], next[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const won = matched.length === cards.length && cards.length > 0;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
    }}>
      <div style={{
        background: "#161b22", borderRadius: 20, padding: 24,
        border: "1px solid #21262d", textAlign: "center", maxWidth: 420,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: "#c9d1d9", fontSize: 18, fontWeight: 700 }}>Memory Match</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: t.primary, fontFamily: "monospace", fontSize: 14 }}>Moves: {moves}</span>
            <span onClick={onClose} style={{ color: "#8b949e", cursor: "pointer", fontSize: 20, fontWeight: 700 }}>x</span>
          </div>
        </div>

        <p style={{ color: "#8b949e", fontSize: 12, marginBottom: 14 }}>Match the tech stack pairs</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {cards.map(c => {
            const show = flipped.includes(c.id) || matched.includes(c.id);
            const done = matched.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => flip(c.id)}
                style={{
                  width: 80, height: 80, borderRadius: 12, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: done ? `${t.primary}25` : show ? "#1f2937" : "#0d1117",
                  border: `2px solid ${done ? t.primary + "50" : show ? "#374151" : "#21262d"}`,
                  transition: "all 0.3s",
                  fontSize: show ? 13 : 20, fontWeight: 700, fontFamily: "monospace",
                  color: done ? t.primary : show ? "#c9d1d9" : "#21262d",
                }}
              >
                {show ? c.val : "?"}
              </div>
            );
          })}
        </div>

        {won && (
          <div style={{ marginTop: 16 }}>
            <p style={{ color: "#3fb950", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
              You did it in {moves} moves!
            </p>
            <button onClick={shuffle} style={{
              padding: "8px 24px", borderRadius: 8, border: "none",
              background: t.primary, color: "#fff", fontWeight: 600, cursor: "pointer",
            }}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}