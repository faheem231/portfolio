import { useCallback, useEffect, useRef, useState } from "react";
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
  image: string;
  stack: string[];
  capabilities: string[];
  github: string;
  live?: string;
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
        <img
          src={project.image}
          alt={`${project.name} project preview`}
          loading={index === 0 ? "eager" : "lazy"}
          draggable={false}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="project-card-scrim absolute inset-0" />
      <div className="project-card-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.32em] text-white/55">
              SELECTED PROJECT / {project.number}
            </span>
            <p className="mt-3 text-[10px] font-semibold tracking-[0.24em] text-white/65">
              {project.eyebrow}
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

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-2xl sm:p-6"
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
        className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/15 bg-[#090a0e] shadow-[0_35px_120px_rgba(0,0,0,0.7)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-white/45">
            <Command size={14} />
            PROJECT FILE / {project.number}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-[#101116] lg:min-h-[590px]">
            <img
              src={project.image}
              alt={`${project.name} interface preview`}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-black/10 to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#090a0e]/35" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-white/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa]" />
              PROJECT PREVIEW
            </div>
          </div>

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
    </motion.div>
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
    </section>
  );
}
