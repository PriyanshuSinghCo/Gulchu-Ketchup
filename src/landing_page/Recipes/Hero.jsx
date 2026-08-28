import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Quick Snacks",
    count: "15+",
    blurb: "Crispy bites and street-style plates ready in minutes.",
    image: "/GreenChilli.png",
  },
  {
    name: "Main Dishes",
    count: "25+",
    blurb: "Hearty meals where Gulchu sauces do the heavy lifting.",
    image: "/ContinentalSauce.png",
  },
  {
    name: "Dips & Sauces",
    count: "12+",
    blurb: "Pairings and mixes that finish every table spread.",
    image: "/TomatoKetchup.png",
  },
  {
    name: "Everyday Favorites",
    count: "8+",
    blurb: "Simple recipes your kitchen will come back to often.",
    image: "/Ketchup-gr.png",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const featured = categories[active];

  return (
    <section className="relative w-full overflow-hidden bg-[#faf7f2] py-20 md:py-28">
      {/* Soft atmospheric wash */}
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[70%] w-[55%] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198,40,40,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16 lg:px-16">
        {/* Copy column — one job: invite into recipes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c62828]">
            Recipes
          </p>
          <h2 className="hero-headline mt-4 text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.1] text-[#1a1210]">
            Cook with Gulchu.
            <br />
            <em className="not-italic text-[#c62828]">Taste what follows.</em>
          </h2>
          <p className="hero-copy mt-5 max-w-md text-base leading-relaxed text-[#1a1210]/65 md:text-lg">
            From quick snacks to full meals—recipes built around our sauces so every plate lands with flavor.
          </p>

          <Link
            to="/recipe"
            className="hero-copy mt-8 inline-flex items-center gap-3 bg-[#c62828] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#faf7f2] transition-colors hover:bg-[#9b1c1c]"
          >
            Explore recipes
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Interactive category stage */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-stretch"
        >
          {/* Featured visual */}
          <div className="relative flex min-h-[280px] items-end justify-center overflow-hidden bg-[#1a1210] px-4 pb-8 pt-10 sm:min-h-[360px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, #7a1a1a 0%, #1a1210 70%)",
              }}
            />
            <motion.img
              key={featured.image}
              src={featured.image}
              alt={featured.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[1] h-[220px] w-auto max-w-full object-contain sm:h-[280px]"
              draggable={false}
            />
            <div className="absolute bottom-4 left-4 right-4 z-[2]">
              <p className="hero-copy text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                {featured.count} recipes
              </p>
              <p className="hero-headline mt-1 text-xl text-[#faf7f2] sm:text-2xl">
                {featured.name}
              </p>
            </div>
          </div>

          {/* Category list — interaction, not decorative cards */}
          <ul className="flex flex-col justify-between border-t border-[#1a1210]/10">
            {categories.map((cat, i) => {
              const isActive = i === active;
              return (
                <li key={cat.name} className="border-b border-[#1a1210]/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-start justify-between gap-4 py-4 text-left transition-colors sm:py-5"
                  >
                    <div>
                      <span
                        className={`hero-copy text-base font-semibold tracking-wide transition-colors sm:text-lg ${
                          isActive ? "text-[#c62828]" : "text-[#1a1210] group-hover:text-[#c62828]"
                        }`}
                      >
                        {cat.name}
                      </span>
                      <p
                        className={`hero-copy mt-1 max-w-[16rem] text-sm leading-snug transition-opacity ${
                          isActive ? "opacity-70" : "opacity-0 sm:opacity-40"
                        } text-[#1a1210]`}
                      >
                        {cat.blurb}
                      </p>
                    </div>
                    <span
                      className={`hero-brand shrink-0 text-2xl leading-none transition-colors ${
                        isActive ? "text-[#c62828]" : "text-[#1a1210]/25"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
