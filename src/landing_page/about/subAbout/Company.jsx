import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiSun,
  FiShield,
  FiHeart,
  FiUsers,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { WHATSAPP_NUMBER } from "../../../utils/whatsapp";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease },
};

const stats = [
  { value: "100k+", label: "Bottles sold" },
  { value: "50+", label: "Team members" },
  { value: "4.8/5", label: "Customer rating" },
  { value: "10+", label: "Products" },
];

const values = [
  {
    Icon: FiSun,
    title: "Farm-fresh sourcing",
    text: "Tomatoes and chillies come straight from farmers around Chatra—picked ripe, processed fresh.",
  },
  {
    Icon: FiShield,
    title: "Hygienic processing",
    text: "Clean, controlled production with careful quality checks before every batch is packed.",
  },
  {
    Icon: FiHeart,
    title: "Taste first",
    text: "Recipes tuned in our own kitchen until they taste the way homemade food should.",
  },
  {
    Icon: FiUsers,
    title: "Fair to farmers",
    text: "A steady market for local growers, so the people behind every bottle share in its success.",
  },
];

const process = [
  { step: "01", title: "Sourcing", text: "Ripe produce bought directly from local farms." },
  { step: "02", title: "Sorting & washing", text: "Only the best tomatoes and chillies move ahead." },
  { step: "03", title: "Cooking & blending", text: "Slow-cooked with spices to our tested recipes." },
  { step: "04", title: "Packing & checks", text: "Sealed, labelled and quality-checked for your table." },
];

const range = [
  { name: "Ketchup", image: "/TomatoKetchup.png", path: "/product/TomatoKetchup" },
  { name: "Chilli sauces", image: "/GreenChilli.png", path: "/product/GreenChilli" },
  { name: "Pizza & pasta", image: "/ContinentalSauce.png", path: "/product/PizzaPastaSauce" },
  { name: "Pickles", image: "/Ketchup-gr.png", path: "/product/Pickles(Achar)" },
];

function SectionLabel({ children }) {
  return (
    <span className="hero-copy inline-flex items-center gap-2 rounded-full bg-[#c62828]/[0.08] px-3 py-1 text-xs font-semibold text-[#c62828]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#c62828]" aria-hidden />
      {children}
    </span>
  );
}

