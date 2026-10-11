import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const highlights = [
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
    year: "Next",
    title: "The Expansion",
    description: "Bringing Gulchu to every dining table.",
  },
];

const stats = [
  { number: "100%", label: "Natural" },
  { number: "0%", label: "Preservatives" },
  { number: "50+", label: "Recipes tested" },
];

const ease = [0.22, 1, 0.36, 1];

const OurStory = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f6f1ea] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12">
        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-[#1a1210]/[0.07] bg-white p-2 shadow-[0_30px_60px_-35px_rgba(90,18,18,0.5)]">
            <img
              src="/img/OurStory.webp"
              alt="Gulchu Tomato Ketchup bottles"
              loading="lazy"
              draggable={false}
              className="aspect-[4/3.6] w-full rounded-2xl object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-[#1a1210]/[0.07] bg-white px-4 py-3 shadow-[0_16px_34px_-18px_rgba(26,18,16,0.35)] sm:left-8">
            <img src="/img/logo.webp" alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="hero-copy text-sm font-bold text-[#1a1210]">Since 2023</p>
              <p className="hero-copy text-xs text-[#1a1210]/55">Itkhori, Chatra · Jharkhand</p>
            </div>
          </div>

          <span className="hero-copy absolute right-5 top-5 rounded-full bg-[#c62828] px-3 py-1 text-xs font-bold text-white shadow-md">
            100% Natural
          </span>
        </motion.div>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="pt-4 lg:pt-0"
        >
          <span className="hero-copy inline-flex items-center gap-2 rounded-full bg-[#c62828]/[0.08] px-3 py-1 text-xs font-semibold text-[#c62828]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c62828]" aria-hidden />
            Our journey
          </span>

          <h2 className="hero-headline mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.08] tracking-tight text-[#1a1210]">
            Crafting flavors,
            <br />
            <span className="text-[#c62828]">creating memories.</span>
          </h2>

          <p className="hero-copy mt-5 max-w-xl text-base leading-relaxed text-[#1a1210]/60 md:text-lg">
            It all started with a simple belief: food should be real, fresh, and bursting with flavor.
            From a small kitchen experiment to a brand loved by many, Gulchu is a testament to passion
            and quality—condiments that bring families together.
          </p>

          <dl className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-[#1a1210]/10 rounded-2xl border border-[#1a1210]/[0.07] bg-white py-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-3 text-center">
                <dd className="hero-copy text-2xl font-extrabold tracking-tight text-[#1a1210]">
                  {stat.number}
                </dd>
                <dt className="hero-copy mt-0.5 text-xs font-medium text-[#1a1210]/50">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {highlights.map((item, index) => {
              const isNext = index === highlights.length - 1;
              return (
                <li
                  key={item.title}
                  className={`rounded-2xl border p-4 transition-colors ${
                    isNext
                      ? "border-dashed border-[#1a1210]/15 bg-transparent"
                      : "border-[#1a1210]/[0.07] bg-white hover:border-[#c62828]/25"
                  }`}
                >
                  <span
                    className={`hero-copy inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      isNext ? "bg-[#1a1210]/[0.06] text-[#1a1210]/60" : "bg-[#c62828] text-white"
                    }`}
                  >
                    {item.year}
                  </span>
                  <h3 className="hero-copy mt-2.5 text-sm font-bold text-[#1a1210]">{item.title}</h3>
                  <p className="hero-copy mt-1 text-xs leading-relaxed text-[#1a1210]/55">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/about/company"
              className="hero-copy group inline-flex h-12 items-center gap-2 rounded-full bg-[#c62828] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(198,40,40,0.8)] transition-colors hover:bg-[#9b1c1c]"
            >
              Read our story
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/about/director"
              className="hero-copy inline-flex h-12 items-center rounded-full border border-[#1a1210]/15 bg-white px-6 text-sm font-semibold text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
            >
              Our vision
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
