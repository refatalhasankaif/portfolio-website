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
  const [activeSection, setActiveSection] = useState("home");
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle navigation click
  const handleNavClick = (id: string) => {
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

            {/* Social Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <a
                href="https://www.linkedin.com/in/mdrefatalhasankaif/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90 hover:scale-110"
              >
                <LuLinkedin size={20} strokeWidth={1.8} />
              </a>

              <a
                href="https://github.com/refatalhasankaif"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90 hover:scale-110"
              >
                <LuGithub size={20} strokeWidth={1.8} />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden ml-1 p-2 rounded-full text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 transition-all duration-300 active:scale-90"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-1.75" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-1.75" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;