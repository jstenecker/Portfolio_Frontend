import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({ route, onClick, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (route) navigate(route);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#535bf2",
        color: "#ffffff",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-5 py-2 text-white bg-primary text-base font-medium rounded-lg border border-transparent cursor-pointer transition duration-300"
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  route: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
