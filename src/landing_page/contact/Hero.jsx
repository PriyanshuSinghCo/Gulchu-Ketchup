import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiArrowUpRight, FiCheck, FiSend } from "react-icons/fi";
import Whatsaap from "./../Whatsaap";
import DatePicker from "./DatePicker";
import {
  WHATSAPP_NUMBER,
  sendToWhatsApp,
  formatContactWhatsAppMessage,
} from "../../utils/whatsapp";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Itkori,+Jharkhand+825408&ll=24.2974766,85.1621946&z=16&output=embed";

const MAP_LINK =
  "https://www.google.com/maps/place/Itkori,+Jharkhand+825408/@24.2960625,85.157057,16z/data=!3m1!4b1!4m6!3m5!1s0x39f344e4e6731255:0x82cb81e6415f526f!8m2!3d24.2974766!4d85.1621946!16s%2Fg%2F11bwg7hzcn?entry=ttu";

const ease = [0.22, 1, 0.36, 1];

const topics = [
  { id: "General", hint: "Ask us anything about Gulchu.", cta: "Send message" },
  { id: "Bulk order", hint: "For shops, hotels, caterers and events.", cta: "Request a quote" },
  { id: "Distributorship", hint: "Become a Gulchu distributor in your area.", cta: "Apply on WhatsApp" },
  { id: "Feedback", hint: "Tell us what you loved—or what we can do better.", cta: "Send feedback" },
];

const PRODUCTS = [
  "Tomato Ketchup",
  "Red Chilli Sauce",
  "Green Chilli Sauce",
  "Schezwan Chutney",
  "Pizza & Pasta Sauce",
  "Garlic Paste",
  "Pickles",
  "Veg Mayonnaise",
  "Momos Chutney",
  "Soya Sauce",
];

const BUSINESS_TYPES = ["Retailer / Shop", "Wholesaler", "Existing distributor", "Hotel / Restaurant", "New business"];
const RATING_LABELS = ["", "Poor", "Okay", "Good", "Very good", "Loved it!"];

const channels = [
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "Fastest reply",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Gulchu!")}`,
    external: true,
    accent: "bg-[#25d366]/10 text-[#1a9e4b]",
  },
  {
    Icon: FiPhone,
    label: "Call us",
    value: "+91 99051 20896",
    href: "tel:+919905120896",
    accent: "bg-[#c62828]/10 text-[#c62828]",
  },
  {
    Icon: FiMail,
    label: "Email",
    value: "kaushikagrofoods@gmail.com",
    href: "mailto:kaushikagrofoods@gmail.com",
    accent: "bg-[#1a1210]/[0.06] text-[#1a1210]",
  },
];

const inputClass =
  "hero-copy w-full rounded-xl border border-[#1a1210]/10 bg-[#faf7f2] px-4 py-3 text-sm text-[#1a1210] outline-none transition-colors placeholder:text-[#1a1210]/35 focus:border-[#c62828] focus:bg-white";

function Field({ label, optional, children }) {
  return (
    <label className="block">
      <span className="hero-copy mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1a1210]/70">
        {label}
        {optional && <span className="font-normal text-[#1a1210]/35">Optional</span>}
      </span>
      {children}
    </label>
  );
}

function ChipGroup({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            aria-pressed={on}
            className={`hero-copy inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              on
                ? "border-[#c62828] bg-[#c62828]/[0.08] text-[#c62828]"
                : "border-[#1a1210]/10 bg-white text-[#1a1210]/70 hover:border-[#1a1210]/25"
            }`}
          >
            {on && <FiCheck className="h-3.5 w-3.5" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            className="p-0.5 transition-transform hover:scale-110 active:scale-95"
          >
            <svg viewBox="0 0 20 20" className={`h-8 w-8 ${n <= shown ? "text-[#f2a20c]" : "text-[#1a1210]/15"}`} fill="currentColor">
              <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
            </svg>
          </button>
        ))}
      </div>
      <span className="hero-copy text-sm font-semibold text-[#1a1210]/60">{RATING_LABELS[shown]}</span>
    </div>
  );
}

