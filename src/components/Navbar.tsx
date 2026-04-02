import { useState, useEffect, useRef } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Current activities", id: "current-activities" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<typeof NAV_ITEMS[number]["id"]>("home");
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll-based active section ──
  // Finds whichever section's top edge is closest to (but above) 30% down the viewport
  useEffect(() => {
    const getActiveSection = () => {
      const scrollY = window.scrollY;
      const triggerPoint = scrollY + window.innerHeight * 0.3;

      let current: typeof NAV_ITEMS[number]["id"] = NAV_ITEMS[0].id;

      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= triggerPoint) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    // Set correct state on initial load / refresh
    getActiveSection();

    window.addEventListener("scroll", getActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", getActiveSection);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle navigation click — scroll listener naturally takes over as page scrolls
  const handleNavClick = (id: typeof NAV_ITEMS[number]["id"]) => {
    setMenuOpen(false);
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div
          ref={containerRef}
          className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 mt-3 sm:mt-4 lg:mt-5"
        >
          <nav className="pointer-events-auto flex items-center justify-between h-12 sm:h-14 px-4 sm:px-6 lg:px-7 bg-white/80 backdrop-blur-xl backdrop-saturate-150 border border-gray-200/60 rounded-full shadow-lg shadow-gray-200/40 transition-all duration-300">

            {/* Logo */}
            <a
              href="#home"
              onClick={() => handleNavClick("home")}
              className="flex items-center transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <img
                src="/icon.png"
                alt="Logo"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-md object-cover"
              />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-gray-800">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        group relative px-4 py-2 rounded-full transition-all duration-300 active:scale-95
                        ${
                          isActive
                            ? "text-gray-950 bg-gray-100/80 font-semibold"
                            : "text-gray-700 hover:text-gray-950 hover:bg-gray-100/70"
                        }
                      `}
                    >
                      {item.label}

                      <span
                        className={`
                          absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full
                          bg-linear-to-r from-transparent via-gray-600/80 to-transparent
                          transition-transform duration-300 origin-center
                          ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }
                        `}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Social Icons + Hamburger */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              {/* Social icons — desktop only */}
              <div className="hidden md:flex items-center gap-0.5">

                <a
                  href="https://www.linkedin.com/in/mdrefatalhasankaif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90 hover:scale-110"
                >
                  <LuLinkedin size={20} strokeWidth={1.8} />
                </a>

                <a
                  href="https://github.com/refatalhasankaif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90 hover:scale-110"
                >
                  <LuGithub size={20} strokeWidth={1.8} />
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="md:hidden ml-1 p-2 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? "rotate-45 translate-y-1.75" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? "-rotate-45 -translate-y-2.25" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>

          {/* ── Mobile Dropdown Menu ── */}
          <div
            className={`
              md:hidden pointer-events-auto mt-2 mx-1
              bg-white/90 backdrop-blur-xl backdrop-saturate-150
              border border-gray-200/60 rounded-2xl
              shadow-lg shadow-gray-200/40
              overflow-hidden
              transition-all duration-300 ease-in-out
              ${menuOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
              }
            `}
          >
            <ul className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        flex items-center gap-3 mx-2 px-4 py-3 rounded-xl
                        text-sm font-medium transition-all duration-200 active:scale-98
                        ${
                          isActive
                            ? "text-gray-950 bg-gray-100/80 font-semibold"
                            : "text-gray-700 hover:text-gray-950 hover:bg-gray-100/70"
                        }
                      `}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-800 shrink-0" />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Social icons — mobile only */}
            <div className="flex items-center gap-1 px-4 py-3 border-t border-gray-100/80">
              <a
                href="https://www.linkedin.com/in/mdrefatalhasankaif/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90"
              >
                <LuLinkedin size={20} strokeWidth={1.8} />
              </a>
              <a
                href="https://github.com/refatalhasankaif"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90"
              >
                <LuGithub size={20} strokeWidth={1.8} />
              </a>
            </div>
          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;