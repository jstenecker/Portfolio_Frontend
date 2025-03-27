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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="btn"
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
