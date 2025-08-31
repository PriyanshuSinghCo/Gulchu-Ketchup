import React from "react";
import { useCart } from "../../../context/CartContext";

const variant = {
  id: "soya-sauce-700ml",
  size: "700ml",
  price: 90,
  image: "/soya-sauce-700ml.jpg",
};

function SoyaSauce() {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...variant,
      name: `Soya Sauce - ${variant.size}`, //add product name
      price: Number(variant.price),         // ensure numeric
      quantity: 1,                          // initialize quantity
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Soya Sauce
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 text-center">
        <img
          src={variant.image}
          alt={`${variant.size} Soya Sauce`}
          className="w-36 h-36 object-cover rounded-md border mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {variant.size}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A rich fermented soy sauce ideal for stir-frying, marinating, and
          Asian cuisines.
        </p>
        <p className="text-gray-700 font-semibold mb-3">₹{variant.price}</p>
        <button
          className="bg-gray-800 hover:bg-black text-white text-sm px-4 py-2 rounded-md transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default SoyaSauce;
