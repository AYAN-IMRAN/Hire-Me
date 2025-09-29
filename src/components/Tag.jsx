import React from "react";
import { motion } from "framer-motion";

function Tag({ label, color = "indigo" }) {
  // Color classes dynamic bana diye taake baad me green/red etc. bhi use ho sake
  const baseClasses = {
    indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
    gray: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  };

  return (
    <motion.span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${baseClasses[color]}`}
    >
      {label}
    </motion.span>
  );
}

export default Tag;
