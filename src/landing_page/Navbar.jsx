import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import {
  FiBriefcase,
  FiUser,
  FiUsers,
  FiPlayCircle,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ProductCategoryBar from "./ProductCategoryBar";

function ProductThumb({ src, accent = "#c62828", active = false, className = "h-12 w-12" }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-[box-shadow,transform] duration-300 ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 50% 15%, #ffffff 0%, ${accent}14 55%, ${accent}2e 100%)`,
        boxShadow: active
          ? `inset 0 0 0 1.5px ${accent}55, 0 6px 14px -6px ${accent}80`
          : `inset 0 0 0 1px ${accent}1f`,
      }}
    >
      <span
        className="absolute bottom-[14%] h-[10%] w-[45%] rounded-full blur-[3px]"
        style={{ backgroundColor: `${accent}40` }}
        aria-hidden
      />
      <img
        src={src}
        alt=""
        className={`relative h-[86%] w-[86%] object-contain mix-blend-multiply transition-transform duration-300 ease-out ${
          active ? "-translate-y-0.5 -rotate-6 scale-110" : ""
        }`}
        loading="lazy"
        draggable={false}
      />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" aria-hidden />
    </span>
  );
}

function AboutMega({ items }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex">
      <NavLink
        to="/about"
        className="group/feat relative m-2 mr-0 hidden w-[210px] shrink-0 flex-col overflow-hidden rounded-xl bg-[linear-gradient(160deg,#a32424_0%,#8b1e1e_45%,#4a0f0f_100%)] p-5 text-white lg:flex"
      >
        <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/15" aria-hidden />
        <span className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/10" aria-hidden />
        <span className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#f5b301]/20 blur-2xl" aria-hidden />

        <img
          src="/img/logo.webp"
          alt=""
          className="relative h-11 w-11 rounded-full object-cover ring-2 ring-white/30"
          draggable={false}
        />
        <p className="relative mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
          Kaushik Agro Food
        </p>
        <p className="relative mt-1.5 text-lg font-bold leading-snug">
          The makers of Gulchu.
        </p>
        <p className="relative mt-2 text-xs leading-relaxed text-white/70">
          Sauces, chutneys and pickles crafted in Itkhori, Chatra since 2023.
        </p>

        <span className="relative mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#8b1e1e] shadow-sm transition-transform duration-300 group-hover/feat:scale-105">
          Our story
          <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/feat:translate-x-0.5" />
        </span>
      </NavLink>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a1210]/45">
            About Gulchu
          </p>
          <NavLink
            to="/about"
            className="group/all inline-flex items-center gap-1 rounded-full bg-[#c62828]/8 px-3 py-1.5 text-xs font-bold text-[#c62828] transition-colors hover:bg-[#c62828] hover:text-white"
          >
            Overview
            <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5" />
          </NavLink>
        </div>

        <div className="flex flex-col gap-0.5 px-3 pb-3" onMouseLeave={() => setHovered(null)}>
          {items.map((sublink, index) => {
            const Icon = sublink.Icon;
            return (
              <div
                key={sublink.path}
                className="translate-y-1.5 opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionDelay: `${60 + index * 40}ms` }}
              >
                <NavLink
                  to={sublink.path}
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  className="group/item relative flex items-center gap-3.5 rounded-xl px-2.5 py-2.5"
                >
                  {({ isActive }) => (
                    <>
                      {(hovered === index || (hovered === null && isActive)) && (
                        <motion.span
                          layoutId="about-mega-highlight"
                          className="absolute inset-0 rounded-xl bg-[#faf7f2] ring-1 ring-[#1a1210]/6"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          aria-hidden
                        />
                      )}
                      <span
                        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                          hovered === index || isActive
                            ? "bg-[#c62828] text-white shadow-[0_6px_14px_-6px_rgba(198,40,40,0.7)]"
                            : "bg-[#c62828]/8 text-[#c62828]"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span
                          className={`block text-sm font-semibold leading-snug transition-colors ${
                            isActive ? "text-[#c62828]" : "text-[#1a1210]"
                          }`}
                        >
                          {sublink.label}
                        </span>
                        <span className="block truncate text-xs text-[#1a1210]/50">{sublink.desc}</span>
                      </span>
                      <FiArrowUpRight
                        className={`relative h-4 w-4 shrink-0 text-[#c62828] transition duration-200 ${
                          hovered === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductsMega({ items }) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="flex">
      <motion.div
        initial={false}
        animate={{ backgroundColor: item.accent }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative m-2 mr-0 hidden w-[236px] shrink-0 overflow-hidden rounded-xl text-white lg:block"
      >
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.18)_0%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.45)_100%)]" aria-hidden />
        <motion.span
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/15 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <span className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-white/15" aria-hidden />
        <span className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-white/10" aria-hidden />

        <NavLink to={item.path} className="group/feat relative flex h-full min-h-[330px] flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ring-1 ring-white/25 backdrop-blur-sm">
              {item.desc}
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-white/60">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-4"
            >
              <p className="text-xl font-bold leading-tight">{item.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75">{item.blurb}</p>
            </motion.div>
          </AnimatePresence>

          <div className="relative mt-5 flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_18px_30px_-14px_rgba(0,0,0,0.55)] ring-1 ring-white/40">
            <motion.span
              initial={false}
              animate={{ backgroundColor: `${item.accent}22` }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
              aria-hidden
            />
            <motion.span
              initial={false}
              animate={{ backgroundColor: `${item.accent}55` }}
              className="absolute bottom-3 h-3 w-20 rounded-full blur-[5px]"
              aria-hidden
            />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={active}
                src={item.image}
                alt=""
                initial={{ opacity: 0, y: 30, rotate: -10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, rotate: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative h-40 w-auto object-contain mix-blend-multiply"
                draggable={false}
              />
            </AnimatePresence>
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent" aria-hidden />
          </div>

          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#1a1210] shadow-sm transition-transform duration-300 group-hover/feat:scale-105">
            Shop now
            <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/feat:translate-x-0.5" />
          </span>
        </NavLink>
      </motion.div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a1210]/45">
              Shop by product
            </p>
            <p className="mt-0.5 text-xs text-[#1a1210]/50">
              {items.length} sauces, chutneys &amp; pickles
            </p>
          </div>
          <NavLink
            to="/product"
            className="group/all inline-flex items-center gap-1 rounded-full bg-[#c62828]/8 px-3 py-1.5 text-xs font-bold text-[#c62828] transition-colors hover:bg-[#c62828] hover:text-white"
          >
            View all
            <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5" />
          </NavLink>
        </div>

        <div className="grid grid-cols-2 gap-1 px-3 pb-3">
          {items.map((sublink, index) => (
            <div
              key={sublink.path}
              className="translate-y-1.5 opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
              style={{ transitionDelay: `${60 + index * 25}ms` }}
            >
              <NavLink
                to={sublink.path}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group/item relative flex items-center gap-3 rounded-xl px-2 py-1.5"
              >
                {active === index && (
                  <motion.span
                    layoutId="products-mega-highlight"
                    className="absolute inset-0 rounded-xl bg-[#faf7f2] ring-1 ring-[#1a1210]/6"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden
                  />
                )}
                <ProductThumb src={sublink.image} accent={sublink.accent} active={active === index} />

                <span className="relative min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold leading-snug transition-colors ${
                      active === index ? "text-[#c62828]" : "text-[#1a1210]"
                    }`}
                  >
                    {sublink.label}
                  </span>
                  <span className="block truncate text-[11px] font-medium text-[#1a1210]/45">
                    {sublink.desc}
                  </span>
                </span>
                <FiArrowUpRight
                  className={`relative h-4 w-4 shrink-0 text-[#c62828] transition duration-200 ${
                    active === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                  }`}
                />
              </NavLink>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-[#1a1210]/6 bg-[#faf7f2] px-5 py-2.5 text-[11px] font-semibold text-[#1a1210]/55">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          100% vegetarian
          <span className="text-[#1a1210]/20">•</span>
          Made in Jharkhand
          <span className="text-[#1a1210]/20">•</span>
          Order on WhatsApp
        </div>
      </div>
    </div>
  );
}

function CartBadge({ count }) {
  if (count <= 0) return null;
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 520, damping: 14 }}
      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#8b1e1e]"
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}

const navLinks = [
  { path: "/home", label: "Home" },
  {
    path: "/product",
    label: "Products",
    mega: true,
    submenu: [
      { label: "Tomato Ketchup", path: "/product/TomatoKetchup", image: "/img/TomatoKetchup.webp", desc: "Bestseller", accent: "#b3261e", blurb: "Thick, tangy and made from ripe tomatoes." },
      { label: "Red Chilli Sauce", path: "/product/RedChilliSauce", image: "/img/Ketchup-gr.webp", desc: "Hot & tangy", accent: "#8f1a1a", blurb: "A bold kick for rolls, noodles and snacks." },
      { label: "Chilli Sauce (Spicy)", path: "/product/GreenChilli", image: "/img/GreenChilli.webp", desc: "Extra spicy", accent: "#2f6b2a", blurb: "Fiery green chilli heat in every drop." },
      { label: "Schezwan Chutney", path: "/product/SchezwanChutney", image: "/img/GreenChilli.webp", desc: "Indo-Chinese", accent: "#a5361c", blurb: "Garlicky, spicy and made for fried rice." },
      { label: "Pizza & Pasta Sauce", path: "/product/PizzaPastaSauce", image: "/img/ContinentalSauce.webp", desc: "Italian style", accent: "#b4442a", blurb: "Herby tomato base for pizza and pasta." },
      { label: "Garlic Paste", path: "/product/GarlicPaste", image: "/img/ContinentalSauce.webp", desc: "Kitchen staple", accent: "#8a6a2f", blurb: "Ready-to-use garlic for everyday cooking." },
      { label: "Pickles (Achar)", path: "/product/Pickles(Achar)", image: "/img/Ketchup-gr.webp", desc: "Homestyle", accent: "#7a4a12", blurb: "Traditional achar with a homemade taste." },
      { label: "Veg Mayonnaise", path: "/product/VegMayonnaise", image: "/img/ContinentalSauce.webp", desc: "Creamy & eggless", accent: "#9a7b3c", blurb: "Smooth and creamy for burgers and sandwiches." },
      { label: "Momos Chutney", path: "/product/MomosChutney", image: "/img/GreenChilli.webp", desc: "Street style", accent: "#b23a1f", blurb: "That street-side red chutney, in a bottle." },
      { label: "Soya Sauce", path: "/product/SoyaSauce", image: "/img/ContinentalSauce.webp", desc: "Umami rich", accent: "#3b2418", blurb: "Dark, savoury depth for stir-fries." },
    ],
  },
  { path: "/recipe", label: "Recipes" },
  {
    path: "/about",
    label: "About",
    aboutMega: true,
    submenu: [
      {
        label: "Company",
        path: "/about/company",
        desc: "Our story & roots in Chatra",
        Icon: FiBriefcase,
      },
      {
        label: "Director",
        path: "/about/director",
        desc: "Vision from the founder",
        Icon: FiUser,
      },
      {
        label: "Management Team",
        path: "/about/ManagementTeam",
        desc: "People behind Gulchu",
        Icon: FiUsers,
      },
      {
        label: "Videos",
        path: "/about/video",
        desc: "Watch our journey",
        Icon: FiPlayCircle,
      },
    ],
  },
  { path: "/contact", label: "Contact" },
];

const navLinkStyles = ({ isActive }) =>
  isActive
    ? "text-base leading-6 font-semibold text-white border-b-2 border-white pb-0.5"
    : "text-base leading-6 font-medium text-white/80 hover:text-white";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { cartItemCount } = useCart();
  const location = useLocation();
  const isHome =
    location.pathname === "/" || location.pathname === "/home";

  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenSubMenu(null);
  }, [location.pathname]);

  return (
    <header
      className={`nav-font sticky top-0 z-50 w-full max-w-full min-w-0 overflow-x-clip transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-12px_rgba(26,10,12,0.55)]" : ""
      }`}
    >
      {/* Main nav */}
      <nav className="w-full max-w-full bg-[#8b1e1e]">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
          <NavLink to="/" aria-label="Home" className="flex items-center gap-2.5">
            <img
              src="/img/logo.webp"
              alt="Gulchu"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white/25"
            />
            <span className="hero-brand hidden text-2xl leading-none tracking-wide text-white sm:block">
              Gulchu
            </span>
          </NavLink>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link, index) => (
              <div key={index} className="group relative">
                <NavLink
                  to={link.path}
                  className={navLinkStyles}
                  aria-haspopup={!!link.submenu}
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>

                {link.submenu && (
                  <div
                    className={`invisible absolute top-full z-50 mt-4 hidden origin-top scale-95 opacity-0 transition duration-200 md:block group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
                      link.mega
                        ? "left-1/2 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 lg:w-[740px]"
                        : link.aboutMega
                          ? "right-0 w-[min(420px,calc(100vw-2rem))] lg:w-[600px]"
                          : "left-0 min-w-[200px]"
                    }`}
                  >
                    <div className="absolute -top-4 left-0 right-0 h-4" aria-hidden />

                    <div className="overflow-hidden rounded-2xl border border-[#1a1210]/8 bg-white shadow-[0_24px_60px_-20px_rgba(26,10,12,0.45)]">
                      {link.mega && <ProductsMega items={link.submenu} />}

                      {link.aboutMega && <AboutMega items={link.submenu} />}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <NavLink to="/cart" className="relative" aria-label="Cart">
              <div className="text-white transition-colors hover:text-white/80">
                <FiShoppingCart className="h-5 w-5" />
                <CartBadge count={cartItemCount} />
              </div>
            </NavLink>
          </div>

          <div className="flex items-center md:hidden">
            <NavLink to="/cart" className="relative mr-2" aria-label="Cart">
              <div className="text-white">
                <FiShoppingCart className="h-6 w-6" />
                <CartBadge count={cartItemCount} />
              </div>
            </NavLink>

            <button
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setOpenSubMenu(null);
              }}
              className="rounded-md p-2 text-white hover:bg-white/10 focus:outline-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Product strip — same width/color family, flush under nav */}
      {isHome && <ProductCategoryBar />}

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => {
              setMobileOpen(false);
              setOpenSubMenu(null);
            }}
          />
          <div className="absolute left-3 right-3 top-[4.25rem] z-50 flex max-h-[min(78vh,640px)] flex-col gap-1 overflow-y-auto overscroll-contain rounded-xl border border-[#1a1210]/8 bg-white px-2 py-3 shadow-lg md:hidden">
            {navLinks.map((link, index) => (
              <div key={index} className="border-b border-[#1a1210]/6 last:border-0">
                <div className="flex items-center justify-between gap-2 px-1 py-1">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `min-h-11 flex-1 rounded-md px-3 py-3 text-base font-bold ${
                        isActive ? "text-[#c62828]" : "text-[#1a1210]"
                      }`
                    }
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenSubMenu(null);
                    }}
                  >
                    {link.label}
                  </NavLink>
                  {link.submenu && (
                    <button
                      onClick={() =>
                        setOpenSubMenu(openSubMenu === index ? null : index)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-xl font-bold hover:bg-gray-100 focus:outline-none"
                      aria-label="Toggle submenu"
                    >
                      {openSubMenu === index ? "−" : "+"}
                    </button>
                  )}
                </div>

                {link.submenu && openSubMenu === index && (
                  <div
                    className={`mb-2 grid gap-2 px-1 ${
                      link.aboutMega ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                    }`}
                  >
                    {link.submenu.map((sublink, subIndex) => {
                      const Icon = sublink.Icon;
                      return (
                        <NavLink
                          key={subIndex}
                          to={sublink.path}
                          className="flex min-h-12 items-center gap-3 rounded-md bg-[#faf7f2] px-3 py-3 text-left text-sm font-semibold text-[#1a1210] active:bg-[#c62828]/10"
                          onClick={() => {
                            setMobileOpen(false);
                            setOpenSubMenu(null);
                          }}
                        >
                          {Icon ? (
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#c62828] ring-1 ring-[#1a1210]/8">
                              <Icon className="h-5 w-5" />
                            </span>
                          ) : (
                            sublink.image && (
                              <ProductThumb src={sublink.image} accent={sublink.accent} className="h-11 w-11" />
                            )
                          )}
                          <span className="min-w-0">
                            <span className="block leading-snug">{sublink.label}</span>
                            {sublink.desc && (
                              <span className="mt-0.5 block text-xs font-medium text-[#1a1210]/50">
                                {sublink.desc}
                              </span>
                            )}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
