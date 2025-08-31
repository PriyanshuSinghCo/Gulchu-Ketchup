import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const productData = [
  {
    name: "Tomato Ketchup",
    image: "https://source.unsplash.com/300x300/?ketchup",
    variants: ["1kg", "500g", "200g"],
    description:
      "Made from farm-fresh Chatra tomatoes, Gulchu Ketchup is a perfect blend of tangy sweetness and rich texture. Ideal for snacks, burgers, and fries.",
  },
  {
    name: "Red Chilli Sauce",
    image: "https://source.unsplash.com/300x300/?chilli-sauce",
    variants: ["1kg", "500g", "200g"],
    description:
      "A fiery blend of real red chillies with bold spices. Perfect for Indo-Chinese dishes, rolls, and marinades.",
  },
  {
    name: "Green Chilli Sauce (Spicy)",
    image: "https://source.unsplash.com/300x300/?green-chilli",
    variants: ["1kg", "700g", "500g", "200g"],
    description:
      "Spicy, zesty, and full of flavor — made from handpicked green chillies to add a punch to any dish.",
  },
  {
    name: "Schezwan Chutney",
    image: "https://source.unsplash.com/300x300/?schezwan",
    variants: ["1kg", "300g"],
    description:
      "A bold Indo-Chinese fusion chutney with garlic, chillies, and soy sauce. Use as a dip, spread, or stir-fry base.",
  },
  {
    name: "Pizza & Pasta Sauce",
    image: "https://source.unsplash.com/300x300/?pasta-sauce",
    variants: ["1kg", "500g"],
    description:
      "Classic Italian-style sauce made from tomatoes, basil, and spices — ready to enhance pizzas and pastas instantly.",
  },
  {
    name: "Garlic Paste",
    image: "https://source.unsplash.com/300x300/?garlic",
    variants: ["1kg", "500g", "200g"],
    description:
      "Freshly ground garlic paste, hygienically packed. A must-have for everyday Indian cooking.",
  },
  {
    name: "Ginger Paste",
    image: "https://source.unsplash.com/300x300/?ginger",
    variants: ["1kg", "500g", "200g"],
    description:
      "Pure ginger paste to bring flavor and aroma to your dals, curries, and tadkas.",
  },
  {
    name: "Pickles (Achar)",
    image: "https://source.unsplash.com/300x300/?pickle",
    variants: ["200g", "400g", "1kg (Glass Jar)", "5kg"],
    description:
      "Traditional Indian pickles prepared with age-old recipes and locally sourced ingredients. Flavors: Mango, Mixed, Green Chilli.",
  },
  {
    name: "Veg Mayonnaise",
    image: "https://source.unsplash.com/300x300/?mayonnaise",
    variants: ["250g", "400g", "900g"],
    description:
      "Creamy, rich mayo perfect for sandwiches, burgers, wraps, and dips.",
  },
  {
    name: "Mustard Sauce",
    image: "https://source.unsplash.com/300x300/?mustard",
    variants: ["700ml"],
    description:
      "Tangy and bold — Gulchu Mustard Sauce is perfect for hotdogs, sandwiches, and salad dressings.",
  },
  {
    name: "Momos Chutney",
    image: "https://source.unsplash.com/300x300/?chutney",
    variants: ["300g", "700g"],
    description:
      "Spicy and flavorful chutney to pair with steamed or fried momos. A favorite among spice lovers.",
  },
  {
    name: "Soya Sauce",
    image: "https://source.unsplash.com/300x300/?soya-sauce",
    variants: ["700ml"],
    description:
      "A rich fermented soy sauce ideal for stir-frying, marinating, and Asian cuisines.",
  },
];

function AllProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Categories for filtering
  const categories = ["All", "Sauces", "Pastes", "Pickles", "Condiments"];

  // Category mapping
  const getCategory = (productName) => {
    if (productName.includes("Sauce") || productName.includes("Ketchup")) return "Sauces";
    if (productName.includes("Paste")) return "Pastes";
    if (productName.includes("Pickle") || productName.includes("Achar")) return "Pickles";
    return "Condiments";
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || getCategory(product.name) === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "variants":
          return b.variants.length - a.variants.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium food products, crafted with care and quality ingredients
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="variants">Most Variants</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {productData.length} products
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="space-y-6">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  name={product.name}
                  image={product.image}
                  variants={product.variants}
                  description={product.description}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSortBy("name");
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AllProduct;
