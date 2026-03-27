import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import data from "../config/data";

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "How many programmers does it take to change a light bulb? None. That's a hardware problem.",
  "!false ... it's funny because it's true.",
  "A programmer's wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves.",
  "What's a programmer's favorite hangout place? Foo Bar.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
  "There are 10 types of people in the world: those who understand binary and those who don't.",
  "What do you call 8 hobbits? A hobbyte.",
  "Why do Java devs wear glasses? Because they can't C#.",
];

const NEOFETCH = `
  Kavya Singh@portfolio
  -----------------
  OS:       Engineer v3.5
  Host:     Boston, MA
  Kernel:   .NET Core + React
  Uptime:   3.5 years in industry
  Shell:    JavaScript/TypeScript
  Terminal: Kavya Singh.dev
  CPU:      Coffee-powered
  Memory:   Northeastern University
  GPU:      Plane spotting sensors
  Theme:    Midnight Blue
`;

const ASCII_NAME = `
   _____ _     _                            
  / ____| |   (_)                           
 | |    | |__  _ _ __  _ __ ___   __ _ _   _
 | |    | '_ \\| | '_ \\| '_ \` _ \\ / _\` | | | |
 | |____| | | | | | | | | | | | | (_| | |_| |
  \\_____|_| |_|_|_| |_|_| |_| |_|\\__,_|\\__, |
                                         __/ |
                                        |___/ 
`;

const COFFEE = `
       ( (
        ) )
      ........
      |      |]
      \\      /
       '----'
   Have some coffee!
`;

