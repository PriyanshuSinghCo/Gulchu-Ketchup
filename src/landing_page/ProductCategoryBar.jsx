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
      className="product-marquee-item group flex w-[76px] shrink-0 flex-col items-center gap-1.5 px-1 py-1 sm:w-[80px]"
      aria-label={product.label}
    >
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white transition-transform duration-300 active:scale-95 md:group-hover:scale-105">
        <img
          src={product.image}
          alt=""
          className="h-9 w-9 object-contain"
          loading="lazy"
          draggable={false}
        />
      </span>
      <span className="hero-copy max-w-[4.6rem] text-center text-[10px] font-semibold leading-tight text-white sm:text-[11px]">
        {product.label}
      </span>
    </Link>
  );
}

function ProductCategoryBar() {
  const loop = [...products, ...products];

  return (
    <div className="product-marquee overflow-hidden border-t border-white/25 bg-[#5a1212]">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
        {/* Mobile: swipe/scroll to browse */}
        <div className="product-marquee-scroll flex gap-1.5 md:hidden">
          {products.map((product) => (
            <ProductItem key={`m-${product.path}`} product={product} />
          ))}
        </div>

        {/* Desktop: smooth infinite marquee */}
        <div className="hidden md:block">
          <div className="product-marquee-track flex w-max items-start gap-1.5">
            {loop.map((product, index) => (
              <ProductItem key={`${product.path}-${index}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryBar;
