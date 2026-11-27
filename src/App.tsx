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
    const timer = window.setTimeout(() => setShowWelcome(false), 3800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

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

          <section id="Home" className="hero-film relative w-full overflow-hidden">
            <div className="hero-film-backdrop" aria-hidden="true">
              <div className="hero-film-blue-glow" />
              <div className="hero-digital-architecture" aria-hidden="true">
                <div className="hero-digital-portal hero-digital-portal-left" />
                <div className="hero-digital-portal hero-digital-portal-center" />
                <div className="hero-digital-portal hero-digital-portal-right" />
                <div className="hero-digital-orbit hero-digital-orbit-one" />
                <div className="hero-digital-orbit hero-digital-orbit-two" />
              </div>
              <svg className="hero-digital-mesh" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="digitalLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#6d9bd8" stopOpacity="0" />
                    <stop offset=".5" stopColor="#9fc5f5" stopOpacity=".28" />
                    <stop offset="1" stopColor="#6d9bd8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#digitalLine)" strokeWidth="1">
                  <path d="M0 250 L260 190 L480 285 L720 155 L960 265 L1180 175 L1440 250" />
                  <path d="M0 390 L250 330 L490 420 L720 300 L960 410 L1190 325 L1440 390" />
                  <path d="M0 530 L270 455 L500 555 L720 440 L950 550 L1190 460 L1440 530" />
                  <path d="M260 190 L250 330 L270 455 M480 285 L490 420 L500 555 M720 155 L720 300 L720 440 M960 265 L960 410 L950 550 M1180 175 L1190 325 L1190 460" />
                </g>
                <g fill="#a9ccf5" opacity=".42">
                  <circle cx="260" cy="190" r="2"/><circle cx="480" cy="285" r="2"/><circle cx="720" cy="155" r="2.5"/>
                  <circle cx="960" cy="265" r="2"/><circle cx="1180" cy="175" r="2"/><circle cx="250" cy="330" r="1.5"/>
                  <circle cx="490" cy="420" r="1.5"/><circle cx="720" cy="300" r="2"/><circle cx="960" cy="410" r="1.5"/>
                  <circle cx="1190" cy="325" r="1.5"/>
                </g>
              </svg>
              <div className="hero-digital-particles" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
              </div>
              <div className="hero-film-beam hero-film-beam-one" />
              <div className="hero-film-beam hero-film-beam-two" />
              <div className="hero-film-horizon" />
              <div className="hero-film-floor" />
              <div className="hero-film-vignette" />
              <div className="hero-film-grain" />
            </div>
            <div className="hero-film-content">
              <motion.div className="hero-film-topline" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 }}>
                <span>PORTFOLIO <i>—</i> 2026</span>
                <span>AI &amp; MACHINE LEARNING</span>
              </motion.div>
              <div className="hero-film-title-wrap">
                <motion.div className="hero-film-eyebrow" initial={{ opacity: 0, letterSpacing: "0.55em" }} animate={{ opacity: 1, letterSpacing: "0.28em" }} transition={{ duration: 1.3, delay: 0.65 }}>AN INTRODUCTION</motion.div>
                <motion.h1 className="hero-film-title" initial={{ opacity: 0, y: 34, filter: "blur(16px)", scale: 1.035 }} animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }} transition={{ duration: 1.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}>Faheem<span>.</span></motion.h1>
                <motion.div className="hero-film-title-rule" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1.25, delay: 1.85, ease: [0.16, 1, 0.3, 1] }} />
                <motion.p className="hero-film-tagline" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}>Building <span>what comes next.</span></motion.p>
              </div>
              <div className="hero-film-footer">
                <motion.div className="hero-film-intro" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 3.05 }}>
                  <span className="hero-film-label">CURIOUS BY DESIGN. BUILDING WITH PURPOSE.</span>
                  <p>AI &amp; Machine Learning student exploring intelligent systems through practical work in Python, machine learning and generative AI.</p>
                </motion.div>
                <motion.div className="hero-film-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 3.55 }}>
                  <button onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })} className="hero-film-button hero-film-button-primary">EXPLORE MY WORK <ArrowUpRight size={16} /></button>
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hero-film-button hero-film-button-secondary">GET IN TOUCH <ArrowUpRight size={16} /></button>
                </motion.div>
                <motion.div className="hero-film-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 4.15 }}><span className="hero-film-scroll-mark" /><span>SCROLL TO DISCOVER</span></motion.div>
              </div>
            </div>
            <div className="hero-film-index" aria-hidden="true">01 / THE BEGINNING</div>
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
        .hero-film { isolation:isolate; z-index:1; min-height:clamp(650px,86svh,850px); color:#f4f6fa; background:transparent; }
         .hero-film-backdrop { position:absolute; inset:0; overflow:hidden; z-index:0; pointer-events:none; background:radial-gradient(ellipse at 51% 42%,rgba(17,28,48,.62) 0%,rgba(8,13,23,.48) 42%,rgba(3,6,11,.72) 100%); }
        .hero-digital-mesh { position:absolute; inset:0; width:100%; height:100%; opacity:.2; mix-blend-mode:screen; }
        .hero-digital-architecture { position:absolute; inset:0; perspective:900px; transform-style:preserve-3d; opacity:.28; }
        .hero-digital-portal { position:absolute; bottom:17%; width:clamp(105px,13vw,190px); height:clamp(230px,42vh,390px); border:1px solid rgba(123,170,232,.13); border-bottom:0; transform:rotateY(-18deg) skewY(-3deg); background:linear-gradient(180deg,rgba(35,72,120,.035),rgba(65,112,180,.012) 55%,transparent); box-shadow:inset 0 0 36px rgba(74,126,197,.035),0 0 35px rgba(46,99,169,.035); }
        .hero-digital-portal::before,.hero-digital-portal::after { content:""; position:absolute; top:0; bottom:0; width:1px; background:linear-gradient(180deg,transparent,rgba(151,190,241,.32),transparent); }
        .hero-digital-portal::before { left:12px; } .hero-digital-portal::after { right:12px; }
        .hero-digital-portal-left { left:7%; transform:rotateY(23deg) skewY(4deg) scale(.82); transform-origin:bottom; }
        .hero-digital-portal-center { left:50%; bottom:20%; transform:translateX(-50%) rotateY(0deg); width:clamp(150px,19vw,270px); height:clamp(280px,48vh,440px); border-color:rgba(135,181,241,.19); }
        .hero-digital-portal-right { right:7%; transform:rotateY(-23deg) skewY(-4deg) scale(.82); transform-origin:bottom; }
        .hero-digital-orbit { position:absolute; left:50%; top:43%; border:1px solid rgba(132,177,235,.12); border-radius:50%; transform:translate(-50%,-50%) rotateX(68deg); }
        .hero-digital-orbit-one { width:min(54vw,720px); height:min(54vw,720px); animation:digital-orbit-drift 34s linear infinite; }
        .hero-digital-orbit-two { width:min(39vw,520px); height:min(39vw,520px); border-style:dashed; border-color:rgba(132,177,235,.09); animation:digital-orbit-drift 48s linear infinite reverse; }
        .hero-digital-particles { position:absolute; inset:0; overflow:hidden; }
        .hero-digital-particles i { position:absolute; left:var(--px); top:var(--py); width:2px; height:2px; border-radius:50%; background:#c8ddf8; opacity:0; box-shadow:0 0 8px 2px rgba(125,177,240,.3); animation:digital-particle-float var(--pd) ease-in-out var(--delay) infinite; }
        .hero-digital-particles i:nth-child(1) { --px:12%; --py:30%; --pd:11s; --delay:-4s; }
        .hero-digital-particles i:nth-child(2) { --px:22%; --py:68%; --pd:13s; --delay:-9s; }
        .hero-digital-particles i:nth-child(3) { --px:34%; --py:23%; --pd:12s; --delay:-2s; }
        .hero-digital-particles i:nth-child(4) { --px:43%; --py:58%; --pd:15s; --delay:-11s; }
        .hero-digital-particles i:nth-child(5) { --px:57%; --py:27%; --pd:12s; --delay:-6s; }
        .hero-digital-particles i:nth-child(6) { --px:68%; --py:70%; --pd:14s; --delay:-8s; }
        .hero-digital-particles i:nth-child(7) { --px:78%; --py:35%; --pd:11s; --delay:-3s; }
        .hero-digital-particles i:nth-child(8) { --px:89%; --py:62%; --pd:16s; --delay:-13s; }
        .hero-digital-particles i:nth-child(9) { --px:17%; --py:82%; --pd:14s; --delay:-7s; }
        .hero-digital-particles i:nth-child(10) { --px:74%; --py:17%; --pd:13s; --delay:-10s; }
        .hero-digital-particles i:nth-child(11) { --px:51%; --py:79%; --pd:15s; --delay:-5s; }
        .hero-digital-particles i:nth-child(12) { --px:94%; --py:24%; --pd:12s; --delay:-1s; }
        @keyframes digital-particle-float { 0%,100% { opacity:0; transform:translate3d(0,12px,0) scale(.7); } 35%,65% { opacity:.42; } 50% { transform:translate3d(10px,-28px,0) scale(1.15); } }
        @keyframes digital-orbit-drift { from { rotate:0deg; } to { rotate:360deg; } }
        .hero-film-blue-glow { position:absolute; width:min(72vw,1050px); height:min(48vw,620px); left:50%; top:35%; transform:translate(-50%,-50%); border-radius:50%; background:radial-gradient(ellipse,rgba(42,93,170,.24),rgba(22,53,99,.13) 34%,transparent 72%); filter:blur(26px); animation:film-glow-breathe 12s ease-in-out infinite alternate; }
        .hero-film-beam { position:absolute; top:-45%; width:1px; height:145%; opacity:0; transform-origin:top; background:linear-gradient(180deg,transparent,rgba(142,181,239,.2) 53%,rgba(110,158,231,.06) 80%,transparent); filter:blur(1px); }
        .hero-film-beam-one { left:29%; transform:rotate(24deg); animation:film-beam-reveal 2.8s ease-out .4s forwards; }
        .hero-film-beam-two { right:25%; transform:rotate(-19deg); animation:film-beam-reveal 3.2s ease-out .85s forwards; }
        .hero-film-horizon { position:absolute; left:-10%; right:-10%; bottom:18%; height:1px; background:linear-gradient(90deg,transparent,rgba(118,165,232,.08),rgba(179,204,240,.38),rgba(118,165,232,.08),transparent); box-shadow:0 0 34px 8px rgba(55,111,195,.12); }
        .hero-film-floor { position:absolute; left:10%; right:10%; bottom:-35%; height:58%; opacity:.3; transform:perspective(500px) rotateX(66deg); transform-origin:top; background:repeating-linear-gradient(90deg,transparent 0,transparent 9.9%,rgba(124,165,225,.12) 10%,transparent 10.15%),repeating-linear-gradient(0deg,transparent 0,transparent 17%,rgba(124,165,225,.1) 17.2%,transparent 17.5%); mask-image:linear-gradient(180deg,rgba(0,0,0,.8),transparent 80%); }
        .hero-film-vignette { position:absolute; z-index:1; inset:0; background:linear-gradient(180deg,rgba(0,0,0,.48),transparent 25%,transparent 65%,rgba(0,0,0,.72)),radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.58) 100%); }
        .hero-film-grain { position:absolute; inset:-50%; opacity:.055; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.5'/%3E%3C/svg%3E"); pointer-events:none; }
        .hero-film-content { position:relative; z-index:2; width:min(calc(100% - 64px),1440px); min-height:clamp(650px,86svh,850px); margin:0 auto; padding:120px 0 46px; display:flex; flex-direction:column; justify-content:space-between; }
        .hero-film-topline { display:flex; align-items:center; justify-content:space-between; gap:20px; color:rgba(216,226,242,.55); font:9px/1.4 ui-monospace,SFMono-Regular,monospace; letter-spacing:.24em; }
        .hero-film-topline i { color:#83aeea; font-style:normal; padding:0 5px; }
        .hero-film-title-wrap { position:relative; width:100%; padding:clamp(48px,8vh,86px) 0 clamp(38px,6vh,66px) clamp(4px,7vw,112px); }
        .hero-film-eyebrow { margin-bottom:24px; color:rgba(170,194,229,.65); font:8px/1.2 ui-monospace,monospace; }
        .hero-film-title { margin:0; color:#e6e9ef; font-family:Inter,ui-sans-serif,system-ui,sans-serif; font-size:clamp(5.5rem,12vw,10.8rem); font-weight:650; letter-spacing:-.085em; line-height:.9; text-shadow:0 12px 60px rgba(160,190,235,.14); }
        .hero-film-title span { color:#a9b8ce; }
        .hero-film-title-rule { width:clamp(100px,18vw,250px); height:1px; margin-top:clamp(24px,4vh,42px); transform-origin:left; background:linear-gradient(90deg,#dce5f3,rgba(111,158,226,.55),transparent); box-shadow:0 0 18px rgba(122,169,235,.45); }
        .hero-film-tagline { margin:24px 0 0; color:#d9e0eb; font:400 clamp(1.25rem,2.4vw,2rem)/1.3 Inter,system-ui,sans-serif; letter-spacing:-.035em; }
        .hero-film-tagline span { color:#91b8f0; }
        .hero-film-footer { display:grid; grid-template-columns:minmax(240px,1fr) auto auto; align-items:end; gap:clamp(20px,4vw,64px); padding-top:23px; border-top:1px solid rgba(190,210,240,.17); }
        .hero-film-intro { max-width:500px; }
        .hero-film-label { display:block; margin-bottom:11px; color:rgba(165,190,229,.62); font:8px/1.3 ui-monospace,monospace; letter-spacing:.18em; }
        .hero-film-intro p { margin:0; color:rgba(225,231,241,.68); font:400 clamp(.82rem,1vw,.95rem)/1.8 Inter,system-ui,sans-serif; }
        .hero-film-actions { display:flex; flex-wrap:wrap; gap:10px; }
        .hero-film-button { min-height:45px; display:inline-flex; align-items:center; justify-content:center; gap:13px; padding:0 17px; border-radius:2px; cursor:pointer; font:600 8px/1 ui-monospace,monospace; letter-spacing:.14em; transition:background .3s ease,border-color .3s ease,transform .3s ease,box-shadow .3s ease; }
        .hero-film-button:hover { transform:translateY(-3px); }
        .hero-film-button-primary { color:#07101c; border:1px solid #d9e5f7; background:linear-gradient(110deg,#eaf0f8,#a9bad2); box-shadow:0 5px 24px rgba(125,167,229,.12); }
        .hero-film-button-primary:hover { background:#fff; box-shadow:0 8px 34px rgba(125,167,229,.25); }
        .hero-film-button-secondary { color:#e4eaf4; border:1px solid rgba(207,222,245,.25); background:rgba(255,255,255,.035); }
        .hero-film-button-secondary:hover { border-color:rgba(207,222,245,.65); background:rgba(255,255,255,.08); }
        .hero-film-scroll { display:flex; align-items:center; gap:10px; color:rgba(185,201,224,.48); font:7px/1 ui-monospace,monospace; letter-spacing:.18em; white-space:nowrap; }
        .hero-film-scroll-mark { width:26px; height:1px; background:linear-gradient(90deg,#b9cde9,transparent); animation:film-scroll-pulse 2.8s ease-in-out infinite; }
        .hero-film-index { position:absolute; z-index:2; right:22px; top:52%; color:rgba(190,207,233,.32); font:8px/1 ui-monospace,monospace; letter-spacing:.2em; writing-mode:vertical-rl; }
        @keyframes film-glow-breathe { from { opacity:.55; transform:translate(-50%,-50%) scale(.94); } to { opacity:1; transform:translate(-50%,-50%) scale(1.06); } }
        @keyframes film-beam-reveal { 0% { opacity:0; } 35% { opacity:.8; } 100% { opacity:.28; } }
        @keyframes film-scroll-pulse { 50% { opacity:.3; transform:scaleX(.65); transform-origin:left; } }
        @media(max-width:1000px) { .hero-film-footer { grid-template-columns:1fr auto; row-gap:22px; } .hero-film-scroll { grid-column:1/-1; justify-self:end; } .hero-film-title-wrap { padding-left:3vw; } .hero-film-index { display:none; } }
        @media(max-width:640px) {
          .hero-film,.hero-film-content { min-height:760px; }
          .hero-film-content { width:calc(100% - 40px); padding:112px 0 30px; }
          .hero-film-topline { font-size:7px; letter-spacing:.12em; }
          .hero-film-title-wrap { padding:clamp(62px,12vh,100px) 0 55px; }
          .hero-film-eyebrow { margin-bottom:19px; font-size:7px; }
          .hero-film-title { font-size:clamp(4.7rem,18vw,7rem); letter-spacing:-.09em; }
          .hero-film-tagline { margin-top:22px; font-size:clamp(1.15rem,5vw,1.5rem); }
          .hero-film-footer { display:flex; flex-direction:column; align-items:stretch; gap:22px; }
          .hero-film-intro p { max-width:440px; font-size:13px; }
          .hero-film-actions { gap:9px; }
          .hero-film-button { min-height:44px; padding:0 13px; font-size:7px; }
          .hero-film-scroll { align-self:flex-end; }
          .hero-film-blue-glow { width:120vw; height:90vw; top:42%; }
          .hero-film-floor { left:-10%; right:-10%; }
        }
        @media(prefers-reduced-motion:reduce) { .animate-marquee,.hero-film-blue-glow,.hero-film-beam,.hero-film-scroll-mark,.hero-digital-orbit,.hero-digital-particles i { animation:none!important; } }
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