import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const topItems = [
  {
    id: 1,
    name: "Tomato Ketchup",
    image: "/img/TomatoKetchup.webp",
    size: "500g",
    price: 99,
    originalPrice: 129,
    rating: 4.8,
    reviews: 1247,
    tag: "Best seller",
    href: "/product/TomatoKetchup",
  },
  {
    id: 2,
    name: "Green Chilli Sauce",
    image: "/img/GreenChilli.webp",
    size: "200g",
    price: 89,
    originalPrice: 119,
    rating: 4.6,
    reviews: 892,
    tag: "Spicy",
    href: "/product/GreenChilli",
  },
  {
    id: 3,
    name: "Continental Sauce",
    image: "/img/ContinentalSauce.webp",
    size: "250g",
    price: 109,
    originalPrice: 149,
    rating: 4.7,
    reviews: 1034,
    tag: "Popular",
    href: "/product",
  },
  {
    id: 4,
    name: "Classic Tomato Ketchup",
    image: "/img/Ketchup-gr.webp",
    size: "1kg",
    price: 179,
    originalPrice: 239,
    rating: 4.9,
    reviews: 2156,
    tag: "Family pack",
    href: "/product/TomatoKetchup",
  },
  {
    id: 5,
    name: "Chilli Ketchup",
    image: "/img/GreenChilli.webp",
    size: "500g",
    price: 129,
    originalPrice: 169,
    rating: 4.5,
    reviews: 678,
    tag: "New",
    href: "/product/GreenChilli",
  },
  {
    id: 6,
    name: "Premium Ketchup",
    image: "/img/TomatoKetchup.webp",
    size: "200g",
    price: 99,
    originalPrice: 129,
    rating: 4.4,
    reviews: 445,
    tag: "Value",
    href: "/product/TomatoKetchup",
  },
];

function ProductCard({ item }) {
  const { addToCart, items, updateQuantity } = useCart();

  const inCart = useMemo(
    () => items.find((cartItem) => cartItem.id === item.id),
    [items, item.id]
  );

  const savings = item.originalPrice - item.price;
  const discount = Math.round((savings / item.originalPrice) * 100);

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1a1210]/[0.07] bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1a1210]/10 hover:shadow-[0_18px_40px_-18px_rgba(90,18,18,0.35)]">
      {/* Media: multiply blend hides the white photo backgrounds */}
      <Link
        to={item.href}
        className="relative m-2 block overflow-hidden rounded-xl bg-[#f6f1ea]"
        aria-label={item.name}
      >
        <div className="flex aspect-[4/3.6] items-center justify-center p-6">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            draggable={false}
            className="h-full w-auto max-w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <span className="hero-copy absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#1a1210] shadow-sm backdrop-blur">
          {item.tag}
        </span>
        {discount > 0 && (
          <span className="hero-copy absolute right-3 top-3 rounded-full bg-[#c62828] px-2.5 py-1 text-[11px] font-bold text-white">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
        <div className="flex items-center justify-between gap-2">
          <span className="hero-copy rounded-md bg-[#f6f1ea] px-2 py-0.5 text-[11px] font-semibold text-[#1a1210]/70">
            {item.size}
          </span>
          <span
            className="hero-copy flex items-center gap-1 text-xs text-[#1a1210]/55"
            aria-label={`Rated ${item.rating} out of 5 from ${item.reviews} reviews`}
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[#f2a20c]" fill="currentColor" aria-hidden>
              <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
            </svg>
            <span className="font-semibold text-[#1a1210]">{item.rating}</span>
            <span>({item.reviews.toLocaleString("en-IN")})</span>
          </span>
        </div>

        <Link to={item.href} className="mt-2.5">
          <h3 className="hero-copy line-clamp-2 min-h-[2.75rem] text-[17px] font-bold leading-snug text-[#1a1210] transition-colors group-hover:text-[#c62828]">
            {item.name}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="hero-copy text-[22px] font-extrabold leading-none tracking-tight text-[#1a1210]">
            ₹{item.price}
          </span>
          <span className="hero-copy text-sm text-[#1a1210]/40">
            MRP <span className="line-through">₹{item.originalPrice}</span>
          </span>
        </div>
        {savings > 0 && (
          <p className="hero-copy mt-1 text-xs font-semibold text-[#1b7a3e]">
            You save ₹{savings}
          </p>
        )}

        <div className="mt-auto pt-4">
          {inCart ? (
            <div className="flex h-11 items-center justify-between overflow-hidden rounded-xl bg-[#c62828] text-white">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                className="flex h-full w-12 items-center justify-center text-xl font-semibold transition-colors hover:bg-black/10"
              >
                −
              </button>
              <Link
                to="/cart"
                className="hero-copy text-sm font-bold tabular-nums"
                aria-label={`${inCart.quantity} in cart, view cart`}
              >
                {inCart.quantity} in cart
              </Link>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                className="flex h-full w-12 items-center justify-center text-xl font-semibold transition-colors hover:bg-black/10"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="hero-copy flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#c62828] text-sm font-bold text-[#c62828] transition-colors hover:bg-[#c62828] hover:text-white active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 11.2a1.5 1.5 0 001.5 1.2h8.7a1.5 1.5 0 001.5-1.1L21 8H6.2M9 20.5h.01M17 20.5h.01" />
              </svg>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

const TopSellingItems = () => {
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const paginationRef = React.useRef(null);

  return (
    <section className="topselling relative overflow-hidden bg-[#faf7f2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-xl">
            <p className="hero-copy text-xs font-semibold uppercase tracking-[0.28em] text-[#c62828]">
              Bestsellers
            </p>
            <h2 className="hero-headline mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-[#1a1210]">
              Top selling items
            </h2>
            <p className="hero-copy mt-3 text-base text-[#1a1210]/60">
              Most-loved Gulchu sauces—ready to add with size, price, and quantity at a glance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              type="button"
              className="hero-copy flex h-11 w-11 items-center justify-center rounded-full border border-[#1a1210]/15 bg-white text-[#1a1210] transition-colors hover:border-[#c62828] hover:bg-[#c62828] hover:text-white disabled:opacity-40"
              aria-label="Previous products"
            >
              ←
            </button>
            <button
              ref={nextRef}
              type="button"
              className="hero-copy flex h-11 w-11 items-center justify-center rounded-full border border-[#1a1210]/15 bg-white text-[#1a1210] transition-colors hover:border-[#c62828] hover:bg-[#c62828] hover:text-white disabled:opacity-40"
              aria-label="Next products"
            >
              →
            </button>
            <Link
              to="/product"
              className="hero-copy ml-1 hidden h-11 items-center gap-2 rounded-full bg-[#1a1210] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#c62828] sm:inline-flex"
            >
              View all
            </Link>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          className="!-mx-2 !px-2 !pb-8 !pt-2"
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true, el: paginationRef.current }}
          breakpoints={{
            320: { slidesPerView: 1.25, spaceBetween: 14 },
            520: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 22 },
          }}
        >
          {topItems.map((item, index) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.45 }}
                className="h-full"
              >
                <ProductCard item={item} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          ref={paginationRef}
          className="topselling-pagination mt-4 flex justify-center gap-2"
        />

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/product"
            className="hero-copy inline-flex h-11 items-center rounded-full bg-[#1a1210] px-6 text-sm font-semibold text-white"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellingItems;
