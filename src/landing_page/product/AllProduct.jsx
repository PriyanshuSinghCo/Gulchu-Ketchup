import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

const productData = [
  {
    name: "Tomato Ketchup",
    image: "/img/TomatoKetchup.webp",
    path: "/product/TomatoKetchup",
    category: "Sauces",
    variants: ["1kg", "500g", "200g"],
    price: 99,
    description:
      "Farm-fresh Chatra tomatoes with tangy-sweet balance—ideal for snacks, burgers, and fries.",
  },
  {
    name: "Red Chilli Sauce",
    image: "/img/Ketchup-gr.webp",
    path: "/product/RedChilliSauce",
    category: "Sauces",
    variants: ["1kg", "500g", "200g"],
    price: 89,
    description:
      "A fiery blend of real red chillies with bold spices for Indo-Chinese dishes and marinades.",
  },
  {
    name: "Green Chilli Sauce (Spicy)",
    image: "/img/GreenChilli.webp",
    path: "/product/GreenChilli",
    category: "Sauces",
    variants: ["1kg", "700g", "500g", "200g"],
    price: 89,
    description:
      "Spicy and zesty—handpicked green chillies that add a punch to everyday meals.",
  },
  {
    name: "Schezwan Chutney",
    image: "/img/GreenChilli.webp",
    path: "/product/SchezwanChutney",
    category: "Condiments",
    variants: ["1kg", "300g"],
    price: 109,
    description:
      "Bold Indo-Chinese fusion with garlic and chillies—dip, spread, or stir-fry base.",
  },
  {
    name: "Pizza & Pasta Sauce",
    image: "/img/ContinentalSauce.webp",
    path: "/product/PizzaPastaSauce",
    category: "Sauces",
    variants: ["1kg", "500g"],
    price: 109,
    description:
      "Italian-style tomato sauce with herbs—ready to lift pizzas and pastas instantly.",
  },
  {
    name: "Garlic Paste",
    image: "/img/ContinentalSauce.webp",
    path: "/product/GarlicPaste",
    category: "Pastes",
    variants: ["1kg", "500g", "200g"],
    price: 79,
    description:
      "Freshly ground garlic paste, hygienically packed for everyday Indian cooking.",
  },
  {
    name: "Pickles (Achar)",
    image: "/img/Ketchup-gr.webp",
    path: "/product/Pickles(Achar)",
    category: "Pickles",
    variants: ["200g", "400g", "1kg", "5kg"],
    price: 45,
    description:
      "Traditional pickles with age-old recipes—mango, mixed, and green chilli.",
  },
  {
    name: "Veg Mayonnaise",
    image: "/img/ContinentalSauce.webp",
    path: "/product/VegMayonnaise",
    category: "Condiments",
    variants: ["250g", "400g", "900g"],
    price: 99,
    description:
      "Creamy mayo for sandwiches, burgers, wraps, and dips.",
  },
  {
    name: "Momos Chutney",
    image: "/img/GreenChilli.webp",
    path: "/product/MomosChutney",
    category: "Condiments",
    variants: ["300g", "700g"],
    price: 79,
    description:
      "Spicy chutney made for steamed or fried momos—a favourite among spice lovers.",
  },
  {
    name: "Soya Sauce",
    image: "/img/ContinentalSauce.webp",
    path: "/product/SoyaSauce",
    category: "Sauces",
    variants: ["700ml"],
    price: 69,
    description:
      "Rich soy sauce for stir-frying, marinating, and Asian-style cooking.",
  },
];

const categories = ["All", "Sauces", "Pastes", "Pickles", "Condiments"];

const priceRanges = [
  { id: "all", label: "All prices", min: 0, max: Infinity },
  { id: "under-80", label: "Under ₹80", min: 0, max: 79 },
  { id: "80-99", label: "₹80 – ₹99", min: 80, max: 99 },
  { id: "100-plus", label: "₹100+", min: 100, max: Infinity },
];

