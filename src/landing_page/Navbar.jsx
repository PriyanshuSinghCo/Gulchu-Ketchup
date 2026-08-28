import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import {
  FiBriefcase,
  FiUser,
  FiUsers,
  FiPlayCircle,
} from "react-icons/fi";
import ProductCategoryBar from "./ProductCategoryBar";

const navLinks = [
  { path: "/home", label: "Home" },
  {
    path: "/product",
    label: "Products",
    mega: true,
    submenu: [
      { label: "Tomato Ketchup", path: "/product/TomatoKetchup", image: "/TomatoKetchup.png" },
      { label: "Red Chilli Sauce", path: "/product/RedChilliSauce", image: "/Ketchup-gr.png" },
      { label: "Chilli Sauce (Spicy)", path: "/product/GreenChilli", image: "/GreenChilli.png" },
      { label: "Schezwan Chutney", path: "/product/SchezwanChutney", image: "/GreenChilli.png" },
      { label: "Pizza & Pasta Sauce", path: "/product/PizzaPastaSauce", image: "/ContinentalSauce.png" },
      { label: "Garlic Paste", path: "/product/GarlicPaste", image: "/ContinentalSauce.png" },
      { label: "Pickles (Achar)", path: "/product/Pickles(Achar)", image: "/Ketchup-gr.png" },
      { label: "Veg Mayonnaise", path: "/product/VegMayonnaise", image: "/ContinentalSauce.png" },
      { label: "Momos Chutney", path: "/product/MomosChutney", image: "/GreenChilli.png" },
      { label: "Soya Sauce", path: "/product/SoyaSauce", image: "/ContinentalSauce.png" },
    ],
  },
  { path: "/recipe", label: "Recipes" },
  {
    path: "/about",
    label: "About",
    aboutMega: true,
    submenu: [
      {
        label: "Company",
        path: "/about/company",
        desc: "Our story & roots in Chatra",
        Icon: FiBriefcase,
      },
      {
        label: "Director",
        path: "/about/director",
        desc: "Vision from the founder",
        Icon: FiUser,
      },
      {
        label: "Management Team",
        path: "/about/ManagementTeam",
        desc: "People behind Gulchu",
        Icon: FiUsers,
      },
      {
        label: "Videos",
        path: "/about/video",
        desc: "Watch our journey",
        Icon: FiPlayCircle,
      },
    ],
  },
  { path: "/contact", label: "Contact" },
];

