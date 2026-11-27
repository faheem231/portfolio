import { ArrowUpRight, Menu, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import WelcomeScreen from "@/components/WelcomeScreen";
import AIEngineerSection from "@/components/AIEngineerSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import NeuralBackground from "@/components/NeuralBackground";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";

const HeroAIWorkspace = lazy(() => import("@/components/HeroAIWorkspace"));


const logos = ["PYTHON", "MACHINE LEARNING", "DEEP LEARNING", "NLP", "GENERATIVE AI"];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 200);
    }
    type();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
          <NeuralBackground />
          <AnimatePresence>{showWelcome && <WelcomeScreen />}</AnimatePresence>

          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-black/20 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex w-10 h-10 rounded-full items-center justify-center overflow-hidden bg-[#0B0B0B] border border-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-[10px] transition-all duration-300 ease-out hover:scale-[1.08] hover:border-white/[0.2] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                <img
                  src="/assets/logo.png"
                  alt="F Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/70 uppercase font-medium">
                MOHAMMED • FAHEEM
              </span>
            </div>
            <ul className="hidden md:flex items-center gap-10 text-xs tracking-widest text-white/70 uppercase">
              <li
                onClick={() =>
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </li>

              <li
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </li>

              <li
                onClick={() =>
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Showcase
              </li>

              <li
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </li>
            </ul>

            <div className="hidden md:block text-[10px] tracking-[0.3em] text-white/70 uppercase">
              {time}
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white z-50"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>


          {mobileMenu && (
            <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-white uppercase tracking-[0.3em] text-sm md:hidden">

              <div className="absolute top-30 text-center">
                <p className="text-[10px] text-white/40 tracking-[0.3em] mb-2">
                  TIME
                </p>

                <h2 className="text-2xl tracking-widest font-semibold">
                  {time}
                </h2>
              </div>

              <button
                onClick={() => {
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Home
              </button>

              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                About
              </button>

              <button
                onClick={() => {
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Showcase
              </button>

              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                Contact
              </button>
            </div>
          )}

          <section
            id="Home"
            className="hero-cinematic relative w-full overflow-hidden bg-black"
          >
            <div className="hero-cinematic-light" aria-hidden="true" />
            <div className="hero-cinematic-grain" aria-hidden="true" />

            <div className="hero-content">
              <div className="hero-topline">
                <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
                  PORTFOLIO / 2026
                </motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>
                  AI &amp; MACHINE LEARNING
                </motion.span>
              </div>

              <h1 className="hero-name" aria-label="Mohammed Faheem">
                <span className="hero-name-word" aria-hidden="true">
                  {Array.from("MOHAMMED").map((letter, index) => (
                    <motion.span key={"m-" + index} initial={{ opacity: 0, y: 86, rotateX: -65, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.28 + index * 0.055, ease: [0.22, 1, 0.36, 1] }}>
                      {letter}
                    </motion.span>
                  ))}
                </span>
                <span className="hero-name-word hero-name-second" aria-hidden="true">
                  {Array.from("FAHEEM").map((letter, index) => (
                    <motion.span key={"f-" + index} initial={{ opacity: 0, y: 86, rotateX: -65, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.72 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <motion.div className="hero-headline" initial={{ opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}>
                BUILDING <em>WHAT&apos;S NEXT.</em>
              </motion.div>

              <motion.div className="hero-scene-wrap" initial={{ opacity: 0, scale: 0.92, y: 26 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.25, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}>
                <Suspense fallback={<div className="hero-scene-fallback" aria-hidden="true" />}>
                  <HeroAIWorkspace />
                </Suspense>
              </motion.div>

              <div className="hero-bottom">
                <motion.div className="hero-intro" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="hero-intro-label">THE MINDSET</span>
                  <p>
                    AI &amp; Machine Learning student exploring how intelligent
                    systems can solve real problems — from Python and machine
                    learning to deep learning, NLP and generative AI.
                  </p>
                </motion.div>

                <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.35 }}>
                  <button onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })} className="hero-cta hero-cta-primary">
                    EXPLORE MY WORK <ArrowUpRight size={17} />
                  </button>
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hero-cta hero-cta-secondary">
                    LET&apos;S CONNECT <ArrowUpRight size={17} />
                  </button>
                </motion.div>

                <motion.div className="hero-scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}>
                  <span className="hero-scroll-line" />
                  <span>SCROLL TO EXPLORE</span>
                </motion.div>
              </div>
            </div>
            <span className="hero-frame-index">01 — INTRODUCTION</span>
          </section>

          <div className="bg-black border-t border-white/10 py-5 overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <span
                  key={i}
                  className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>


          <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
        .hero-cinematic { min-height:max(100svh,790px); isolation:isolate; background:radial-gradient(ellipse at 50% 49%,rgba(15,35,70,.2),transparent 48%),linear-gradient(180deg,#050608 0%,#020306 52%,#05070b 100%); }
        .hero-cinematic-light { position:absolute; inset:0; z-index:0; pointer-events:none; background:radial-gradient(ellipse at 50% 48%,rgba(40,105,210,.15),transparent 34%),radial-gradient(ellipse at 12% 20%,rgba(255,255,255,.045),transparent 30%),linear-gradient(110deg,transparent 15%,rgba(90,145,230,.045) 48%,transparent 78%); animation:hero-light-drift 12s ease-in-out infinite alternate; }
        .hero-cinematic-grain { position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.12; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E"); mix-blend-mode:screen; }
        .hero-content { position:relative; z-index:10; max-width:1600px; min-height:max(100svh,790px); margin:0 auto; padding:126px clamp(22px,5.2vw,88px) 34px; display:flex; flex-direction:column; }
        .hero-topline { display:flex; justify-content:space-between; align-items:center; gap:16px; color:rgba(211,222,241,.52); font:9px/1.2 ui-monospace,SFMono-Regular,monospace; letter-spacing:.28em; }
        .hero-name { display:flex; align-items:baseline; justify-content:space-between; gap:.06em; width:100%; margin:30px 0 12px; overflow:visible; color:#dce2eb; font-family:var(--font-display),Impact,sans-serif; font-size:clamp(4.2rem,10.1vw,9.4rem); font-weight:900; line-height:.82; letter-spacing:-.075em; white-space:nowrap; perspective:800px; user-select:none; }
        .hero-name-word { display:inline-flex; background:linear-gradient(180deg,#fff 0%,#d9dfe8 34%,#7f899b 70%,#202633 100%); -webkit-background-clip:text; background-clip:text; color:transparent; filter:drop-shadow(0 12px 32px rgba(125,165,230,.1)); }
        .hero-name-word span { display:inline-block; }
        .hero-name-second { margin-left:auto; }
        .hero-headline { align-self:center; margin-top:24px; color:#e8edf5; font:600 clamp(1.1rem,2.35vw,2rem)/1.1 Inter,system-ui,sans-serif; letter-spacing:.19em; text-align:center; }
        .hero-headline em { color:#86b5ff; font-style:normal; text-shadow:0 0 24px rgba(74,139,255,.42); }
        .hero-scene-wrap { width:100%; margin:auto 0 0; }
        .hero-scene { position:relative; width:min(100%,1040px); height:clamp(220px,31vh,310px); margin:0 auto; overflow:visible; isolation:isolate; }
        .hero-scene canvas { position:absolute!important; inset:0; width:100%!important; height:100%!important; z-index:2; }
        .hero-scene-aura { position:absolute; inset:8% 18%; border-radius:50%; pointer-events:none; background:radial-gradient(ellipse,rgba(45,111,222,.22),rgba(20,55,110,.09) 44%,transparent 73%); filter:blur(32px); animation:hero-aura 7s ease-in-out infinite; }
        .hero-glass-label { position:absolute; z-index:3; display:flex; flex-direction:column; gap:7px; min-width:148px; padding:13px 15px; border:1px solid rgba(186,207,240,.18); border-radius:11px; color:#dce7f8; background:linear-gradient(140deg,rgba(18,29,47,.68),rgba(5,9,16,.48)); box-shadow:0 12px 38px rgba(0,0,0,.22),inset 0 1px rgba(255,255,255,.08); backdrop-filter:blur(16px); pointer-events:none; }
        .hero-glass-label-left { left:2%; top:34%; }
        .hero-glass-label-right { right:2%; bottom:22%; }
        .hero-glass-kicker,.hero-glass-meta { color:rgba(194,213,243,.48); font:7px/1.2 ui-monospace,monospace; letter-spacing:.2em; }
        .hero-glass-label strong { font:600 9px/1.2 ui-monospace,monospace; letter-spacing:.1em; white-space:nowrap; }
        .hero-glass-label strong i { display:inline-block; width:5px; height:5px; margin:0 5px 1px 0; border-radius:50%; background:#83b3ff; box-shadow:0 0 10px #83b3ff; }
        .hero-bottom { display:grid; grid-template-columns:minmax(260px,1fr) auto auto; align-items:end; gap:clamp(24px,4vw,64px); margin-top:8px; padding-top:14px; }
        .hero-intro { max-width:510px; }
        .hero-intro-label { display:block; margin-bottom:10px; color:#82b3ff; font:8px/1.2 ui-monospace,monospace; letter-spacing:.26em; }
        .hero-intro p { margin:0; color:rgba(224,231,242,.72); font:400 clamp(.85rem,1.1vw,1rem)/1.8 Inter,system-ui,sans-serif; letter-spacing:.015em; }
        .hero-actions { display:flex; align-items:center; gap:11px; }
        .hero-cta { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:48px; padding:0 19px; border-radius:999px; cursor:pointer; font:600 9px/1 ui-monospace,monospace; letter-spacing:.14em; transition:transform .3s ease,border-color .3s ease,background .3s ease,box-shadow .3s ease; }
        .hero-cta:hover { transform:translateY(-4px); }
        .hero-cta-primary { color:#07101d; border:1px solid #c7dcff; background:linear-gradient(110deg,#e9f2ff,#8db9ff); box-shadow:0 0 28px rgba(82,145,255,.2); }
        .hero-cta-primary:hover { box-shadow:0 0 38px rgba(82,145,255,.42); }
        .hero-cta-secondary { color:#dce7f8; border:1px solid rgba(192,211,243,.23); background:rgba(255,255,255,.035); }
        .hero-cta-secondary:hover { border-color:rgba(145,188,255,.65); background:rgba(75,125,205,.1); }
        .hero-scroll-cue { display:flex; align-items:center; gap:10px; color:rgba(198,213,237,.42); font:7px/1 ui-monospace,monospace; letter-spacing:.2em; white-space:nowrap; }
        .hero-scroll-line { width:34px; height:1px; background:linear-gradient(90deg,#82b3ff,transparent); animation:hero-line-pulse 2s ease-in-out infinite; }
        .hero-frame-index { position:absolute; right:clamp(22px,5.2vw,88px); top:52%; color:rgba(195,211,235,.25); font:8px/1 ui-monospace,monospace; letter-spacing:.22em; writing-mode:vertical-rl; }
        .hero-scene-fallback { width:100%; height:clamp(220px,31vh,310px); }
        @keyframes hero-aura { 0%,100% { opacity:.55; transform:scale(.94); } 50% { opacity:1; transform:scale(1.06); } }
        @keyframes hero-light-drift { from { transform:translate3d(-1%,0,0); opacity:.65; } to { transform:translate3d(1%,1%,0); opacity:1; } }
        @keyframes hero-line-pulse { 50% { opacity:.35; transform:scaleX(.65); transform-origin:left; } }
        @media(max-width:900px) { .hero-content { padding-left:28px; padding-right:28px; } .hero-name { font-size:clamp(4rem,11vw,7.5rem); } .hero-bottom { grid-template-columns:1fr auto; row-gap:22px; } .hero-scroll-cue { grid-column:1/-1; justify-self:end; } .hero-frame-index { display:none; } }
        @media(max-width:640px) {
          .hero-cinematic,.hero-content { min-height:850px; }
          .hero-content { padding:112px 20px 28px; }
          .hero-topline { font-size:7px; letter-spacing:.16em; }
          .hero-name { flex-direction:column; align-items:flex-start; gap:4px; margin:34px 0 14px; font-size:clamp(3.65rem,15.4vw,6.2rem); line-height:.8; }
          .hero-name-second { margin-left:0; }
          .hero-headline { align-self:flex-start; margin-top:22px; font-size:clamp(1rem,4.5vw,1.35rem); letter-spacing:.12em; }
          .hero-scene { height:245px; width:calc(100% + 24px); margin-left:-12px; }
          .hero-glass-label { min-width:116px; padding:9px 10px; gap:5px; }
          .hero-glass-label-left { left:1%; top:12%; }
          .hero-glass-label-right { right:1%; bottom:9%; }
          .hero-glass-kicker,.hero-glass-meta { font-size:6px; }
          .hero-glass-label strong { font-size:7px; }
          .hero-bottom { display:flex; flex-direction:column; align-items:stretch; gap:20px; margin-top:0; }
          .hero-intro p { font-size:13px; line-height:1.7; max-width:440px; }
          .hero-actions { flex-wrap:wrap; }
          .hero-cta { min-height:45px; padding:0 14px; font-size:8px; }
          .hero-scroll-cue { align-self:flex-end; }
        }
        @media(prefers-reduced-motion:reduce) { .animate-marquee,.hero-scene-aura,.hero-scroll-line,.hero-cinematic-light { animation:none!important; } }
      `}</style>

          <section id="about">
            <AIEngineerSection />
          </section>
          <section id="showcase">
            <Showcase />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      }
      />

      <Route path="/about" element={<About />} />
    </Routes>

  );
}