import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const trustedCompanies = [
  { name: "Google", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Airbnb", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/airbnb.svg" },
  { name: "LinkedIn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
  { name: "Tesla", logo: "https://cdn.worldvectorlogo.com/logos/tesla-motors.svg" },
];

function TrustedCompanies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 120 },
    },
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0B0F19] via-[#1A1F2E] to-[#0B0F19] py-20 px-6 overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted by{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-500">
            Leading Companies
          </span>
        </motion.h2>

        {/* Logos */}
        <div ref={ref} className="py-6">
          <motion.div
            className="flex flex-wrap justify-center gap-12 md:gap-20"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={index}
                className="relative group flex items-center justify-center"
                variants={logoVariants}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Floating effect */}
                <motion.img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 md:h-16 object-contain grayscale brightness-150 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: index * 0.2 }}
                />

                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-[#1A1F2E] text-indigo-300 text-xs font-medium px-3 py-2 rounded-md shadow-lg border border-gray-700">
                    {company.name}
                  </span>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#1A1F2E] rotate-45"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sub Text */}
        <motion.p
          className="text-gray-300 mt-14 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join thousands of global leaders who already trust our platform to
          grow their teams and careers 🚀
        </motion.p>
      </div>
    </section>
  );
}

export default TrustedCompanies;
