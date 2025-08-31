import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

const navLinks = [
  { path: "/home", label: "Home" },
  {
    path: "/product",
    label: "Products",
    submenu: [
      { label: "Tomato Ketchup", path: "/product/TomatoKetchup" },
      { label: "Red Chilli Sauce", path: "/product/RedChilliSauce" },
      { label: "Chilli Sauce(Spicy)", path: "/product/GreenChilli" },
      { label: "Schezwan Chutney", path: "/product/SchezwanChutney" },
      { label: "Pizza & Pasta Sauce", path: "/product/PizzaPastaSauce" },
      { label: "Garlic Paste", path: "/product/GarlicPaste" },
      { label: "Pickles(Achar)", path: "/product/Pickles(Achar)" },
      { label: "Veg Mayonnaise", path: "/product/VegMayonnaise" },
      { label: "Momos Chutney", path: "/product/MomosChutney" },
      { label: "Soya Sauce", path: "/product/SoyaSauce" },
    ],
  },
  { path: "/recipe", label: "Recipes" },
  {
    path: "/about",
    label: "About",
    submenu: [
      { label: "Company", path: "/about/company" },
      { label: "Director", path: "/about/director" },
      { label: "Management Team", path: "/about/ManagementTeam" },
      { label: "Videos", path: "/about/video" },
    ],
  },
  { path: "/contact", label: "Contact" },
];

const navLinkStyles = ({ isActive }) =>
  isActive
    ? "text-red-600 font-semibold border-b-2 border-red-600"
    : "text-black hover:text-red-500";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { cartItemCount } = useCart();

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md shadow-lg px-6 py-3 rounded-2xl flex items-center justify-between max-w-6xl w-full">
      
      {/* Logo */}
      <NavLink to="/" aria-label="Home">
        <img src="/logo.jpg" alt="Logo" className="h-10 w-auto rounded-full" />
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link, index) => (
          <div key={index} className="relative group">
            <NavLink
              to={link.path}
              className={navLinkStyles}
              aria-haspopup={!!link.submenu}
              aria-expanded={false}
              aria-label={link.label}
            >
              {link.label}
            </NavLink>
            {link.submenu && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 min-w-[160px] z-50 max-h-96 overflow-auto">
                {link.submenu.map((sublink, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={sublink.path}
                    className="block px-4 py-2 text-sm text-black hover:bg-red-100 whitespace-nowrap"
                  >
                    {sublink.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Cart Icon for Desktop */}
        <NavLink to="/cart" className="relative">
          <div className="text-gray-700 hover:text-red-600 transition-colors">
            <FiShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </div>
        </NavLink>
      </div>

      {/* Mobile Menu & Cart */}
      <div className="flex items-center md:hidden">
        {/* Cart Icon */}
        <NavLink to="/cart" className="relative mr-3">
          <div className="text-gray-700 hover:text-red-600 transition-colors">
            <FiShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </div>
        </NavLink>

        {/* Hamburger Button */}
        <button
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setOpenSubMenu(null);
          }}
          className="focus:outline-none text-gray-700 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => {
              setMobileOpen(false);
              setOpenSubMenu(null);
            }}
          />
          <div
            className="fixed top-16 left-0 right-0 max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-md px-3 py-3 flex flex-col gap-4 md:hidden z-50"
          >
            {navLinks.map((link, index) => (
              <div key={index}>
                <div className="flex justify-between items-center px-1 py-2">
                  <NavLink
                    to={link.path}
                    className={navLinkStyles + " text-lg py-2 px-2 rounded-md w-full"}
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
                      className="text-xl px-3 py-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none"
                    >
                      {openSubMenu === index ? "−" : "+"}
                    </button>
                  )}
                </div>
                {link.submenu && openSubMenu === index && (
                  <div className="ml-2 mt-2 flex flex-row gap-2 overflow-x-auto pb-2">
                    {link.submenu.map((sublink, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={sublink.path}
                        className="text-sm text-gray-600 hover:text-red-600 py-2 px-3 whitespace-nowrap rounded-md bg-gray-50 mr-2 min-w-[120px] text-center"
                        onClick={() => {
                          setMobileOpen(false);
                          setOpenSubMenu(null);
                        }}
                      >
                        {sublink.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
