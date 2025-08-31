import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    size: "300g",
    price: 50,
    image: "/momos-300g.jpg", // Make sure these exist in /public
  },
  {
    size: "700g",
    price: 100,
    image: "/momos-700g.jpg",
  },
];

function MomosChutney() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (variant) => {
    const productId = `momos-chutney-${variant.size.toLowerCase().replace(/\s+/g, "-")}`;

    const product = {
      id: productId,
      name: `Momos Chutney - ${variant.size}`,
      image: variant.image,
      price: variant.price, // numeric
      rating: "4.7",
      reviews: "142",
      quantity: 1,
      size: variant.size,
    };

    addToCart(product);

    // Show "Added!" for 2s
    setAddedItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-10">
        Momos Chutney
      </h1>

      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {variants.map((variant, index) => {
          const productId = `momos-chutney-${variant.size.toLowerCase().replace(/\s+/g, "-")}`;
          const isAdded = addedItems[productId];

          return (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.img
                src={variant.image}
                alt={`${variant.size} Momos Chutney`}
                className="w-36 h-36 object-cover rounded-md border mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {variant.size} Pack
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Spicy and flavorful chutney to pair with steamed or fried momos.
                A favorite among spice lovers.
              </p>
              <p className="text-red-600 font-semibold text-md mb-3">
                ₹{variant.price}
              </p>
              <motion.button
                className={`text-sm px-5 py-2 rounded-md transition ${
                  isAdded
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white hover:bg-red-700"
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

export default MomosChutney;
