import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

const COLS = 10, ROWS = 18, SZ = 22;
const SHAPES = [
  [[1,1,1,1]],
  [[1,1],[1,1]],
  [[0,1,0],[1,1,1]],
  [[1,0,0],[1,1,1]],
  [[0,0,1],[1,1,1]],
  [[1,1,0],[0,1,1]],
  [[0,1,1],[1,1,0]],
];
const COLORS = ["#06b6d4","#f59e0b","#8b5cf6","#ef4444","#22c55e","#ec4899","#3b82f6"];

const emptyGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

export default function TetrisGame({ onClose }) {
  const { t } = useTheme();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const grid = useRef(emptyGrid());
  const piece = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const colorIdx = useRef(0);
  const running = useRef(true);
  const interval = useRef(null);

  const newPiece = useCallback(() => {
    const idx = Math.floor(Math.random() * SHAPES.length);
    colorIdx.current = idx;
    piece.current = SHAPES[idx].map(r => [...r]);
    pos.current = { x: Math.floor(COLS / 2) - 1, y: 0 };
    if (collides(grid.current, piece.current, pos.current)) {
      running.current = false;
      setGameOver(true);
    }
  }, []);

  const collides = (g, p, o) => {
    for (let r = 0; r < p.length; r++)
      for (let c = 0; c < p[r].length; c++)
        if (p[r][c] && (o.y + r >= ROWS || o.x + c < 0 || o.x + c >= COLS || g[o.y + r]?.[o.x + c]))
          return true;
    return false;
  };

  const merge = () => {
    const p = piece.current, o = pos.current, g = grid.current;
    for (let r = 0; r < p.length; r++)
      for (let c = 0; c < p[r].length; c++)
        if (p[r][c]) g[o.y + r][o.x + c] = colorIdx.current + 1;
  };

  const clearRows = () => {
    const g = grid.current;
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (g[r].every(c => c)) {
        g.splice(r, 1);
        g.unshift(Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }
    if (cleared) setScore(s => s + cleared * 100);
  };

  const rotate = (p) => {
    const rows = p.length, cols = p[0].length;
    const rot = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        rot[c][rows - 1 - r] = p[r][c];
    return rot;
  };

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const g = grid.current, p = piece.current, o = pos.current;

    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, COLS * SZ, ROWS * SZ);

    // Grid lines
    ctx.strokeStyle = "#161b22";
    for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0, r * SZ); ctx.lineTo(COLS * SZ, r * SZ); ctx.stroke(); }
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c * SZ, 0); ctx.lineTo(c * SZ, ROWS * SZ); ctx.stroke(); }

    // Placed blocks
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (g[r][c]) {
          ctx.fillStyle = COLORS[g[r][c] - 1];
          ctx.fillRect(c * SZ + 1, r * SZ + 1, SZ - 2, SZ - 2);
        }

    // Current piece
    if (p)
      for (let r = 0; r < p.length; r++)
        for (let c = 0; c < p[r].length; c++)
          if (p[r][c]) {
            ctx.fillStyle = COLORS[colorIdx.current];
            ctx.fillRect((o.x + c) * SZ + 1, (o.y + r) * SZ + 1, SZ - 2, SZ - 2);
          }
  };

  const tick = useCallback(() => {
    if (!running.current || !piece.current) return;
    const next = { ...pos.current, y: pos.current.y + 1 };
    if (collides(grid.current, piece.current, next)) {
      merge();
      clearRows();
      newPiece();
    } else {
      pos.current = next;
    }
    draw();
  }, [newPiece]);

  useEffect(() => {
    newPiece();
    interval.current = setInterval(tick, 400);
    const keyH = (e) => {
      if (!running.current || !piece.current) return;
      const p = piece.current, o = pos.current;
      if (e.key === "ArrowLeft") {
        const nx = { ...o, x: o.x - 1 };
        if (!collides(grid.current, p, nx)) pos.current = nx;
      } else if (e.key === "ArrowRight") {
        const nx = { ...o, x: o.x + 1 };
        if (!collides(grid.current, p, nx)) pos.current = nx;
      } else if (e.key === "ArrowDown") {
        const nx = { ...o, y: o.y + 1 };
        if (!collides(grid.current, p, nx)) pos.current = nx;
      } else if (e.key === "ArrowUp") {
        const rot = rotate(p);
        if (!collides(grid.current, rot, o)) piece.current = rot;
      }
      draw();
    };
    window.addEventListener("keydown", keyH);
    return () => { clearInterval(interval.current); window.removeEventListener("keydown", keyH); };
  }, [tick, newPiece]);

  const restart = () => {
    grid.current = emptyGrid();
    running.current = true;
    setScore(0);
    setGameOver(false);
    newPiece();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
      <div style={{ background: "#161b22", borderRadius: 20, padding: 24, border: "1px solid #21262d", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: "#c9d1d9", fontSize: 18, fontWeight: 700 }}>Tetris</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: t.primary, fontFamily: "monospace", fontSize: 16, fontWeight: 700 }}>Score: {score}</span>
            <span onClick={onClose} style={{ color: "#8b949e", cursor: "pointer", fontSize: 20, fontWeight: 700 }}>x</span>
          </div>
        </div>
        <canvas ref={canvasRef} width={COLS * SZ} height={ROWS * SZ} style={{ borderRadius: 8, border: "1px solid #21262d", display: "block" }} />
        {gameOver && (
          <div style={{ marginTop: 16 }}>
            <p style={{ color: "#f85149", fontWeight: 600, marginBottom: 8 }}>Game Over! Score: {score}</p>
            <button onClick={restart} style={{ padding: "8px 24px", borderRadius: 8, border: "none", background: t.primary, color: "#fff", fontWeight: 600, cursor: "pointer" }}>Play Again</button>
          </div>
        )}
        <p style={{ color: "#484f58", fontSize: 11, marginTop: 12 }}>Arrow keys to move, Up to rotate</p>
      </div>
    </div>
  );
}