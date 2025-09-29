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

  // Animation variants for staggered logo appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-black via-purple-800 to-black py-24 px-6 overflow-hidden">
      {/* Background pattern with subtle accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>
      
      {/* Shiny effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Heading */}
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted by <span className=" bg-clip-text bg-gradient-to-r text-indigo-400">Top Companies</span> Worldwide
        </motion.h2>

        {/* Logos Container */}
        <div ref={ref} className="py-4">
          <motion.div
            className="flex flex-wrap justify-center gap-12 md:gap-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center"
                variants={logoVariants}
                whileHover={{ 
                  scale: 1.12,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative group">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-12 md:h-16 object-contain grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300 hover:filter-none"
                  />
                  {/* Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="bg-white text-purple-900 text-xs font-bold px-3 py-2 rounded-md whitespace-nowrap shadow-lg">
                      {company.name}
                    </span>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Additional text */}
        <motion.p 
          className="text-purple-100 mt-12 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join thousands of companies that trust our solutions to drive their success
        </motion.p>
      </div>
    </section>
  );
}

export default TrustedCompanies;