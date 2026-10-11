import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiMapPin,
  FiMinus,
  FiPackage,
  FiPlus,
  FiShield,
  FiShoppingCart,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { sendToWhatsApp } from "../../utils/whatsapp";
import { productDetails, getProductDetail } from "../../data/productDetails";

const TABS = [
  { id: "details", label: "Details" },
  { id: "serving", label: "Serving ideas" },
  { id: "storage", label: "Storage & care" },
];

const TRUST = [
  { Icon: FiShield, label: "100% Vegetarian" },
  { Icon: FiMapPin, label: "Made in Jharkhand" },
  { Icon: FiPackage, label: "Hygienically packed" },
];

function sizeInGrams(size) {
  const match = size.match(/([\d.]+)\s*(kg|g|ml|l)\b/i);
  if (!match) return null;
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  return unit === "kg" || unit === "l" ? value * 1000 : value;
}

function unitLabel(size) {
  return /ml|\bl\b/i.test(size) ? "100ml" : "100g";
}

function unitPrice(variant) {
  const grams = sizeInGrams(variant.size);
  return grams ? (variant.price / grams) * 100 : null;
}

function cartId(product, variant) {
  return `${product.id}-${variant.size.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function ProductStage({ product, variant, scale }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const shiftX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 15 });
  const shiftY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });
  const tilt = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 15 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center overflow-hidden rounded-[28px]"
      style={{
        background: `radial-gradient(90% 80% at 50% 35%, #ffffff 0%, ${product.accent}12 55%, ${product.accent}30 100%)`,
        boxShadow: `inset 0 0 0 1px ${product.accent}1f`,
      }}
    >
      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: `${product.accent}26` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <span
          className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: product.accent }}
        />
      </motion.span>
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        style={{ borderColor: `${product.accent}1a` }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: `${product.accent}22` }}
        aria-hidden
      />
      <motion.span
        animate={{ scaleX: scale }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-none absolute bottom-[12%] h-5 w-[34%] rounded-full blur-md"
        style={{ backgroundColor: `${product.accent}45` }}
        aria-hidden
      />

      <motion.div style={{ x: shiftX, y: shiftY, rotate: tilt }} className="relative flex h-[82%] w-full items-center justify-center mix-blend-multiply">
        <motion.img
          key={product.id}
          src={product.image}
          alt={`Gulchu ${product.name} ${variant.size}`}
          initial={{ opacity: 0, y: 40, rotate: -8 }}
          animate={{ opacity: 1, y: [0, -8, 0], rotate: 0, scale }}
          transition={{
            opacity: { duration: 0.4 },
            rotate: { type: "spring", stiffness: 120, damping: 14 },
            scale: { type: "spring", stiffness: 220, damping: 18 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="h-full w-auto max-w-[80%] object-contain"
          draggable={false}
        />
      </motion.div>

      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-bold text-[#1a1210] shadow-sm backdrop-blur sm:left-5 sm:top-5">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border-[1.5px] border-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        </span>
        Pure veg
      </span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={variant.size}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="absolute bottom-4 right-4 rounded-2xl px-3.5 py-2 text-right text-white shadow-lg sm:bottom-5 sm:right-5"
          style={{ backgroundColor: product.accent }}
        >
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">Pack</span>
          <span className="block text-lg font-extrabold leading-none">{variant.size}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function RelatedCard({ product, index }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={product.path}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1a1210]/8 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(26,10,12,0.35)]"
      >
        <div
          className="relative flex aspect-[4/3.4] items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(90% 80% at 50% 30%, #ffffff 0%, ${product.accent}14 60%, ${product.accent}2b 100%)`,
          }}
        >
          <img
            src={product.image}
            alt={`Gulchu ${product.name}`}
            className="h-[80%] w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
            loading="lazy"
            draggable={false}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1210]/70 backdrop-blur">
            {product.category}
          </span>
        </div>
        <div className="flex flex-1 items-end justify-between gap-2 p-3.5 sm:p-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#1a1210] sm:text-base">{product.name}</p>
            <p className="mt-0.5 text-xs text-[#1a1210]/55">from ₹{minPrice}</p>
          </div>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ backgroundColor: product.accent }}
          >
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ProductDetail({ id }) {
  const product = getProductDetail(id);
  const { items, addToCart, updateQuantity } = useCart();
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [tab, setTab] = useState("details");

  const variant = product.variants[variantIndex];
  const itemId = cartId(product, variant);
  const inCart = items.find((item) => item.id === itemId);

  const bestValueIndex = useMemo(() => {
    if (product.variants.length < 2) return -1;
    let best = -1;
    let bestPrice = Infinity;
    product.variants.forEach((v, i) => {
      const p = unitPrice(v);
      if (p !== null && p < bestPrice) {
        bestPrice = p;
        best = i;
      }
    });
    return best;
  }, [product]);

  const imageScale = useMemo(() => {
    const grams = product.variants.map((v) => sizeInGrams(v.size) || 0);
    const max = Math.max(...grams);
    const min = Math.min(...grams);
    const current = grams[variantIndex];
    if (max === min) return 1;
    return 0.82 + ((current - min) / (max - min)) * 0.18;
  }, [product, variantIndex]);

  const related = useMemo(() => {
    const start = productDetails.findIndex((p) => p.id === product.id);
    return [1, 2, 3, 4].map((offset) => productDetails[(start + offset) % productDetails.length]);
  }, [product]);

  useEffect(() => {
    setVariantIndex(0);
    setQty(1);
    setTab("details");
  }, [id]);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const perUnit = unitPrice(variant);

  const handleAdd = () => {
    if (inCart) {
      updateQuantity(itemId, inCart.quantity + qty);
    } else {
      addToCart({
        id: itemId,
        name: `${product.name} - ${variant.size}`,
        image: product.image,
        price: variant.price,
        size: variant.size,
      });
      if (qty > 1) updateQuantity(itemId, qty);
    }
    setJustAdded(true);
  };

  const handleWhatsApp = () => {
    sendToWhatsApp(
      [
        "Hi Gulchu! I'd like to order:",
        "",
        `*${product.name}* — ${variant.size} × ${qty}`,
        `Price: ₹${variant.price * qty}`,
      ].join("\n")
    );
  };

  const accent = product.accent;

  return (
    <div className="w-full max-w-full min-w-0 bg-[#faf7f2]">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ backgroundColor: `${accent}14` }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs font-medium text-[#1a1210]/50 sm:mb-6 sm:text-sm">
            <Link to="/home" className="hover:text-[#1a1210]">Home</Link>
            <FiChevronRight className="h-3.5 w-3.5" />
            <Link to="/product" className="hover:text-[#1a1210]">Products</Link>
            <FiChevronRight className="h-3.5 w-3.5" />
            <span className="truncate font-semibold text-[#1a1210]">{product.name}</span>
          </nav>

          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24"
            >
              <ProductStage product={product} variant={variant} scale={imageScale} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ backgroundColor: `${accent}14`, color: accent }}
                >
                  {product.category}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#1a1210]/60 ring-1 ring-[#1a1210]/8">
                  {product.variants.length} {product.variants.length === 1 ? "size" : "sizes"} available
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-extrabold leading-[1.1] tracking-tight text-[#1a1210] sm:text-4xl">
                Gulchu <span style={{ color: accent }}>{product.name}</span>
              </h1>
              <p className="mt-2 text-sm font-medium text-[#1a1210]/60 sm:text-base">{product.tagline}</p>

              <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={variant.price}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="text-3xl font-extrabold tracking-tight text-[#1a1210] sm:text-4xl"
                  >
                    ₹{variant.price}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-1.5 text-sm font-medium text-[#1a1210]/50">/ {variant.size}</span>
                {perUnit !== null && (
                  <span className="mb-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#1a1210]/60 ring-1 ring-[#1a1210]/8">
                    ₹{perUnit.toFixed(perUnit < 10 ? 1 : 0)} per {unitLabel(variant.size)}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a1210]/50">Choose pack size</p>
                  <p className="text-xs font-semibold text-[#1a1210]/50">Selected: {variant.size}</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {product.variants.map((v, index) => {
                    const selected = index === variantIndex;
                    return (
                      <button
                        key={v.size}
                        type="button"
                        onClick={() => setVariantIndex(index)}
                        aria-pressed={selected}
                        className={`relative rounded-2xl border bg-white px-3 py-3 text-left transition-colors duration-200 ${
                          selected ? "border-transparent" : "border-[#1a1210]/10 hover:border-[#1a1210]/25"
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId={`size-ring-${product.id}`}
                            className="absolute inset-0 rounded-2xl border-2"
                            style={{ borderColor: accent, backgroundColor: `${accent}0d` }}
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                            aria-hidden
                          />
                        )}
                        {index === bestValueIndex && (
                          <span
                            className="absolute -top-2 right-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: accent }}
                          >
                            Best value
                          </span>
                        )}
                        <span className="relative block truncate text-sm font-bold text-[#1a1210]">{v.size}</span>
                        <span className="relative mt-0.5 block text-xs font-semibold text-[#1a1210]/55">₹{v.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <div className="flex h-11 items-center justify-between rounded-full bg-white px-1.5 ring-1 ring-[#1a1210]/10 sm:w-36">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1210] transition hover:bg-[#faf7f2] disabled:opacity-35"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={qty}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="w-8 text-center text-base font-bold tabular-nums text-[#1a1210]"
                    >
                      {qty}
                    </motion.span>
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1210] transition hover:bg-[#faf7f2]"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>

                <motion.button
                  type="button"
                  onClick={handleAdd}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex h-11 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(26,10,12,0.6)] transition-[filter] hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {justAdded ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="flex items-center gap-2"
                      >
                        <FiCheck className="h-4 w-4" /> Added to cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="flex items-center gap-2"
                      >
                        <FiShoppingCart className="h-4 w-4" /> Add to cart · ₹{variant.price * qty}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#1a1210]/12 bg-white text-sm font-bold text-[#1a1210] transition hover:border-emerald-600/40 hover:text-emerald-700"
              >
                <FaWhatsapp className="h-5 w-5 text-emerald-600" />
                Order on WhatsApp
              </button>

              <AnimatePresence initial={false}>
                {inCart && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-center text-sm text-[#1a1210]/60">
                      {inCart.quantity} × {variant.size} in your cart ·{" "}
                      <Link to="/cart" className="font-bold underline-offset-2 hover:underline" style={{ color: accent }}>
                        View cart
                      </Link>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 grid grid-cols-3 gap-2 border-y border-[#1a1210]/8 py-4">
                {TRUST.map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:text-left">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${accent}12`, color: accent }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-semibold leading-tight text-[#1a1210]/70 sm:text-xs">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a1210]/50">Perfect with</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.pairings.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                      className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1a1210]/75 ring-1 ring-[#1a1210]/8"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="rounded-3xl border border-[#1a1210]/8 bg-white p-2 sm:p-3">
          <div role="tablist" className="flex gap-1 overflow-x-auto rounded-2xl bg-[#faf7f2] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                  tab === t.id ? "text-[#1a1210]" : "text-[#1a1210]/50 hover:text-[#1a1210]/80"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="product-tab-pill"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-[#1a1210]/6"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="px-3 py-6 sm:px-6 sm:py-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {tab === "details" && (
                  <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
                    <p className="text-[15px] leading-relaxed text-[#1a1210]/75 sm:text-base">{product.description}</p>
                    <dl className="divide-y divide-[#1a1210]/8 rounded-2xl bg-[#faf7f2] px-5 py-2 text-sm">
                      {[
                        ["Brand", "Gulchu"],
                        ["Category", product.category],
                        ["Pack sizes", product.variants.map((v) => v.size).join(", ")],
                        ["Made by", "Kaushik Agro Food, Itkhori, Chatra"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4 py-2.5">
                          <dt className="text-[#1a1210]/50">{label}</dt>
                          <dd className="text-right font-semibold text-[#1a1210]">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {tab === "serving" && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {product.pairings.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: `${accent}0d` }}
                      >
                        <span className="text-xs font-bold tabular-nums" style={{ color: accent }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-2 text-sm font-bold text-[#1a1210]">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {tab === "storage" && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#faf7f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1a1210]/50">Storage</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#1a1210]/75">{product.storage}</p>
                    </div>
                    <div className="rounded-2xl bg-[#faf7f2] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1a1210]/50">Shelf life</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#1a1210]/75">
                        {product.shelfLife || "Please refer to the best-before date printed on the pack."}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c62828]">More from Gulchu</p>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#1a1210] sm:text-3xl">You may also like</h2>
          </div>
          <Link
            to="/product"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1a1210] px-4 py-2 text-xs font-bold text-white transition hover:bg-black sm:text-sm"
          >
            View all
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {related.map((item, index) => (
            <RelatedCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
