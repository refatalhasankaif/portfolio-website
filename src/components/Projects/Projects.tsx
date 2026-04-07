// src/components/Projects.tsx
import { useState, useEffect, useRef } from "react";
import {
    SiHtml5, SiCss, SiTailwindcss, SiJavascript, SiTypescript,
    SiRedux, SiReact, SiNextdotjs, SiFirebase, SiNodedotjs,
    SiExpress, SiMongodb, SiPostgresql, SiPrisma, SiRedis,
    SiSocketdotio, SiJsonwebtokens,
} from "react-icons/si";
import {
    LuGithub, LuExternalLink, LuLayoutTemplate, LuShieldCheck,
    LuDatabase, LuPlug, LuNetwork, LuFolderOpen, LuImage,
    LuVideo,
    LuZap,
} from "react-icons/lu";
import type { IconType } from "react-icons";

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    liveLink: string;
    frontendRepo: string | null;
    backendRepo: string | null;
    technologies: string[];
}


interface TechMeta {
    icon: IconType;
    color: string;
    bg: string;
}

const TECH_MAP: Record<string, TechMeta> = {
    "HTML": { icon: SiHtml5, color: "#E34F26", bg: "#fff1ed" },
    "CSS": { icon: SiCss, color: "#1572B6", bg: "#e8f3fd" },
    "TailwindCSS": { icon: SiTailwindcss, color: "#38BDF8", bg: "#e0f7fe" },
    "Responsive": { icon: LuLayoutTemplate, color: "#6366f1", bg: "#eef0ff" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E", bg: "#fffde6" },
    "TypeScript": { icon: SiTypescript, color: "#3178C6", bg: "#e8f0fb" },
    "Shadcn UI": { icon: LuLayoutTemplate, color: "#18181b", bg: "#f4f4f5" },
    "Redux": { icon: SiRedux, color: "#764ABC", bg: "#f3eeff" },
    "React.js": { icon: SiReact, color: "#61DAFB", bg: "#e0f9ff" },
    "Next.js": { icon: SiNextdotjs, color: "#000000", bg: "#f2f2f2" },
    "Node.js": { icon: SiNodedotjs, color: "#339933", bg: "#e8f5e9" },
    "Express.js": { icon: SiExpress, color: "#000000", bg: "#f4f4f4" },
    "MongoDB": { icon: SiMongodb, color: "#47A248", bg: "#e9f5ea" },
    "Mongoose": { icon: LuDatabase, color: "#880000", bg: "#fdf0f0" },
    "SQL": { icon: LuDatabase, color: "#336791", bg: "#edf3fb" },
    "PostgreSQL": { icon: SiPostgresql, color: "#4169E1", bg: "#eef1fd" },
    "Prisma ORM": { icon: SiPrisma, color: "#2D3748", bg: "#f0f2f5" },
    "Redis": { icon: SiRedis, color: "#DC382D", bg: "#fef0ef" },
    "WebSocket": { icon: LuPlug, color: "#7c3aed", bg: "#f3eeff" },
    "Socket.io": { icon: SiSocketdotio, color: "#010101", bg: "#f5f5f5" },
    "WebRTC": { icon: LuVideo, color: "#34a853", bg: "#e8f5e9" },
    "Firebase Auth": { icon: SiFirebase, color: "#FFCA28", bg: "#fffbe6" },
    "Better Auth": { icon: LuShieldCheck, color: "#0ea5e9", bg: "#e0f5ff" },
    "REST API": { icon: LuNetwork, color: "#059669", bg: "#ecfdf5" },
    "JWT": { icon: SiJsonwebtokens, color: "#d63aff", bg: "#faf0ff" },
"GSAP": { icon: LuZap, color: "#88CE02", bg: "#f5ffe0" },
};

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


function TechBadge({ name }: { name: string }) {
    const meta = TECH_MAP[name];


    if (!meta) {
        return (
            <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {name}
            </span>
        );
    }

    const Icon = meta.icon;
    return (
        <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 text-[10px] font-semibold text-gray-700"
            style={{ backgroundColor: meta.bg }}
            title={name}
        >
            <Icon size={11} style={{ color: meta.color }} />
            {name}
        </div>
    );
}

function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow 0.3s ease`,
            }}
        >

            <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                {!imgError ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-linear-to-br from-gray-100 to-gray-200">
                        <LuImage size={32} className="text-gray-300" />
                        <span className="text-xs text-gray-400 font-medium">No preview</span>
                    </div>
                )}

                {/* Live badge */}
                <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-white/60 rounded-full text-xs font-semibold text-gray-800 shadow-sm hover:bg-white transition-all duration-200 hover:shadow-md"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                </a>
            </div>


            <div className="flex flex-col flex-1 p-5 gap-4">

                <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1.5">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                        <TechBadge key={tech} name={tech} />
                    ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors duration-200 active:scale-95 whitespace-nowrap"
                    >
                        <LuExternalLink size={12} />
                        Live Demo
                    </a>

                    {project.frontendRepo && (
                        <a
                            href={project.frontendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:border-gray-400 hover:text-gray-900 transition-all duration-200 active:scale-95"
                            title="Frontend repo"
                        >
                            <LuGithub size={12} />
                            Frontend
                        </a>
                    )}

                    {project.backendRepo && (
                        <a
                            href={project.backendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:border-gray-400 hover:text-gray-900 transition-all duration-200 active:scale-95"
                            title="Backend repo"
                        >
                            <LuGithub size={12} />
                            Backend
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gridVisible, setGridVisible] = useState(false);

    const { ref: headerRef, inView: headerVisible } = useInView(0.2);

    useEffect(() => {
        fetch("/projects.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load projects.json");
                return res.json() as Promise<Project[]>;
            })
            .then((data) => {
                setProjects(data);
                setLoading(false);
                setTimeout(() => setGridVisible(true), 50);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <section
            id="projects"
            className="relative py-20 sm:py-28 bg-white overflow-hidden"
        >

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-linear-to-b from-gray-50 to-transparent" />
                <div
                    className="absolute inset-0 opacity-[0.02]"
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
                        <LuFolderOpen size={12} />
                        Selected work
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Featured{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-300">
                            Projects
                        </span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                        A selection of industry-standard projects built end-to-end — from design to deployment.
                    </p>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-gray-200 bg-gray-50 animate-pulse">
                                <div className="aspect-video bg-gray-200 rounded-t-2xl" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded-full w-2/3" />
                                    <div className="h-3 bg-gray-100 rounded-full w-full" />
                                    <div className="h-3 bg-gray-100 rounded-full w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {error && (
                    <div className="text-center py-16">
                        <p className="text-gray-400 text-sm">Could not load projects: {error}</p>
                    </div>
                )}
                {!loading && !error && projects.length > 0 && (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
                    >
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                visible={gridVisible}
                            />
                        ))}
                    </div>
                )}


                {!loading && !error && projects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <LuFolderOpen size={28} className="text-gray-300" />
                        </div>
                        <p className="text-lg font-semibold text-gray-400">Projects coming soon</p>
                        <p className="text-sm text-gray-400">Check back later — great things are in the works.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;