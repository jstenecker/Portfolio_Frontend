import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to My Portfolio</h1>
      <p className="home-description">
        I&apos;m a software engineer passionate about building full-stack applications and solving real-world problems with code.
      </p>

      <div className="tab-wrapper">
        <div className="tab-buttons">
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About Me
          </button>
          <button
            className={activeTab === "skills" ? "active" : ""}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "about" && (
            <div className="tab-panel">
              <p>
                I&apos;m Joseph Stenecker, a developer with experience in building
                responsive web apps using React, Node.js, and modern tech stacks.
              </p>
              <p>
                I enjoy learning new technologies, contributing to open-source,
                and developing practical solutions.
              </p>
            </div>
          )}
          {activeTab === "skills" && (
            <div className="tab-panel">
              <ul>
                <li>JavaScript / TypeScript</li>
                <li>React / Redux / Tailwind CSS</li>
                <li>Node.js / Express</li>
                <li>MongoDB / PostgreSQL</li>
                <li>Git / GitHub / CI/CD</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
