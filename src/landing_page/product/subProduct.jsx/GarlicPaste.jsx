import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    size: "1kg",
    price: 120,
    image: "/garlic-1kg.jpg",
  },
  {
    size: "500g",
    price: 70,
    image: "/GreenChilli.png",
  },
  {
    size: "200g",
    price: 35,
    image: "/garlic-200g.jpg",
  },
];

function GarlicPaste() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (variant) => {
    const productId = `garlic-paste-${variant.size.toLowerCase().replace(/\s+/g, '-')}`;
    
    const product = {
      id: productId,
      name: `Garlic Paste - ${variant.size}`,
      image: variant.image,
      price: variant.price,
      rating: "4.5",
      reviews: "128",
      quantity: 1,
      size: variant.size
    };
    
    addToCart(product);
    
    // Update local state to show "Added!" for this specific variant
    setAddedItems(prev => ({
      ...prev,
      [productId]: true
    }));
    
    // Reset button state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [productId]: false
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-10">
      <h1 className="text-3xl font-bold text-red-600 text-center mb-10">
        Garlic Paste
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {variants.map((variant, index) => {
          const productId = `garlic-paste-${variant.size.toLowerCase().replace(/\s+/g, '-')}`;
          const isAdded = addedItems[productId];
          
          return (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.img
                src={variant.image}
                alt={`${variant.size} Garlic Paste`}
                className="w-40 h-40 object-cover mb-4 border rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Garlic Paste – {variant.size}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Freshly ground garlic paste, hygienically packed. A must-have for
                everyday Indian cooking.
              </p>
              <p className="text-red-600 font-semibold text-lg mb-3">
                {variant.price}
              </p>
              <motion.button 
                className={`text-sm px-6 py-2 rounded-md transition ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(variant)}
                disabled={isAdded}
              >
                {isAdded ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added!
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default GarlicPaste;
