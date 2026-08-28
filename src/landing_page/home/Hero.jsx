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
    src: "/TomatoKetchup.png",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
  {
    id: "chilli",
    label: "Chilli Sauce",
    src: "/GreenChilli.png",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
  {
    id: "continental",
    label: "Continental",
    src: "/ContinentalSauce.png",
    support: "Pasta, pizza, and weeknight plates—elevated in one pour.",
  },
];

function FoodPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
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
          <circle cx="28" cy="36" r="14" fill="none" stroke="#fff" strokeWidth="1.2" />
          <path d="M28 22c0 0 2-6 0-8M22 28c4-2 8-2 12 0" fill="none" stroke="#fff" strokeWidth="1" />
          <path
            d="M90 30c8 2 18 18 12 28-6 8-18 4-22-6-4-10 2-24 10-22z"
            fill="none"
            stroke="#fff"
            strokeWidth="1.2"
          />
          <path
            d="M130 100c-18-8-28-28-20-40 12 4 28 18 32 36-4 4-8 6-12 4z"
            fill="none"
            stroke="#fff"
            strokeWidth="1.1"
          />
          <path d="M118 78c6 8 12 16 16 26" fill="none" stroke="#fff" strokeWidth="1" />
          <ellipse cx="50" cy="120" rx="12" ry="16" fill="none" stroke="#fff" strokeWidth="1.1" />
          <path d="M50 104v32M44 112c4 2 8 2 12 0" fill="none" stroke="#fff" strokeWidth="1" />
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
          className={`${cardBase} pointer-events-none left-[2%] z-[1] hidden h-[78%] w-[58%] scale-[0.82] bg-[#4a1518]/70 opacity-40 sm:flex`}
          aria-hidden
        >
          <img
            src={products[prev].src}
            alt=""
            className="h-[85%] w-auto max-w-[85%] object-contain"
            draggable={false}
          />
        </div>

        {/* Next peek */}
        <div
          className={`${cardBase} pointer-events-none right-[2%] z-[1] hidden h-[78%] w-[58%] scale-[0.82] bg-[#4a1518]/70 opacity-40 sm:flex`}
          aria-hidden
        >
          <img
            src={products[next].src}
            alt=""
            className="h-[85%] w-auto max-w-[85%] object-contain"
            draggable={false}
          />
        </div>

        {/* Active center card */}
        <AnimatePresence mode="wait" custom={direction}>
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
            className={`${cardBase} left-1/2 z-[2] h-[92%] w-[78%] max-w-[260px] -translate-x-1/2 bg-gradient-to-b from-[#6b1f24] to-[#3d1014] shadow-[0_24px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:w-[68%] sm:max-w-[300px] lg:max-w-[320px]`}
          >
            <img
              src={products[currentSlide].src}
              alt={products[currentSlide].label}
              className="h-[88%] w-auto max-w-[90%] object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={onPrev}
          className="absolute left-1 top-1/2 z-[3] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a1210] shadow-md transition active:scale-95 sm:left-0 sm:h-11 sm:w-11 md:hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]"
          aria-label="Previous product"
        >
          <span className="text-xl leading-none" aria-hidden>
            ‹
          </span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-1 top-1/2 z-[3] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a1210] shadow-md transition active:scale-95 sm:right-0 sm:h-11 sm:w-11 md:hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]"
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
                : "bg-white/35 hover:bg-white/55"
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
      <section className="hero relative isolate w-full overflow-hidden bg-[#1a0a0c]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 70% 40%, #5c161a 0%, #2a0c0e 45%, #140608 100%)",
          }}
        />
        <FoodPattern />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 sm:gap-10 sm:px-8 sm:py-10 md:grid-cols-12 md:gap-8 md:px-10 md:py-14 lg:gap-10 lg:px-16 lg:py-16">
          <div className="md:col-span-5 lg:col-span-5">
            <p className="hero-brand text-[clamp(2.75rem,14vw,6.5rem)] leading-[0.85] tracking-[0.02em] text-[#faf7f2]">
              GULCHU
            </p>

            <div className="mt-4 max-w-md sm:mt-5">
              <h1 className="hero-headline text-[clamp(1.5rem,5vw,2.6rem)] leading-snug text-[#faf7f2]">
                Finish{" "}
                <span className="relative inline-block">
                  strong
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#c62828]"
                    aria-hidden
                  />
                </span>
              </h1>
              <p className="hero-copy mt-3 text-sm leading-relaxed text-[#faf7f2]/75 sm:mt-4 sm:text-base md:text-lg">
                {item.support}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                to="/product"
                className="hero-copy inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c62828] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#faf7f2] transition-colors hover:bg-[#9b1c1c]"
              >
                Shop products
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/about"
                className="hero-copy inline-flex min-h-12 items-center justify-center rounded-xl border border-[#faf7f2]/40 px-6 py-3.5 text-sm font-medium tracking-wide text-[#faf7f2] transition-colors hover:border-[#faf7f2] hover:bg-[#faf7f2]/10"
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
                      ? "bg-white text-[#1a1210]"
                      : "bg-white/10 text-white/80 hover:bg-white/18 hover:text-white"
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
      </section>

      <Whatsaap />
    </>
  );
};

export default Hero;
