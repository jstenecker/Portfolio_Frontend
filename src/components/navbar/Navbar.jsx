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
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 shadow-md backdrop-blur ${
        scrolled ? "bg-white/80" : "bg-white/40"
      } transition-all`}
    >
      <div className="flex space-x-4">
        <button onClick={() => scrollTo("landing")} className="text-sm font-medium hover:text-blue-600">Home</button>
        <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-blue-600">About</button>
        <button onClick={() => scrollTo("skills")} className="text-sm font-medium hover:text-blue-600">Skills</button>
        <button onClick={() => scrollTo("contact")} className="text-sm font-medium hover:text-blue-600">Contact</button>
      </div>
      <div className="relative">
        {user ? (
          <div onClick={() => setDropdownVisible(!dropdownVisible)} className="cursor-pointer text-2xl text-gray-800">
            <FaUserCircle />
            {dropdownVisible && <ProfileDropdown />}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
