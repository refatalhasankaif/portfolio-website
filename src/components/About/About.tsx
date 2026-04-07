// src/components/About.tsx
import { useEffect, useRef, useState } from "react";
import {
  LuMapPin, LuCode, LuLayers,
  LuBrainCircuit, LuZap, LuShield, LuGitBranch,
} from "react-icons/lu";

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

const PRINCIPLES = [
  { icon: LuLayers,       label: "Modular Architecture",           desc: "Structuring applications with reusable, decoupled modules and clean separation of concerns across the codebase"         },
  { icon: LuBrainCircuit, label: "AI for Rapid Development",       desc: "Leveraging AI-powered tools like GitHub Copilot and Claude to accelerate development cycles and reduce repetitive work" },
  { icon: LuCode,         label: "Clean Code Principles",          desc: "Writing readable, self-documenting code with consistent naming, minimal complexity, and thorough code reviews"          },
  { icon: LuShield,       label: "Security-First Mindset",         desc: "Implementing authentication, input validation, and secure API design patterns from the very start of every project"    },
  { icon: LuZap,          label: "Performance Optimisation",       desc: "Focusing on fast load times, efficient rendering, lazy loading, and optimised database queries for better UX"          },
  { icon: LuGitBranch,    label: "Git & Version Control Workflow", desc: "Following disciplined branching strategies, writing meaningful commits, and collaborating effectively through pull requests" },
];

const About = () => {
  const { ref, inView: visible } = useInView();

  return (
    <section
      id="about"
      className="relative w-full py-10 flex items-center bg-linear-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-linear-to-bl from-slate-50 to-transparent blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-linear-to-tr from-gray-100 to-transparent blur-3xl opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.02]"
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
        <div className="flex flex-col lg:flex-row gap-0 items-stretch">
          <div
            className="w-full lg:w-full flex flex-col justify-center gap-7 lg:pl-8 pt-8 lg:pt-0"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-700 via-gray-500 to-gray-400">
                  Refat
                </span>
              </h2>
              <p className="mt-2 text-sm font-semibold text-gray-500 tracking-wide">
                Full-stack Developer
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <LuMapPin size={12} className="text-gray-400" />
                  Bangladesh
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for work
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed md:max-w-[95%] max-w-full sm:max-w-[90%]">
              I am a motivated Full-stack Developer from Bangladesh, passionate about building
              real-world solutions through hands-on projects. I write clean, maintainable code and
              focus on building efficient, scalable web applications with strong attention to
              performance, user experience, and modern best practices. I am adaptable, quick to learn,
              and comfortable working across the full stack.
            </p>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                How I work
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PRINCIPLES.map(({ icon: Icon, label, desc }, i) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3.5 rounded-2xl border border-gray-200 bg-white hover:hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                    style={{
                      opacity:   visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 0.4s ease ${0.25 + i * 0.06}s, transform 0.4s ease ${0.25 + i * 0.06}s`,
                    }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={13} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;