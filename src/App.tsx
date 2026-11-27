import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import WelcomeScreen from "@/components/WelcomeScreen";
import AIEngineerSection from "@/components/AIEngineerSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import NeuralBackground from "@/components/NeuralBackground";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";


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
            <div className="hero-neural-visual" aria-hidden="true">
              <div className="hero-neural-halo" />
              <svg className="hero-neural-svg" viewBox="0 0 700 700" fill="none">
                <defs>
                  <radialGradient id="neuralCoreGradient" cx="35%" cy="28%" r="75%">
                    <stop offset="0%" stopColor="#F8FBFF" /><stop offset="18%" stopColor="#AFC8FF" />
                    <stop offset="42%" stopColor="#527BDA" /><stop offset="72%" stopColor="#182B59" />
                    <stop offset="100%" stopColor="#050812" />
                  </radialGradient>
                  <radialGradient id="neuralGlowGradient">
                    <stop offset="0%" stopColor="#7EA7FF" stopOpacity=".42" /><stop offset="100%" stopColor="#7EA7FF" stopOpacity="0" />
                  </radialGradient>
                  <filter id="neuralBlur"><feGaussianBlur stdDeviation="12" /></filter>
                </defs>
                <circle cx="350" cy="350" r="250" fill="url(#neuralGlowGradient)" filter="url(#neuralBlur)" />
                <g className="hero-orbit hero-orbit-a">
                  <ellipse cx="350" cy="350" rx="250" ry="92" stroke="#A9C5FF" strokeOpacity=".45" />
                  <ellipse cx="350" cy="350" rx="250" ry="92" stroke="#A9C5FF" strokeOpacity=".16" transform="rotate(60 350 350)" />
                </g>
                <g className="hero-orbit hero-orbit-b">
                  <ellipse cx="350" cy="350" rx="205" ry="120" stroke="#DCE8FF" strokeOpacity=".35" transform="rotate(-48 350 350)" />
                  <ellipse cx="350" cy="350" rx="285" ry="150" stroke="#789BEB" strokeOpacity=".22" transform="rotate(24 350 350)" />
                </g>
                <g stroke="#9BB9FF" strokeOpacity=".38" strokeWidth="1.4">
                  <path d="M350 92 455 190 530 325 470 470 350 585 210 470 155 325 245 190Z" />
                  <path d="M245 190 455 190 470 470 210 470Z" />
                  <path d="M155 325 350 92 530 325 350 585Z" />
                  <path d="M245 190 350 350 455 190M210 470 350 350 470 470" />
                </g>
                <g fill="#DCE8FF">
                  <circle cx="350" cy="92" r="5" /><circle cx="455" cy="190" r="4" /><circle cx="530" cy="325" r="5" />
                  <circle cx="470" cy="470" r="4" /><circle cx="350" cy="585" r="5" /><circle cx="210" cy="470" r="4" />
                  <circle cx="155" cy="325" r="5" /><circle cx="245" cy="190" r="4" />
                </g>
                <circle cx="350" cy="350" r="126" fill="#7399F2" fillOpacity=".12" />
                <circle cx="350" cy="350" r="92" fill="url(#neuralCoreGradient)" stroke="#DCE8FF" strokeOpacity=".6" strokeWidth="1.5" />
                <circle cx="350" cy="350" r="68" stroke="#E5EEFF" strokeOpacity=".2" />
                <circle cx="350" cy="350" r="38" fill="#EAF2FF" fillOpacity=".12" />
                <circle cx="350" cy="350" r="17" fill="#F8FBFF" />
                <circle cx="350" cy="350" r="38" stroke="#DCE8FF" strokeOpacity=".6" />
              </svg>
              <div className="hero-orbit-label hero-orbit-label-one">MACHINE LEARNING</div>
              <div className="hero-orbit-label hero-orbit-label-two">NEURAL NETWORKS</div>
              <div className="hero-orbit-label hero-orbit-label-three">GENERATIVE AI</div>
              <div className="hero-neural-caption"><span /> NEURAL SYSTEM / ONLINE</div>
            </div>

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
        .hero-neural-visual {
          position:absolute; z-index:0; width:min(57vw,720px); aspect-ratio:1;
          right:13%; top:51%; transform:translate(50%,-50%); pointer-events:none;
          opacity:.92; filter:drop-shadow(0 0 50px rgba(74,116,220,.12));
        }
        .hero-neural-halo {
          position:absolute; inset:12%; border-radius:50%;
          background:radial-gradient(circle,rgba(58,91,166,.2),rgba(14,25,50,.08) 45%,transparent 72%);
          filter:blur(22px); animation:neural-halo-pulse 5s ease-in-out infinite;
        }
        .hero-neural-svg { position:relative; width:100%; height:100%; overflow:visible; }
        .hero-orbit-a { transform-origin:350px 350px; animation:neural-rotate 32s linear infinite; }
        .hero-orbit-b { transform-origin:350px 350px; animation:neural-rotate 42s linear infinite reverse; }
        .hero-orbit-label {
          position:absolute; padding:7px 11px; border:1px solid rgba(190,210,255,.2);
          border-radius:999px; background:rgba(5,9,19,.55); color:rgba(222,234,255,.65);
          font:9px/1 monospace; letter-spacing:.2em; white-space:nowrap; backdrop-filter:blur(12px);
          animation:neural-float 5s ease-in-out infinite;
        }
        .hero-orbit-label-one { top:20%; left:2%; }
        .hero-orbit-label-two { top:48%; right:-2%; animation-delay:-1.7s; }
        .hero-orbit-label-three { bottom:17%; left:13%; animation-delay:-3.1s; }
        .hero-neural-caption { position:absolute; bottom:13%; right:8%; color:rgba(220,232,255,.42); font:9px/1 monospace; letter-spacing:.24em; }
        .hero-neural-caption span { display:inline-block; width:6px; height:6px; margin-right:8px; border-radius:50%; background:#9bb9ff; box-shadow:0 0 12px #7399f2; animation:neural-status 1.8s ease-in-out infinite; }
        @keyframes neural-rotate { to { transform:rotate(360deg); } }
        @keyframes neural-float { 0%,100% { translate:0 0; } 50% { translate:0 -9px; } }
        @keyframes neural-halo-pulse { 0%,100% { opacity:.55; scale:.94; } 50% { opacity:1; scale:1.06; } }
        @keyframes neural-status { 50% { opacity:.35; } }
        @media(max-width:767px) {
          .hero-neural-visual { width:105vw; right:50%; top:49%; opacity:.55; }
          .hero-orbit-label { font-size:7px; }
          .hero-neural-caption { right:15%; bottom:18%; font-size:7px; }
        }
        @media(prefers-reduced-motion:reduce) {
          .hero-orbit-a,.hero-orbit-b,.hero-orbit-label,.hero-neural-halo,.hero-neural-caption span { animation:none!important; }
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