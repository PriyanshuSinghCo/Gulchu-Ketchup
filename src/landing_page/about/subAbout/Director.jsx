import React from 'react';
import { FaQuoteLeft, FaSeedling, FaFlask, FaHandHoldingHeart, FaGlobeAsia, FaBoxOpen } from 'react-icons/fa';

function Director() {
  return (
    <section className="px-6 py-16  text-gray-800 bg-gray-50 mt-10">
      {/* Director Info */}
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <img
          src="/director.jpg"
          alt="Director"
          className="w-40 h-40 mx-auto rounded-full shadow-xl mb-6 hover:scale-105 transition-transform duration-300"
        />

        <h2 className="text-3xl font-bold">Mr. Praveen Kumar Singh</h2>
        <p className="text-lg text-gray-500 mb-4">Founder & Managing Director</p>

        <div className="flex justify-center mb-4 px-4">
          <FaQuoteLeft className="text-red-500 text-xl mr-2 mt-1" />
          <p className="text-md text-gray-700 max-w-2xl leading-relaxed">
            "At Gulchu, our mission goes beyond making delicious ketchup — we aim to build a brand that families trust and love.
            From our ingredients to our customer care, we focus on quality, passion, and consistency in every bottle."
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-4xl font-bold text-center mb-8">Our Vision</h2>

        <p className="text-lg leading-relaxed mb-6 text-center">
          At <span className="font-semibold text-red-600">Kaushik Agro Food</span>, our vision is to become a leading force in transforming locally grown agricultural produce into high-quality, innovative, and healthy food products that reach every kitchen in India and beyond. Through our flagship brand <span className="font-semibold text-red-600">Gulchu</span>, we are committed to:
        </p>

        <div className="space-y-6">
          <VisionItem
            icon={<FaSeedling className="text-green-600 text-2xl" />}
            text={
              <>
                <strong>Empowering local farmers</strong> by creating a sustainable market for their crops, especially tomatoes and other regional produce.
              </>
            }
            aos="fade-right"
          />
          <VisionItem
            icon={<FaBoxOpen className="text-red-500 text-2xl" />}
            text={
              <>
                <strong>Delivering premium-quality sauces, condiments, and pastes</strong> made with natural ingredients and modern food technology.
              </>
            }
            aos="fade-left"
          />
          <VisionItem
            icon={<FaFlask className="text-purple-500 text-2xl" />}
            text={
              <>
                <strong>Promoting food innovation</strong> that blends traditional Indian flavors with global culinary trends.
              </>
            }
            aos="fade-right"
          />
          <VisionItem
            icon={<FaHandHoldingHeart className="text-yellow-500 text-2xl" />}
            text={
              <>
                <strong>Maintaining the highest standards of hygiene, taste, and packaging</strong>, ensuring trust and satisfaction in every product.
              </>
            }
            aos="fade-left"
          />
          <VisionItem
            icon={<FaGlobeAsia className="text-blue-500 text-2xl" />}
            text={
              <>
                <strong>Expanding globally</strong> by positioning Gulchu as a symbol of authenticity, purity, and rich Indian taste.
              </>
            }
            aos="fade-up"
          />
        </div>

        <p className="text-md text-gray-700 mt-8 text-center leading-relaxed" data-aos="zoom-in">
          We envision a future where every household experiences the vibrant flavors of India — starting from the humble kitchens of <span className="font-semibold text-gray-900">Chatra, Jharkhand</span> to the dining tables across the world — with love, honesty, and excellence in every drop.
        </p>
      </div>
    </section>
  );
}

// Subcomponent for vision points with animation support
function VisionItem({ icon, text, aos }) {
  return (
    <div className="flex items-start space-x-4" data-aos={aos}>
      <div>{icon}</div>
      <p className="text-md text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

export default Director;
