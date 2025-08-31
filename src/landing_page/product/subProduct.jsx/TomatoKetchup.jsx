import React from "react";
import { useCart } from "../../../context/CartContext";

const variants = [
  {
    id: "ketchup-1kg",
    size: "1kg",
    price: 120,
    image: "/ketchup-1kg.jpg",
  },
  {
    id: "ketchup-500g",
    size: "500g",
    price: 70,
    image: "/ketchup-500g.jpg",
  },
  {
    id: "ketchup-200g",
    size: "200g",
    price: 40,
    image: "/ketchup-200g.jpg",
  },
];

function TomatoKetchup() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({ ...product, price: Number(product.price) });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 mt-15">
      <h1 className="text-3xl font-bold text-red-700 text-center mb-10">
        Tomato Ketchup
      </h1>

      <div className="max-w-6xl mx-auto px-4 py-10 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Tomato Ketchup</h2>

        <h5 className="text-black-700 text-xl mb-4">
          <strong>Gulchu Tomato Ketchup</strong> is crafted from farm-fresh, sun-ripened Chatra tomatoes, blended with a carefully selected mix of spices and natural sweeteners. It delivers the perfect harmony of tangy and sweet flavors with a rich, smooth texture that enhances any dish.
        </h5>

        <p className="text-black-700 mb-4">
          Ideal for pairing with:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>French fries, pakoras, and samosas</li>
            <li>Burgers, sandwiches, and wraps</li>
            <li>Evening snacks and tiffins</li>
          </ul>
        </p>

        <p className="text-gray-900 text-sm mb-4">
          <strong>Available Sizes:</strong> 1kg, 500g, 200g
        </p>

        <p className="text-gray-900 text-sm mb-4">
          <strong>Storage:</strong> Store in a cool, dry place. Once opened, refrigerate and consume within 3 months.
        </p>

        <p className="text-gray-900 text-sm">
          <strong>Shelf Life:</strong> 12 months from the date of manufacture.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={variant.image}
              alt={`${variant.size} Tomato Ketchup`}
              className="w-36 h-36 object-cover rounded-md border mb-3"
            />
            <h2 className="text-lg font-semibold text-black-800 mb-1">
              {variant.size}
            </h2>
            <p className="text-sm text-black-600 mb-2">
              Made from farm-fresh Chatra tomatoes, Gulchu Ketchup is a perfect
              blend of tangy sweetness and rich texture. Ideal for snacks,
              burgers, and fries.
            </p>
            <p className="text-red-600 font-semibold text-md mb-3">
              ₹{variant.price}
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition"
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

export default TomatoKetchup;
