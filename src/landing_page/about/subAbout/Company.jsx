import React from "react";
import { FaUsers, FaStar, FaBoxes } from "react-icons/fa";

function Company() {
  return (
    <section className="mt-20 px-6 py-16 bg-gray-500 rounded-4xl text-gray-800"
    style={{ backgroundImage: "url('/OurStory.png')" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center bg-gray-300 rounded-es-full py-6 px-6 gap-12">
        <div className="w-full md:w-1/2 items-center justify-center">
          <h2 className="text-4xl font-bold mb-4 ml-20">About Our Company</h2>
          <p className="text-lg mb-6">
            At <span className="font-semibold">Gulchu</span>, we’re passionate
            about bringing freshness and flavor into every bite. Our mission is
            to deliver high-quality, delicious condiments that delight taste
            buds and elevate everyday meals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {/* Stat 1 */}
            <div className="flex items-center space-x-3">
              <FaBoxes className="text-red-500 text-3xl" />
              <div>
                <p className="text-2xl font-bold">100k+</p>
                <p className="text-sm text-gray-600">Bottles Sold</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center space-x-3">
              <FaUsers className="text-green-500 text-3xl" />
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-gray-600">Team Members</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center space-x-3">
              <FaStar className="text-yellow-500 text-3xl" />
              <div>
                <p className="text-2xl font-bold">4.8/5</p>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Company;
