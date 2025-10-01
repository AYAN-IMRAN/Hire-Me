import React from "react";
import { motion } from "framer-motion";
import TrustedCompanies from "../components/TrustedCompanies";

function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white overflow-hidden w-full bg-[#0B0F19]">
      {/* 🔥 Animated Blobs (small shades) */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Hero Section Content */}
      <section className="relative text-center max-w-3xl px-6 mx-auto z-10 flex-grow flex items-center justify-center">
        <div>
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Find Your <span className="text-indigo-400">Dream Job</span> <br />
            or Hire Top Talent.
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg mb-8 max-w-xl mx-auto"
          >
            HireMe connects job seekers with companies faster, smarter, and
            easier. Apply with a single click and manage your career
            effortlessly.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="/jobs"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg"
            >
              Browse Jobs
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="/signup"
              className="px-6 py-3 rounded-lg border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </section>

   


      
    </div>

   
  );
}

export default Hero;
