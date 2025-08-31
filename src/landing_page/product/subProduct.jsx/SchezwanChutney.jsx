import React from "react";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    id: "schezwan-1kg",
    size: "1kg",
    price: 150,
    image: "/schezwan-1kg.jpg",
  },
  {
    id: "schezwan-300g",
    size: "300g",
    price: 60,
    image: "/schezwan-300g.jpg",
  },
];

function SchezwanChutney() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-10">
        Schezwan Chutney
      </h1>

      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={variant.image}
              alt={`${variant.size} Schezwan Chutney`}
              className="w-36 h-36 object-cover rounded-md border mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {variant.size}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              A bold Indo-Chinese fusion chutney with garlic, chillies, and soy
              sauce. Use as a dip, spread, or stir-fry base.
            </p>
            <p className="text-red-600 font-semibold text-md mb-3">
              ₹{variant.price}
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition"
              onClick={() =>
                addToCart({
                  ...variant,
                  name: `Schezwan Chutney - ${variant.size}`, // ✅ add name
                  price: Number(variant.price), // ensure numeric
                  quantity: 1, // ✅ initialize quantity
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchezwanChutney;
