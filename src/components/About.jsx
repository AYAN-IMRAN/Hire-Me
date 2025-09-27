import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <section  ref={ref} className="relative bg-[#0B0F19] py-20 px-4 sm:px-6 overflow-hidden">
      {/* 🔥 Animated Blobs in Background */}
      <motion.div
        className="absolute top-10 left-4 sm:left-10 w-60 h-60 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-10 right-4 sm:right-10 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-500/20 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Heading */}
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-indigo-400">Us</span>
        </motion.h2>

        {/* Content - Centered Layout */}
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Image - Top */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.img
                src="/images/about.jpg"
                alt="About Us"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-indigo-500/30 mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-lg"></div>
            </div>
          </motion.div>

          {/* Text Content - Bottom */}
          <motion.div
            className="w-full max-w-2xl text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              We are passionate about delivering quality and creativity. Our
              mission is to craft innovative solutions that inspire people and
              create real impact. With dedication and expertise, we strive to
              build something extraordinary in every project.
            </p>

            {/* Additional Content - Centered */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span className="text-gray-300">Innovative Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span className="text-gray-300">Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span className="text-gray-300">Quality Assurance</span>
              </div>
            </div>

            {/* CTA Button - Centered */}
            <motion.a
              href="#contact"
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;