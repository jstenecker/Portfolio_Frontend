import { useState, useEffect } from "react";
import axios from "axios";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiCypress,
} from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { icon: <SiJavascript className="text-yellow-400" />, label: "JavaScript" },
  { icon: <SiTypescript className="text-blue-500" />, label: "TypeScript" },
  { icon: <SiReact className="text-cyan-400" />, label: "React" },
  { icon: <SiRedux className="text-purple-500" />, label: "Redux" },
  { icon: <SiTailwindcss className="text-sky-400" />, label: "Tailwind CSS" },
  { icon: <SiNodedotjs className="text-green-500" />, label: "Node.js" },
  { icon: <SiExpress className="text-gray-500" />, label: "Express" },
  { icon: <SiMongodb className="text-green-600" />, label: "MongoDB" },
  { icon: <SiPostgresql className="text-indigo-500" />, label: "PostgreSQL" },
  { icon: <SiGit className="text-orange-500" />, label: "Git" },
  { icon: <SiGithub className="text-gray-600 dark:text-white" />, label: "GitHub" },
  { icon: <SiCypress className="text-teal-500" />, label: "CI/CD (Cypress)" },
];

const projectPlaceholder = [
  {
    title: "Project One",
    description: "A full-stack web app using React and Node.js.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Project Two",
    description: "Responsive portfolio built with Tailwind CSS.",
    tech: ["HTML", "Tailwind", "Framer Motion"],
    github: "#",
    live: "#",
  },
  {
    title: "Project Three",
    description: "CI/CD pipeline with GitHub Actions and Cypress testing.",
    tech: ["CI/CD", "GitHub Actions", "Cypress"],
    github: "#",
    live: "#",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const targetId = localStorage.getItem("scrollToSection");
    if (targetId) {
      setTimeout(() => {
        const offset = 80;
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        localStorage.removeItem("scrollToSection");
      }, 200);
    }
  }, []);

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
        <h1 className="text-4xl font-bold">Joseph Stenecker</h1>
        <p className="text-lg text-gray-600">
          I&apos;m a software engineer passionate about building full-stack applications and solving real-world problems with code.
        </p>
      </section>

      <section id="about">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
          I&apos;m Joe, a developer experienced in building responsive web apps using React, Node.js, and modern tech stacks.
          I enjoy learning new technologies, contributing to open-source, and developing practical solutions.
        </p>
      </section>

      <section id="skills">
        <h2 className="text-2xl font-bold mb-6 text-center">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group cursor-pointer transition-transform hover:scale-110"
            >
              <div className="text-4xl">{skill.icon}</div>
              <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-text">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <h2 className="text-2xl font-bold mb-6 text-center">Projects</h2>
        <div className="space-y-6">
          {projectPlaceholder.map((project, i) => (
            <motion.div
              key={i}
              className="bg-card text-text p-6 rounded-lg shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeInUp}
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-500 mb-2">{project.description}</p>
              <p className="text-sm mb-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Tech:</span>{" "}
                {project.tech.join(", ")}
              </p>
              <div className="flex gap-4">
                <a href={project.github} target="_blank" className="underline text-primary hover:text-primary-hover">
                  GitHub
                </a>
                <a href={project.live} target="_blank" className="underline text-primary hover:text-primary-hover">
                  Live Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>
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
