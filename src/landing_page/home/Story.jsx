import React, { useState } from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const storyData = {
    title: "Our Journey",
    subtitle: "Crafting Flavors, Creating Memories",
    description:
      "It all started with a simple belief: food should be real, fresh, and bursting with flavor. From a small kitchen experiment to a brand loved by many, Gulchu is a testament to passion and quality. We don't just make condiments; we craft experiences that bring families together.",
    highlights: [
      {
        year: "2023",
        title: "The Spark",
        description: "A vision to redefine authentic homemade taste.",
      },
      {
        year: "2024",
        title: "The Craft",
        description: "Perfecting recipes with 100% natural ingredients.",
      },
      {
        year: "Future",
        title: "The Expansion",
        description: "Bringing Gulchu to every dining table.",
      },
    ],
    stats: [
      { number: "100%", label: "Natural" },
      { number: "0%", label: "Preservatives" },
      { number: "50+", label: "Recipes Tested" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background with Parallax-like feel */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/OurStory.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column: Narrative */}
          <div className="text-left space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">
                {storyData.title}
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {storyData.subtitle}
              </h3>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed font-light"
            >
              {storyData.description}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10"
            >
              {storyData.stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <button className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  Read Full Story
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="space-y-6">
            {storyData.highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${hoveredIndex === index
                    ? "bg-white/10 border-orange-500/50 scale-105 shadow-2xl"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                  } backdrop-blur-md`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 opacity-80">
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
