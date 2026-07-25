import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────── Profile Data ─────────────────────────── */

const COMMAND = "cat profile";

const OUTPUT_LINES = [
  "",
  "Name        : F Mohammed Faheem",
  "Role        : AI & ML Student",
  "",
  "Education",
  "-----------",
  "B.E. Artificial Intelligence & Machine Learning",
  "Atria Institute of Technology",
  "Graduating: 2029",
  "",
  "Core Skills",
  "-----------",
  "• Python",
  "• NumPy",
  "• Pandas",
  "• Machine Learning",
  "• Flask",
  "",
  "Currently Building",
  "------------------",
  "• ResumeAI",
  "  AI-powered Resume Analyzer with ATS scoring,",
  "  resume parsing and career recommendations.",
  "",
  "Currently Learning",
  "------------------",
  "• Data Science",
  "• Deep Learning",
  "",
  "Career Goal",
  "-----------",
  "Become an AI Engineer building intelligent,",
  "real-world applications powered by Machine Learning",
  "and Generative AI.",
  "",
  "Status",
  "------",
  "Building. Learning. Improving every day.",
];

/* ─────────────────────────── Timing ───────────────────────────────── */

const CHAR_DELAY    = 50;   // ms per character while typing command
const CMD_PAUSE     = 350;  // pause after command typed, before output
const LINE_DELAY    = 40;   // ms between output lines
const SECTION_DELAY = 150;  // extra delay for blank lines (section gaps)

interface TerminalProfileProps {
  className?: string;
}

export default function TerminalProfile({ className = "" }: TerminalProfileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const hasPlayed    = useRef(false);

  const [phase, setPhase]                 = useState<"idle" | "typing" | "output" | "done">("idle");
  const [typedCmd, setTypedCmd]           = useState("");
  const [lines, setLines]                 = useState<string[]>([]);
  const [prefersReduced, setPrefersReduced] = useState(false);

  /* ── Detect prefers-reduced-motion ───────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Auto-scroll terminal content to bottom ──────────────────────── */
  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  /* ── Animation sequence ──────────────────────────────────────────── */
  const runAnimation = useCallback(() => {
    if (prefersReduced) {
      setTypedCmd(COMMAND);
      setLines(OUTPUT_LINES);
      setPhase("done");
      return;
    }

    setPhase("typing");

    let charIdx = 0;
    const typeInterval = setInterval(() => {
      charIdx++;
      setTypedCmd(COMMAND.slice(0, charIdx));
      if (charIdx >= COMMAND.length) {
        clearInterval(typeInterval);

        setTimeout(() => {
          setPhase("output");
          let lineIdx = 0;

          const printLine = () => {
            if (lineIdx >= OUTPUT_LINES.length) {
              setPhase("done");
              return;
            }

            setLines((prev) => [...prev, OUTPUT_LINES[lineIdx]]);
            const isBlank = OUTPUT_LINES[lineIdx].trim() === "";
            lineIdx++;

            setTimeout(() => {
              scrollToBottom();
              printLine();
            }, isBlank ? SECTION_DELAY : LINE_DELAY);
          };

          printLine();
        }, CMD_PAUSE);
      }
    }, CHAR_DELAY);
  }, [prefersReduced, scrollToBottom]);

  /* ── Intersection Observer — trigger once ─────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          runAnimation();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runAnimation]);

  /* ── Scroll when lines change ──────────────────────────────────── */
  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  /* ─────────────────────────── Render ──────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className={`
        group/terminal relative overflow-hidden
        rounded-2xl
        pointer-events-auto select-none
        will-change-transform
        ${className}
      `}
      style={{
        background: "rgba(15, 15, 18, 0.72)",
        backdropFilter: "blur(22px) saturate(170%)",
        WebkitBackdropFilter: "blur(22px) saturate(170%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 10px 30px rgba(255,255,255,0.02)",
        transform: "perspective(1500px) rotateX(3deg) rotateY(-2deg)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        if (prefersReduced) return;
        e.currentTarget.style.transform = "perspective(1500px) rotateX(1deg) rotateY(-0.5deg) translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 40px 90px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 10px 30px rgba(255,255,255,0.03)";
      }}
      onMouseLeave={(e) => {
        if (prefersReduced) return;
        e.currentTarget.style.transform = "perspective(1500px) rotateX(3deg) rotateY(-2deg)";
        e.currentTarget.style.boxShadow = "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 10px 30px rgba(255,255,255,0.02)";
      }}
    >
      {/* Subtle top-edge light line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* ── Title bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08] bg-[#121216]/60 backdrop-blur-md select-none">
        {/* Traffic lights */}
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />

        <span className="ml-3 text-[11px] tracking-widest text-white/40 font-mono select-none">
          faheem@portfolio:~
        </span>
      </div>

      {/* ── Terminal content ────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="
          p-4 sm:p-5
          font-mono text-xs sm:text-[13px] leading-relaxed
          text-white/80
          h-[340px] sm:h-[400px] lg:h-[440px]
          overflow-y-auto
          terminal-scroll
        "
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {/* Prompt + command */}
        <div className="flex flex-wrap items-center">
          <span className="text-emerald-400 font-semibold">faheem@portfolio</span>
          <span className="text-white/40">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-white/50">$ </span>
          <span className="text-white ml-1.5">{typedCmd}</span>
          {/* Blinking cursor during typing */}
          {(phase === "typing" || phase === "idle") && (
            <span className="terminal-cursor inline-block w-2 h-4 bg-white/80 ml-1 translate-y-[2px]" />
          )}
        </div>

        {/* Output lines */}
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line === "" ? "\u00A0" : line}
          </div>
        ))}

        {/* Final prompt with blinking cursor */}
        {phase === "done" && (
          <div className="flex flex-wrap items-center mt-1">
            <span className="text-emerald-400 font-semibold">faheem@portfolio</span>
            <span className="text-white/40">:</span>
            <span className="text-sky-400">~</span>
            <span className="text-white/50">$ </span>
            <span className="terminal-cursor inline-block w-2 h-4 bg-white/80 ml-1 translate-y-[2px]" />
          </div>
        )}
      </div>

      {/* ── Custom Scrollbar & Cursor Animations ─────────────────────── */}
      <style>{`
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-cursor {
          animation: termBlink 1s step-end infinite;
        }

        .terminal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
        }
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
