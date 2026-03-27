import { useState, useEffect, useRef } from "react";

export default function useCountUp(target, duration = 1500, trigger = false) {
  const [count, setCount] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    // Parse the target: handle "3.5+", "50K+", "40%", "6"
    const suffix = target.replace(/[0-9.]/g, "");
    const numStr = target.replace(/[^0-9.]/g, "");
    const end = parseFloat(numStr);
    const isDecimal = numStr.includes(".");
    const hasK = suffix.includes("K");

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      if (hasK) {
        setCount(Math.round(current) + suffix);
      } else if (isDecimal) {
        setCount(current.toFixed(1) + suffix);
      } else if (suffix === "%") {
        setCount(Math.round(current) + suffix);
      } else {
        setCount(Math.round(current) + suffix);
      }

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return count;
}