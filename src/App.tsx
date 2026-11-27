import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import WelcomeScreen from "@/components/WelcomeScreen";
import AIEngineerSection from "@/components/AIEngineerSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import NeuralBackground from "@/components/NeuralBackground";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";



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

        /* The site-wide neural canvas remains visible behind this transparent hero. */
        .hero-cinematic { position:relative; z-index:3; min-height:clamp(650px,82svh,790px); isolation:isolate; overflow:hidden; background:transparent; }
        .hero-cinematic-light { position:absolute; inset:0; z-index:0; pointer-events:none; background:radial-gradient(ellipse at 50% 38%,rgba(50,105,190,.12),transparent 46%),linear-gradient(180deg,rgba(0,0,0,.22),transparent 42%,rgba(0,0,0,.28)); animation:hero-light-drift 18s ease-in-out infinite alternate; }
        .hero-cinematic-grain { position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.07; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E"); mix-blend-mode:screen; }
        .hero-content { position:relative; z-index:10; width:100%; max-width:1600px; min-height:clamp(650px,82svh,790px); margin:0 auto; padding:132px clamp(22px,6.5vw,110px) 42px; display:flex; flex-direction:column; justify-content:center; }
        .hero-topline { display:flex; justify-content:space-between; align-items:center; gap:16px; color:rgba(225,232,243,.56); font:9px/1.2 ui-monospace,SFMono-Regular,monospace; letter-spacing:.28em; }
        .hero-name { display:flex; flex-direction:column; align-items:flex-start; gap:0; width:100%; margin:clamp(42px,7vh,76px) 0 0; overflow:visible; color:#dce2eb; font-family:var(--font-display),Impact,sans-serif; font-size:clamp(5rem,13.8vw,12.8rem); font-weight:900; line-height:.76; letter-spacing:-.075em; white-space:nowrap; perspective:900px; user-select:none; }
        .hero-name-word { display:inline-flex; position:relative; background:linear-gradient(180deg,#ffffff 0%,#e3e7ed 22%,#aeb6c3 49%,#687181 74%,#dce2eb 100%); -webkit-background-clip:text; background-clip:text; color:transparent; filter:drop-shadow(0 12px 32px rgba(160,185,225,.12)); transition:filter .35s ease; }
        .hero-name-word span { display:inline-block; transform-origin:50% 80%; transition:transform .32s cubic-bezier(.2,.8,.2,1),filter .32s ease; }
        .hero-name-word:hover { filter:drop-shadow(0 10px 34px rgba(180,205,245,.25)); }
        .hero-name-word span:hover { transform:translateY(-5px); filter:brightness(1.3); }
        .hero-name-second { margin-left:clamp(24px,8vw,150px); }
        .hero-headline { align-self:flex-start; margin-top:clamp(26px,4vh,42px); color:#edf1f7; font:600 clamp(1.05rem,2.15vw,1.75rem)/1.15 Inter,system-ui,sans-serif; letter-spacing:.18em; }
        .hero-headline em { color:#a9c9ff; font-style:normal; text-shadow:0 0 24px rgba(100,155,255,.34); }
        .hero-bottom { display:grid; grid-template-columns:minmax(280px,1fr) auto auto; align-items:end; gap:clamp(22px,4vw,60px); margin-top:clamp(34px,5vh,54px); padding-top:20px; border-top:1px solid rgba(220,230,245,.17); }
        .hero-intro { max-width:560px; }
        .hero-intro-label { display:block; margin-bottom:9px; color:rgba(202,219,246,.66); font:8px/1.2 ui-monospace,monospace; letter-spacing:.26em; }
        .hero-intro p { margin:0; color:rgba(231,236,245,.76); font:400 clamp(.84rem,1vw,.98rem)/1.75 Inter,system-ui,sans-serif; letter-spacing:.01em; }
        .hero-actions { display:flex; align-items:center; gap:11px; }
        .hero-cta { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:46px; padding:0 18px; border-radius:999px; cursor:pointer; font:600 9px/1 ui-monospace,monospace; letter-spacing:.13em; transition:transform .3s ease,border-color .3s ease,background .3s ease,box-shadow .3s ease; }
        .hero-cta:hover { transform:translateY(-3px); }
        .hero-cta-primary { color:#07101d; border:1px solid #d4e2f7; background:linear-gradient(110deg,#f0f3f8,#aab8cc); box-shadow:0 0 24px rgba(180,205,245,.14); }
        .hero-cta-primary:hover { box-shadow:0 0 34px rgba(180,205,245,.3); }
        .hero-cta-secondary { color:#e2e8f2; border:1px solid rgba(220,230,245,.25); background:rgba(255,255,255,.045); }
        .hero-cta-secondary:hover { border-color:rgba(220,235,255,.6); background:rgba(255,255,255,.09); }
        .hero-scroll-cue { display:flex; align-items:center; gap:10px; color:rgba(210,222,240,.48); font:7px/1 ui-monospace,monospace; letter-spacing:.2em; white-space:nowrap; }
        .hero-scroll-line { width:34px; height:1px; background:linear-gradient(90deg,#dce7f8,transparent); animation:hero-line-pulse 2.8s ease-in-out infinite; }
        .hero-frame-index { position:absolute; right:clamp(22px,5.2vw,88px); top:55%; color:rgba(220,230,245,.3); font:8px/1 ui-monospace,monospace; letter-spacing:.22em; writing-mode:vertical-rl; }
        @keyframes hero-light-drift { from { transform:translate3d(-.4%,0,0); opacity:.7; } to { transform:translate3d(.4%,.5%,0); opacity:1; } }
        @keyframes hero-line-pulse { 50% { opacity:.35; transform:scaleX(.65); transform-origin:left; } }
        @media(max-width:900px) {
          .hero-content { padding-left:30px; padding-right:30px; }
          .hero-name { font-size:clamp(4.7rem,13vw,8.5rem); }
          .hero-bottom { grid-template-columns:1fr auto; row-gap:20px; }
          .hero-scroll-cue { grid-column:1/-1; justify-self:end; }
          .hero-frame-index { display:none; }
        }
        @media(max-width:640px) {
          .hero-cinematic,.hero-content { min-height:690px; }
          .hero-content { padding:112px 20px 28px; }
          .hero-topline { font-size:7px; letter-spacing:.13em; }
          .hero-name { margin:clamp(52px,10vh,82px) 0 0; font-size:clamp(3.65rem,15.5vw,6.2rem); line-height:.82; letter-spacing:-.07em; }
          .hero-name-second { margin-left:0; }
          .hero-headline { margin-top:28px; font-size:clamp(.9rem,4vw,1.2rem); letter-spacing:.1em; }
          .hero-bottom { display:flex; flex-direction:column; align-items:stretch; gap:19px; margin-top:38px; }
          .hero-intro p { font-size:13px; line-height:1.7; max-width:440px; }
          .hero-actions { flex-wrap:wrap; }
          .hero-cta { min-height:44px; padding:0 14px; font-size:8px; }
          .hero-scroll-cue { align-self:flex-end; }
        }
        @media(prefers-reduced-motion:reduce) { .animate-marquee,.hero-scroll-line,.hero-cinematic-light { animation:none!important; } .hero-name-word span { transition:none; } }
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