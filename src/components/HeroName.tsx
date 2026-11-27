import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const LETTERS = "FAHEEM".split("");
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function GlitchLetter({ char, index }: { char: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [display, setDisplay] = useState(char);
  const glitchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    let count = 0;
    glitchRef.current = setInterval(() => {
      setDisplay(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
      count++;
      if (count > 6) {
        clearInterval(glitchRef.current!);
        setDisplay(char);
      }
    }, 55);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    if (glitchRef.current) clearInterval(glitchRef.current);
    setDisplay(char);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      initial={{ opacity: 0, y: 60, rotateX: -45 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.08 + index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-default select-none"
    >
      <motion.span
        animate={
          hovered
            ? { color: "#ffffff", textShadow: "0 0 18px rgba(255,255,255,0.45)", scaleY: 1.04 }
            : { color: "rgba(255,255,255,0.90)", textShadow: "none", scaleY: 1 }
        }
        transition={{ duration: 0.18 }}
        style={{ display: "inline-block" }}
      >
        {display}
      </motion.span>
    </motion.span>
  );
}

export default function HeroName() {
  return (
    <div
      className="relative mt-6 select-none"
      style={{ perspective: "600px" }}
    >
      {/* Faint stroke ghost for depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          color: "transparent",
          fontSize: "clamp(4.5rem, 20vw, 12rem)",
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        FAHEEM
      </div>

      {/* Interactive letters */}
      <h1
        className="relative flex items-baseline"
        style={{
          fontSize: "clamp(4.5rem, 20vw, 12rem)",
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {LETTERS.map((letter, i) => (
          <GlitchLetter key={i} char={letter} index={i} />
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          style={{ display: "inline-block", color: "rgba(255,255,255,0.22)" }}
        >
          .
        </motion.span>
      </h1>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 h-px bg-gradient-to-r from-white/40 via-white/10 to-transparent"
      />
    </div>
  );
}
