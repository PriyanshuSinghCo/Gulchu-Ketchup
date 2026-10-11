import React from "react";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";

function Whatsaap() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello! I want to know more about Gulchu products."
  )}`;

  return (
    <div className="fab-safe fixed right-3 z-50 sm:right-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl p-1 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="/img/whatsapp-icon.webp"
          alt=""
          className="h-12 w-12 rounded-lg sm:h-14 sm:w-14"
        />
      </a>
    </div>
  );
}

export default Whatsaap;
