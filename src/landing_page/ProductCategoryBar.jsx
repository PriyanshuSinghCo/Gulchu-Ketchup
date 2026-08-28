import React, { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  { label: "Tomato Ketchup", path: "/product/TomatoKetchup", image: "/TomatoKetchup.png" },
  { label: "Red Chilli", path: "/product/RedChilliSauce", image: "/Ketchup-gr.png" },
  { label: "Chilli Sauce", path: "/product/GreenChilli", image: "/GreenChilli.png" },
  { label: "Schezwan", path: "/product/SchezwanChutney", image: "/GreenChilli.png" },
  { label: "Pizza Pasta", path: "/product/PizzaPastaSauce", image: "/ContinentalSauce.png" },
  { label: "Garlic Paste", path: "/product/GarlicPaste", image: "/ContinentalSauce.png" },
  { label: "Pickles", path: "/product/Pickles(Achar)", image: "/Ketchup-gr.png" },
  { label: "Mayonnaise", path: "/product/VegMayonnaise", image: "/ContinentalSauce.png" },
  { label: "Momos Chutney", path: "/product/MomosChutney", image: "/GreenChilli.png" },
  { label: "Soya Sauce", path: "/product/SoyaSauce", image: "/ContinentalSauce.png" },
];

function ProductItem({ product }) {
  return (
    <Link
      to={product.path}
      className="product-marquee-item group flex w-[58px] shrink-0 flex-col items-center gap-1 sm:w-[62px]"
      aria-label={product.label}
    >
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.12)] transition-transform duration-300 active:scale-95 group-hover:scale-105 sm:h-10 sm:w-10">
        <img
          src={product.image}
          alt=""
          className="h-6 w-6 object-contain sm:h-7 sm:w-7"
          loading="lazy"
          draggable={false}
        />
      </span>
      <span className="hero-copy max-w-[58px] text-center text-[9px] font-semibold leading-[1.15] tracking-wide text-white/90 sm:max-w-[62px] sm:text-[10px]">
        {product.label}
      </span>
    </Link>
  );
}

function ProductCategoryBar() {
  const [paused, setPaused] = useState(false);
  const loop = [...products, ...products];

  return (
    <div
      className={`product-marquee w-full overflow-hidden border-t border-white/15 ${paused ? "is-paused" : ""}`}
      style={{ backgroundColor: "#5a1212" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-7xl px-2 py-1.5 sm:px-4 sm:py-2 lg:px-6">
        <div className="product-marquee-track flex w-max items-center gap-2.5 sm:gap-3">
          {loop.map((product, index) => (
            <ProductItem key={`${product.path}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryBar;
