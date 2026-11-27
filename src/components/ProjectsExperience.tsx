import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Command,
  ExternalLink,
  Github,
  Layers3,
  X,
} from "lucide-react";

type Project = {
  number: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  image?: string;
  stack: string[];
  capabilities: string[];
  github?: string;
  live?: string;
  status?: "upcoming";
  accent: string;
};

const projects: Project[] = [
  {
    number: "01",
    name: "ResumeAI",
    eyebrow: "AI / CAREER INTELLIGENCE",
    summary: "Turn a resume into a clearer next step.",
    description:
      "An AI-powered resume analysis platform that helps users inspect their resume, understand its strengths and identify areas to improve.",
    image: "/assets/resume.png",
    stack: ["Python", "Flask", "NLP", "PDF parsing", "SQLite"],
    capabilities: [
      "Resume document upload and text extraction",
      "ATS-oriented scoring and keyword analysis",
      "Skill identification and missing-keyword insights",
      "Actionable improvement suggestions",
    ],
    github: "https://github.com/faheem231/ResumeAi",
    accent: "115, 105, 255",
  },
  {
    number: "02",
    name: "Portfolio",
    eyebrow: "CREATIVE DEVELOPMENT / 3D WEB",
    summary: "A personal space for experiments and engineering.",
    description:
      "A motion-led developer portfolio built to bring together project work, an interactive profile and a visual exploration of the tools behind the work.",
    image: "/assets/portfolio.png",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion"],
    capabilities: [
      "Interactive, motion-driven interface",
      "Three-dimensional and neural-inspired visuals",
      "Responsive project and certificate showcase",
      "Custom navigation and profile experiences",
    ],
    github: "https://github.com/faheem231/portfolio",
    accent: "75, 160, 255",
  },
  {
    number: "03",
    name: "Coming Soon",
    eyebrow: "NEXT EXPERIMENT / IN DEVELOPMENT",
    summary: "The next build is taking shape. Stay tuned.",
    description:
      "A new project is currently in the works. The concept, experiments and implementation are still evolving — details will be shared when it is ready.",
    stack: ["Research", "Experimentation", "AI / ML"],
    capabilities: [
      "Currently exploring ideas and technical directions",
      "Building and testing the core concept",
      "More details will be revealed soon",
    ],
    accent: "130, 150, 255",
    status: "upcoming",
  },
];

const spring = { type: "spring" as const, stiffness: 150, damping: 22 };

