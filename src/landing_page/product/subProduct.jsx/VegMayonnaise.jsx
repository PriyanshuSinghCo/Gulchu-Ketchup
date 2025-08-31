import React from "react";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    id: "mayo-250g",
    size: "250g",
    price: 45,
    image: "/mayo-250g.jpg",
  },
  {
    id: "mayo-400g",
    size: "400g",
    price: 75,
    image: "/mayo-400g.jpg",
  },
  {
    id: "mayo-900g",
    size: "900g",
    price: 140,
    image: "/mayo-900g.jpg",
  },
];

function VegMayonnaise() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({ ...product, price: Number(product.price) });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-yellow-800 text-center mb-10">
        Veg Mayonnaise
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={variant.image}
              alt={`${variant.size} Veg Mayonnaise`}
              className="w-36 h-36 object-cover rounded-md border mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {variant.size}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Creamy, rich mayo perfect for sandwiches, burgers, wraps, and
              dips.
            </p>
            <p className="text-yellow-800 font-semibold text-md mb-3">
              ₹{variant.price}
            </p>
            <button
              className="bg-yellow-700 hover:bg-yellow-800 text-white text-sm px-4 py-2 rounded-md transition"
              onClick={() => handleAddToCart(variant)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VegMayonnaise;
