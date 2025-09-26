import React from "react";
import { motion } from "framer-motion";

function Tag({ label }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block px-3 py-1 rounded-full text-xs font-medium 
                 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
    >
      {label}
    </motion.span>
  );
}

export default Tag;
