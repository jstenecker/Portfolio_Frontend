import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 shadow-md backdrop-blur transition-all ${
        scrolled ? "bg-white/80 dark:bg-gray-900/80" : "bg-white/40 dark:bg-gray-800/40"
      }`}
    >
      <div className="flex space-x-4">
        <button onClick={() => scrollTo("landing")} className="text-sm font-medium hover:text-primary dark:text-white">Home</button>
        <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-primary dark:text-white">About</button>
        <button onClick={() => scrollTo("skills")} className="text-sm font-medium hover:text-primary dark:text-white">Skills</button>
        <button onClick={() => scrollTo("contact")} className="text-sm font-medium hover:text-primary dark:text-white">Contact</button>
      </div>
      <div className="relative">
        {user ? (
          <div onClick={handleDropdownToggle} className="cursor-pointer text-2xl text-gray-800 dark:text-white">
            <FaUserCircle />
            {dropdownVisible && <ProfileDropdown user={user} closeDropdown={closeDropdown} />}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-white bg-primary hover:bg-primary-hover px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
