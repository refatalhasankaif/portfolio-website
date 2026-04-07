// src/components/Skills.tsx
import { useState, useEffect, useRef } from "react";
import {
    SiHtml5, SiCss, SiTailwindcss, SiJavascript, SiTypescript,
    SiRedux, SiReact, SiNextdotjs, SiFirebase, SiNodedotjs,
    SiExpress, SiMongodb, SiPostgresql, SiPrisma, SiRedis,
    SiSocketdotio, SiPostman, SiJsonwebtokens,
} from "react-icons/si";

import {
    LuShieldCheck, LuDatabase, LuPlug, LuNetwork,
    LuLayoutTemplate, LuWrench, LuCode, LuFramer, LuTable2,
    LuVideo,
} from "react-icons/lu";
import type { IconType } from "react-icons";

interface Skill {
    name: string;
    icon: IconType;
    color: string;
    bg: string;
}

const SKILLS: Skill[] = [
    { name: "HTML", icon: SiHtml5, color: "#E34F26", bg: "#fff1ed" },
    { name: "CSS", icon: SiCss, color: "#1572B6", bg: "#e8f3fd" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#38BDF8", bg: "#e0f7fe" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", bg: "#fffde6" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", bg: "#e8f0fb" },
    { name: "Shadcn UI", icon: LuLayoutTemplate, color: "#18181b", bg: "#f4f4f5" },
    { name: "Redux", icon: SiRedux, color: "#764ABC", bg: "#f3eeff" },
    { name: "React.js", icon: SiReact, color: "#61DAFB", bg: "#e0f9ff" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", bg: "#f2f2f2" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", bg: "#e8f5e9" },
    { name: "Express.js", icon: SiExpress, color: "#000000", bg: "#f4f4f4" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", bg: "#e9f5ea" },
    { name: "Mongoose", icon: LuDatabase, color: "#880000", bg: "#fdf0f0" },
    { name: "SQL", icon: LuDatabase, color: "#336791", bg: "#edf3fb" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", bg: "#eef1fd" },
    { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748", bg: "#f0f2f5" },
    { name: "Redis", icon: SiRedis, color: "#DC382D", bg: "#fef0ef" },
    { name: "WebSocket", icon: LuPlug, color: "#7c3aed", bg: "#f3eeff" },
    { name: "Socket.io", icon: SiSocketdotio, color: "#010101", bg: "#f5f5f5" },
    { name: "WebRTC", icon: LuVideo, color: "#34a853", bg: "#e8f5e9" },
    { name: "Firebase Auth", icon: SiFirebase, color: "#FFCA28", bg: "#fffbe6" },
    { name: "Better Auth", icon: LuShieldCheck, color: "#0ea5e9", bg: "#e0f5ff" },
    { name: "REST API", icon: LuNetwork, color: "#059669", bg: "#ecfdf5" },
    { name: "JWT", icon: SiJsonwebtokens, color: "#d63aff", bg: "#faf0ff" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37", bg: "#fff3ee" },
    { name: "VS Code", icon: LuCode, color: "#007ACC", bg: "#e8f4fd" },
    // { name: "Linux", icon: SiLinux, color: "#FCC624", bg: "#fffce6" },
    // { name: "Figma", icon: SiFigma, color: "#F24E1E", bg: "#fff0ed" },
    // { name: "Pixso", icon: LuPenTool, color: "#8b5cf6", bg: "#f3eeff" },
    { name: "Draw.io", icon: LuFramer, color: "#f97316", bg: "#fff4ed" },
    { name: "BeeKeeper Studio", icon: LuTable2, color: "#f59e0b", bg: "#fffbe6" },
];

function useInView(threshold = 0.1) {
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

const Skills = () => {
    const { ref: headerRef, inView: headerVisible } = useInView(0.2);
    const { ref: gridRef, inView: gridVisible } = useInView(0.05);

    return (
        <section
            id="skills"
            className="relative py-20 sm:py-28 bg-linear-to-b from-gray-50 to-white overflow-hidden"
        >

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-linear-to-br from-blue-50 to-indigo-50 blur-3xl opacity-60" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-linear-to-br from-emerald-50 to-teal-50 blur-3xl opacity-60" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">


                <div
                    ref={headerRef}
                    className="text-center mb-12 sm:mb-16"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900/5 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
                        <LuWrench size={12} />
                        What I work with
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Skills &amp;{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-300">
                            Technologies
                        </span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                        A curated set of tools and technologies I use to build modern,
                        production-ready applications.
                    </p>
                </div>


                <div
                    ref={gridRef}
                    className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4"
                >
                    {SKILLS.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <div
                                key={skill.name}
                                className="group relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/80 transition-all duration-300 cursor-default"
                                style={{
                                    opacity: gridVisible ? 1 : 0,
                                    transform: gridVisible ? "translateY(0)" : "translateY(20px)",
                                    transition: `opacity 0.4s ease ${i * 35}ms, transform 0.4s ease ${i * 35}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}18 0%, transparent 65%)` }}
                                />
                                <div
                                    className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    style={{ backgroundColor: skill.bg }}
                                >
                                    <Icon size={22} style={{ color: skill.color }} />
                                </div>
                                <span className="relative text-[11px] sm:text-xs font-semibold text-gray-700 text-center leading-tight">
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;