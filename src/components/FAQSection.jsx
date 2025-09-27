import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I apply for a job?",
    answer:
      "Simply create an account, browse jobs, and click 'Apply' on the job you're interested in.",
  },
  {
    question: "Is HireMe free to use?",
    answer:
      "Yes, applying for jobs is completely free for candidates. Companies may have premium posting options.",
  },
  {
    question: "Can companies post jobs for free?",
    answer:
      "Yes, companies can post a limited number of jobs for free. Premium plans offer more visibility.",
  },
  {
    question: "Do I need to create an account to apply?",
    answer:
      "Yes, creating an account helps you manage applications and track your progress easily.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out to our support team via the Contact section at the bottom of the page.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#0B0F19] py-20 px-4 sm:px-6 overflow-hidden">
      {/* 🔥 Animated Blobs in Background - Same as About Section */}
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
        {/* Heading - Same as About Section */}
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Frequently Asked <span className="text-indigo-400">Questions</span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-center text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Find quick answers to common questions about our platform
        </motion.p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#1A1F2C] border border-indigo-500/30 rounded-xl p-6 cursor-pointer hover:bg-[#252A3A] transition-all duration-300 shadow-lg"
              onClick={() => toggleFAQ(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <motion.span 
                  className="text-indigo-400 text-2xl font-light min-w-6 flex justify-center"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </div>

              {/* Animated Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="w-8 h-0.5 bg-indigo-400 mb-3"></div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6 text-lg">
            Still have questions? We're here to help!
          </p>
          <motion.a
            href="#contact"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;