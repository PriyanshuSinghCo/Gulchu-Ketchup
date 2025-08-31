import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const OurStory = () => {
  const [isHovered, setIsHovered] = useState(false);

  const storyData = {
    title: "Our Story",
    subtitle: "A Fresh Start with Big Dreams",
    description: "Born from a passion for authentic flavors and a vision to bring quality condiments to every kitchen, we're excited to begin this journey with you. Our commitment is to deliver fresh, natural, and delicious products that enhance your culinary experience.",
    highlights: [
      {
        year: "2024",
        title: "The Vision",
        description: "Started with a dream to create authentic condiments"
      },
      {
        year: "2024",
        title: "Launch Ready",
        description: "Carefully crafted recipes and quality ingredients"
      },
      {
        year: "2024",
        title: "Your Journey",
        description: "Ready to serve you with passion and dedication"
      }
    ],
    stats: [
      { number: "100%", label: "Natural Ingredients" },
      { number: "0", label: "Artificial Preservatives " },
      { number: "∞", label: "Flavor Possibilities" }
    ]
  };

  return (
    <section className="relative mt-5 px-6 py-20 bg-cover bg-center bg-no-repeat rounded-3xl text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/OurStory.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {storyData.title}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl font-medium text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {storyData.subtitle}
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {storyData.description}
          </motion.p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {storyData.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {highlight.year}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {highlight.title}
              </h3>
              <p className="text-gray-300">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {storyData.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:from-yellow-300 hover:to-orange-200 transition-all duration-200 transform hover:scale-101 shadow-lg hover:shadow-l"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <span className="flex items-center justify-center gap-2">
              Join Our Journey
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default OurStory;
