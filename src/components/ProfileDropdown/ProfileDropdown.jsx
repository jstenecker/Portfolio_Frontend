import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import PropTypes from "prop-types";

const ProfileDropdown = ({ user, closeDropdown }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedMode = localStorage.getItem("darkMode");
    const isDark = storedMode === "true" || (!storedMode && systemPrefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("darkMode", newTheme === "dark");
    setDarkMode(!darkMode);
  };
  

  const navigate = (path) => {
    closeDropdown();
    window.location.assign(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userUpdate"));
    navigate("/");
  };

  const handleLogin = () => {
    localStorage.setItem("redirectPath", window.location.pathname);
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg p-4 z-50 space-y-3">
      <button
        onClick={closeDropdown}
        className="absolute top-1 right-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-white text-lg"
      >
        ✕
      </button>

      {user ? (
        <>
          <p className="text-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            Hello, {user.name}!
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-400 text-sm"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">You are not signed in</p>
          <button
            onClick={handleLogin}
            className="w-full text-left px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm"
          >
            Login
          </button>
        </>
      )}

      <hr className="border-t border-zinc-300 dark:border-zinc-600" />

      <div
        onClick={toggleDarkMode}
        className="flex items-center justify-center pt-1 cursor-pointer text-yellow-500 dark:text-blue-300 hover:scale-110 transition-transform"
        title="Toggle Theme"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  closeDropdown: PropTypes.func.isRequired,
};

export default ProfileDropdown;