const Hero = () => {
  const form = useRef();
  const [topicId, setTopicId] = useState(topics[0].id);
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const topic = topics.find((t) => t.id === topicId);

  const toggleProduct = (p) => {
    setError("");
    setProducts((list) => (list.includes(p) ? list.filter((x) => x !== p) : [...list, p]));
  };

  const switchTopic = (id) => {
    setTopicId(id);
    setProducts([]);
    setRating(0);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    const get = (key) => String(data.get(key) || "").trim();

    if (topicId === "Bulk order" && products.length === 0) {
      setError("Please pick at least one product.");
      return;
    }
    if (topicId === "Feedback" && rating === 0) {
      setError("Please give a star rating.");
      return;
    }

    const common = [
      ["Name", get("name")],
      ["Phone", get("phone")],
    ];
    const byTopic = {
      General: [
        ["Email", get("email")],
        ["City", get("city")],
        ["Message", get("message")],
      ],
      "Bulk order": [
        ["Business", get("business")],
        ["Products", products.join(", ")],
        ["Quantity", get("quantity")],
        ["Delivery city", get("city")],
        ["Needed by", get("date")],
        ["Notes", get("message")],
      ],
      Distributorship: [
        ["Firm name", get("business")],
        ["Business type", get("businessType")],
        ["Area to cover", get("area")],
        ["GST number", get("gst")],
        ["Email", get("email")],
        ["About the business", get("message")],
      ],
      Feedback: [
        ["Product", get("product")],
        ["Rating", `${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`],
        ["Feedback", get("message")],
      ],
    };

    sendToWhatsApp(
      formatContactWhatsAppMessage({ topic: topicId, fields: [...common, ...byTopic[topicId]] })
    );
    form.current.reset();
    switchTopic(topics[0].id);
    setSent(true);
  };

  return (
    <>
      <section className="bg-[#faf7f2] px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="max-w-2xl"
          >
            <span className="hero-copy inline-flex items-center gap-2 rounded-full bg-[#c62828]/[0.08] px-3 py-1 text-xs font-semibold text-[#c62828]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c62828]" aria-hidden />
              Contact us
            </span>
            <h1 className="hero-headline mt-5 text-[clamp(2.3rem,5vw,3.8rem)] leading-[1.05] tracking-tight text-[#1a1210]">
              Let's talk <span className="text-[#c62828]">Gulchu.</span>
            </h1>
            <p className="hero-copy mt-4 text-base leading-relaxed text-[#1a1210]/60 md:text-lg">
              Questions, bulk orders, distributorship or just feedback—reach us the way that suits you.
            </p>
          </motion.div>

          {/* Quick channels */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {channels.map(({ Icon, label, value, href, external, accent }, i) => (
              <motion.a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease }}
                className="group flex items-center gap-4 rounded-2xl border border-[#1a1210]/[0.07] bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1a1210]/10 hover:shadow-[0_16px_34px_-20px_rgba(90,18,18,0.4)] sm:p-5"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${accent}`}>
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="hero-copy block text-sm font-bold text-[#1a1210]">{label}</span>
                  <span className="hero-copy block truncate text-sm text-[#1a1210]/55">{value}</span>
                </span>
                <FiArrowUpRight className="shrink-0 text-[#1a1210]/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c62828]" />
              </motion.a>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease }}
              className="relative rounded-3xl border border-[#1a1210]/[0.07] bg-white p-5 shadow-[0_24px_50px_-35px_rgba(90,18,18,0.45)] sm:p-8"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1b7a3e]/10 text-3xl text-[#1b7a3e]"
                    >
                      <FiCheck />
                    </motion.span>
                    <h2 className="hero-headline mt-5 text-2xl text-[#1a1210]">Almost there!</h2>
                    <p className="hero-copy mt-2 max-w-sm text-sm leading-relaxed text-[#1a1210]/60">
                      WhatsApp has opened with your message ready. Just tap <b>Send</b> there and our team
                      will get back to you.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="hero-copy mt-6 inline-flex h-11 items-center rounded-full border border-[#1a1210]/15 px-6 text-sm font-semibold text-[#1a1210] transition-colors hover:border-[#c62828] hover:text-[#c62828]"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="hero-copy text-xl font-bold text-[#1a1210]">Send us a message</h2>
                    <p className="hero-copy mt-1 text-sm text-[#1a1210]/55">
                      Your message opens in WhatsApp, ready to send.
                    </p>

                    <div className="mt-6">
                      <span className="hero-copy mb-2 block text-xs font-semibold text-[#1a1210]/70">
                        What is this about?
                      </span>
                      <div className="relative flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => switchTopic(t.id)}
                            aria-pressed={topicId === t.id}
                            className={`hero-copy relative rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                              topicId === t.id ? "text-white" : "bg-[#f6f1ea] text-[#1a1210]/70 hover:bg-[#ece4d9]"
                            }`}
                          >
                            {topicId === t.id && (
                              <motion.span
                                layoutId="topic-pill"
                                className="absolute inset-0 rounded-full bg-[#1a1210]"
                                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                              />
                            )}
                            <span className="relative">{t.id}</span>
                          </button>
                        ))}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={topic.hint}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="hero-copy mt-2.5 text-xs text-[#1a1210]/50"
                        >
                          {topic.hint}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    <form ref={form} onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Your name">
                          <input type="text" name="name" placeholder="Priya Sharma" className={inputClass} required />
                        </Field>
                        <Field label="Phone number">
                          <input type="tel" name="phone" placeholder="98765 43210" className={inputClass} required />
                        </Field>
                      </div>

                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={topicId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease }}
                          className="space-y-4"
                        >
                          {topicId === "General" && (
                            <>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Email" optional>
                                  <input type="email" name="email" placeholder="you@example.com" className={inputClass} />
                                </Field>
                                <Field label="City" optional>
                                  <input type="text" name="city" placeholder="Ranchi, Jharkhand" className={inputClass} />
                                </Field>
                              </div>
                              <Field label="Message">
                                <textarea name="message" rows="4" placeholder="Tell us how we can help…" className={`${inputClass} resize-none`} required />
                              </Field>
                            </>
                          )}

                          {topicId === "Bulk order" && (
                            <>
                              <Field label="Shop / business name" optional>
                                <input type="text" name="business" placeholder="Sharma General Store" className={inputClass} />
                              </Field>
                              <div>
                                <span className="hero-copy mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1a1210]/70">
                                  Products you need
                                  {products.length > 0 && (
                                    <span className="font-normal text-[#c62828]">{products.length} selected</span>
                                  )}
                                </span>
                                <ChipGroup options={PRODUCTS} selected={products} onToggle={toggleProduct} />
                              </div>
                              <div className="grid gap-4 sm:grid-cols-3">
                                <Field label="Approx. quantity">
                                  <input type="text" name="quantity" placeholder="e.g. 20 cartons" className={inputClass} required />
                                </Field>
                                <Field label="Delivery city">
                                  <input type="text" name="city" placeholder="Hazaribagh" className={inputClass} required />
                                </Field>
                                <div>
                                  <span className="hero-copy mb-1.5 flex items-center justify-between text-xs font-semibold text-[#1a1210]/70">
                                    Needed by
                                    <span className="font-normal text-[#1a1210]/35">Optional</span>
                                  </span>
                                  <DatePicker name="date" placeholder="Select date" />
                                </div>
                              </div>
                              <Field label="Notes" optional>
                                <textarea name="message" rows="2" placeholder="Pack sizes, event details…" className={`${inputClass} resize-none`} />
                              </Field>
                            </>
                          )}

                          {topicId === "Distributorship" && (
                            <>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Firm / business name">
                                  <input type="text" name="business" placeholder="Singh Traders" className={inputClass} required />
                                </Field>
                                <Field label="Business type">
                                  <select name="businessType" className={inputClass} required defaultValue="">
                                    <option value="" disabled>Select type</option>
                                    {BUSINESS_TYPES.map((b) => (
                                      <option key={b}>{b}</option>
                                    ))}
                                  </select>
                                </Field>
                              </div>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="District / area to cover">
                                  <input type="text" name="area" placeholder="Chatra & Hazaribagh" className={inputClass} required />
                                </Field>
                                <Field label="GST number" optional>
                                  <input type="text" name="gst" placeholder="20ABCDE1234F1Z5" className={`${inputClass} uppercase`} />
                                </Field>
                              </div>
                              <Field label="Email" optional>
                                <input type="email" name="email" placeholder="you@example.com" className={inputClass} />
                              </Field>
                              <Field label="Tell us about your business" optional>
                                <textarea name="message" rows="3" placeholder="Years in business, current brands, warehouse, vehicles…" className={`${inputClass} resize-none`} />
                              </Field>
                            </>
                          )}

                          {topicId === "Feedback" && (
                            <>
                              <Field label="Which product?">
                                <select name="product" className={inputClass} required defaultValue="">
                                  <option value="" disabled>Select a product</option>
                                  {PRODUCTS.map((p) => (
                                    <option key={p}>{p}</option>
                                  ))}
                                  <option>Overall Gulchu experience</option>
                                </select>
                              </Field>
                              <div>
                                <span className="hero-copy mb-1.5 block text-xs font-semibold text-[#1a1210]/70">Your rating</span>
                                <StarInput value={rating} onChange={(n) => { setRating(n); setError(""); }} />
                              </div>
                              <Field label="Your feedback">
                                <textarea name="message" rows="4" placeholder="What did you like? What can we improve?" className={`${inputClass} resize-none`} required />
                              </Field>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {error && (
                        <p role="alert" className="hero-copy text-sm font-semibold text-[#c62828]">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="hero-copy group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c62828] text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(198,40,40,0.8)] transition-colors hover:bg-[#9b1c1c] active:scale-[0.99]"
                      >
                        <FiSend className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        {topic.cta}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Visit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease }}
              className="flex flex-col overflow-hidden rounded-3xl border border-[#1a1210]/[0.07] bg-white"
            >
              <div className="p-5 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c62828]/10 text-xl text-[#c62828]">
                    <FiMapPin />
                  </span>
                  <div>
                    <h2 className="hero-copy text-xl font-bold text-[#1a1210]">Visit us</h2>
                    <p className="hero-copy mt-2 text-sm leading-relaxed text-[#1a1210]/65">
                      <span className="font-semibold text-[#1a1210]">Kaushik Agro Food</span>
                      <br />
                      Itkhori, Chatra district
                      <br />
                      Jharkhand – 825408, India
                    </p>
                  </div>
                </div>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-copy mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#1a1210] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#c62828]"
                >
                  Get directions
                  <FiArrowUpRight />
                </a>
              </div>
              <div className="relative mx-2 mb-2 min-h-[260px] flex-1 overflow-hidden rounded-2xl bg-[#f6f1ea]">
                <iframe
                  title="Gulchu – Itkhori, Jharkhand 825408 on Google Maps"
                  src={MAP_EMBED_SRC}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Whatsaap />
    </>
  );
};

export default Hero;
