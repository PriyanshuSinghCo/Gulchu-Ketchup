import React, { useRef } from "react";
import Whatsaap from "./../Whatsaap";
import {
  sendToWhatsApp,
  formatContactWhatsAppMessage,
} from "../../utils/whatsapp";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Itkori,+Jharkhand+825408&ll=24.2974766,85.1621946&z=16&output=embed";

const MAP_LINK =
  "https://www.google.com/maps/place/Itkori,+Jharkhand+825408/@24.2960625,85.157057,16z/data=!3m1!4b1!4m6!3m5!1s0x39f344e4e6731255:0x82cb81e6415f526f!8m2!3d24.2974766!4d85.1621946!16s%2Fg%2F11bwg7hzcn?entry=ttu";

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
      <section className="min-h-screen bg-[#faf7f2] px-4 pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="hero-copy text-xs font-bold uppercase tracking-[0.28em] text-[#c62828]">
              Get in touch
            </p>
            <h1 className="hero-headline mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1] text-[#1a1210]">
              Contact Us
            </h1>
            <p className="hero-copy mt-4 text-base leading-relaxed text-[#1a1210]/65 md:text-lg">
              Have a question, feedback, or want to say hello? Fill out the form
              and our team will get back to you soon.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Form */}
            <div className="border border-[#1a1210]/10 bg-white p-6 sm:p-8">
              <h2 className="hero-headline text-2xl text-[#1a1210]">
                Send a message
              </h2>
              <form ref={form} onSubmit={sendEmail} className="mt-6 space-y-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#c62828]"
                  required
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#c62828]"
                  required
                />
                <input
                  type="tel"
                  name="user_number"
                  placeholder="Your Phone Number"
                  className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#c62828]"
                  required
                />
                <input
                  type="text"
                  name="user_address"
                  placeholder="Your Address"
                  className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#c62828]"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className="hero-copy w-full border border-[#1a1210]/15 bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#c62828]"
                  required
                />
                <button
                  type="submit"
                  className="hero-copy min-h-12 w-full bg-[#c62828] py-3.5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#9b1c1c]"
                >
                  Send on WhatsApp
                </button>
              </form>
            </div>

            {/* Address + details */}
            <div className="flex flex-col gap-6">
              <div className="border border-[#1a1210]/10 bg-white p-6 sm:p-8">
                <h2 className="hero-headline text-2xl text-[#1a1210]">
                  Visit us
                </h2>
                <div className="mt-5 space-y-4 hero-copy text-sm leading-relaxed text-[#1a1210]/75 md:text-base">
                  <p>
                    <span className="font-bold text-[#1a1210]">
                      Kaushik Agro Food
                    </span>
                    <br />
                    Itkhori, Chatra district
                    <br />
                    Jharkhand – 825408
                  </p>
                  <p>
                    Itkhori is a community development block that forms an
                    administrative division in the Chatra subdivision of the
                    Chatra district, Jharkhand state, India.
                  </p>
                  <p>
                    <span className="font-bold text-[#1a1210]">Email:</span>{" "}
                    <a
                      href="mailto:kaushikagrofoods@gmail.com"
                      className="text-[#c62828] hover:underline"
                    >
                      kaushikagrofoods@gmail.com
                    </a>
                  </p>
                  <p>
                    <span className="font-bold text-[#1a1210]">Phone:</span>{" "}
                    <a
                      href="tel:+919905120896"
                      className="text-[#c62828] hover:underline"
                    >
                      +91 9905120896
                    </a>
                  </p>
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-[#c62828] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden border border-[#1a1210]/10 bg-white">
                <div className="border-b border-[#1a1210]/8 px-4 py-3">
                  <p className="hero-copy text-xs font-bold uppercase tracking-[0.18em] text-[#1a1210]/45">
                    Location map — Itkhori, Jharkhand 825408
                  </p>
                </div>
                <div className="aspect-[4/3] w-full sm:aspect-video">
                  <iframe
                    title="Itkhori, Jharkhand 825408 on Google Maps"
                    src={MAP_EMBED_SRC}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Whatsaap />
    </>
  );
};

export default Hero;
