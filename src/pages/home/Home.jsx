import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiRedux, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit,
  SiGithub, SiCypress
} from "react-icons/si";
import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";

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
  const [modalImage, setModalImage] = useState(null);

  const stockProject = {
    title: "Stock Alerts Website",
    description: "Track DOW30 stocks and set email alerts. Includes Firebase login, MongoDB, email system, and Finnhub API integration.",
    tech: ["React", "Express", "Firebase", "Vite", "Node.js", "MongoDB"],
    live: "https://www.dropbox.com/scl/fi/iat6h02as74q6it18hrn1/Stock-Alerts-Website-Overview-2.mp4?rlkey=krird5zamav4jn0ihqspydm8u&st=xd30lss7&dl=0",
    site: "https://stockalerts.vercel.app",
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


  return (
    <div className="relative z-0 w-full min-h-screen flex">

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 lg:mr-20 pt-20 px-6 max-w-screen-x1 w-full mx-auto mt-4 space-y-5">
        <section id="landing" className="space-y-4 lg:mb-1 sm:mb-16">
          <div className="lg:hidden text-center space-y-4">
            <h1 className="text-3xl font-bold">Joseph Stenecker</h1>
            <h2 className="text-lg text-gray-600 dark:text-gray-300">Full Stack Software Engineer</h2>
            <div className="flex justify-center space-x-4 text-xl text-gray-700 dark:text-gray-300 mt-2 mb-10">
              <a href="https://github.com/jstenecker" target="_blank" rel="noreferrer" className="hover:text-primary space-y-4">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/joseph-stenecker" target="_blank" rel="noreferrer" className="hover:text-primary">
                <FaLinkedin />
              </a>
              <a href="/assets/Resume_SEU_JoeStenecker.pdf" target="_blank" rel="noreferrer" className="hover:text-primary">
                <FaFilePdf />
              </a>
            </div>
          </div>
        </section>


        <section id="about">
        <h2 className="text-2xl font-semibold mt-16 mb-15 lg:mt-4 sm:mt-10">About Me</h2>
        <p className="text-gray-700 mt-10 sm:mt-30 dark:text-gray-300">
        I&apos;m Joe, a full-stack software engineer passionate about building clean, scalable applications with React and Node.js. I thrive across the stack—crafting responsive front-ends, building solid back-end systems, and integrating APIs.        </p>
        <p className="text-gray-700 dark:text-gray-300">
        I enjoy learning new tools and improving workflows. My experience includes Firebase auth, MongoDB, CI/CD pipelines, Vite, and Tailwind CSS. I value clean, maintainable code and love working with others to solve real-world problems.        </p>
        <p className="text-gray-700 dark:text-gray-300">
        Whether starting from scratch or refining existing systems, I focus on building scalable, reliable solutions that users enjoy and teams can grow with.        </p>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold mt-20 mb-16 sm:mb-2 lg:mb-10 text-center">Skills</h2>
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
            <div className="text-4xl transition-transform mb-4 group-hover:scale-110">{skill.icon}</div>
            <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-text">
              {skill.label}
            </span>
            </motion.div>
            ))}
            </div>
        </section>


        <section id="projects">
          <h2 className="text-2xl font-bold mb-6 mt-20 text-center">Projects</h2>
          <motion.div
            className="bg-card text-text p-6 rounded-lg shadow-md mt-10"
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
              <a href={stockProject.site} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
                Website
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
}

export default Home;
