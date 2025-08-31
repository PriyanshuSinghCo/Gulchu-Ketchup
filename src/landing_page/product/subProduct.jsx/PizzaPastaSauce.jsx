import React from "react";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    size: "1kg",
    price: 150,
    image: "/pizza-sauce-1kg.jpg",
  },
  {
    size: "500g",
    price: 90,
    image: "/pizza-sauce-500g.jpg",
  },
];

function PizzaPastaSauce() {
  const { addToCart } = useCart(); //use custom hook

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-10">
        Pizza & Pasta Sauce
      </h1>

      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={variant.image}
              alt={`${variant.size} Pizza Sauce`}
              className="w-36 h-36 object-cover rounded-md border mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {variant.size}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Classic Italian-style sauce made from tomatoes, basil, and spices
              — ready to enhance pizzas and pastas instantly.
            </p>
            <p className="text-red-600 font-semibold text-md mb-3">
              ₹{variant.price}
            </p>
            <button
              onClick={() =>
                addToCart({
                  ...variant,
                  id: variant.size, // ✅ unique id
                  name: `Pizza Sauce - ${variant.size}`,
                  quantity: 1,
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaPastaSauce;
