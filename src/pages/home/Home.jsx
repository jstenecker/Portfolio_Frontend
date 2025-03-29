import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiRedux, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit,
  SiGithub, SiCypress
} from "react-icons/si";

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

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalImage, setModalImage] = useState(null);

  const stockProject = {
    title: "Stock Alerts Website",
    description: "Track DOW30 stocks and set email alerts. Includes Firebase login, MongoDB, email system, and Finnhub API integration.",
    tech: ["React", "Firebase", "Vite", "Node.js", "MongoDB"],
    live: "https://www.dropbox.com/scl/fi/iat6h02as74q6it18hrn1/Stock-Alerts-Website-Overview-2.mp4?rlkey=krird5zamav4jn0ihqspydm8u&st=xd30lss7&dl=0",
    repo: [
      "https://github.com/jstenecker/Stock_Alerts_Frontend",
      "https://github.com/jstenecker/Stock_Alerts_Backend"
    ],
    images: [
      "/assets/Stock_alerts_home.png",
      "/assets/Stock_alerts_mystocks.png",
      "/assets/Stock_alerts_stocks.png"
    ],
  };

  useEffect(() => {
    const id = localStorage.getItem("scrollToSection");
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
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
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col justify-center items-start px-8 w-64 fixed top-0 bottom-0 left-0 bg-background dark:bg-gray-900 z-40">
        <h1 className="text-3xl font-bold text-primary mb-1">Joseph Stenecker</h1>
        <h2 className="text-md text-gray-600 dark:text-gray-300">Full Stack Software Engineer</h2>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 pt-20 px-4 max-w-5xl mx-auto space-y-20">
        <section id="landing" className="space-y-4">
          <div className="lg:hidden text-center space-y-2">
            <h1 className="text-3xl font-bold">Joseph Stenecker</h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-300">Full Stack Software Engineer</h2>
          </div>
        </section>

        <section id="about">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300">
        I&apos;m Joe, a full-stack software engineer with a passion for building clean, efficient, and scalable web applications. I specialize in React and Node.js, and enjoy working across the stack to bring ideas to life — from dynamic front-end interfaces to robust back-end systems and API integrations.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
        I&apos;m always learning, experimenting with new tools, and improving workflows. My experience includes Firebase authentication, MongoDB, CI/CD pipelines, and modern frameworks like Vite and Tailwind CSS.
        I thrive in collaborative environments and enjoy tackling challenges that require creative problem-solving. I believe in writing clean, maintainable code and following best practices to ensure the longevity of my projects.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
        I have a strong foundation in JavaScript and TypeScript, and I&apos;m comfortable with both front-end and back-end development. I love building user-friendly interfaces that enhance the user experience while ensuring the underlying architecture is solid and efficient.
        Beyond coding, I enjoy collaborating with others, contributing to open-source projects, and staying active in the tech community. 
        </p>
        <p className="text-gray-700 dark:text-gray-300">
        Whether I&apos;m building a product from scratch or optimizing an existing system, I focus on creating practical solutions that deliver real value.
        My goal is to create meaningful, maintainable applications that users love and businesses rely on. Let&apos;s build something great together.
        </p>
        </section>

        <section id="skills">
          <h2 className="text-2xl font-bold mb-6 text-center">Skills</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl transition-transform group-hover:scale-110">{skill.icon}</div>
                <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-text">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-2xl font-bold mb-6 text-center">Projects</h2>
          <motion.div
            className="bg-card text-text p-6 rounded-lg shadow-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
            }}
          >
            <h3 className="text-xl font-semibold mb-2">{stockProject.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{stockProject.description}</p>
            <p className="text-sm mb-3">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Tech:</span>{" "}
              {stockProject.tech.join(", ")}
            </p>
            <div className="flex gap-4 mb-4">
              {stockProject.repo.map((link, i) => (
                <a key={i} href={link} className="text-blue-500 underline hover:text-blue-700" target="_blank" rel="noreferrer">
                  GitHub {i + 1}
                </a>
              ))}
              <a href={stockProject.live} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                Demo Video
              </a>
            </div>

            <div className="relative flex flex-wrap gap-4">
              {stockProject.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Stock Alerts screenshot ${i + 1}`}
                  onClick={() => setModalImage(src)}
                  className="w-40 h-24 object-cover rounded shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10"
                  style={{ marginLeft: i !== 0 ? "-1rem" : "0" }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-4 py-2 rounded shadow-sm" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-4 py-2 rounded shadow-sm" required />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border px-4 py-2 rounded shadow-sm" required />
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border px-4 py-2 rounded shadow-sm" required />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Send Message</button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </section>

        {modalImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative max-w-4xl w-full mx-auto">
              <button onClick={() => setModalImage(null)} className="absolute top-2 right-4 text-white text-2xl">×</button>
              <img src={modalImage} alt="Enlarged screenshot" className="w-full h-auto rounded shadow-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