const navLinkStyles = ({ isActive }) =>
  isActive
    ? "hero-copy text-sm font-bold tracking-wide text-white border-b-2 border-white pb-0.5"
    : "hero-copy text-sm font-semibold tracking-wide text-white/80 hover:text-white";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { cartItemCount } = useCart();
  const location = useLocation();
  const isHome =
    location.pathname === "/" || location.pathname === "/home";

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main nav */}
      <nav className="bg-[#8b1e1e]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" aria-label="Home" className="flex items-center gap-2.5">
            <img
              src="/logo2.jpeg"
              alt="Gulchu"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white/25"
            />
            <span className="hero-brand hidden text-2xl leading-none tracking-wide text-white sm:block">
              Gulchu
            </span>
          </NavLink>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link, index) => (
              <div key={index} className="group relative">
                <NavLink
                  to={link.path}
                  className={navLinkStyles}
                  aria-haspopup={!!link.submenu}
                  aria-label={link.label}
                >
                  {link.label}
                </NavLink>

                {link.submenu && (
                  <div
                    className={`invisible absolute top-full z-50 mt-4 origin-top scale-95 opacity-0 transition duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
                      link.mega
                        ? "left-1/2 w-[560px] -translate-x-1/2"
                        : link.aboutMega
                          ? "left-1/2 w-[480px] -translate-x-1/2"
                          : "left-0 min-w-[200px]"
                    }`}
                  >
                    <div className="absolute -top-4 left-0 right-0 h-4" aria-hidden />

                    <div className="overflow-hidden rounded-xl border border-[#1a1210]/8 bg-white shadow-xl">
                      {link.mega && (
                        <>
                          <div className="flex items-center justify-between border-b border-[#1a1210]/8 px-4 py-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a1210]/45">
                              All products
                            </p>
                            <NavLink
                              to="/product"
                              className="text-xs font-bold text-[#c62828] hover:underline"
                            >
                              View all →
                            </NavLink>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 p-3">
                            {link.submenu.map((sublink, subIndex) => (
                              <NavLink
                                key={subIndex}
                                to={sublink.path}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-semibold transition-colors ${
                                    isActive
                                      ? "bg-[#c62828]/10 text-[#c62828]"
                                      : "text-[#1a1210] hover:bg-[#faf7f2] hover:text-[#c62828]"
                                  }`
                                }
                              >
                                {sublink.image && (
                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f3eee8]">
                                    <img
                                      src={sublink.image}
                                      alt=""
                                      className="h-9 w-9 object-contain"
                                      loading="lazy"
                                      draggable={false}
                                    />
                                  </span>
                                )}
                                <span className="leading-snug">{sublink.label}</span>
                              </NavLink>
                            ))}
                          </div>
                        </>
                      )}

                      {link.aboutMega && (
                        <>
                          <div className="flex items-center justify-between border-b border-[#1a1210]/8 px-4 py-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a1210]/45">
                              About Gulchu
                            </p>
                            <NavLink
                              to="/about"
                              className="text-xs font-bold text-[#c62828] hover:underline"
                            >
                              Overview →
                            </NavLink>
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-3">
                            {link.submenu.map((sublink, subIndex) => {
                              const Icon = sublink.Icon;
                              return (
                                <NavLink
                                  key={subIndex}
                                  to={sublink.path}
                                  className={({ isActive }) =>
                                    `group/item flex items-start gap-3 rounded-lg border px-3 py-3 transition-colors ${
                                      isActive
                                        ? "border-[#c62828]/35 bg-[#c62828]/8"
                                        : "border-[#1a1210]/8 bg-[#faf7f2] hover:border-[#c62828]/30 hover:bg-white"
                                    }`
                                  }
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-[#c62828] ring-1 ring-[#1a1210]/8">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <div>
                                    <p className="text-sm font-bold text-[#1a1210] group-hover/item:text-[#c62828]">
                                      {sublink.label}
                                    </p>
                                    <p className="mt-0.5 text-xs font-medium leading-snug text-[#1a1210]/55">
                                      {sublink.desc}
                                    </p>
                                  </div>
                                </NavLink>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <NavLink to="/cart" className="relative" aria-label="Cart">
              <div className="text-white transition-colors hover:text-white/80">
                <FiShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#8b1e1e]">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          <div className="flex items-center md:hidden">
            <NavLink to="/cart" className="relative mr-2" aria-label="Cart">
              <div className="text-white">
                <FiShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#8b1e1e]">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </div>
            </NavLink>

            <button
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setOpenSubMenu(null);
              }}
              className="rounded-md p-2 text-white hover:bg-white/10 focus:outline-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Product strip — same width/color family, flush under nav */}
      {isHome && <ProductCategoryBar />}

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => {
              setMobileOpen(false);
              setOpenSubMenu(null);
            }}
          />
          <div className="absolute left-0 right-0 top-16 z-50 mx-3 flex max-h-[80vh] flex-col gap-3 overflow-y-auto rounded-xl border border-[#1a1210]/8 bg-white px-3 py-3 shadow-lg md:hidden">
            {navLinks.map((link, index) => (
              <div key={index}>
                <div className="flex items-center justify-between px-1 py-1">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `w-full rounded-md px-2 py-2 text-lg font-bold ${
                        isActive ? "text-[#c62828]" : "text-[#1a1210]"
                      }`
                    }
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenSubMenu(null);
                    }}
                  >
                    {link.label}
                  </NavLink>
                  {link.submenu && (
                    <button
                      onClick={() =>
                        setOpenSubMenu(openSubMenu === index ? null : index)
                      }
                      className="rounded-lg px-3 py-1 text-xl font-bold hover:bg-gray-100 focus:outline-none"
                      aria-label="Toggle submenu"
                    >
                      {openSubMenu === index ? "−" : "+"}
                    </button>
                  )}
                </div>

                {link.submenu && openSubMenu === index && (
                  <div
                    className={`mt-2 grid gap-2 ${
                      link.aboutMega ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    {link.submenu.map((sublink, subIndex) => {
                      const Icon = sublink.Icon;
                      return (
                        <NavLink
                          key={subIndex}
                          to={sublink.path}
                          className="flex items-center gap-3 rounded-md bg-[#faf7f2] px-2.5 py-2.5 text-left text-sm font-semibold text-[#1a1210] hover:bg-[#c62828]/10 hover:text-[#c62828]"
                          onClick={() => {
                            setMobileOpen(false);
                            setOpenSubMenu(null);
                          }}
                        >
                          {Icon ? (
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#c62828] ring-1 ring-[#1a1210]/8">
                              <Icon className="h-5 w-5" />
                            </span>
                          ) : (
                            sublink.image && (
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                                <img
                                  src={sublink.image}
                                  alt=""
                                  className="h-8 w-8 object-contain"
                                  loading="lazy"
                                  draggable={false}
                                />
                              </span>
                            )
                          )}
                          <span>
                            <span className="block leading-snug">{sublink.label}</span>
                            {sublink.desc && (
                              <span className="mt-0.5 block text-xs font-medium text-[#1a1210]/50">
                                {sublink.desc}
                              </span>
                            )}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
