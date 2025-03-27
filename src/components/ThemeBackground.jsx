import { useEffect, useState } from "react";

const ThemeBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-1000">
      <div className={`absolute inset-0 ${isDarkMode ? "bg-night" : "bg-day"} transition-all duration-1000`} />

      {/* Sun or Moon */}
      <div className="absolute top-10 right-10 transition-transform duration-1000">
        {isDarkMode ? (
          <div className="w-14 h-14 rounded-full bg-white opacity-80 shadow-md animate-moonrise" />
        ) : (
          <div className="w-16 h-16 rounded-full sun-glow animate-sunrise" />
        )}
      </div>

      {/* Stars overlay (optional visual layer only at night) */}
      {isDarkMode && (
        <div className="absolute inset-0 bg-stars pointer-events-none animate-fadeToNight" />
      )}
    </div>
  );
};

export default ThemeBackground;
