import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Navbar.css";

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
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <button onClick={() => scrollTo("landing")}>Home</button>
      <button onClick={() => scrollTo("about")}>About</button>
      <button onClick={() => scrollTo("skills")}>Skills</button>
      <button onClick={() => scrollTo("contact")}>Contact</button>
      {user ? (
        <div onClick={() => setDropdownVisible(!dropdownVisible)}>
          <FaUserCircle />
          {dropdownVisible && <ProfileDropdown />}
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
