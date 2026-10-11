import React, { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  { label: "Tomato Ketchup", path: "/product/TomatoKetchup", image: "/img/thumb/TomatoKetchup.webp" },
  { label: "Red Chilli", path: "/product/RedChilliSauce", image: "/img/thumb/Ketchup-gr.webp" },
  { label: "Chilli Sauce", path: "/product/GreenChilli", image: "/img/thumb/GreenChilli.webp" },
  { label: "Schezwan", path: "/product/SchezwanChutney", image: "/img/thumb/GreenChilli.webp" },
  { label: "Pizza Pasta", path: "/product/PizzaPastaSauce", image: "/img/thumb/ContinentalSauce.webp" },
  { label: "Garlic Paste", path: "/product/GarlicPaste", image: "/img/thumb/ContinentalSauce.webp" },
  { label: "Pickles", path: "/product/Pickles(Achar)", image: "/img/thumb/Ketchup-gr.webp" },
  { label: "Mayonnaise", path: "/product/VegMayonnaise", image: "/img/thumb/ContinentalSauce.webp" },
  { label: "Momos Chutney", path: "/product/MomosChutney", image: "/img/thumb/GreenChilli.webp" },
  { label: "Soya Sauce", path: "/product/SoyaSauce", image: "/img/thumb/ContinentalSauce.webp" },
];

function ProductItem({ product, hidden }) {
  return (
    <Link
      to={product.path}
      className="product-marquee-item group flex w-[68px] shrink-0 flex-col items-center gap-0.5 sm:w-[74px]"
      aria-label={product.label}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.12)] transition-transform duration-300 active:scale-95 group-hover:scale-105 sm:h-8 sm:w-8">
        <img
          src={product.image}
          alt=""
          className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          width="24"
          height="24"
          draggable={false}
        />
      </span>
      <span className="hero-copy max-w-full truncate whitespace-nowrap text-center text-[9px] font-semibold leading-none tracking-wide text-white/90 sm:text-[10px]">
        {product.label}
      </span>
    </Link>
  );
}

function ProductCategoryBar() {
  const [paused, setPaused] = useState(false);
  const group = [...products, ...products, ...products];

  return (
    <div
      className={`product-marquee relative w-full overflow-hidden border-t border-white/15 ${paused ? "is-paused" : ""}`}
      style={{ backgroundColor: "#5a1212" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="product-marquee-mask py-1 sm:py-1.5">
        <div className="product-marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {group.map((product, index) => (
                <div key={`${copy}-${index}`} className="shrink-0 pr-2 sm:pr-3">
                  <ProductItem product={product} hidden={copy === 1} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryBar;