function ProjectCard({
  project,
  index,
  active,
  onSelect,
  reducedMotion,
}: {
  project: Project;
  index: number;
  active: boolean;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--rotate-x", `${(0.5 - y) * 9}deg`);
    element.style.setProperty("--rotate-y", `${(x - 0.5) * 11}deg`);
    element.style.setProperty("--pointer-x", `${x * 100}%`);
    element.style.setProperty("--pointer-y", `${y * 100}%`);
  };

  const resetPointer = () => {
    const element = cardRef.current;
    if (!element) return;
    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
    element.style.setProperty("--pointer-x", "50%");
    element.style.setProperty("--pointer-y", "50%");
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 42, rotateX: 5 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ ...spring, delay: index * 0.12 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className={`project-experience-card group relative shrink-0 snap-center overflow-hidden rounded-[26px] border text-left transition-[border-color,box-shadow] duration-500 ${active ? "is-active" : ""}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Explore ${project.name}`}
        className="absolute inset-0 z-20 cursor-pointer"
      />
      <div className="project-card-image absolute inset-0">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} project preview`}
            loading={index === 0 ? "eager" : "lazy"}
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="upcoming-project-art absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="upcoming-orbit upcoming-orbit-one" />
            <div className="upcoming-orbit upcoming-orbit-two" />
            <div className="upcoming-orbit upcoming-orbit-three" />
            <div className="upcoming-core"><span /></div>
            <div className="absolute bottom-10 font-mono text-[9px] tracking-[0.45em] text-white/35">SIGNAL DETECTED / BUILD IN PROGRESS</div>
          </div>
        )}
      </div>
      <div className="project-card-scrim absolute inset-0" />
      <div className="project-card-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.32em] text-white/55">
              SELECTED PROJECT / {project.number}
            </span>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-white/65">
              {project.eyebrow}
              {project.status === "upcoming" && <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-2 py-1 text-[8px] tracking-[0.16em] text-blue-200">COMING SOON</span>}
            </p>
          </div>
          <span className="project-open-icon flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-xl transition-all duration-300">
            <ArrowUpRight size={19} />
          </span>
        </div>

        <div className="max-w-[560px]">
          <h3 className="project-card-title text-5xl font-semibold tracking-[-0.065em] text-white sm:text-6xl md:text-7xl">
            {project.name}
            <span className="ml-2 align-top font-mono text-sm font-normal tracking-normal text-white/55">
              /{project.number}
            </span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/75 sm:text-base">
            {project.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/75 backdrop-blur-md"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetail({
  project,
  onClose,
  onPrevious,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <motion.div
      className="project-detail-overlay fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/90 p-3 pt-4 backdrop-blur-2xl sm:items-center sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        initial={{ opacity: 0, y: 36, scale: 0.96, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={spring}
        className="project-detail-dialog relative my-4 flex h-[calc(100dvh-32px)] w-full max-w-[1380px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-white/15 bg-[#090a0e] shadow-[0_35px_120px_rgba(0,0,0,0.8)] sm:my-5 sm:h-[min(900px,calc(100dvh-40px))] sm:rounded-[28px]"
      >
        <div className="project-detail-header sticky top-0 z-30 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#090a0e]/95 px-4 py-3 backdrop-blur-2xl sm:px-7 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-[10px] font-semibold tracking-[0.14em] text-white/75 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            BACK TO PROJECTS
          </button>
          <div className="hidden items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-white/40 sm:flex">
            <Command size={14} />
            PROJECT FILE / {project.number}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-all duration-300 hover:rotate-90 hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="project-detail-body relative z-0 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain [touch-action:pan-y] lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <motion.div
            className="project-detail-preview group/preview relative flex min-h-[250px] items-center justify-center self-start overflow-hidden bg-[#080a10] sm:min-h-[340px] lg:min-h-[560px]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.image ? (
              <motion.img
                src={project.image}
                alt={`${project.name} interface preview`}
                className="relative z-0 h-full max-h-[560px] w-full object-contain p-3 sm:p-5"
                whileHover={{ scale: 1.035 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              />
            ) : (
              <div className="upcoming-project-art relative z-0 flex min-h-[340px] w-full items-center justify-center">
                <div className="upcoming-orbit upcoming-orbit-one" />
                <div className="upcoming-orbit upcoming-orbit-two" />
                <div className="upcoming-orbit upcoming-orbit-three" />
                <div className="upcoming-core"><span /></div>
                <div className="absolute bottom-8 text-center">
                  <p className="font-mono text-[10px] tracking-[0.35em] text-blue-200/75">TRANSMISSION IN PROGRESS</p>
                  <p className="mt-2 text-sm text-white/45">The next build will be revealed here.</p>
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(70,110,255,0.12),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090a0e]/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-white/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa]" />
              PROJECT PREVIEW
            </div>
            <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/15 bg-black/45 px-3 py-2 font-mono text-[9px] tracking-[0.18em] text-white/45 backdrop-blur-xl">
              HOVER TO INSPECT
            </div>
          </motion.div>

          <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-blue-300/80">
                {project.eyebrow}
              </p>
              <h2
                id="project-detail-title"
                className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl"
              >
                {project.name}
                <span className="ml-2 text-base font-normal tracking-normal text-white/35">
                  {project.number}
                </span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
                {project.description}
              </p>

              <div className="mt-9">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-white/75">
                  <Layers3 size={14} />
                  KEY CAPABILITIES
                </div>
                <ul className="space-y-3">
                  {project.capabilities.map((capability, index) => (
                    <motion.li
                      key={capability}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + index * 0.07 }}
                      className="flex gap-3 text-sm leading-6 text-white/55"
                    >
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-blue-300" />
                      {capability}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-white/75">
                  <Code2 size={14} />
                  BUILT WITH
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 font-mono text-[10px] text-white/65"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
{project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-white/85"
                >
                  <Github size={15} />
                  View source
                  <ExternalLink size={13} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-300/[0.08] px-5 py-3 text-xs font-semibold text-blue-100/80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300" />
                  In development · Stay tuned
                </span>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Live experience <ArrowUpRight size={14} />
                </a>
              )}
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={onPrevious}
                  aria-label="Previous project"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>,
    document.body,
  );
}

export default function ProjectsExperience() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
    cards[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIndex(index);
  }, [reducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = cards.indexOf(visible.target as HTMLElement);
          if (index >= 0) setActiveIndex(index);
        }
      },
      { root: track, threshold: [0.35, 0.55, 0.75] },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const previous = useCallback(() => {
    setSelectedIndex((current) => current === null ? null : (current - 1 + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((current) => current === null ? null : (current + 1) % projects.length);
  }, []);

  return (
    <section className="relative w-full">
      <div className="project-experience-shell relative mx-auto max-w-[1500px]">
        <div className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.38em] text-white/35">
              <span className="h-px w-8 bg-white/30" />
              SELECTED WORK / 2026
            </p>
            <h2 className="text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl md:text-7xl">
              Things I’ve <span className="text-white/40">built.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/45">
              A closer look at the ideas, interfaces and systems behind the work.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-white/35">
              DRAG TO EXPLORE
            </span>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              aria-label="Scroll to previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1))}
              aria-label="Scroll to next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="project-experience-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
          aria-label="Project gallery"
        >
          {projects.map((project, index) => (
            <div
              key={project.number}
              data-project-card
              className="w-[min(86vw,760px)] shrink-0 snap-center"
            >
              <ProjectCard
                project={project}
                index={index}
                active={activeIndex === index}
                onSelect={() => setSelectedIndex(index)}
                reducedMotion={Boolean(reducedMotion)}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-5">
          <div className="h-px flex-1 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-white/75"
              animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
              transition={spring}
            />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/45">
            <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span>/</span>
            {String(projects.length).padStart(2, "0")}
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={reducedMotion ? undefined : { x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedIndex(activeIndex)}
          className="mt-8 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-white/75 transition hover:text-white"
        >
          OPEN PROJECT DETAILS <ArrowDownRight size={16} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <ProjectDetail
            key={projects[selectedIndex].number}
            project={projects[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onPrevious={previous}
            onNext={next}
          />
        )}
      </AnimatePresence>

      <style>{`
        .project-detail-overlay {
          isolation: isolate;
          z-index: 2147483000;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        .project-detail-dialog {
          contain: layout paint;
          min-height: 0;
        }
        .project-detail-body {
          min-height: 0;
          flex: 1 1 0%;
          overflow-y: auto !important;
          overscroll-behavior-y: contain;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,.3) transparent;
          -webkit-overflow-scrolling: touch;
        }
        .project-detail-body::-webkit-scrollbar { width: 6px; }
        .project-detail-body::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(255,255,255,.2);
        }
        .upcoming-project-art {
          background:
            radial-gradient(circle at 50% 50%, rgba(87,112,255,.18), transparent 28%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,.035), transparent 60%),
            #07090f;
        }
        .upcoming-orbit {
          position: absolute;
          width: min(58vw, 360px);
          aspect-ratio: 1;
          border: 1px solid rgba(170,190,255,.2);
          border-radius: 50%;
          box-shadow: 0 0 35px rgba(90,120,255,.08), inset 0 0 35px rgba(90,120,255,.05);
        }
        .upcoming-orbit-one { transform: rotateX(68deg) rotateZ(0deg); animation: upcoming-orbit 16s linear infinite; }
        .upcoming-orbit-two { transform: rotateX(68deg) rotateZ(60deg); animation: upcoming-orbit 22s linear infinite reverse; }
        .upcoming-orbit-three { transform: rotateY(68deg) rotateZ(-35deg); animation: upcoming-orbit 19s linear infinite; }
        .upcoming-core {
          display: grid;
          place-items: center;
          width: 92px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #dbeafe, #7189ff 22%, #25366f 55%, #080b18 78%);
          box-shadow: 0 0 35px rgba(105,135,255,.45), 0 0 100px rgba(75,105,255,.2);
          animation: upcoming-pulse 3.5s ease-in-out infinite;
        }
        .upcoming-core span {
          width: 32%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 22px 8px rgba(190,210,255,.65);
        }
        @keyframes upcoming-orbit { to { rotate: 360deg; } }
        @keyframes upcoming-pulse { 50% { scale: 1.12; filter: brightness(1.25); } }
        .project-detail-preview { isolation: isolate; }
        .project-detail-preview img { will-change: transform; }
        .project-experience-shell {
          width: 100%;
          padding: 0 clamp(0px, 1.5vw, 20px) 3.5rem;
          perspective: 1400px;
        }
        .project-experience-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-x: contain;
          scroll-padding-inline: 3vw;
        }
        .project-experience-track::-webkit-scrollbar { display: none; }
        .project-experience-card {
          min-height: 430px;
          width: 100%;
          border-color: rgba(255,255,255,.13);
          background: #090a0e;
          transform: perspective(1200px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
          transform-style: preserve-3d;
          transition: transform 260ms cubic-bezier(.2,.8,.2,1), border-color 350ms ease, box-shadow 350ms ease;
          box-shadow: 0 22px 70px rgba(0,0,0,.35);
          isolation: isolate;
        }
        .project-experience-card:hover,
        .project-experience-card.is-active {
          border-color: rgba(255,255,255,.32);
          box-shadow: 0 30px 90px rgba(0,0,0,.55), 0 0 55px rgba(var(--project-accent),.10);
        }
        .project-card-image { overflow: hidden; }
        .project-card-image img {
          opacity: .72;
          transform: scale(1.015);
          transition: transform 900ms cubic-bezier(.16,1,.3,1), opacity 600ms ease;
          will-change: transform;
        }
        .project-experience-card:hover .project-card-image img {
          opacity: .96;
          transform: scale(1.09);
        }
        .project-card-scrim {
          background: linear-gradient(180deg, rgba(4,5,8,.28) 0%, rgba(4,5,8,.08) 36%, rgba(4,5,8,.92) 100%);
        }
        .project-card-glow {
          opacity: 0;
          background: radial-gradient(420px circle at var(--pointer-x,50%) var(--pointer-y,50%), rgba(var(--project-accent),.22), transparent 58%);
          transition: opacity 350ms ease;
          mix-blend-mode: screen;
        }
        .project-experience-card:hover .project-card-glow { opacity: 1; }
        .project-open-icon { box-shadow: 0 0 0 rgba(255,255,255,0); }
        .project-experience-card:hover .project-open-icon {
          transform: rotate(45deg);
          background: rgba(255,255,255,.16);
          box-shadow: 0 0 30px rgba(255,255,255,.16);
        }
        .project-card-title { text-shadow: 0 4px 35px rgba(0,0,0,.55); }
        @media (max-width: 640px) {
          .project-experience-shell { padding-inline: 0; }
          .project-experience-card { min-height: 390px; }
          .project-card-image img { opacity: .62; }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-experience-card,
          .project-card-image img,
          .project-open-icon { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
