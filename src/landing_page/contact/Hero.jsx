import React, { useRef } from "react";
import Whatsaap from "./../Whatsaap";
import {
  sendToWhatsApp,
  formatContactWhatsAppMessage,
} from "../../utils/whatsapp";

const Hero = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const data = new FormData(form.current);
    const name = String(data.get("user_name") || "").trim();
    const email = String(data.get("user_email") || "").trim();
    const phone = String(data.get("user_number") || "").trim();
    const address = String(data.get("user_address") || "").trim();
    const message = String(data.get("message") || "").trim();

    const waMessage = formatContactWhatsAppMessage({
      name,
      email,
      phone,
      address,
      message,
    });

    sendToWhatsApp(waMessage);
    alert("Opening WhatsApp to send your message…");
    form.current.reset();
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto mt-20 flex max-w-4xl flex-col items-center gap-10 rounded-2xl bg-white p-8 shadow-lg md:flex-row md:p-12">
          <div className="mb-8 w-full text-center md:mb-0 md:w-1/2 md:text-left">
            <h1 className="mb-4 text-4xl font-bold text-red-700">Contact Us</h1>
            <p className="mb-6 text-gray-700">
              Have a question, feedback, or want to say hello? Fill out the form
              and our team will get back to you soon!
            </p>
            <div className="text-gray-600">
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                kaushikagrofoods@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +91 9905120896
              </p>
            </div>
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full space-y-5 md:w-1/2"
          >
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="tel"
              name="user_number"
              placeholder="Your Phone Number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="text"
              name="user_address"
              placeholder="Your Address"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"
            >
              Send on WhatsApp
            </button>
          </form>
        </div>
      </section>
      <Whatsaap />
    </>
  );
};

export default Hero;
