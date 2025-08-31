import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Whatsaap from "./../Whatsaap";
import { Link } from "react-router-dom"
 
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

  return (
    <>
      <section className="relative w-full mb-0">
        {/* Progress Bars (moved to bottom) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-5 w-[60%] max-w-md">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full overflow-hidden bg-white/20"
            >
              <div
                className={`h-full transition-all duration-[3000ms] ease-linear ${
                  i === currentSlide ? "bg-white w-full" : "bg-transparent w-0"
                }`}
              ></div>
            </div>
          ))}
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="hero-swiper h-[75vh] md:h-[85vh] lg:h-[95vh]"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative h-full w-full bg-cover bg-center overflow-auto"
                style={{ backgroundImage: `url('${slide.bg}')` }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                  <div className="animate-fade-in-up max-w-3xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 mb-8 font-medium">
                      {slide.subtitle}
                    </p>
                    <Link to="/product">
                    <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all">
                      {slide.cta}
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slide Counter */}
        <div className="absolute bottom-16 right-6 z-20 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          {currentSlide + 1} / {slides.length}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s ease-out;
        }
      `}</style>

      <Whatsaap />
    </>
  );
};

export default Hero;
