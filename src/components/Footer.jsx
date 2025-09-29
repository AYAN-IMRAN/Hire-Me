import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B0F19] border-t border-indigo-500/20">
      {/* 🔥 Animated Blobs in Background */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Hire<span className="text-indigo-400">Me</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Connecting talented professionals with amazing opportunities. 
              We're dedicated to making job hunting and hiring seamless and efficient.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: FaLinkedin, href: "#", color: "hover:text-blue-400" },
                { icon: FaTwitter, href: "#", color: "hover:text-blue-300" },
                { icon: FaGithub, href: "#", color: "hover:text-gray-400" },
                { icon: FaEnvelope, href: "#", color: "hover:text-red-400" }
              ].map((SocialIcon, index) => (
                <motion.a
                  key={index}
                  href={SocialIcon.href}
                  className="w-10 h-10 bg-[#1A1F2C] border border-indigo-500/30 rounded-lg flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialIcon.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Jobs', 'Companies', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-indigo-400 text-sm" />
                </div>
                <span className="text-gray-300 text-sm">123 Business Street, City</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <FaPhone className="text-indigo-400 text-sm" />
                </div>
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-indigo-400 text-sm" />
                </div>
                <span className="text-gray-300 text-sm">hello@hireme.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-indigo-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} HireMe. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
