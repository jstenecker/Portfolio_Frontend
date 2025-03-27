import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (window.location.pathname !== "/") {
      localStorage.setItem("scrollToSection", id);
      navigate("/");
    } else {
      const offset = 80;
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("darkMode", isDark);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 shadow-md backdrop-blur transition-all ${
        scrolled ? "bg-white/80 dark:bg-gray-900/80" : "bg-white/40 dark:bg-gray-800/40"
      }`}
    >
      <div className="flex space-x-4">
        <button onClick={() => scrollTo("landing")} className="text-sm font-medium hover:text-primary dark:text-white">
          Home
        </button>
        <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-primary dark:text-white">
          About
        </button>
        <button onClick={() => scrollTo("skills")} className="text-sm font-medium hover:text-primary dark:text-white">
          Skills
        </button>
        <button onClick={() => scrollTo("projects")} className="text-sm font-medium hover:text-primary dark:text-white">
          Projects
        </button>
        <button onClick={() => scrollTo("contact")} className="text-sm font-medium hover:text-primary dark:text-white">
          Contact
        </button>
      </div>

      <button
        onClick={toggleDarkMode}
        className="text-xl text-gray-700 dark:text-white hover:scale-110 transition-transform"
        title="Toggle theme"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
