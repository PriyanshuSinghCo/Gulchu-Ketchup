import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useCart } from "../context/CartContext";

/** New pages open at the top instead of the previous scroll position */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/** Soft fade-up when a route changes */
export function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Thin brand-red reading progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#ff6b5b] via-[#c62828] to-[#8b1e1e]"
    />
  );
}

/** "Added to cart" confirmation */
export function CartToast() {
  const { lastAdded, dismissLastAdded, cartItemCount } = useCart();

  useEffect(() => {
    if (!lastAdded) return undefined;
    const id = window.setTimeout(dismissLastAdded, 2800);
    return () => window.clearTimeout(id);
  }, [lastAdded, dismissLastAdded]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] z-[65] flex justify-center px-4 sm:bottom-6">
      <AnimatePresence>
        {lastAdded && (
          <motion.div
            key={lastAdded.key}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1210] p-2.5 pr-3 text-white shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f1ea]">
              {lastAdded.image && (
                <img src={lastAdded.image} alt="" className="h-10 w-10 object-contain mix-blend-multiply" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="hero-copy flex items-center gap-1.5 text-[11px] font-semibold text-[#7ee2a0]">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
                Added to cart
              </span>
              <span className="hero-copy block truncate text-sm font-semibold">{lastAdded.name}</span>
            </span>
            <Link
              to="/cart"
              onClick={dismissLastAdded}
              className="hero-copy shrink-0 rounded-xl bg-[#c62828] px-3.5 py-2 text-xs font-bold transition-colors hover:bg-[#e03a3a]"
            >
              View cart ({cartItemCount})
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
