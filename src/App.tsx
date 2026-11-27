import { ArrowUpRight, Menu, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import WelcomeScreen from "@/components/WelcomeScreen";
import AIEngineerSection from "@/components/AIEngineerSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import NeuralBackground from "@/components/NeuralBackground";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";

const HeroAIWorkspace = lazy(() => import("@/components/HeroAIWorkspace"));


const logos = ["FAHEEM", "STUDENT", "AI", "ENGINEER"];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const text = "FAHEEM";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
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
            className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black"
          >
            <Suspense fallback={<div className="hero-ai-workspace-fallback" aria-hidden="true" />}>
              <HeroAIWorkspace />
            </Suspense>

            <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10">
              <h1
                onClick={() => setColorMode((prev) => (prev + 1) % colors.length)}
                className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[22vw] md:text-[14vw] lg:text-[13rem] cursor-pointer transition-all duration-300 ${colors[colorMode]}`}
              >
                {displayed || "\u00A0"}
              </h1>

              <p className="md:absolute md:top-28 md:right-16
mt-4 md:mt-0
text-right
text-3xl md:text-4xl lg:text-5xl
leading-[1.05]
max-w-md
font-[Poppins] font-bold
tracking-wide
text-transparent bg-clip-text
bg-[length:200%_auto]
bg-gradient-to-r
from-white via-white/60 to-white
animate-[shine_4s_linear_infinite]">
                Building

                <br />
                Intelligent
                <br />
                AI Systems
                <br />
                For Tomorrow.
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                <p className="relative text-sm sm:text-base lg:text-xl
    leading-relaxed max-w-md
    font-[Poppins] font-medium
    tracking-wide
    text-transparent bg-clip-text
    bg-[length:200%_auto]
    bg-gradient-to-r
    from-white via-white/60 to-white
    animate-[shine_4s_linear_infinite]">
                  AI & Machine Learning Student building intelligent applications with Python, Machine Learning, Deep Learning, NLP and Generative AI.                </p>


              </div>
            </div>
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 10s linear infinite; }
        .hero-ai-workspace {
          position:absolute; z-index:1; width:min(59vw,780px); height:270px;
          right:2.5%; top:64%; transform:translateY(-50%);
          overflow:visible; isolation:isolate;
        }
        .hero-ai-workspace canvas { position:relative; z-index:1; }
        .ai-workspace-glow {
          position:absolute; inset:14% 10%; border-radius:50%;
          background:radial-gradient(ellipse,rgba(62,104,190,.19),rgba(39,61,112,.08) 48%,transparent 75%);
          filter:blur(30px); pointer-events:none; animation:ai-glow-breathe 6s ease-in-out infinite;
        }
        .ai-workspace-panel {
          width:190px; min-height:126px; box-sizing:border-box; padding:13px 14px;
          color:#edf3ff; border:1px solid rgba(188,211,255,.25); border-radius:15px;
          background:linear-gradient(145deg,rgba(23,34,54,.88),rgba(7,11,19,.78));
          box-shadow:0 16px 45px rgba(0,0,0,.38),inset 0 1px rgba(255,255,255,.09);
          backdrop-filter:blur(18px); transition:border-color .25s ease,box-shadow .25s ease,background .25s ease;
          cursor:default; user-select:none;
        }
        .ai-workspace-panel.is-active {
          border-color:var(--panel-accent); background:linear-gradient(145deg,rgba(36,53,82,.96),rgba(8,13,24,.9));
          box-shadow:0 0 30px color-mix(in srgb,var(--panel-accent) 20%,transparent),0 20px 55px rgba(0,0,0,.45);
        }
        .ai-panel-topline { display:flex; justify-content:space-between; color:rgba(205,220,246,.55); font:8px/1.2 ui-monospace,monospace; letter-spacing:.13em; }
        .ai-panel-heading { display:flex; align-items:center; gap:9px; margin-top:13px; font:600 13px/1.2 Inter,system-ui,sans-serif; }
        .ai-panel-icon { display:grid; place-items:center; width:29px; height:29px; border-radius:9px; color:var(--panel-accent); background:rgba(154,188,255,.1); border:1px solid rgba(173,202,255,.16); }
        .ai-panel-code { margin-top:10px; padding:7px 8px; border-radius:7px; color:#c5d8ff; background:rgba(2,6,13,.52); font:9px/1.2 ui-monospace,monospace; white-space:nowrap; }
        .ai-panel-status { display:flex; align-items:center; gap:6px; margin-top:10px; color:rgba(207,220,242,.53); font:7px/1 ui-monospace,monospace; letter-spacing:.12em; }
        .ai-status-dot { display:inline-block; width:5px; height:5px; flex:none; border-radius:50%; background:#8eb7ff; box-shadow:0 0 9px #8eb7ff; animation:ai-status-pulse 1.8s ease-in-out infinite; }
        .ai-panel-spark { margin-left:auto; color:var(--panel-accent); }
        .ai-workspace-footnote { position:absolute; z-index:2; right:12%; bottom:0; color:rgba(206,220,245,.38); font:8px/1 ui-monospace,monospace; letter-spacing:.2em; pointer-events:none; }
        .ai-workspace-footnote .ai-status-dot { margin-right:7px; }
        .hero-ai-workspace-fallback { position:absolute; right:8%; top:64%; width:50vw; height:220px; transform:translateY(-50%); }
        @keyframes ai-status-pulse { 50% { opacity:.35; } }
        @keyframes ai-glow-breathe { 0%,100% { opacity:.55; transform:scale(.94); } 50% { opacity:1; transform:scale(1.05); } }
        @media(max-width:767px) {
          .hero-ai-workspace { width:100%; height:205px; right:0; top:59%; opacity:.95; }
          .ai-workspace-panel { width:155px; min-height:112px; padding:10px 11px; border-radius:12px; }
          .ai-panel-heading { font-size:11px; margin-top:9px; }
          .ai-panel-code { font-size:8px; margin-top:7px; }
          .ai-panel-status { margin-top:8px; font-size:6px; }
          .ai-workspace-footnote { right:10%; bottom:-5px; font-size:6px; }
        }
        @media(prefers-reduced-motion:reduce) {
          .ai-workspace-glow,.ai-status-dot { animation:none!important; }
        }
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