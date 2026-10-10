import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Quick Snacks",
    count: 15,
    time: "10–15 min",
    blurb: "Crispy bites and street-style plates ready in minutes.",
    pairs: "Green Chilli Sauce",
    image: "/GreenChilli.png",
  },
  {
    name: "Main Dishes",
    count: 25,
    time: "30–45 min",
    blurb: "Hearty meals where Gulchu sauces do the heavy lifting.",
    pairs: "Continental Sauce",
    image: "/ContinentalSauce.png",
  },
  {
    name: "Dips & Sauces",
    count: 12,
    time: "5–10 min",
    blurb: "Pairings and mixes that finish every table spread.",
    pairs: "Tomato Ketchup",
    image: "/TomatoKetchup.png",
  },
  {
    name: "Everyday Favorites",
    count: 8,
    time: "15–20 min",
    blurb: "Simple recipes your kitchen will come back to often.",
    pairs: "Classic Ketchup",
    image: "/Ketchup-gr.png",
  },
];

const totalRecipes = categories.reduce((sum, c) => sum + c.count, 0);

const Hero = () => {
  const [active, setActive] = useState(0);
  const featured = categories[active];

  return (
    <section className="relative w-full overflow-hidden bg-[#faf7f2] py-16 md:py-24">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-12">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-copy inline-flex items-center gap-2 rounded-full bg-[#c62828]/[0.08] px-3 py-1 text-xs font-semibold text-[#c62828]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c62828]" aria-hidden />
            Recipes
          </span>
          <h2 className="hero-headline mt-5 text-[clamp(2.2rem,4.6vw,3.5rem)] leading-[1.08] tracking-tight text-[#1a1210]">
            Cook with Gulchu.
            <br />
            <span className="text-[#c62828]">Taste what follows.</span>
          </h2>
          <p className="hero-copy mt-5 max-w-md text-base leading-relaxed text-[#1a1210]/60 md:text-lg">
            From quick snacks to full meals—recipes built around our sauces so every plate lands with flavor.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-3 divide-x divide-[#1a1210]/10 rounded-2xl border border-[#1a1210]/[0.07] bg-white py-4">
            <div className="px-4 text-center">
              <dt className="hero-copy text-[11px] font-medium text-[#1a1210]/50">Recipes</dt>
              <dd className="hero-copy mt-1 text-xl font-extrabold text-[#1a1210]">{totalRecipes}+</dd>
            </div>
            <div className="px-4 text-center">
              <dt className="hero-copy text-[11px] font-medium text-[#1a1210]/50">Categories</dt>
              <dd className="hero-copy mt-1 text-xl font-extrabold text-[#1a1210]">{categories.length}</dd>
            </div>
            <div className="px-4 text-center">
              <dt className="hero-copy text-[11px] font-medium text-[#1a1210]/50">Quickest</dt>
              <dd className="hero-copy mt-1 text-xl font-extrabold text-[#1a1210]">5 min</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/recipe"
              className="hero-copy group inline-flex h-12 items-center gap-2 rounded-full bg-[#c62828] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(198,40,40,0.8)] transition-colors hover:bg-[#9b1c1c]"
            >
              Explore recipes
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/product"
              className="hero-copy inline-flex h-12 items-center rounded-full border border-[#1a1210]/15 bg-white px-6 text-sm font-semibold text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
            >
              Shop sauces
            </Link>
          </div>
        </motion.div>

        {/* Interactive category stage */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:grid-cols-[1fr_1.05fr] sm:items-stretch"
        >
          {/* Featured card */}
          <div className="flex flex-col overflow-hidden rounded-3xl border border-[#1a1210]/[0.07] bg-white shadow-[0_24px_50px_-30px_rgba(90,18,18,0.45)]">
            <div className="relative m-2 flex aspect-[4/3.4] items-center justify-center overflow-hidden rounded-2xl bg-[#f3ece3] sm:aspect-auto sm:flex-1">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 55%, rgba(198,40,40,0.16) 0%, transparent 62%)",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.img
                  key={featured.image}
                  src={featured.image}
                  alt={featured.pairs}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-[78%] max-h-[260px] w-auto max-w-[80%] object-contain mix-blend-multiply"
                  draggable={false}
                />
              </AnimatePresence>
              <span className="hero-copy absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#1a1210] shadow-sm">
                {featured.count}+ recipes
              </span>
              <span className="hero-copy absolute right-3 top-3 rounded-full bg-[#1a1210] px-2.5 py-1 text-[11px] font-semibold text-white">
                ⏱ {featured.time}
              </span>
            </div>

            <div className="px-5 pb-5 pt-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="hero-copy text-lg font-bold text-[#1a1210]">{featured.name}</p>
                  <p className="hero-copy mt-1 text-sm text-[#1a1210]/55">
                    Best with <span className="font-semibold text-[#c62828]">Gulchu {featured.pairs}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
              <Link
                to="/recipe"
                className="hero-copy mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1210] transition-colors hover:text-[#c62828]"
              >
                View {featured.name.toLowerCase()}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Category list */}
          <ul className="flex flex-col gap-2" role="tablist" aria-label="Recipe categories">
            {categories.map((cat, i) => {
              const isActive = i === active;
              return (
                <li key={cat.name} className="flex-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative flex h-full w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#c62828]/20 bg-white shadow-[0_12px_30px_-18px_rgba(90,18,18,0.45)]"
                        : "border-transparent hover:bg-white/70"
                    }`}
                  >
                    <span
                      className={`hero-copy flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                        isActive ? "bg-[#c62828] text-white" : "bg-[#1a1210]/[0.05] text-[#1a1210]/45"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span
                          className={`hero-copy text-base font-semibold transition-colors ${
                            isActive ? "text-[#c62828]" : "text-[#1a1210]"
                          }`}
                        >
                          {cat.name}
                        </span>
                        <span className="hero-copy shrink-0 text-xs font-medium text-[#1a1210]/40">
                          {cat.count}+
                        </span>
                      </span>
                      <span
                        className={`hero-copy mt-1 block text-sm leading-snug text-[#1a1210]/55 ${
                          isActive ? "" : "hidden sm:block sm:text-[#1a1210]/40"
                        }`}
                      >
                        {cat.blurb}
                      </span>
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
