import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const visionPoints = [
  {
    title: "Empower local farmers",
    text: "Build a sustainable market for regional crops—especially tomatoes—so growers share in every bottle’s success.",
  },
  {
    title: "Deliver premium quality",
    text: "Craft sauces, condiments, and pastes with natural ingredients and modern food technology.",
  },
  {
    title: "Drive food innovation",
    text: "Blend traditional Indian flavors with global culinary trends families actually cook with.",
  },
  {
    title: "Uphold trust in every pack",
    text: "Hold the highest standards of hygiene, taste, and packaging—so Gulchu stays reliable on the shelf.",
  },
  {
    title: "Grow beyond borders",
    text: "Position Gulchu worldwide as a symbol of authenticity, purity, and rich Indian taste.",
  },
];

function Director() {
  return (
    <section className="bg-[#faf7f2] px-6 py-12 text-[#1a1210] md:py-16">
      {/* Director intro */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          src="/Praveen Singh.jpeg"
          alt="Mr. Praveen Kumar Singh"
          className="mx-auto mb-6 h-40 w-40 rounded-full object-cover ring-4 ring-white"
          onError={(e) => {
            e.currentTarget.src = "/logo2.jpeg";
          }}
        />
        <h1 className="hero-headline text-3xl text-[#1a1210] md:text-4xl">
          Mr. Praveen Kumar Singh
        </h1>
        <p className="hero-copy mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c62828]">
          Founder & Managing Director
        </p>
        <div className="mx-auto mt-6 flex max-w-2xl gap-3 text-left">
          <FaQuoteLeft className="mt-1 shrink-0 text-[#c62828]" />
          <p className="hero-copy text-base leading-relaxed text-[#1a1210]/75 md:text-lg">
            At Gulchu, our mission goes beyond making delicious ketchup — we aim
            to build a brand that families trust and love. From our ingredients
            to our customer care, we focus on quality, passion, and consistency
            in every bottle.
          </p>
        </div>
      </div>

      {/* Our Vision — improved */}
      <div className="relative mx-auto mt-20 max-w-6xl overflow-hidden md:mt-28">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-72 w-72 opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(198,40,40,0.14) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          {/* Left: statement */}
          <div>
            <p className="hero-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c62828]">
              Our vision
            </p>
            <h2 className="hero-headline mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] text-[#1a1210]">
              From Chatra fields to every kitchen.
            </h2>
            <p className="hero-copy mt-5 text-base leading-relaxed text-[#1a1210]/70 md:text-lg">
              At{" "}
              <span className="font-bold text-[#c62828]">Kaushik Agro Food</span>
              , we transform locally grown produce into high-quality, healthy
              products for India and beyond. Through{" "}
              <span className="font-bold text-[#c62828]">Gulchu</span>, we are
              committed to growing with purpose.
            </p>

            <blockquote className="mt-8 border-l-2 border-[#c62828] pl-5">
              <p className="hero-copy text-sm leading-relaxed text-[#1a1210]/80 md:text-base">
                Every household deserves the vibrant flavors of India—with love,
                honesty, and excellence in every drop.
              </p>
              <footer className="hero-copy mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1210]/45">
                Chatra, Jharkhand → the world
              </footer>
            </blockquote>
          </div>

          {/* Right: vision pillars */}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {visionPoints.map((point, i) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="group flex gap-4 border border-[#1a1210]/10 bg-white p-5 transition-colors hover:border-[#c62828]/40"
              >
                <span className="hero-brand shrink-0 text-2xl leading-none text-[#c62828]/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="hero-copy text-base font-bold text-[#1a1210] group-hover:text-[#c62828]">
                    {point.title}
                  </h3>
                  <p className="hero-copy mt-1.5 text-sm leading-relaxed text-[#1a1210]/65">
                    {point.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default Director;
