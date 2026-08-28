import React from "react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    items,
    cartItemCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (cartItemCount === 0) {
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center bg-[#faf7f2] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="mb-4 text-5xl" aria-hidden>
            🛒
          </div>
          <h2 className="hero-headline text-2xl text-[#1a1210] sm:text-3xl">
            Your cart is empty
          </h2>
          <p className="hero-copy mt-2 text-[#1a1210]/65">
            Add some delicious products to get started!
          </p>
          <Link
            to="/product"
            className="hero-copy mt-6 inline-flex min-h-12 items-center justify-center bg-[#c62828] px-6 py-3 text-sm font-bold text-white hover:bg-[#9b1c1c]"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  const tax = cartTotal * 0.18;
  const total = cartTotal + tax;

  return (
    <div className="w-full max-w-full min-w-0 bg-[#faf7f2] py-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center sm:mb-8"
        >
          <h1 className="hero-headline text-2xl text-[#1a1210] sm:text-3xl md:text-4xl">
            Shopping Cart
          </h1>
          <p className="hero-copy mt-1 text-sm text-[#1a1210]/60 sm:text-base">
            {cartItemCount} item{cartItemCount !== 1 ? "s" : ""} in your cart
          </p>
        </motion.div>

        <div className="grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="w-full min-w-0 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full overflow-hidden border border-[#1a1210]/10 bg-white"
            >
              <div className="border-b border-[#1a1210]/8 px-4 py-4 sm:px-6">
                <h2 className="hero-copy text-lg font-bold text-[#1a1210]">
                  Cart Items
                </h2>
              </div>

              <div className="divide-y divide-[#1a1210]/8">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#f3eee8] sm:h-20 sm:w-20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="hero-copy text-base font-bold leading-snug text-[#1a1210] sm:text-lg">
                          {item.name}
                        </h3>
                        {item.rating != null && (
                          <p className="hero-copy mt-0.5 text-xs text-[#1a1210]/55 sm:text-sm">
                            ★ {item.rating}
                            {item.reviews != null ? ` (${item.reviews})` : ""}
                          </p>
                        )}
                        <p className="hero-brand mt-1 text-xl text-[#1a1210]">
                          {typeof item.price === "number"
                            ? `₹${item.price}`
                            : item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <div className="flex h-11 items-center border border-[#1a1210]/15">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-11 w-11 items-center justify-center text-lg font-bold text-[#1a1210] hover:bg-[#f3eee8]"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="hero-copy w-10 text-center text-sm font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-11 w-11 items-center justify-center bg-[#c62828] text-lg font-bold text-white hover:bg-[#9b1c1c]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-11 w-11 items-center justify-center text-[#c62828] hover:bg-[#c62828]/10"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-[#1a1210]/8 px-4 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={clearCart}
                  className="hero-copy min-h-11 text-sm font-bold text-[#c62828] hover:underline"
                >
                  Clear All Items
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full min-w-0 lg:col-span-1"
          >
            <div className="w-full border border-[#1a1210]/10 bg-white p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="hero-copy text-lg font-bold text-[#1a1210]">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3">
                <div className="hero-copy flex justify-between text-sm text-[#1a1210]/70">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="hero-copy flex justify-between text-sm text-[#1a1210]/70">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-700">Free</span>
                </div>
                <div className="hero-copy flex justify-between text-sm text-[#1a1210]/70">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#1a1210]/10 pt-3">
                  <div className="hero-copy flex justify-between text-lg font-bold text-[#1a1210]">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="hero-copy mt-5 flex min-h-12 w-full items-center justify-center bg-[#c62828] text-sm font-bold text-white hover:bg-[#9b1c1c]"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/product"
                className="hero-copy mt-3 flex min-h-12 w-full items-center justify-center border border-[#1a1210]/15 bg-[#f3eee8] text-sm font-bold text-[#1a1210] hover:border-[#c62828]"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
