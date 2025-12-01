import React, { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const recipeCategories = [
    { name: "Quick Snacks", icon: "🍟", count: "15+ Recipes", color: "from-yellow-400 to-orange-500" },
    { name: "Main Dishes", icon: "🍽️", count: "25+ Recipes", color: "from-red-500 to-pink-600" },
    { name: "Dips & Sauces", icon: "🥣", count: "12+ Recipes", color: "from-green-400 to-emerald-600" },
    { name: "Beverages", icon: "🥤", count: "8+ Recipes", color: "from-blue-400 to-indigo-600" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-20 bg-neutral-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-bold tracking-wider uppercase mb-4">
              Culinary Inspiration
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Unlock the Chef <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Inside You
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover delicious ways to enjoy Gulchu products. From spicy snacks to hearty meals, every recipe is crafted to bring out the best flavors.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {recipeCategories.map((category, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full group-hover:bg-white transition-colors">
                    {category.count}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Explore All Recipes
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-bold text-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-300">
              Submit Your Recipe
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-10 border-t border-gray-200 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { label: "Total Recipes", value: "60+" },
              { label: "Avg Prep Time", value: "15m" },
              { label: "Community Rating", value: "4.9★" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