function ProductCard({ product, index }) {
  const { addToCart, items, updateQuantity } = useCart();
  const productId = product.name.toLowerCase().replace(/\s+/g, "-");
  const inCart = items.find((item) => item.id === productId);
  const extraSizes = product.variants.length - 2;

  const handleAdd = () => {
    addToCart({
      id: productId,
      name: product.name,
      image: product.image,
      price: product.price,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1a1210]/[0.07] bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1a1210]/10 hover:shadow-[0_18px_40px_-18px_rgba(90,18,18,0.35)]">
      {/* Media */}
      <Link
        to={product.path}
        className="relative m-1.5 block overflow-hidden rounded-xl bg-[#f6f1ea] sm:m-2"
        aria-label={product.name}
      >
        <div className="flex aspect-square items-center justify-center p-5 sm:aspect-[4/3.6] sm:p-6">
          <img
            src={product.image}
            alt={`Gulchu ${product.name}`}
            loading="lazy"
            draggable={false}
            className="h-full w-auto max-w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <span className="hero-copy absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#1a1210] shadow-sm sm:left-3 sm:top-3 sm:text-[11px]">
          {product.category}
        </span>

        <span className="hero-copy absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center rounded-full bg-[#1a1210]/85 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          View details →
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-1.5 sm:px-5 sm:pb-5 sm:pt-2">
        <div className="flex flex-wrap gap-1">
          {product.variants.slice(0, 2).map((size) => (
            <span
              key={size}
              className="hero-copy rounded-md bg-[#f6f1ea] px-1.5 py-0.5 text-[10px] font-semibold text-[#1a1210]/70 sm:px-2 sm:text-[11px]"
            >
              {size}
            </span>
          ))}
          {extraSizes > 0 && (
            <span className="hero-copy rounded-md px-1 py-0.5 text-[10px] font-semibold text-[#1a1210]/45 sm:text-[11px]">
              +{extraSizes} more
            </span>
          )}
        </div>

        <Link to={product.path} className="mt-2">
          <h2 className="hero-copy line-clamp-2 min-h-[2.5rem] text-[15px] font-bold leading-snug text-[#1a1210] transition-colors group-hover:text-[#c62828] sm:min-h-[2.75rem] sm:text-[17px]">
            {product.name}
          </h2>
        </Link>
        <p className="hero-copy mt-1.5 hidden text-sm leading-relaxed text-[#1a1210]/55 sm:line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="hero-copy text-xs text-[#1a1210]/45">from</span>
          <span className="hero-copy text-xl font-extrabold leading-none tracking-tight text-[#1a1210] sm:text-[22px]">
            ₹{product.price}
          </span>
        </div>

        <div className="mt-auto pt-3 sm:pt-4">
          {inCart ? (
            <div className="flex h-10 items-center justify-between overflow-hidden rounded-xl bg-[#c62828] text-white sm:h-11">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(productId, inCart.quantity - 1)}
                className="flex h-full w-10 items-center justify-center text-xl font-semibold transition-colors hover:bg-black/10 sm:w-12"
              >
                −
              </button>
              <Link
                to="/cart"
                className="hero-copy text-xs font-bold tabular-nums sm:text-sm"
                aria-label={`${inCart.quantity} in cart, view cart`}
              >
                {inCart.quantity}
                <span className="hidden sm:inline"> in cart</span>
              </Link>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(productId, inCart.quantity + 1)}
                className="flex h-full w-10 items-center justify-center text-xl font-semibold transition-colors hover:bg-black/10 sm:w-12"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="hero-copy flex h-10 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#c62828] text-xs font-bold text-[#c62828] transition-colors hover:bg-[#c62828] hover:text-white active:scale-[0.98] sm:h-11 sm:text-sm"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 11.2a1.5 1.5 0 001.5 1.2h8.7a1.5 1.5 0 001.5-1.1L21 8H6.2M9 20.5h.01M17 20.5h.01" />
              </svg>
              <span className="sm:hidden">Add</span>
              <span className="hidden sm:inline">Add to cart</span>
            </button>
          )}
        </div>
      </div>
    </article>
    </motion.div>
  );
}

function AllProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const activePriceRange =
    priceRanges.find((range) => range.id === selectedPrice) || priceRanges[0];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productData.filter((product) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= activePriceRange.min &&
        product.price <= activePriceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "variants") return b.variants.length - a.variants.length;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedPrice, sortBy, activePriceRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedPrice("all");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-16 pt-10 md:pb-24 md:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <p className="hero-copy text-xs font-bold uppercase tracking-[0.28em] text-[#c62828]">
            Catalogue
          </p>
          <h1 className="hero-headline mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1] text-[#1a1210]">
            Our Products
          </h1>
          <p className="hero-copy mt-4 text-base leading-relaxed text-[#1a1210]/65 md:text-lg">
            Premium Gulchu sauces, pastes, and condiments—crafted with care for
            everyday kitchens.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mb-8 rounded-2xl border border-[#1a1210]/[0.07] bg-white p-4 shadow-[0_1px_2px_rgba(26,18,16,0.04)] sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <label
                htmlFor="product-search"
                className="hero-copy mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#1a1210]/45"
              >
                Search
              </label>
              <input
                id="product-search"
                type="search"
                placeholder="Search by name or description…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hero-copy w-full rounded-xl border border-[#1a1210]/10 bg-[#faf7f2] px-4 py-2.5 text-sm text-[#1a1210] outline-none transition-colors focus:border-[#c62828] focus:bg-white"
              />
            </div>

            <div className="w-full sm:w-48">
              <label
                htmlFor="product-sort"
                className="hero-copy mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#1a1210]/45"
              >
                Sort
              </label>
              <select
                id="product-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hero-copy w-full rounded-xl border border-[#1a1210]/10 bg-[#faf7f2] px-4 py-2.5 text-sm text-[#1a1210] outline-none transition-colors focus:border-[#c62828] focus:bg-white"
              >
                <option value="name">Name (A–Z)</option>
                <option value="price-asc">Price (Low–High)</option>
                <option value="price-desc">Price (High–Low)</option>
                <option value="variants">Most variants</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#1a1210]/8 pt-4">
            <p className="hero-copy w-full text-xs font-bold uppercase tracking-[0.16em] text-[#1a1210]/45">
              Category
            </p>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`hero-copy min-h-10 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide transition-colors sm:text-sm ${
                  selectedCategory === category
                    ? "bg-[#c62828] text-white"
                    : "bg-[#f3eee8] text-[#1a1210] hover:bg-[#e8dfd4]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#1a1210]/8 pt-4">
            <p className="hero-copy w-full text-xs font-bold uppercase tracking-[0.16em] text-[#1a1210]/45">
              Price
            </p>
            {priceRanges.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setSelectedPrice(range.id)}
                className={`hero-copy min-h-10 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide transition-colors sm:text-sm ${
                  selectedPrice === range.id
                    ? "bg-[#1a1210] text-white"
                    : "bg-[#f3eee8] text-[#1a1210] hover:bg-[#e8dfd4]"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <p className="hero-copy mt-4 text-sm text-[#1a1210]/55">
            Showing{" "}
            <span className="font-bold text-[#1a1210]">
              {filteredAndSortedProducts.length}
            </span>{" "}
            of {productData.length} products
            {selectedPrice !== "all" && (
              <span> · {activePriceRange.label}</span>
            )}
          </p>
        </motion.div>

        {/* Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence initial={false}>
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-[#1a1210]/[0.07] bg-white px-6 py-16 text-center">
            <h3 className="hero-headline text-2xl text-[#1a1210]">
              No products found
            </h3>
            <p className="hero-copy mt-2 text-[#1a1210]/60">
              Try adjusting your search or category filter.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="hero-copy mt-6 rounded-full bg-[#c62828] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#9b1c1c]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProduct;
