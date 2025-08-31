import React from "react";
import { useCart } from "../../../context/CartContext";

const variants = [
  { size: "200g", price: 45, image: "/pickle-200g.jpg" },
  { size: "400g", price: 80, image: "/pickle-400g.jpg" },
  { size: "1kg (Glass Jar)", price: 150, image: "/pickle-1kg.jpg" },
  { size: "5kg", price: 600, image: "/pickle-5kg.jpg" },
];

function Pickles() {
  const { addToCart } = useCart(); //use the custom hook

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-yellow-800 text-center mb-10">
        Pickles (Achar)
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={variant.image}
              alt={`${variant.size} Pickle`}
              className="w-36 h-36 object-cover rounded-md border mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {variant.size}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Traditional Indian pickles prepared with age-old recipes and
              locally sourced ingredients. Flavors: Mango, Mixed, Green Chilli.
            </p>
            <p className="text-yellow-800 font-semibold text-md mb-3">
              ₹{variant.price}
            </p>
            <button
              onClick={() =>
                addToCart({
                  ...variant,
                  quantity: 1, // default quantity
                  name: `Pickle - ${variant.size}`,
                  id: variant.size, // make sure each variant has a unique id
                })
              }
              className="bg-yellow-700 hover:bg-yellow-800 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pickles;
