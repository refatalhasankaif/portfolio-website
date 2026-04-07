// src/components/CurrentActivity.tsx
import { useEffect, useRef, useState } from "react";
import {
  LuBrainCircuit, LuGitBranch, LuZap,
  LuFlame, LuServer,
} from "react-icons/lu";
import { SiGo, SiDocker, } from "react-icons/si";

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const ACTIVITIES = [
  {
    icon: SiGo,
    color: "#00ADD8",
    bg: "#e0f7fe",
    title: "Golang",
    desc: "Building high-performance backend services and REST APIs with Go",
  },
  {
    icon: LuBrainCircuit,
    color: "#059669",
    bg: "#ecfdf5",
    title: "AI Experiments",
    desc: "Exploring LLM APIs, prompt engineering, and AI-powered app development",
  },
  {
    icon: SiDocker,
    color: "#2496ED",
    bg: "#e8f4fd",
    title: "Docker",
    desc: "Learning containerisation, Docker Compose, and deployment workflows",
  },
  {
    icon: LuServer,
    color: "#6366f1",
    bg: "#eef0ff",
    title: "System Design",
    desc: "Studying scalable system design patterns, microservices, and architecture",
  },
  {
    icon: LuFlame,
    color: "#ef4444",
    bg: "#fef2f2",
    title: "Portfolio",
    desc: "Actively building and refining this portfolio with industry-grade projects",
  },
  {
    icon: LuGitBranch,
    color: "#f59e0b",
    bg: "#fffbe6",
    title: "Open Source",
    desc: "Learning to contribute to open-source projects through issues and PRs",
  },
];

const CurrentActivity = () => {
  const { ref, inView: visible } = useInView();

  return (
    <section
      id="activity"
      className="relative w-full py-10 flex items-center bg-linear-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-125 h-125 rounded-full bg-linear-to-br from-blue-50 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full bg-linear-to-tl from-emerald-50 to-transparent blur-3xl opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div
        ref={ref}
        className="relative w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-10"
      >
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900/5 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
            <LuZap size={12} />
            What I'm doing now
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Current{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-300">
              Activities
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Things I'm actively learning, building, and exploring right now.
          </p>
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {ACTIVITIES.map(({ icon: Icon, color, bg, title, desc }, i) => (
            <div
              key={title}
              className={`
                flex flex-col gap-4 p-5 rounded-2xl border border-gray-200 bg-white
                hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/80
                transition-all duration-300 cursor-default

              `}
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </div>

              {/* Active indicator */}
              <div className="flex items-center gap-1.5 mt-auto pt-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-semibold text-emerald-600">In progress</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentActivity;