import React from "react";
import { motion } from "framer-motion";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`px-5 py-2 rounded-lg font-medium 
                  bg-indigo-600 hover:bg-indigo-700 
                  text-white shadow-md transition-all
                  ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default Button;
