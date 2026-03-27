import { useState, useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import useMouse from "./hooks/useMouse";
import useCursorTrail from "./hooks/useCursorTrail";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Terminal from "./components/Terminal";
import SnakeGame from "./components/SnakeGame";
import MemoryGame from "./components/MemoryGame";
import TetrisGame from "./components/TetrisGame";
import TypingGame from "./components/TypingGame";

const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

export default function App() {
  const { t } = useTheme();
  const mouse = useMouse();
  const { particles } = useCursorTrail(14, 50);
  const [scrollY, setScrollY] = useState(0);
  const [clicking, setClicking] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showTetris, setShowTetris] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [konamiKeys, setKonamiKeys] = useState([]);
  const [konamiActive, setKonamiActive] = useState(false);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousedown", down); window.removeEventListener("mouseup", up); };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      setKonamiKeys(prev => {
        const next = [...prev, e.keyCode].slice(-10);
        if (next.length === 10 && next.every((v, i) => v === KONAMI[i])) {
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 5000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const maxScroll = typeof document !== "undefined"
    ? document.documentElement.scrollHeight - window.innerHeight
    : 1;
  const progress = Math.min((scrollY / (maxScroll || 1)) * 100, 100);

  return (
    <div style={{
      background: t.bg, color: t.text, minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      transition: "background 0.4s, color 0.4s",
      position: "relative", overflow: "hidden",
      cursor: "none",
    }}>

      {/* Custom cursor - dot */}
      <div style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: clicking ? 6 : 8, height: clicking ? 6 : 8,
        borderRadius: "50%", background: t.primary,
        left: mouse.x - (clicking ? 3 : 4),
        top: mouse.y - (clicking ? 3 : 4),
        transition: "width 0.15s, height 0.15s, left 0.05s, top 0.05s",
        mixBlendMode: "difference",
      }} />

      {/* Custom cursor - ring */}
      <div style={{
        position: "fixed", zIndex: 9998, pointerEvents: "none",
        width: clicking ? 28 : 36, height: clicking ? 28 : 36,
        borderRadius: "50%", border: `1.5px solid ${t.primary}80`,
        left: mouse.x - (clicking ? 14 : 18),
        top: mouse.y - (clicking ? 14 : 18),
        transition: "width 0.2s ease-out, height 0.2s ease-out, left 0.15s ease-out, top 0.15s ease-out",
        background: clicking ? `${t.primary}10` : "transparent",
      }} />

      {/* Emoji trail particles */}
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "fixed", left: p.x, top: p.y,
          fontSize: p.size, pointerEvents: "none", zIndex: 9997,
          opacity: 0, transform: `rotate(${p.rotation}deg)`,
          animation: "emojiFloat 0.8s ease-out forwards",
        }}>
          {p.emoji}
        </div>
      ))}

      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3, zIndex: 200,
        background: `linear-gradient(90deg, ${t.gFrom}, ${t.gTo})`,
        width: `${progress}%`, transition: "width 0.1s linear",
      }} />

      {/* Noise texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <Nav scrollY={scrollY} />
      <Hero scrollY={scrollY} />
      <About />
      <TechStack />
      <Experience />
      <Projects />
      <Certifications />
      <Education />
      <Contact />
      <Footer />

      <Terminal
        onOpenSnake={() => setShowSnake(true)}
        onOpenMemory={() => setShowMemory(true)}
        onOpenTetris={() => setShowTetris(true)}
        onOpenTyping={() => setShowTyping(true)}
      />

      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
      {showMemory && <MemoryGame onClose={() => setShowMemory(false)} />}
      {showTetris && <TetrisGame onClose={() => setShowTetris(false)} />}
      {showTyping && <TypingGame onClose={() => setShowTyping(false)} />}

      {/* Konami easter egg */}
      {konamiActive && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.8)",
        }}>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🎉🕹️🚀</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>You found the secret!</h2>
            <p style={{ fontSize: 16, color: "#aaa" }}>The Konami code still works. You're clearly a person of culture.</p>
            <p style={{ fontSize: 14, color: "#666", marginTop: 16 }}>Disappearing in 5 seconds...</p>
          </div>
        </div>
      )}

      {/* Back to top */}
      {scrollY > 400 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 28, right: 28, width: 46, height: 46, borderRadius: 14,
            border: "none", cursor: "none",
            background: `linear-gradient(135deg, ${t.gFrom}, ${t.gTo})`,
            color: "#fff", fontSize: 18, boxShadow: `0 4px 20px ${t.glow}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 50, transition: "all 0.3s",
          }}
        >↑</button>
      )}

      {/* Global styles */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes emojiFloat {
          0% { opacity: 0.9; transform: translateY(0) scale(1) rotate(0deg); }
          50% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-40px) scale(0.3) rotate(180deg); }
        }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        *{margin:0;padding:0;box-sizing:border-box;cursor:none !important}
        html{scroll-behavior:smooth}
        a, button, span, input { cursor: none !important; }
        ::selection{background:${t.primary}30}

        @media (max-width: 768px) {
          section > div > div[style*="flex: 1 1 440px"] {
            text-align: center;
          }
          section > div > div[style*="flex: 0 0 320px"] {
            flex: 0 0 260px !important;
          }
          nav > div > div > div[style*="gap: 2"] {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: repeat(6"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridTemplateColumns: repeat(6"] > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          div[style*="gridTemplateColumns: repeat(auto-fill, minmax(100px"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          div[style*="gridTemplateColumns: repeat(auto-fill, minmax(300px"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="flex: 0 0 320px"],
          section > div > div[style*="flex: 0 0 260px"] {
            flex: 0 0 100% !important;
            max-width: 300px;
          }
          section[id] {
            padding: 60px 16px !important;
          }
          h1 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}