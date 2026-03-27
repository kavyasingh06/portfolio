import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const SZ = 16, W = 20, H = 15;

export default function SnakeGame({ onClose }) {
  const { t } = useTheme();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dir = useRef({ x: 1, y: 0 });
  const snake = useRef([{ x: 5, y: 5 }]);
  const food = useRef({ x: 10, y: 10 });
  const running = useRef(true);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const randFood = () => {
      food.current = {
        x: Math.floor(Math.random() * W),
        y: Math.floor(Math.random() * H),
      };
    };

    const loop = setInterval(() => {
      if (!running.current) return;
      const s = snake.current;
      const head = { x: s[0].x + dir.current.x, y: s[0].y + dir.current.y };

      if (head.x < 0 || head.x >= W || head.y < 0 || head.y >= H || s.some(p => p.x === head.x && p.y === head.y)) {
        running.current = false;
        setGameOver(true);
        clearInterval(loop);
        return;
      }

      s.unshift(head);
      if (head.x === food.current.x && head.y === food.current.y) {
        setScore(sc => sc + 1);
        randFood();
      } else {
        s.pop();
      }

      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, W * SZ, H * SZ);
      ctx.fillStyle = t.primary;
      s.forEach(p => ctx.fillRect(p.x * SZ + 1, p.y * SZ + 1, SZ - 2, SZ - 2));
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(food.current.x * SZ + 2, food.current.y * SZ + 2, SZ - 4, SZ - 4);
    }, 120);

    const keyHandler = (e) => {
      const d = dir.current;
      if (e.key === "ArrowUp" && d.y === 0) dir.current = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && d.y === 0) dir.current = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && d.x === 0) dir.current = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && d.x === 0) dir.current = { x: 1, y: 0 };
    };

    window.addEventListener("keydown", keyHandler);
    return () => { clearInterval(loop); window.removeEventListener("keydown", keyHandler); };
  }, [t.primary]);

  const restart = () => {
    snake.current = [{ x: 5, y: 5 }];
    dir.current = { x: 1, y: 0 };
    food.current = { x: 10, y: 10 };
    running.current = true;
    setScore(0);
    setGameOver(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
    }}>
      <div style={{
        background: "#161b22", borderRadius: 20, padding: 24,
        border: "1px solid #21262d", textAlign: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: "#c9d1d9", fontSize: 18, fontWeight: 700 }}>Snake</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: t.primary, fontFamily: "monospace", fontSize: 16, fontWeight: 700 }}>
              Score: {score}
            </span>
            <span onClick={onClose} style={{ color: "#8b949e", cursor: "pointer", fontSize: 20, fontWeight: 700 }}>
              x
            </span>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={W * SZ}
          height={H * SZ}
          style={{ borderRadius: 8, border: "1px solid #21262d", display: "block" }}
        />

        {gameOver && (
          <div style={{ marginTop: 16 }}>
            <p style={{ color: "#f85149", fontWeight: 600, marginBottom: 8 }}>Game Over! Score: {score}</p>
            <button onClick={restart} style={{
              padding: "8px 24px", borderRadius: 8, border: "none",
              background: t.primary, color: "#fff", fontWeight: 600, cursor: "pointer",
            }}>Play Again</button>
          </div>
        )}
        <p style={{ color: "#484f58", fontSize: 11, marginTop: 12 }}>Use arrow keys to move</p>
      </div>
    </div>
  );
}