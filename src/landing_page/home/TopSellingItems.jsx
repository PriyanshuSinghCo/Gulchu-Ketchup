import React, { useMemo, useState } from "react";
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
    image: "/TomatoKetchup.png",
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
    image: "/GreenChilli.png",
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
    image: "/ContinentalSauce.png",
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
    image: "/Ketchup-gr.png",
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
    image: "/GreenChilli.png",
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
    image: "/TomatoKetchup.png",
    size: "200g",
    price: 99,
    originalPrice: 129,
    rating: 4.4,
    reviews: 445,
    tag: "Value",
    href: "/product/TomatoKetchup",
  },
];

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = value >= star;
        const half = !filled && value >= star - 0.5;
        return (
          <svg
            key={star}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${
              filled || half ? "text-[#c62828]" : "text-[#1a1210]/20"
            }`}
            fill="currentColor"
            aria-hidden
          >
            <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
          </svg>
        );
      })}
    </div>
  );
}

function ProductCard({ item }) {
  const { addToCart, items, updateQuantity } = useCart();
  const [qty, setQty] = useState(1);

  const inCart = useMemo(
    () => items.find((cartItem) => cartItem.id === item.id),
    [items, item.id]
  );

  const discount = Math.round(
    ((item.originalPrice - item.price) / item.originalPrice) * 100
  );

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
      });
    }
  };

  const bumpCart = (next) => {
    if (!inCart) return;
    updateQuantity(item.id, next);
  };

  return (
    <article className="group flex h-full flex-col border border-[#1a1210]/10 bg-white transition-colors duration-300 hover:border-[#c62828]/35">
      {/* Media */}
      <Link to={item.href} className="relative block overflow-hidden bg-[#f3eee8]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(198,40,40,0.12) 0%, transparent 65%)",
          }}
        />
        <span className="absolute left-3 top-3 z-[1] hero-copy bg-[#1a1210] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#faf7f2]">
          {item.tag}
        </span>
        {discount > 0 && (
          <span className="absolute right-3 top-3 z-[1] hero-copy text-[11px] font-semibold text-[#c62828]">
            −{discount}%
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="relative z-0 mx-auto h-48 w-auto object-contain py-8 transition-transform duration-500 group-hover:scale-[1.04] sm:h-52"
          draggable={false}
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="hero-copy text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1210]/45">
            {item.size}
          </p>
          <div className="flex items-center gap-1.5">
            <StarRating value={item.rating} />
            <span className="hero-copy text-xs text-[#1a1210]/45">
              {item.rating}
            </span>
          </div>
        </div>

        <Link to={item.href}>
          <h3 className="hero-headline text-xl leading-snug text-[#1a1210] transition-colors hover:text-[#c62828]">
            {item.name}
          </h3>
        </Link>
        <p className="hero-copy mt-1 text-xs text-[#1a1210]/45">
          {item.reviews.toLocaleString()} reviews
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="hero-brand text-2xl leading-none text-[#1a1210]">
            ₹{item.price}
          </span>
          <span className="hero-copy text-sm text-[#1a1210]/35 line-through">
            ₹{item.originalPrice}
          </span>
        </div>

        {/* Practical controls */}
        <div className="mt-auto flex items-center gap-2 pt-5">
          {inCart ? (
            <>
              <div className="flex h-11 flex-1 items-center justify-between border border-[#1a1210]/15">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => bumpCart(inCart.quantity - 1)}
                  className="hero-copy h-full px-3 text-lg text-[#1a1210] transition-colors hover:bg-[#f3eee8]"
                >
                  −
                </button>
                <span className="hero-copy text-sm font-semibold tabular-nums">
                  {inCart.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => bumpCart(inCart.quantity + 1)}
                  className="hero-copy h-full px-3 text-lg text-[#1a1210] transition-colors hover:bg-[#f3eee8]"
                >
                  +
                </button>
              </div>
              <Link
                to="/cart"
                className="hero-copy inline-flex h-11 items-center justify-center border border-[#1a1210]/15 px-4 text-xs font-semibold uppercase tracking-wider text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
              >
                Cart
              </Link>
            </>
          ) : (
            <>
              <div className="flex h-11 items-center border border-[#1a1210]/15">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="hero-copy h-full px-2.5 text-lg text-[#1a1210] transition-colors hover:bg-[#f3eee8]"
                >
                  −
                </button>
                <span className="hero-copy w-7 text-center text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="hero-copy h-full px-2.5 text-lg text-[#1a1210] transition-colors hover:bg-[#f3eee8]"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="hero-copy h-11 flex-1 rounded-md bg-[#c62828] text-xs font-semibold uppercase tracking-wider text-[#faf7f2] transition-colors hover:bg-[#9b1c1c]"
              >
                Add to cart
              </button>
            </>
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
              className="hero-copy flex h-11 w-11 items-center justify-center border border-[#1a1210]/15 text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
              aria-label="Previous products"
            >
              ←
            </button>
            <button
              ref={nextRef}
              type="button"
              className="hero-copy flex h-11 w-11 items-center justify-center border border-[#1a1210]/15 text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
              aria-label="Next products"
            >
              →
            </button>
            <Link
              to="/product"
              className="hero-copy ml-1 hidden items-center gap-2 border border-[#1a1210]/15 px-5 py-2.5 text-sm font-semibold text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828] sm:inline-flex"
            >
              View all
            </Link>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
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
            320: { slidesPerView: 1.05, spaceBetween: 14 },
            640: { slidesPerView: 2, spaceBetween: 18 },
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
          className="topselling-pagination mt-10 flex justify-center gap-2"
        />

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/product"
            className="hero-copy inline-flex border border-[#1a1210]/15 px-5 py-2.5 text-sm font-semibold text-[#1a1210]"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellingItems;