function Company() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Gulchu! I'd like to know more about your products."
  )}`;

  return (
    <div className="w-full bg-[#faf7f2]">
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:pb-24">
        <motion.div {...reveal}>
          <SectionLabel>Our company</SectionLabel>
          <h1 className="hero-headline mt-5 text-[clamp(2.3rem,5vw,3.8rem)] leading-[1.05] tracking-tight text-[#1a1210]">
            Kaushik Agro Food,
            <br />
            <span className="text-[#c62828]">the makers of Gulchu.</span>
          </h1>
          <p className="hero-copy mt-5 max-w-xl text-base leading-relaxed text-[#1a1210]/60 md:text-lg">
            From Itkhori in Chatra, Jharkhand, we turn locally grown tomatoes and chillies into
            ketchups, sauces, chutneys and pickles—bringing freshness and real flavour to everyday
            Indian kitchens.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/product"
              className="hero-copy group inline-flex h-12 items-center gap-2 rounded-full bg-[#c62828] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(198,40,40,0.8)] transition-colors hover:bg-[#9b1c1c]"
            >
              Explore products
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about/director"
              className="hero-copy inline-flex h-12 items-center rounded-full border border-[#1a1210]/15 bg-white px-6 text-sm font-semibold text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
            >
              Our vision
            </Link>
          </div>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="relative">
          <div className="overflow-hidden rounded-3xl border border-[#1a1210]/[0.07] bg-white p-2 shadow-[0_30px_60px_-35px_rgba(90,18,18,0.5)]">
            <img
              src="/OurStory.png"
              alt="Gulchu Tomato Ketchup"
              className="aspect-[4/3.4] w-full rounded-2xl object-cover"
              draggable={false}
            />
          </div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-[#1a1210]/[0.07] bg-white px-4 py-3 shadow-[0_16px_34px_-18px_rgba(26,18,16,0.35)] sm:left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c62828]/10 text-[#c62828]">
              <FiMapPin />
            </span>
            <div>
              <p className="hero-copy text-sm font-bold text-[#1a1210]">Made in Jharkhand</p>
              <p className="hero-copy text-xs text-[#1a1210]/55">Itkhori, Chatra · 825408</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.dl
          {...reveal}
          className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[#1a1210]/[0.07] bg-white md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-7 text-center ${i % 2 === 1 ? "border-l" : ""} ${
                i >= 2 ? "border-t md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""} border-[#1a1210]/[0.07]`}
            >
              <dd className="hero-copy text-3xl font-extrabold tracking-tight text-[#1a1210] md:text-4xl">
                {s.value}
              </dd>
              <dt className="hero-copy mt-1 text-sm text-[#1a1210]/50">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        <motion.div {...reveal} className="max-w-2xl">
          <SectionLabel>What we stand for</SectionLabel>
          <h2 className="hero-headline mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-[#1a1210]">
            Simple promises, kept in every bottle.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.07 }}
              className="group rounded-2xl border border-[#1a1210]/[0.07] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(90,18,18,0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c62828]/10 text-lg text-[#c62828] transition-colors group-hover:bg-[#c62828] group-hover:text-white">
                <Icon />
              </span>
              <h3 className="hero-copy mt-5 text-base font-bold text-[#1a1210]">{title}</h3>
              <p className="hero-copy mt-2 text-sm leading-relaxed text-[#1a1210]/55">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#1a0a0c] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <motion.div {...reveal} className="max-w-2xl">
            <span className="hero-copy inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-[#ffb4a8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b5b]" aria-hidden />
              How it's made
            </span>
            <h2 className="hero-headline mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-[#faf7f2]">
              From the farm to your table.
            </h2>
          </motion.div>

          <ol className="relative mt-12 grid gap-4 md:grid-cols-4">
            <span
              className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-[#ff6b5b]/60 via-white/15 to-transparent md:block"
              aria-hidden
            />
            {process.map((p, i) => (
              <motion.li
                key={p.step}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="relative"
              >
                <span className="hero-copy relative z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-[#c62828] text-sm font-bold text-white ring-8 ring-[#1a0a0c]">
                  {p.step}
                </span>
                <h3 className="hero-copy mt-5 text-lg font-bold text-[#faf7f2]">{p.title}</h3>
                <p className="hero-copy mt-1.5 text-sm leading-relaxed text-[#faf7f2]/55">{p.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Range */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        <motion.div {...reveal} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>What we make</SectionLabel>
            <h2 className="hero-headline mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-[#1a1210]">
              A pantry full of Gulchu.
            </h2>
          </div>
          <Link
            to="/product"
            className="hero-copy inline-flex items-center gap-2 text-sm font-semibold text-[#1a1210] hover:text-[#c62828]"
          >
            View all products <FiArrowRight />
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {range.map((r, i) => (
            <motion.div key={r.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.07 }}>
              <Link
                to={r.path}
                className="group block overflow-hidden rounded-2xl border border-[#1a1210]/[0.07] bg-white p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(90,18,18,0.35)]"
              >
                <div className="flex aspect-square items-center justify-center rounded-xl bg-[#f6f1ea] p-6">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex items-center justify-between px-2 py-3">
                  <span className="hero-copy text-sm font-bold text-[#1a1210] sm:text-base">{r.name}</span>
                  <FiArrowRight className="text-[#1a1210]/40 transition-all group-hover:translate-x-1 group-hover:text-[#c62828]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-12">
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-3xl bg-[#8b1e1e] px-6 py-12 text-center sm:px-12 md:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 85% 0%, rgba(255,107,91,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 0% 100%, rgba(26,10,12,0.5) 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="hero-headline mx-auto max-w-2xl text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-white">
              Want Gulchu for your shop, hotel or home?
            </h2>
            <p className="hero-copy mx-auto mt-3 max-w-xl text-base text-white/70">
              Talk to us directly for orders, bulk supply and distribution enquiries.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-copy inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold text-[#8b1e1e] transition-colors hover:bg-[#faf7f2]"
              >
                Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="hero-copy inline-flex h-12 items-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Contact us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Company;
