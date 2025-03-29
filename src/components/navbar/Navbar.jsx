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
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80"
          : "bg-white/40 dark:bg-gray-800/40"
      }`}
    >
      <div className="flex space-x-4">
        {[
          { label: "Home", id: "landing" },
          { label: "About", id: "about" },
          { label: "Skills", id: "skills" },
          { label: "Projects", id: "projects" },
          { label: "Contact", id: "contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-sm font-medium dark:text-white hover:text-primary transition-all transform hover:-translate-y-1 duration-200"
          >
            {item.label}
          </button>
        ))}
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
