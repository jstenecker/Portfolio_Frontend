import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Placeholder: Replace with your actual API logic
      await axios.post("/api/contact", { name, email, subject, message });
      setSuccess("Message sent successfully!");
    } catch {
      setError("Failed to send message.");
    }
  };

  return (
    <div className="home-container">
      <section id="landing">
        <h1 className="home-title">Welcome to My Portfolio</h1>
        <p className="home-description">
          I&apos;m a software engineer passionate about building full-stack applications and solving real-world problems with code.
        </p>
      </section>

      <section id="about" className="tab-wrapper">
        <h2>About Me</h2>
        <p>
          I&apos;m Joseph Stenecker, a developer experienced in building responsive web apps using React, Node.js, and modern tech stacks.
          I enjoy learning new technologies, contributing to open-source, and developing practical solutions.
        </p>
      </section>

      <section id="skills" className="tab-wrapper">
        <h2>Skills</h2>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>React / Redux / Tailwind CSS</li>
          <li>Node.js / Express</li>
          <li>MongoDB / PostgreSQL</li>
          <li>Git / GitHub / CI/CD</li>
        </ul>
      </section>

      <section id="contact" className="tab-wrapper">
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
          <button type="submit">Send Message</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </section>
    </div>
  );
};

export default Home;
