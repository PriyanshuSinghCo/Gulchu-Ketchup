import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const productData = [
  {
    name: "Tomato Ketchup",
    image: "/TomatoKetchup.png",
    path: "/product/TomatoKetchup",
    category: "Sauces",
    variants: ["1kg", "500g", "200g"],
    price: 99,
    description:
      "Farm-fresh Chatra tomatoes with tangy-sweet balance—ideal for snacks, burgers, and fries.",
  },
  {
    name: "Red Chilli Sauce",
    image: "/Ketchup-gr.png",
    path: "/product/RedChilliSauce",
    category: "Sauces",
    variants: ["1kg", "500g", "200g"],
    price: 89,
    description:
      "A fiery blend of real red chillies with bold spices for Indo-Chinese dishes and marinades.",
  },
  {
    name: "Green Chilli Sauce (Spicy)",
    image: "/GreenChilli.png",
    path: "/product/GreenChilli",
    category: "Sauces",
    variants: ["1kg", "700g", "500g", "200g"],
    price: 89,
    description:
      "Spicy and zesty—handpicked green chillies that add a punch to everyday meals.",
  },
  {
    name: "Schezwan Chutney",
    image: "/GreenChilli.png",
    path: "/product/SchezwanChutney",
    category: "Condiments",
    variants: ["1kg", "300g"],
    price: 109,
    description:
      "Bold Indo-Chinese fusion with garlic and chillies—dip, spread, or stir-fry base.",
  },
  {
    name: "Pizza & Pasta Sauce",
    image: "/ContinentalSauce.png",
    path: "/product/PizzaPastaSauce",
    category: "Sauces",
    variants: ["1kg", "500g"],
    price: 109,
    description:
      "Italian-style tomato sauce with herbs—ready to lift pizzas and pastas instantly.",
  },
  {
    name: "Garlic Paste",
    image: "/ContinentalSauce.png",
    path: "/product/GarlicPaste",
    category: "Pastes",
    variants: ["1kg", "500g", "200g"],
    price: 79,
    description:
      "Freshly ground garlic paste, hygienically packed for everyday Indian cooking.",
  },
  {
    name: "Pickles (Achar)",
    image: "/Ketchup-gr.png",
    path: "/product/Pickles(Achar)",
    category: "Pickles",
    variants: ["200g", "400g", "1kg", "5kg"],
    price: 45,
    description:
      "Traditional pickles with age-old recipes—mango, mixed, and green chilli.",
  },
  {
    name: "Veg Mayonnaise",
    image: "/ContinentalSauce.png",
    path: "/product/VegMayonnaise",
    category: "Condiments",
    variants: ["250g", "400g", "900g"],
    price: 99,
    description:
      "Creamy mayo for sandwiches, burgers, wraps, and dips.",
  },
  {
    name: "Momos Chutney",
    image: "/GreenChilli.png",
    path: "/product/MomosChutney",
    category: "Condiments",
    variants: ["300g", "700g"],
    price: 79,
    description:
      "Spicy chutney made for steamed or fried momos—a favourite among spice lovers.",
  },
  {
    name: "Soya Sauce",
    image: "/ContinentalSauce.png",
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
  const [added, setAdded] = useState(false);
  const productId = product.name.toLowerCase().replace(/\s+/g, "-");
  const inCart = items.find((item) => item.id === productId);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: productId,
      name: product.name,
      image: product.image,
      price: `₹${product.price}`,
      rating: 4.6,
      reviews: 120,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.05, 0.35), duration: 0.4 }}
      className="group flex h-full flex-col border border-[#1a1210]/10 bg-white transition-colors hover:border-[#c62828]/35"
    >
      <Link to={product.path} className="relative block overflow-hidden bg-[#f3eee8]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(198,40,40,0.1) 0%, transparent 65%)",
          }}
        />
        <span className="absolute left-3 top-3 z-[1] hero-copy bg-[#1a1210] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#faf7f2]">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="relative z-0 mx-auto h-48 w-auto object-contain py-6 transition-transform duration-500 group-hover:scale-[1.04] sm:h-52"
          draggable={false}
        />
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
        <p className="hero-copy text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1210]/45">
          {product.variants.join(" · ")}
        </p>
        <Link to={product.path}>
          <h2 className="hero-headline mt-1.5 text-xl leading-snug text-[#1a1210] transition-colors hover:text-[#c62828]">
            {product.name}
          </h2>
        </Link>
        <p className="hero-copy mt-2 line-clamp-2 text-sm leading-relaxed text-[#1a1210]/60">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="hero-brand text-2xl leading-none text-[#1a1210]">
            ₹{product.price}
          </span>
          <span className="hero-copy text-xs text-[#1a1210]/45">from</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-5">
          {inCart ? (
            <>
              <div className="flex h-10 flex-1 items-center justify-between border border-[#1a1210]/15">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(productId, inCart.quantity - 1)}
                  className="hero-copy h-full px-3 text-lg hover:bg-[#f3eee8]"
                >
                  −
                </button>
                <span className="hero-copy text-sm font-bold tabular-nums">
                  {inCart.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => updateQuantity(productId, inCart.quantity + 1)}
                  className="hero-copy h-full px-3 text-lg hover:bg-[#f3eee8]"
                >
                  +
                </button>
              </div>
              <Link
                to="/cart"
                className="hero-copy inline-flex h-10 items-center border border-[#1a1210]/15 px-3 text-xs font-bold uppercase tracking-wider text-[#1a1210] hover:border-[#c62828] hover:text-[#c62828]"
              >
                Cart
              </Link>
            </>
          ) : (
            <>
              <Link
                to={product.path}
                className="hero-copy inline-flex h-10 items-center border border-[#1a1210]/15 px-3 text-xs font-bold uppercase tracking-wider text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
              >
                Details
              </Link>
              <button
                type="button"
                onClick={handleAdd}
                className={`hero-copy h-10 flex-1 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                  added
                    ? "bg-[#2e7d32] text-white"
                    : "bg-[#c62828] text-[#faf7f2] hover:bg-[#9b1c1c]"
                }`}
              >
                {added ? "Added" : "Add to cart"}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.article>
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
          className="mb-8 border border-[#1a1210]/10 bg-white p-4 sm:p-5"
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
                className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-2.5 text-sm text-[#1a1210] outline-none focus:border-[#c62828]"
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
                className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-2.5 text-sm text-[#1a1210] outline-none focus:border-[#c62828]"
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="border border-[#1a1210]/10 bg-white px-6 py-16 text-center">
            <h3 className="hero-headline text-2xl text-[#1a1210]">
              No products found
            </h3>
            <p className="hero-copy mt-2 text-[#1a1210]/60">
              Try adjusting your search or category filter.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="hero-copy mt-6 bg-[#c62828] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#9b1c1c]"
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
