import { motion } from "framer-motion";
import { ArrowLeft, Download, ExternalLink, Cpu, Brain, Code2, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NeuralBackground from "@/components/NeuralBackground";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const skills = [
  { icon: <Brain size={13} />, label: "Machine Learning" },
  { icon: <Cpu size={13} />, label: "Deep Learning" },
  { icon: <Code2 size={13} />, label: "Python" },
  { icon: <Database size={13} />, label: "NLP" },
  { icon: <Brain size={13} />, label: "Computer Vision" },
  { icon: <Cpu size={13} />, label: "Generative AI" },
  { icon: <Code2 size={13} />, label: "LangChain" },
  { icon: <Database size={13} />, label: "Data Science" },
];

const stats = [
  { value: "2", label: "Projects Built" },
  { value: "B.Tech", label: "AI & ML Degree" },
  { value: "2029", label: "Expected Grad" },
];

export default function About() {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/resume.pdf";
    link.download = "Mohammed_Faheem_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <NeuralBackground />

      {/* subtle radial glow top-right */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      {/* ── Back button ── */}
      <motion.button
        {...fadeUp(0)}
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 backdrop-blur-xl px-4 py-2 text-xs tracking-widest uppercase text-white/70 hover:text-white hover:border-white/30 transition-all duration-300"
      >
        <ArrowLeft size={14} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* ══════════════════════════════════════════
          MAIN GRID
      ══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20">

        {/* ── Page label ── */}
        <motion.p
          {...fadeUp(0.1)}
          className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-3"
        >
          About — Mohammed Faheem
        </motion.p>

        {/* ── Headline ── */}
        <motion.h1
          {...fadeUp(0.18)}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-16"
          style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.01em" }}
        >
          Building AI<br />
          <span className="text-white/30">That Matters.</span>
        </motion.h1>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ════ LEFT — Photo + Stats ════ */}
          <motion.div {...fadeUp(0.26)} className="flex flex-col gap-6">

            {/* Photo card */}
            <div className="relative group">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <img
                  src="/assets/faheem.png"
                  alt="Mohammed Faheem"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: "480px" }}
                />
                {/* overlay gradient at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                {/* name badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-1">AI & ML Student</p>
                  <p className="text-lg font-semibold tracking-wide">Mohammed Faheem</p>
                </div>
                {/* floating status dot */}
                <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-white/60">Open to work</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center"
                >
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <p className="text-[10px] tracking-[0.35em] text-white/35 uppercase mb-3">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((sk, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/65 hover:border-white/25 hover:text-white/90 transition-all duration-200 cursor-default"
                  >
                    {sk.icon}
                    {sk.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ════ RIGHT — Bio + Resume ════ */}
          <motion.div {...fadeUp(0.34)} className="flex flex-col gap-8">

            {/* Bio paragraphs */}
            <div className="space-y-5 text-white/65 text-[15px] leading-[1.85]">
              <p>
                I'm an <span className="text-white font-medium">AI & Machine Learning</span> B.Tech student passionate about building intelligent applications that solve real-world problems — from NLP pipelines to generative AI products.
              </p>
              <p>
                My journey started with programming and evolved into deep exploration of <span className="text-white font-medium">Machine Learning, Deep Learning, Computer Vision,</span> and <span className="text-white font-medium">Generative AI</span>. I work primarily in Python, using modern AI frameworks and best practices.
              </p>
              <p>
                I'm currently <span className="text-white font-medium">actively building projects</span> — from NLP tools to generative AI experiments. Each project is a step toward mastering intelligent systems.
              </p>
              <p>
                Long-term, I want to become an <span className="text-white font-medium">AI Engineer</span> and ship products that create meaningful impact.
              </p>
            </div>

            {/* ── Resume preview card ── */}
            <div>
              <p className="text-[10px] tracking-[0.35em] text-white/35 uppercase mb-3">Resume</p>
              <div className="relative group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                {/* corner glow */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

                {/* resume visual — styled terminal block */}
                <div className="relative overflow-hidden bg-[#0d0d0d] px-6 pt-5 pb-8 font-mono text-xs leading-6">
                  {/* traffic lights */}
                  <div className="flex gap-1.5 mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-3 text-white/20 text-[10px] tracking-widest">resume.pdf</span>
                  </div>
                  {/* fake code lines */}
                  <div className="space-y-1 text-white/50">
                    <p><span className="text-white/25">01</span>  <span className="text-blue-400/80">name</span>      <span className="text-white/20">:</span> <span className="text-green-400/70">Mohammed Faheem</span></p>
                    <p><span className="text-white/25">02</span>  <span className="text-blue-400/80">role</span>      <span className="text-white/20">:</span> <span className="text-green-400/70">AI & ML Student</span></p>
                    <p><span className="text-white/25">03</span>  <span className="text-blue-400/80">degree</span>    <span className="text-white/20">:</span> <span className="text-green-400/70">B.Tech AIML</span></p>
                    <p><span className="text-white/25">04</span>  <span className="text-blue-400/80">grad</span>      <span className="text-white/20">:</span> <span className="text-yellow-400/70">2029</span></p>
                    <p><span className="text-white/25">05</span>  <span className="text-blue-400/80">skills</span>    <span className="text-white/20">:</span> <span className="text-purple-400/70">[ Python, ML, DL, NLP, GenAI ]</span></p>
                    <p><span className="text-white/25">06</span>  <span className="text-blue-400/80">projects</span>  <span className="text-white/20">:</span> <span className="text-yellow-400/70">2</span> <span className="text-white/25">// and counting...</span></p>
                    <p><span className="text-white/25">07</span>  <span className="text-blue-400/80">status</span>    <span className="text-white/20">:</span> <span className="text-green-400/70">building 🚀</span></p>
                    <p><span className="text-white/25">08</span>  <span className="text-blue-400/80">goal</span>      <span className="text-white/20">:</span> <span className="text-green-400/70">AI Engineer</span></p>
                  </div>
                  {/* blinking cursor */}
                  <span className="inline-block w-1.5 h-3.5 bg-white/50 animate-pulse mt-2 ml-6" />
                  {/* bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
                </div>

                  {/* hover view button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="/assets/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-black hover:bg-white transition-colors"
                    >
                      <ExternalLink size={12} />
                      View Full
                    </a>
                  </div>

                {/* footer strip */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.07]">
                  <div>
                    <p className="text-xs font-medium text-white/80">Mohammed_Faheem_Resume.pdf</p>
                    <p className="text-[10px] text-white/35 mt-0.5">Updated 2026</p>
                  </div>
                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase text-black"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full"
                    />
                    <Download size={12} className="relative" />
                    <span className="relative">Download</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ── Contact strip ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                { label: "GitHub", href: "https://github.com/faheemop" },
                { label: "LinkedIn", href: "https://linkedin.com/in/mohammed-faheem" },
                { label: "Email", href: "mailto:faheem@example.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-white/55 hover:text-white hover:border-white/35 transition-all duration-200"
                >
                  {link.label}
                  <ExternalLink size={10} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
