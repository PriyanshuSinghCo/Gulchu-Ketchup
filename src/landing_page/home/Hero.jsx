import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Whatsaap from "./../Whatsaap";

const lineup = [
  {
    src: "/TomatoKetchup.png",
    label: "Tomato Ketchup",
    headline: "हर बाइट में ताज़गी का स्वाद",
    support: "Sun-ripened tomatoes. Clean recipes. Gulchu on every table.",
  },
  {
    src: "/GreenChilli.png",
    label: "Chilli Sauce",
    headline: "Spice with a story",
    support: "Bold heat for momos, fries, and everyday chaat nights.",
  },
  {
    src: "/ContinentalSauce.png",
    label: "Continental",
    headline: "Finish strong",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const item = lineup[active];

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % lineup.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className="hero relative isolate min-h-[100svh] w-full overflow-hidden bg-[#1a1210]">
        {/* Full-bleed kitchen atmosphere */}
        <div className="absolute inset-0">
          <img
            src="/Background.jpg"
            alt=""
            className="h-full w-full object-cover object-center scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#1a1210]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1210] via-[#1a1210]/80 to-[#1a1210]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1210] via-transparent to-[#1a1210]/40" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-end gap-8 px-5 pb-12 pt-10 sm:px-8 md:grid-cols-12 md:items-center md:gap-6 md:px-12 md:pt-12 lg:px-16 lg:pb-16">
          {/* Copy — brand first */}
          <div className="md:col-span-6 lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hero-brand text-[clamp(4rem,11vw,7.5rem)] leading-[0.85] tracking-[0.02em] text-[#faf7f2]"
            >
              Gulchu
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-md"
              >
                <h1 className="hero-headline text-[clamp(1.6rem,3.2vw,2.6rem)] leading-snug text-[#faf7f2]">
                  {item.headline}
                </h1>
                <p className="hero-copy mt-4 text-base leading-relaxed text-[#faf7f2]/70 md:text-lg">
                  {item.support}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/product"
                className="hero-copy inline-flex items-center gap-2 rounded-md bg-[#c62828] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#faf7f2] transition-colors hover:bg-[#9b1c1c]"
              >
                Shop products
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/about"
                className="hero-copy inline-flex items-center rounded-md border border-[#faf7f2]/35 px-7 py-3.5 text-sm font-medium tracking-wide text-[#faf7f2] transition-colors hover:border-[#faf7f2] hover:bg-[#faf7f2]/10"
              >
                Our story
              </Link>
            </motion.div>

            {/* Lineup switcher */}
            <div className="mt-10 flex flex-wrap gap-2">
              {lineup.map((p, i) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`hero-copy rounded-md px-3.5 py-2 text-xs font-medium tracking-wide transition-colors ${
                    i === active
                      ? "bg-[#faf7f2] text-[#1a1210]"
                      : "bg-[#faf7f2]/10 text-[#faf7f2]/70 hover:bg-[#faf7f2]/18 hover:text-[#faf7f2]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dominant product — full bottle, never cropped */}
          <div className="relative flex items-end justify-center md:col-span-6 md:justify-end lg:col-span-6">
            <div
              className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/40 blur-2xl md:left-auto md:right-[12%] md:translate-x-0"
              aria-hidden
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.src}
                  src={item.src}
                  alt={item.label}
                  initial={{ opacity: 0, x: 40, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[min(58vh,560px)] w-auto max-w-[min(85vw,420px)] object-contain drop-shadow-none select-none"
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Whatsaap />
    </>
  );
};

export default Hero;
