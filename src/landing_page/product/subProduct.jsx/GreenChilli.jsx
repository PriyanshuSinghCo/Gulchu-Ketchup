import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    size: "1kg",
    price: 140,
    image: "/greenchilli-1kg.jpg", // Make sure this image is in public folder
  },
  {
    size: "700g",
    price: 110,
    image: "/greenchilli-700g.jpg",
  },
  {
    size: "500g",
    price: 85,
    image: "/greenchilli-500g.jpg",
  },
  {
    size: "200g",
    price: 45,
    image: "/greenchilli-200g.jpg",
  },
];

function GreenChilli() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (variant) => {
    const productId = `green-chilli-${variant.size.toLowerCase().replace(/\s+/g, '-')}`;

    const product = {
      id: productId,
      name: `Green Chilli Sauce - ${variant.size}`,
      image: variant.image,
      price: variant.price,
      rating: "4.6",
      reviews: "96",
      quantity: 1,
      size: variant.size,
    };

    addToCart(product);

    // Show "Added!" state
    setAddedItems((prev) => ({ ...prev, [productId]: true }));

    // Reset after 2s
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        Green Chilli Sauce (Spicy)
      </h1>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {variants.map((variant, index) => {
          const productId = `green-chilli-${variant.size.toLowerCase().replace(/\s+/g, '-')}`;
          const isAdded = addedItems[productId];

          return (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.img
                src={variant.image}
                alt={`${variant.size} Green Chilli Sauce`}
                className="w-36 h-36 object-cover mb-3 border rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {variant.size} Pack
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Spicy, zesty, and full of flavor — made from handpicked green
                chillies to add a punch to any dish.
              </p>
              <p className="text-green-700 font-semibold text-md mb-3">
                ₹{variant.price}
              </p>
              <motion.button
                className={`text-sm px-5 py-2 rounded-md transition ${
                  isAdded
                    ? "bg-green-700 text-white"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(variant)}
                disabled={isAdded}
              >
                {isAdded ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Added!
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default GreenChilli;
