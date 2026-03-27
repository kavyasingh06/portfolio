import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const SENTENCES = [
  "const server = express().listen(3000)",
  "git commit -m 'shipped to production'",
  "docker build -t myapp:latest .",
  "SELECT * FROM users WHERE active = 1",
  "npm install react react-dom typescript",
  "kubectl apply -f deployment.yaml",
  "aws s3 cp ./build s3://my-bucket --recursive",
  "CREATE TABLE payments (id INT PRIMARY KEY)",
  "async function fetchData() { return await api.get() }",
  "public class PaymentService implements IPayment",
];

export default function TypingGame({ onClose }) {
  const { t } = useTheme();
  const [sentence, setSentence] = useState("");
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);

  const newRound = () => {
    const s = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setSentence(s);
    setTyped("");
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setWpm(0);
    setErrors(0);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => { newRound(); }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setTyped(val);

    // Count errors
    let errs = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== sentence[i]) errs++;
    }
    setErrors(errs);
    setAccuracy(val.length > 0 ? Math.round(((val.length - errs) / val.length) * 100) : 100);

    if (val.length === sentence.length) {
      setFinished(true);
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const words = sentence.split(" ").length;
      setWpm(Math.round(words / elapsed));
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
      <div style={{ background: "#161b22", borderRadius: 20, padding: 32, border: "1px solid #21262d", textAlign: "center", maxWidth: 560, width: "90vw" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#c9d1d9", fontSize: 18, fontWeight: 700 }}>Typing Speed Test</h3>
          <span onClick={onClose} style={{ color: "#8b949e", cursor: "pointer", fontSize: 20, fontWeight: 700 }}>x</span>
        </div>

        {/* Target sentence */}
        <div style={{
          background: "#0d1117", borderRadius: 12, padding: "20px 24px",
          border: "1px solid #21262d", marginBottom: 20, textAlign: "left",
          fontFamily: "monospace", fontSize: 16, lineHeight: 1.8,
        }}>
          {sentence.split("").map((char, i) => {
            let color = "#484f58";
            if (i < typed.length) {
              color = typed[i] === char ? "#3fb950" : "#f85149";
            } else if (i === typed.length) {
              color = "#c9d1d9";
            }
            return (
              <span key={i} style={{
                color,
                textDecoration: i === typed.length ? "underline" : "none",
                fontWeight: i === typed.length ? 700 : 400,
              }}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          value={typed}
          onChange={handleInput}
          disabled={finished}
          placeholder={finished ? "" : "Start typing..."}
          style={{
            width: "100%", padding: "14px 18px", borderRadius: 10,
            background: "#0d1117", border: "1px solid #21262d",
            color: "#c9d1d9", fontFamily: "monospace", fontSize: 15,
            outline: "none", marginBottom: 20,
          }}
          autoFocus
        />

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16 }}>
          {[
            { label: "WPM", val: finished ? wpm : "..." },
            { label: "Accuracy", val: `${accuracy}%` },
            { label: "Errors", val: errors },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: t.primary, fontFamily: "monospace" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#8b949e" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {finished && (
          <div style={{ marginTop: 8 }}>
            <p style={{
              color: wpm > 60 ? "#3fb950" : wpm > 40 ? "#d29922" : "#f85149",
              fontWeight: 700, fontSize: 16, marginBottom: 12,
            }}>
              {wpm > 60 ? "Speed demon! 🔥" : wpm > 40 ? "Not bad! 👍" : "Keep practicing! 💪"}
            </p>
            <button onClick={newRound} style={{
              padding: "8px 24px", borderRadius: 8, border: "none",
              background: t.primary, color: "#fff", fontWeight: 600, cursor: "pointer",
            }}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}