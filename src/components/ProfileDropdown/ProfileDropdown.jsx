import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import PropTypes from "prop-types";

const ProfileDropdown = ({ user, closeDropdown }) => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  const navigate = (path) => {
    closeDropdown();
    window.location.assign(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    const event = new Event("userUpdate");
    window.dispatchEvent(event);
    navigate("/");
  };

  const handleLogin = () => {
    localStorage.setItem("redirectPath", window.location.pathname);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("darkMode", newTheme === "dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setDarkMode(currentTheme === "dark");
  }, []);

  return (
    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg p-4 space-y-3 z-50">
      <button
        onClick={closeDropdown}
        className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg"
      >
        ✕
      </button>

      {user ? (
        <>
          <p className="text-gray-700 dark:text-gray-200 font-semibold text-center">
            Hello, {user.name}!
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-400 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 text-center">You are not signed in</p>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 dark:text-blue-400 rounded"
          >
            Login
          </button>
        </>
      )}

      <hr className="border-t border-gray-300 dark:border-gray-600" />

      <div
        onClick={toggleDarkMode}
        className="flex items-center justify-center cursor-pointer text-yellow-500 dark:text-blue-300 hover:scale-110 transition-transform"
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
