// src/Pages/Services.tsx
import { LuArrowRight, LuCode, LuLayoutTemplate, LuSmartphone, LuWrench, LuGlobe, LuPenTool } from "react-icons/lu";

const services = [
    {
        icon: LuLayoutTemplate,
        title: "Landing Page",
        desc: "Custom landing pages designed to convert visitors into customers, with crisp layouts and fast load times.",
        badge: "Most Popular",
        tag: "Landing Page",
        cta: "Know More",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    },
    {
        icon: LuCode,
        title: "Figma to React / Next.js",
        desc: "Carefully convert your Figma designs into clean, maintainable React and Next.js code that stays true to your brand.",
        badge: null,
        tag: "Design to Code",
        cta: "Ask a Question",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    },
    {
        icon: LuWrench,
        title: "Website Fix",
        desc: "Fix broken pages, resolve layout issues, and restore polished performance so your site works reliably for every visitor.",
        badge: "Quick Turnaround",
        tag: "Maintenance",
        cta: "Get a Quote",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80",
    },
    {
        icon: LuGlobe,
        title: "Full-Stack Web App",
        desc: "Build complete web applications with secure APIs, user authentication, and a database-backed backend that scales with your business.",
        badge: null,
        tag: "Full Stack",
        cta: "Discuss a Project",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
    },
    {
        icon: LuSmartphone,
        title: "Responsive Website",
        desc: "Create responsive sites that look polished and perform smoothly on desktop, tablet, and mobile screens.",
        badge: null,
        tag: "Responsive Design",
        cta: "Check Availability",
        image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=600&q=80",
    },
    {
        icon: LuPenTool,
        title: "Website Redesign",
        desc: "Refresh your site with a modern visual identity, better usability, and stronger messaging for your audience.",
        badge: null,
        tag: "Redesign",
        cta: "Start the Conversation",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80",
    },
];

const Services = () => {
    return (
        <section
            id="services-section"
            className="relative py-20 sm:py-28 bg-linear-to-b from-gray-50 to-white overflow-hidden"
        >
            {/* Background decoration */}
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

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900/5 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
                        <LuCode size={12} />
                        What I offer
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        My{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-300">
                            Services
                        </span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                        I build fast, modern, and scalable web solutions tailored to your business needs.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(({ icon: Icon, title, desc, badge, image, cta, tag }) => (
                        <div
                            key={title}
                            className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-400"
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

                                {/* Badge */}
                                {badge && (
                                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white text-gray-900 rounded-full shadow-md">
                                        {badge}
                                    </span>
                                )}

                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-gray-500 shadow-md">
                                    {tag}
                                </div>

                                <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                                    <Icon size={18} className="text-gray-800" />
                                </div>
                            </div>


                            <div className="flex flex-col flex-1 gap-3 p-5">
                                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed flex-1">{desc}</p>
                                <div className="mt-4">
                                    <a href="#contact"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        {` ${cta}`.trim()} <LuArrowRight size={14} />
                                    </a>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>


                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { value: "100%", label: "Clean Code" },
                        { value: "3-5d", label: "Avg. Delivery" },
                        { value: "Full", label: "Stack Coverage" },
                        { value: "∞", label: "Revisions Support" },
                    ].map(({ value, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center justify-center gap-1 p-5 rounded-2xl border border-gray-200 bg-white text-center"
                        >
                            <span className="text-2xl font-extrabold text-gray-900">{value}</span>
                            <span className="text-xs text-gray-500 font-medium">{label}</span>
                        </div>
                    ))}
                </div>


                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gray-900 text-white">
                    <div>
                        <h3 className="text-lg font-bold mb-1">Have a custom project in mind?</h3>
                        <p className="text-sm text-gray-400">Let's build something great together, reach out via the contact section.</p>
                    </div>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap shrink-0"
                    >
                        Get In Touch <LuArrowRight size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;