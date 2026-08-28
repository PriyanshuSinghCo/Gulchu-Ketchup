import React from "react";
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
      className="group flex w-[72px] shrink-0 flex-col items-center gap-1.5 px-0.5 sm:w-[80px]"
      aria-label={product.label}
    >
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
        <img
          src={product.image}
          alt=""
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
          loading="lazy"
          draggable={false}
        />
      </span>
      <span className="hero-copy max-w-[4.5rem] text-center text-[10px] font-semibold leading-tight text-white sm:text-[11px]">
        {product.label}
      </span>
    </Link>
  );
}

function ProductCategoryBar() {
  const loop = [...products, ...products];

  return (
    <div className="product-marquee overflow-hidden border-t border-white/25 bg-[#5a1212]">
      {/* Same max-width + padding as navbar for alignment */}
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        <div className="product-marquee-track flex w-max items-start gap-1 sm:gap-1.5">
          {loop.map((product, index) => (
            <ProductItem key={`${product.path}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryBar;
