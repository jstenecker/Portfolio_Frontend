import { useState, useEffect } from "react";
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

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("/api/contact", { name, email, subject, message });
      setSuccess("Message sent successfully!");
    } catch {
      setError("Failed to send message.");
    }
  };

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto space-y-20">
      <section id="landing" className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-600">
          I&apos;m a software engineer passionate about building full-stack applications and solving real-world problems with code.
        </p>
      </section>

      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
          I&apos;m Joseph Stenecker, a developer experienced in building responsive web apps using React, Node.js, and modern tech stacks.
          I enjoy learning new technologies, contributing to open-source, and developing practical solutions.
        </p>
      </section>

      <section id="skills">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>JavaScript / TypeScript</li>
          <li>React / Redux / Tailwind CSS</li>
          <li>Node.js / Express</li>
          <li>MongoDB / PostgreSQL</li>
          <li>Git / GitHub / CI/CD</li>
        </ul>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow-sm"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow-sm"
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow-sm"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Send Message
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </section>
    </div>
  );
};

export default Home;
