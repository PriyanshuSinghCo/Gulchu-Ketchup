import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Whatsaap from "./../Whatsaap";

const AUTO_MS = 4000;
const SWIPE_THRESHOLD = 40;

const products = [
  {
    id: "ketchup",
    label: "Tomato Ketchup",
    src: "/img/TomatoKetchup.webp",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
  {
    id: "chilli",
    label: "Chilli Sauce",
    src: "/img/GreenChilli.webp",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
  {
    id: "continental",
    label: "Continental",
    src: "/img/ContinentalSauce.webp",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
];

function HeroCurve() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-[calc(100%-2px)] h-6 w-full sm:h-9 md:h-11"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,0 H1440 V34 C1380,34 1350,72 1260,72 C1170,72 1140,22 1050,22 C960,22 930,70 840,70 C750,70 720,20 630,20 C540,20 510,72 420,72 C330,72 300,22 210,22 C120,22 90,62 0,62 Z"
        fill="#b71c1c"
      />
    </svg>
  );
}

function FoodPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#1a1210] opacity-[0.14]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id="hero-food-pattern"
          width="160"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="28" cy="36" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M28 22c0 0 2-6 0-8M22 28c4-2 8-2 12 0" fill="none" stroke="currentColor" strokeWidth="1" />
          <path
            d="M90 30c8 2 18 18 12 28-6 8-18 4-22-6-4-10 2-24 10-22z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M130 100c-18-8-28-28-20-40 12 4 28 18 32 36-4 4-8 6-12 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path d="M118 78c6 8 12 16 16 26" fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="50" cy="120" rx="12" ry="16" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M50 104v32M44 112c4 2 8 2 12 0" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-food-pattern)" />
    </svg>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function ProductCarousel({
  currentSlide,
  direction,
  onPrev,
  onNext,
  onGoTo,
  onPause,
  onResume,
  reducedMotion,
}) {
  const len = products.length;
  const prev = (currentSlide - 1 + len) % len;
  const next = (currentSlide + 1) % len;
  const touchStartX = useRef(null);

  const slideVariants = useMemo(() => {
    if (reducedMotion) {
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    return {
      enter: (dir) => ({ opacity: 0, x: dir > 0 ? 36 : -36, scale: 0.94 }),
      center: { opacity: 1, x: 0, scale: 1 },
      exit: (dir) => ({ opacity: 0, x: dir > 0 ? -28 : 28, scale: 0.96 }),
    };
  }, [reducedMotion]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  const cardBase =
    "absolute top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden rounded-3xl";

  return (
    <div
      className="relative mx-auto w-full max-w-[520px] select-none"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocusCapture={onPause}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onResume();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Gulchu product carousel"
    >
      <div className="relative mx-auto h-[280px] w-full overflow-hidden xs:h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px]">
        {/* Previous peek — hide on very small screens for clarity */}
        <div
          className={`${cardBase} pointer-events-none left-[2%] z-[1] hidden h-[78%] w-[58%] scale-[0.82] bg-[#fdecec] opacity-70 ring-1 ring-[#c62828]/10 sm:flex`}
          aria-hidden
        >
          <img
            src={products[prev].src}
            alt=""
            className="h-[85%] w-auto max-w-[85%] object-contain mix-blend-multiply"
            draggable={false}
          />
        </div>

        {/* Next peek */}
        <div
          className={`${cardBase} pointer-events-none right-[2%] z-[1] hidden h-[78%] w-[58%] scale-[0.82] bg-[#fdecec] opacity-70 ring-1 ring-[#c62828]/10 sm:flex`}
          aria-hidden
        >
          <img
            src={products[next].src}
            alt=""
            className="h-[85%] w-auto max-w-[85%] object-contain mix-blend-multiply"
            draggable={false}
          />
        </div>

        {/* Active center card */}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={products[currentSlide].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reducedMotion
                ? { duration: 0.15 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
            className={`${cardBase} left-1/2 z-[2] h-[92%] w-[78%] max-w-[260px] -translate-x-1/2 bg-white shadow-[0_30px_60px_-24px_rgba(183,28,28,0.55)] ring-1 ring-[#c62828]/15 sm:w-[68%] sm:max-w-[300px] lg:max-w-[320px]`}
          >
            <img
              src={products[currentSlide].src}
              alt={`Gulchu ${products[currentSlide].label}`}
              className="h-[88%] w-auto max-w-[90%] object-contain mix-blend-multiply"
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={onPrev}
          className="absolute left-1 top-1/2 z-[3] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#c62828] text-white shadow-md transition active:scale-95 sm:left-0 sm:h-11 sm:w-11 md:hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]"
          aria-label="Previous product"
        >
          <span className="text-xl leading-none" aria-hidden>
            ‹
          </span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-1 top-1/2 z-[3] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#c62828] text-white shadow-md transition active:scale-95 sm:right-0 sm:h-11 sm:w-11 md:hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]"
          aria-label="Next product"
        >
          <span className="text-xl leading-none" aria-hidden>
            ›
          </span>
        </button>
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2.5"
        role="tablist"
        aria-label="Product slides"
      >
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === currentSlide}
            aria-label={`Show ${p.label}`}
            onClick={() => onGoTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828] ${
              i === currentSlide
                ? "scale-110 bg-[#c62828]"
                : "bg-[#1a1210]/20 hover:bg-[#1a1210]/35"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {products[currentSlide].label}
      </p>
    </div>
  );
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [timerEpoch, setTimerEpoch] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const len = products.length;

  const goTo = useCallback(
    (index, dir) => {
      const nextIndex = ((index % len) + len) % len;
      if (nextIndex === currentSlide) {
        setTimerEpoch((e) => e + 1);
        return;
      }
      const inferredDir =
        dir ??
        (nextIndex > currentSlide ||
        (currentSlide === len - 1 && nextIndex === 0)
          ? 1
          : -1);
      // Handle wrap: from last to first = forward, first to last = backward
      let finalDir = inferredDir;
      if (currentSlide === len - 1 && nextIndex === 0) finalDir = 1;
      if (currentSlide === 0 && nextIndex === len - 1) finalDir = -1;
      if (dir != null) finalDir = dir;

      setDirection(finalDir);
      setCurrentSlide(nextIndex);
      setTimerEpoch((e) => e + 1);
    },
    [currentSlide, len]
  );

  const goNext = useCallback(() => {
    goTo((currentSlide + 1) % len, 1);
  }, [currentSlide, goTo, len]);

  const goPrev = useCallback(() => {
    goTo((currentSlide - 1 + len) % len, -1);
  }, [currentSlide, goTo, len]);

  // Auto-rotation — single interval, restarted via timerEpoch / paused
  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setDirection(1);
      setCurrentSlide((i) => (i + 1) % len);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, timerEpoch, len]);

  const item = products[currentSlide];

  return (
    <>
      <section className="hero relative isolate w-full overflow-hidden bg-white">
        <FoodPattern />

        <div className="absolute inset-x-0 top-0 h-[48px] bg-gradient-to-b from-[#d32f2f] to-[#b71c1c] sm:h-[52px] md:h-[56px]">
          <HeroCurve />
          <div className="relative mx-auto flex h-full w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 sm:px-8 md:px-10 lg:px-16">
            {["100% Veg", "Jaggery added", "Made in Bharat"].map((tag) => (
              <span
                key={tag}
                className="hero-copy shrink-0 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-10 pt-[88px] sm:gap-10 sm:px-8 sm:pt-[100px] md:grid-cols-12 md:gap-8 md:px-10 md:pb-16 md:pt-[108px] lg:gap-10 lg:px-16">
          <div className="md:col-span-5 lg:col-span-5">
            <div className="inline-flex flex-col items-start">
              <p className="hero-brand rounded-2xl border-[3px] border-[#f5b301] bg-gradient-to-b from-[#d32f2f] to-[#b71c1c] px-5 pb-2 pt-3 text-[clamp(2.5rem,12vw,5.5rem)] leading-[0.85] tracking-[0.02em] text-white shadow-[0_14px_30px_-12px_rgba(183,28,28,0.6)]">
                GULCHU
              </p>
              <span className="hero-copy -mt-2.5 ml-4 rounded-sm bg-gradient-to-r from-[#f5b301] to-[#ffd54a] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7a1212] shadow-sm sm:text-[11px]">
                Rich taste • Premium quality
              </span>
            </div>

            <div className="mt-6 max-w-md sm:mt-7">
              <h1 className="hero-headline text-[clamp(1.5rem,5vw,2.6rem)] leading-snug text-[#1a1210]">
                <span className="sr-only">Gulchu Tomato Ketchup, Sauces &amp; Pickles – </span>
                Finish{" "}
                <span className="relative inline-block text-[#c62828]">
                  strong
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#f5b301]"
                    aria-hidden
                  />
                </span>
              </h1>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="hero-copy mt-3 text-sm leading-relaxed text-[#1a1210]/65 sm:mt-4 sm:text-base md:text-lg"
                >
                  {item.support}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                to="/product"
                className="hero-copy inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c62828] px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_24px_-12px_rgba(198,40,40,0.7)] transition-colors hover:bg-[#9b1c1c]"
              >
                Shop products
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/about"
                className="hero-copy inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c62828]/40 bg-white px-6 py-3.5 text-sm font-semibold tracking-wide text-[#c62828] transition-colors hover:border-[#c62828] hover:bg-[#c62828]/5"
              >
                Our story
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8" role="group" aria-label="Product categories">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-pressed={i === currentSlide}
                  className={`hero-copy min-h-10 rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828] sm:text-sm ${
                    i === currentSlide
                      ? "bg-[#c62828] text-white shadow-sm"
                      : "bg-[#c62828]/8 text-[#c62828] hover:bg-[#c62828]/15"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-7">
            <ProductCarousel
              currentSlide={currentSlide}
              direction={direction}
              onPrev={goPrev}
              onNext={goNext}
              onGoTo={goTo}
              onPause={() => setPaused(true)}
              onResume={() => setPaused(false)}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#d4a017] via-[#f5c542] to-[#d4a017]" aria-hidden />
      </section>

      <Whatsaap />
    </>
  );
};

export default Hero;
