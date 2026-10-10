const WHATSAPP_NUMBER = "919905120896";

/** Open WhatsApp chat with a pre-filled message */
export function sendToWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/** fields: array of [label, value]; empty values are skipped */
export function formatContactWhatsAppMessage({ topic, fields }) {
  return [
    `*New ${topic} Enquiry — Gulchu*`,
    "",
    ...fields
      .filter(([, value]) => value)
      .map(([label, value]) => `*${label}:* ${value}`),
  ].join("\n");
}

export function formatOrderWhatsAppMessage({
  orderId,
  customer,
  items,
  subtotal,
  tax,
  shipping,
  total,
}) {
  const itemLines = items
    .map((item) => {
      const raw =
        typeof item.price === "string"
          ? Number(item.price.replace(/[^\d.]/g, ""))
          : Number(item.price);
      const price = Number.isFinite(raw) ? raw : 0;
      const qty = item.quantity || 1;
      return `• ${item.name} x${qty} — ₹${(price * qty).toFixed(2)}`;
    })
    .join("\n");

  const payment =
    customer.paymentMethod === "cod"
      ? "Cash on Delivery (COD)"
      : "Online Payment";

  return [
    `*New Order — Gulchu*`,
    `*Order ID:* ${orderId}`,
    "",
    "*Customer*",
    `Name: ${customer.firstName} ${customer.lastName}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone}`,
    "",
    "*Shipping Address*",
    customer.address,
    `${customer.city}, ${customer.state} — ${customer.pincode}`,
    "",
    "*Items*",
    itemLines,
    "",
    `Subtotal: ₹${subtotal.toFixed(2)}`,
    `Tax (18%): ₹${tax.toFixed(2)}`,
    `Shipping: ${shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}`,
    `*Total: ₹${total.toFixed(2)}*`,
    `Payment: ${payment}`,
  ].join("\n");
}

export { WHATSAPP_NUMBER };
