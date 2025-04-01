import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col justify-center items-center px-10 w-64 fixed top-0 bottom-0 left-0 z-40 
    shadow-sm transition-colors duration-500 ease-in-out">
        <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-1">Joseph Stenecker</h1>
        <h2 className="text-md text-gray-600 mt-5 dark:text-gray-300">Full Stack Software Engineer</h2>
        <div className="flex gap-4 justify-center mt-4">
          <a href="https://github.com/jstenecker" target="_blank" rel="noreferrer">
            <FaGithub className="text-xl hover:scale-110 mt-20 transition-transform" />
          </a>
          <a href="https://linkedin.com/in/joseph-stenecker" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-xl hover:scale-110 mt-20 transition-transform" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            <FaFileAlt className="text-xl hover:scale-110 mt-20 transition-transform" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
