import React from "react";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";

function Whatsaap() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello! I want to know more about Gulchu products."
  )}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img
          src="/whatsapp-icon.jpg"
          alt="Chat on WhatsApp"
          className="h-12 w-12 rounded-lg bg-none"
        />
      </a>
    </div>
  );
}

export default Whatsaap;
