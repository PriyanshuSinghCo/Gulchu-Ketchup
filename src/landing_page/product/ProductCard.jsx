import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ name, image, variants, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Generate route path based on product name
  const getProductRoute = (productName) => {
    const routeMap = {
      "Tomato Ketchup": "/product/TomatoKetchup",
      "Red Chilli Sauce": "/product/RedChilliSauce",
      "Green Chilli Sauce (Spicy)": "/product/GreenChilli",
      "Schezwan Chutney": "/product/SchezwanChutney",
      "Pizza & Pasta Sauce": "/product/PizzaPastaSauce",
      "Garlic Paste": "/product/GarlicPaste",
      "Ginger Paste": "/product/GarlicPaste", // Using same route for now
      "Pickles (Achar)": "/product/Pickles(Achar)",
      "Veg Mayonnaise": "/product/VegMayonnaise",
      "Mustard Sauce": "/product/VegMayonnaise", // Using same route for now
      "Momos Chutney": "/product/MomosChutney",
      "Soya Sauce": "/product/SoyaSauce"
    };
    return routeMap[productName] || "/product";
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const productId = name.toLowerCase().replace(/\s+/g, '-');
    const product = {
      id: productId,
      name: name,
      image: image,
      price: "₹199.00", // Default price, you can make this dynamic
      rating: "4.5",
      reviews: "128",
      quantity: 1
    };
    
    addToCart(product);
    setAddedToCart(true);
    
    // Reset button state after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl transition duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      
      {/* Text Content */}
      <div className="flex-1">
        <motion.h2 
          className="text-2xl font-semibold text-red-600 mb-2"
          animate={{ color: isHovered ? "#dc2626" : "#dc2626" }}
        >
          {name}
        </motion.h2>
        
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-800">Variants:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {variants.map((variant, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {variant}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>
        
                 <div className="flex gap-3">
           <Link to={getProductRoute(name)}>
             <motion.button 
               className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               View Details
             </motion.button>
           </Link>
           
           <motion.button 
             className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
               addedToCart 
                 ? 'bg-green-600 text-white' 
                 : 'border border-red-600 text-red-600 hover:bg-red-50'
             }`}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleAddToCart}
             disabled={addedToCart}
           >
             {addedToCart ? (
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
         </div>
      </div>

      {/* Product Image */}
      <motion.div
        className="relative"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
        />
        
                 {/* Hover Overlay */}
         {isHovered && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center"
           >
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="bg-white rounded-full p-3 shadow-lg"
             >
               <img
                 src="/Gulchü Tomato Ketchup Bottle (1).png"
                 alt="Product Preview"
                 className="w-8 h-8 object-contain"
               />
             </motion.div>
           </motion.div>
         )}
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
