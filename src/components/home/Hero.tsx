
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LuDownload, LuExternalLink, LuCode, LuBraces, LuDatabase, LuGlobe } from "react-icons/lu";

const PARTICLE_COUNT = 600;
const PARTICLE_POSITIONS = (() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        arr[i] = (Math.random() - 0.5) * 30;
        arr[i + 1] = (Math.random() - 0.5) * 30;
        arr[i + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
})();

const PARTICLE_GEOMETRY = new THREE.BufferGeometry();
PARTICLE_GEOMETRY.setAttribute("position", new THREE.BufferAttribute(PARTICLE_POSITIONS, 3));

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += 0.0006;
        pointsRef.current.rotation.x += 0.0003;
        pointsRef.current.rotation.y += state.mouse.x * 0.0004;
        pointsRef.current.rotation.x += state.mouse.y * 0.0004;
    });

    return (
        <points ref={pointsRef} geometry={PARTICLE_GEOMETRY}>
            <pointsMaterial
                size={0.09}
                color="#94a3b8"
                transparent
                opacity={0.45}
                sizeAttenuation
            />
        </points>
    );
}

const STATS = [
    { icon: LuCode, value: "10+", label: "Projects" },
    { icon: LuBraces, value: "2+", label: "Yrs Coding" },
    { icon: LuDatabase, value: "20+", label: "Technologies" },
    { icon: LuGlobe, value: "2+", label: "Live Apps" },
];

function ProfileCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        setTilt({ x: dy * -10, y: dx * 10 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
                transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                opacity: mounted ? 1 : 0,
            }}
            className="relative w-full max-w-sm mx-auto lg:mx-0 transition-opacity duration-700"
        >

            <div
                className="absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-500"
                style={{
                    background: "radial-gradient(ellipse at center, #64748b 0%, transparent 70%)",
                    opacity: hovered ? 0.35 : 0.15,
                }}
            />

            <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/70 rounded-3xl p-6 shadow-2xl shadow-gray-200/60">

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700 shadow-sm whitespace-nowrap">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Available for work
                </div>

                <div className="flex flex-col items-center pt-4 pb-5 border-b border-gray-200">
                    <div className="relative mb-4">
                        <div
                            className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200/60 animate-spin"
                            style={{ animationDuration: "12s", margin: "-6px" }}
                        />
                        <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden ring-4 ring-white shadow-lg">
                            <img
                                src="/profile.jpg"
                                alt="Refat al hasan"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                        </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">Refat al hasan</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Full-stack Developer</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 py-4">
                    {STATS.map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1 group cursor-default">
                            <Icon size={14} className="text-gray-400 group-hover:text-gray-700 transition-colors duration-200" />
                            <span className="font-bold text-sm text-gray-900">{value}</span>
                            <span className="text-[10px] text-gray-400 leading-tight text-center">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 via-white to-slate-100"
        >
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 18], fov: 65 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={1.2} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                        <ParticleField />
                    </Suspense>
                </Canvas>
            </div>

            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-10 lg:px-16 py-24 md:py-28 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900/5 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            Portfolio · 2026
                        </div>

                        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.05]">
                            Refat
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-700 via-gray-500 to-gray-400">
                                al hasan
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-500 font-normal max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            I specialize in crafting efficient web solutions that transform ideas into high-performance websites and applications, ensuring seamless functionality, optimized speed, and intuitive user experiences.
                        </p>

                        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                            <a
                                href="https://www.linkedin.com/in/refatkaif/details/projects/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold bg-gray-900 text-white rounded-full transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/25 hover:-translate-y-0.5 active:scale-95"
                            >
                                View Projects
                                <LuExternalLink size={16} />
                            </a>

                            <a
                                href="/resume.pdf"
                                download="Refat_Al_Hasan_Resume.pdf"
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold border-2 border-gray-200 text-gray-700 rounded-full transition-all duration-300 hover:border-gray-800 hover:text-gray-900 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 bg-white/60 backdrop-blur-sm"
                            >
                                Download Resume
                                <LuDownload size={16} />
                            </a>
                        </div>
                    </div>


                    <div className="flex items-center justify-center order-1 lg:order-2">
                        <ProfileCard />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
                <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                <div className="w-5 h-8 border-2 border-gray-200 rounded-full flex items-start justify-center p-1">
                    <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
};

export default Hero;