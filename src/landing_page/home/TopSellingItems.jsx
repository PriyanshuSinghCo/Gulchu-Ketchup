import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "swiper/css";
import "swiper/css/pagination";

const topItems = [
  {
    id: 1,
    name: "Gulchu Tomato Ketchup",
    image: "/Gulchü Tomato Ketchup Bottle (1).png",
    price: "₹99",
    originalPrice: "₹129",
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: 2,
    name: "Green Chilli Sauce",
    image: "/GreenChilli.png",
    price: "₹89",
    originalPrice: "₹119",
    rating: 4.6,
    reviews: 892,
  },
  {
    id: 3,
    name: "Continental Sauce",
    image: "/ContinentalSauce.png",
    price: "₹109",
    originalPrice: "₹149",
    rating: 4.7,
    reviews: 1034,
  },
  {
    id: 4,
    name: "Classic Tomato Ketchup",
    image: "/TomatoKetchup.png",
    price: "₹179",
    originalPrice: "₹239",
    rating: 4.9,
    reviews: 2156,
  },
  {
    id: 5,
    name: "Green Chilli Ketchup",
    image: "/Ketchup-gr.png",
    price: "₹129",
    originalPrice: "₹169",
    rating: 4.5,
    reviews: 678,
  },
  {
    id: 6,
    name: "Premium Tomato Ketchup",
    image: "/Gulchü Tomato Ketchup Bottle (1).png",
    price: "₹99",
    originalPrice: "₹129",
    rating: 4.4,
    reviews: 445,
  },
];

const TopSellingItems = () => {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState(new Set());

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems(prev => new Set(prev).add(item.id));
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 md:mb-3">
            Top Selling Items
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Our most loved products, hand-picked just for you
          </p>
        </motion.div>

        {/* Swiper */}
                 <Swiper
           modules={[Pagination, Autoplay]}
           spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
                     breakpoints={{
             320: { slidesPerView: 1, spaceBetween: 20 },
             480: { slidesPerView: 1.2, spaceBetween: 25 },
             640: { slidesPerView: 2, spaceBetween: 25 },
             768: { slidesPerView: 2.5, spaceBetween: 30 },
             1024: { slidesPerView: 3, spaceBetween: 30 },
             1280: { slidesPerView: 4, spaceBetween: 30 },
           }}
                     className="pb-20"
        >
          {topItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="h-full"
              >
                                 <div className="bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[320px] sm:min-h-[360px] mb-6">
                  
                  {/* Image */}
                  <div className="flex justify-center items-center p-4 sm:p-6 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-5 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center text-xs sm:text-sm text-yellow-500 mb-2">
                      ⭐ {item.rating}
                      <span className="text-gray-500 ml-1 sm:ml-2">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1 sm:gap-2 mb-3 md:mb-4">
                      <span className="text-lg sm:text-xl font-bold text-green-600">
                        {item.price}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {item.originalPrice}
                      </span>
                    </div>

                                                             {/* Button always at bottom */}
                    <div className="mt-auto pt-2">
                      <motion.button
                        onClick={() => handleAddToCart(item)}
                        className={`w-full py-2 px-3 rounded-lg font-medium text-sm sm:text-base transition ${
                          addedItems.has(item.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {addedItems.has(item.id) ? (
                          <span className="flex items-center justify-center gap-2">
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
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

                 {/* View All */}
         <motion.div
           className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link to="/product">
            <motion.button
              className="bg-gray-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-800 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #111827 !important;
        }
      `}</style>
    </section>
  );
};

export default TopSellingItems;
