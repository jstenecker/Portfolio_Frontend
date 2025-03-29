import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Apply saved theme on initial load
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll logic
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

  // Toggle theme
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
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
            className="text-sm font-medium dark:text-white hover:text-primary transition-transform duration-200 hover:-translate-y-1"
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
