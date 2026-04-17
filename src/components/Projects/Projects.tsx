import { useEffect, useState } from "react";
import { LuExternalLink, LuGithub, LuCheck, LuFolderOpen } from "react-icons/lu";

type Project = {
  id: number;
  number: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  tech: string[];
  links: {
    live: string;
    frontend: string;
    backend: string;
  };
};

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full">
      <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/70 rounded-3xl shadow-xl shadow-gray-200/60 overflow-hidden group hover:shadow-2xl hover:shadow-gray-300/50 transition-shadow duration-500">

        {/* Watermark */}
        <span className="absolute top-6 right-8 font-extrabold text-[88px] leading-none text-gray-900/3 select-none pointer-events-none z-0">
          {project.number}
        </span>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-10">

          {/* Title */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1 font-mono">
              {project.number} &mdash; {project.tagline}
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {project.name}
            </h3>
          </div>

          {/* Image */}
          <div className="w-full rounded-2xl overflow-hidden border border-gray-200/80 bg-gray-100 aspect-video relative">
            {!imgError ? (
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-gray-50 to-gray-100">
                <LuGithub size={24} className="text-gray-400" />
                <p className="text-xs font-mono text-gray-400">Image not found</p>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">About</p>
            <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Links - Column on mobile, Row on desktop */}
          <div className="flex flex-col lg:flex-row gap-3">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white text-base font-semibold rounded-2xl hover:bg-gray-800 active:scale-95 transition-all"
            >
              <LuExternalLink size={18} />
              Live Demo
            </a>
            <a
              href={project.links.frontend}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 text-gray-700 text-base font-semibold rounded-2xl hover:border-gray-800 hover:text-gray-900 active:scale-95 transition-all bg-white/60 backdrop-blur-sm"
            >
              <LuGithub size={18} />
              Frontend Repo
            </a>
            <a
              href={project.links.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 text-gray-700 text-base font-semibold rounded-2xl hover:border-gray-800 hover:text-gray-900 active:scale-95 transition-all bg-white/60 backdrop-blur-sm"
            >
              <LuGithub size={18} />
              Backend Repo
            </a>
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Highlights</p>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gray-900/5 border border-gray-200 flex items-center justify-center">
                    <LuCheck size={12} className="text-gray-600" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 bg-gray-900/5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center">
        <p className="text-gray-500">Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-linear-to-br from-gray-50 via-white to-slate-100 overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header - Contact Style */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900/5 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
            <LuFolderOpen size={14} />
            Selected Work
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-600 to-gray-400">
              Projects
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            A collection of full-stack applications built with modern technologies and real features.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}