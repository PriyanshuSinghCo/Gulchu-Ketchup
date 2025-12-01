import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Whatsaap from "./../Whatsaap";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bg: "/Background.jpg",
      title: 'Gulchu – "हर बाइट में ताज़गी का स्वाद"',
      subtitle: "अब आपके शहर में उपलब्ध!",
      cta: "Order Now",
    },
    {
      bg: "/ContinentalSauce.png",
      title: "Gulchu – Freshness in every bite",
      subtitle: "Available near you now!",
      cta: "Explore Menu",
    },
    {
      bg: "/GreenChilli.png",
      title: "Gulchu – Delightful Treats",
      subtitle: "Taste the freshness!",
      cta: "Get Started",
    },
    {
      bg: "/TomatoKetchup.png",
      title: "Gulchu – Premium Flavors",
      subtitle: "Crafted for true food lovers!",
      cta: "Try Now",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.bg}')` }}
              >
                {/* Enhanced Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center text-center px-4 md:px-12">
                  {/* We use a key here to trigger re-animation on slide change if desired, 
                      or just let the swiper handle the transition. 
                      For entrance animations on every slide, we can use the currentSlide state 
                      to conditionally render or just rely on the component mounting if Swiper unmounts slides.
                      However, Swiper keeps slides in DOM. 
                      To force animation replay, we can use the 'key' prop on the motion.div 
                      but matching it to the active index is tricky inside the map.
                      Instead, we'll animate the active slide's content by checking index.
                   */}
                  {i === currentSlide && (
                    <motion.div
                      className="max-w-4xl mx-auto"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl leading-tight"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-gray-200 mb-10 font-light tracking-wide max-w-2xl mx-auto"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.div variants={itemVariants}>
                        <Link to="/product">
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 165, 0, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all border border-white/10 backdrop-blur-sm"
                          >
                            {slide.cta}
                          </motion.button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Progress Bars */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3 w-[80%] max-w-lg">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm"
            >
              <div
                className={`h-full transition-all duration-[6000ms] ease-linear ${
                  i === currentSlide ? "bg-orange-500 w-full" : "bg-transparent w-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-12 right-8 z-20 bg-black/40 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium tracking-widest shadow-lg">
          <span className="text-orange-400 font-bold text-lg">{currentSlide + 1}</span>
          <span className="mx-2 text-white/50">/</span>
          {slides.length}
        </div>
      </section>

      <Whatsaap />
    </>
  );
};

export default Hero;
