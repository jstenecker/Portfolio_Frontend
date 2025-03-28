import { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Modal from "./Modal";

const projects = [
  {
    title: "Stock Alerts Website",
    description:
      "Track DOW30 stocks and set price alerts. I built the backend with Firebase Google login, nodemailer email alerts, MongoDB, and Finnhub API integration.",
    tech: ["React", "Firebase", "Vite", "Node.js", "MongoDB"],
    liveDemo: "https://www.dropbox.com/scl/fi/iat6h02as74q6it18hrn1/Stock-Alerts-Website-Overview-2.mp4?rlkey=krird5zamav4jn0ihqspydm8u&st=xd30lss7&dl=0",
    repo: [
      "https://github.com/jstenecker/Stock_Alerts_Frontend",
      "https://github.com/jstenecker/Stock_Alerts_Backend",
    ],
    images: [
      "/assets/Stock_alerts_home.png",
      "/assets/Stock_alerts_mystocks.png",
      "/assets/Stock_alerts_stocks.png",
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const ProjectGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-12">
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          className="bg-card text-text p-6 rounded-lg shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={i}
          variants={fadeInUp}
        >
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>

          <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            <span className="font-semibold">Tech Stack:</span> {project.tech.join(", ")}
          </div>

          <div className="flex gap-4 mb-4 flex-wrap">
            {project.repo.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline text-primary hover:text-primary-hover flex items-center gap-1"
              >
                <FaGithub /> Repo {index + 1}
              </a>
            ))}
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-primary hover:text-primary-hover flex items-center gap-1"
            >
              <FaExternalLinkAlt /> Demo
            </a>
          </div>

          {/* Image Stack */}
          <div className="flex gap-4 overflow-x-auto">
            {project.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Project ${idx}`}
                onClick={() => setSelectedImage(src)}
                className="h-40 rounded shadow-md cursor-pointer transition-transform hover:scale-105 -ml-4 first:ml-0"
              />
            ))}
          </div>
        </motion.div>
      ))}

      {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" className="rounded max-w-full max-h-[80vh]" />
        </Modal>
      )}
    </div>
  );
};

export default ProjectGallery;