export default function Terminal({ onOpenSnake, onOpenMemory, onOpenTetris, onOpenTyping }) {
  const { t, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [history, setHistory] = useState([
    { type: "sys", text: "Welcome to Kavya Singh.dev terminal v2.0" },
    { type: "sys", text: "Type 'help' to see commands or 'games' to play." },
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const run = (cmd) => {
    const c = cmd.trim().toLowerCase();
    const out = (txt) => ({ type: "out", text: txt });
    const pre = (txt) => ({ type: "pre", text: txt });
    const usr = { type: "usr", text: `$ ${cmd}` };

    const navCmds = ["about", "skills", "experience", "projects", "certifications", "education", "contact"];
    let res;

    if (c === "help") {
      res = pre(
        "NAVIGATION\n" +
        "  about, skills, experience, projects,\n" +
        "  certs, education, contact\n\n" +
        "INFO\n" +
        "  resume    - Download resume\n" +
        "  github    - View GitHub profile\n" +
        "  linkedin  - View LinkedIn profile\n" +
        "  email     - Send me an email\n" +
        "  neofetch  - System info\n" +
        "  whoami    - Who am I?\n\n" +
        "FUN\n" +
        "  games     - Play games!\n" +
        "  joke      - Random dev joke\n" +
        "  coffee    - Need caffeine?\n" +
        "  matrix    - Enter the matrix\n" +
        "  ascii     - ASCII art\n\n" +
        "SYSTEM\n" +
        "  theme dark/light - Switch theme\n" +
        "  ls, pwd, clear, exit"
      );
    } else if (navCmds.includes(c) || navCmds.includes(c.replace("cd ", ""))) {
      const target = c.replace("cd ", "");
      go(target);
      res = out(`> Navigating to ${target}...`);
    } else if (c === "certs" || c === "cd certs") {
      go("certifications");
      res = out("> Navigating to certifications...");
    } else if (c === "resume" || c === "cat resume" || c === "download resume") {
      const a = document.createElement("a");
      a.href = data.resume;
      a.download = "Kavya Singh_Sakhare_Resume.pdf";
      a.click();
      res = out("> Downloading resume...");
    } else if (c === "github" || c === "open github") {
      window.open(data.github, "_blank");
      res = out("> Opening GitHub...");
    } else if (c === "linkedin" || c === "open linkedin") {
      window.open(data.linkedin, "_blank");
      res = out("> Opening LinkedIn...");
    } else if (c === "email" || c === "open email" || c === "mail") {
      window.open(`mailto:${data.email}`, "_blank");
      res = out(`> Opening mail to ${data.email}...`);
    } else if (c === "theme dark") {
      setMode("dark");
      res = out("> Switched to dark mode.");
    } else if (c === "theme light") {
      setMode("light");
      res = out("> Switched to light mode.");
    } else if (c === "whoami") {
      res = out("Kavya Singh Sakhare. Software Engineer, plane spotter, Costco premium member, gym rat.");
    } else if (c === "pwd") {
      res = out("/home/Kavya Singh/portfolio");
    } else if (c === "ls") {
      res = out("about/  skills/  experience/  projects/  certs/  education/  contact/  resume.pdf  games/");
    } else if (c === "neofetch") {
      res = pre(NEOFETCH);
    } else if (c === "joke") {
      res = out(JOKES[Math.floor(Math.random() * JOKES.length)]);
    } else if (c === "coffee") {
      res = pre(COFFEE);
    } else if (c === "ascii") {
      res = pre(ASCII_NAME);
    } else if (c === "matrix") {
      setMatrixActive(true);
      setTimeout(() => setMatrixActive(false), 5000);
      res = out("> Entering the matrix... (5 seconds)");
    } else if (c === "sudo hire Kavya Singh" || c === "sudo hire") {
      res = out("Password accepted. Hiring in progress... Welcome aboard! 🎉");
    } else if (c === "games" || c === "cd games" || c === "ls games") {
      res = pre(
        "🎮 GAMES ARCADE\n" +
        "─────────────────────────────\n" +
        "  snake    Classic snake. Arrow keys.\n" +
        "  memory   Match tech stack pairs.\n" +
        "  tetris   Block stacking madness.\n" +
        "  typing   How fast can you type?\n\n" +
        "Type the game name to play!"
      );
    } else if (c === "snake") {
      onOpenSnake?.();
      setOpen(false);
      res = out("> Launching Snake...");
    } else if (c === "memory") {
      onOpenMemory?.();
      setOpen(false);
      res = out("> Launching Memory...");
    } else if (c === "tetris") {
      onOpenTetris?.();
      setOpen(false);
      res = out("> Launching Tetris...");
    } else if (c === "typing" || c === "type" || c === "typing test") {
      onOpenTyping?.();
      setOpen(false);
      res = out("> Launching Typing Test...");
    } else if (c === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (c === "exit") {
      setOpen(false);
      return;
    } else if (c === "") {
      return;
    } else {
      res = out(`Command not found: ${cmd}. Type 'help' for commands.`);
    }

    setHistory(prev => [...prev, usr, res]);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  // Auto-dismiss hint after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setHint(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating hint bubble */}
      {hint && !open && (
        <div style={{
          position: "fixed", bottom: 82, left: 28, zIndex: 51,
          background: t.surface, border: `1px solid ${t.primary}30`,
          borderRadius: 12, padding: "10px 16px", maxWidth: 220,
          boxShadow: `0 8px 24px ${t.glow}`,
          animation: "fadeUp 0.5s ease-out",
        }}>
          <p style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5, margin: 0 }}>
            <span style={{ color: t.primary, fontWeight: 700 }}>Try the terminal!</span> Type
            <code style={{
              background: t.primaryLight, padding: "1px 5px", borderRadius: 4,
              fontFamily: "monospace", fontSize: 11, color: t.primary, margin: "0 3px",
            }}>games</code>
            or
            <code style={{
              background: t.primaryLight, padding: "1px 5px", borderRadius: 4,
              fontFamily: "monospace", fontSize: 11, color: t.primary, margin: "0 3px",
            }}>neofetch</code>
          </p>
          <div style={{
            position: "absolute", bottom: -6, left: 20, width: 12, height: 12,
            background: t.surface, border: `1px solid ${t.primary}30`,
            borderTop: "none", borderLeft: "none",
            transform: "rotate(45deg)",
          }} />
          <span
            onClick={() => setHint(false)}
            style={{
              position: "absolute", top: 4, right: 8, fontSize: 14,
              color: t.textMuted, cursor: "pointer",
            }}
          >x</span>
        </div>
      )}

      {/* Toggle button with pulse animation */}
      <button
        onClick={() => { setOpen(!open); setHint(false); setTimeout(() => inputRef.current?.focus(), 100); }}
        style={{
          position: "fixed", bottom: 28, left: 28, width: 46, height: 46, borderRadius: 14,
          border: `1px solid ${open ? t.primary : t.border}`, cursor: "pointer",
          background: open ? `linear-gradient(135deg, ${t.gFrom}, ${t.gTo})` : t.surface,
          color: open ? "#fff" : t.primary,
          fontSize: 20, boxShadow: `0 4px 20px ${t.glow}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, fontFamily: "monospace", fontWeight: 700,
          animation: !open && hint ? "termPulse 2s ease-in-out infinite" : "none",
          transition: "all 0.3s",
        }}
      >
        {open ? "x" : ">_"}
      </button>

      {/* Terminal window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 84, left: 28,
          width: 460, maxWidth: "calc(100vw - 56px)", height: 360,
          background: "#0d1117", borderRadius: 16, overflow: "hidden", zIndex: 60,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)", border: "1px solid #21262d",
          display: "flex", flexDirection: "column",
          animation: "termSlideUp 0.3s ease-out",
        }}>
          {/* Title bar */}
          <div style={{
            padding: "10px 16px", background: "#161b22",
            display: "flex", alignItems: "center", gap: 8,
            borderBottom: "1px solid #21262d",
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f85149", cursor: "pointer" }} onClick={() => setOpen(false)} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d29922" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3fb950" }} />
            <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#8b949e", fontFamily: "monospace" }}>
              Kavya Singh@portfolio ~ v2.0
            </span>
          </div>

          {/* Matrix overlay */}
          {matrixActive && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 2, background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "monospace", fontSize: 11, color: "#00ff41",
              overflow: "hidden",
            }}>
              <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.2, opacity: 0.8, animation: "matrixFall 0.5s linear infinite" }}>
                {Array.from({ length: 20 }, () =>
                  Array.from({ length: 50 }, () =>
                    String.fromCharCode(0x30A0 + Math.random() * 96)
                  ).join("")
                ).join("\n")}
              </pre>
              <div style={{ position: "absolute", color: "#00ff41", fontSize: 18, fontWeight: 700, textShadow: "0 0 10px #00ff41" }}>
                Wake up, Kavya Singh...
              </div>
            </div>
          )}

          {/* Output */}
          <div ref={scrollRef} style={{
            flex: 1, padding: 14, overflowY: "auto",
            fontFamily: "monospace", fontSize: 13, lineHeight: 1.6,
          }}>
            {history.map((h, i) => (
              <div key={i} style={{
                color: h.type === "sys" ? "#8b949e"
                  : h.type === "usr" ? "#58a6ff"
                  : h.type === "pre" ? "#7ee787"
                  : "#c9d1d9",
                marginBottom: 4,
                whiteSpace: h.type === "pre" ? "pre" : "pre-wrap",
                fontFamily: "monospace",
              }}>
                {h.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: "10px 14px", borderTop: "1px solid #21262d",
            display: "flex", alignItems: "center", gap: 8,
            background: "#0a0e14",
          }}>
            <span style={{ color: "#3fb950", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { run(input); setInput(""); } }}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#c9d1d9", fontFamily: "monospace", fontSize: 13,
              }}
              placeholder="type a command..."
              autoFocus
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes termPulse {
          0%, 100% { box-shadow: 0 4px 20px ${t.glow}; }
          50% { box-shadow: 0 4px 30px ${t.primary}50, 0 0 0 4px ${t.primary}15; }
        }
        @keyframes termSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes matrixFall {
          from { transform: translateY(-10px); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}