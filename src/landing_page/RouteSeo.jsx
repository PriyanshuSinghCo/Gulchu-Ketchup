import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.gulchu.com";
const DEFAULT_TITLE = "Gulchu – Tomato Ketchup, Sauces & Pickles | Kaushik Agro Food";
const DEFAULT_DESCRIPTION =
  "Gulchu brings farm-fresh tomato ketchup, chilli sauces, schezwan chutney, pickles and more from Itkhori, Chatra, Jharkhand. Order directly on WhatsApp.";

const pages = {
  "/": {},
  "/home": { canonical: "/" },
  "/product": {
    title: "Our Products – Ketchup, Sauces, Chutneys & Pickles | Gulchu",
    description:
      "Browse the full Gulchu range: tomato ketchup, red and green chilli sauce, schezwan chutney, pizza pasta sauce, garlic paste, pickles, mayonnaise and more.",
  },
  "/product/TomatoKetchup": {
    title: "Tomato Ketchup – Gulchu",
    description:
      "Gulchu Tomato Ketchup made from farm-fresh Chatra tomatoes. Tangy-sweet balance for snacks, burgers and fries. Available in 200g, 500g and 1kg.",
  },
  "/product/RedChilliSauce": {
    title: "Red Chilli Sauce – Gulchu",
    description: "Gulchu Red Chilli Sauce – fiery, bold heat for noodles, momos, rolls and everyday cooking.",
  },
  "/product/GreenChilli": {
    title: "Green Chilli Sauce – Gulchu",
    description: "Gulchu Green Chilli Sauce – spicy and tangy, perfect for chaat, momos, fries and snacks.",
  },
  "/product/SchezwanChutney": {
    title: "Schezwan Chutney – Gulchu",
    description: "Gulchu Schezwan Chutney – rich Indo-Chinese flavour for fried rice, noodles and dips.",
  },
  "/product/PizzaPastaSauce": {
    title: "Pizza & Pasta Sauce – Gulchu",
    description: "Gulchu Pizza & Pasta Sauce – herby tomato base for homemade pizza, pasta and sandwiches.",
  },
  "/product/GarlicPaste": {
    title: "Garlic Paste – Gulchu",
    description: "Gulchu Garlic Paste – fresh, ready-to-use garlic for curries, marinades and everyday cooking.",
  },
  "/product/Pickles(Achar)": {
    title: "Pickles (Achar) – Gulchu",
    description: "Gulchu Pickles – traditional Indian achar made with authentic spices, in 200g to 5kg packs.",
  },
  "/product/VegMayonnaise": {
    title: "Veg Mayonnaise – Gulchu",
    description: "Gulchu Veg Mayonnaise – creamy eggless mayo for sandwiches, burgers, wraps and dips.",
  },
  "/product/MomosChutney": {
    title: "Momos Chutney – Gulchu",
    description: "Gulchu Momos Chutney – the spicy red chutney that makes every plate of momos complete.",
  },
  "/product/SoyaSauce": {
    title: "Soya Sauce – Gulchu",
    description: "Gulchu Soya Sauce – savoury umami for noodles, fried rice, stir-fries and marinades.",
  },
  "/recipe": {
    title: "Recipes with Gulchu Sauces | Gulchu",
    description: "Quick snacks, main dishes and dips made easy with Gulchu ketchup, sauces and chutneys.",
  },
  "/about": {
    title: "About Gulchu – Kaushik Agro Food",
    description:
      "Gulchu is made by Kaushik Agro Food in Itkhori, Chatra, Jharkhand – turning locally grown produce into quality sauces and condiments.",
  },
  "/about/company": {
    title: "Our Company – Kaushik Agro Food | Gulchu",
    description: "The story of Kaushik Agro Food and the Gulchu brand, rooted in Chatra, Jharkhand.",
  },
  "/about/director": {
    title: "Our Vision – Director's Message | Gulchu",
    description: "Vision of Gulchu's director: empowering local farmers and delivering premium quality food products.",
  },
  "/about/ManagementTeam": {
    title: "Management Team | Gulchu",
    description: "Meet the people behind Gulchu and Kaushik Agro Food.",
  },
  "/about/video": {
    title: "Videos | Gulchu",
    description: "Watch the Gulchu journey – from farm-fresh produce to your table.",
  },
  "/contact": {
    title: "Contact Gulchu – Itkhori, Chatra, Jharkhand",
    description:
      "Get in touch with Gulchu (Kaushik Agro Food), Itkhori, Chatra, Jharkhand 825408. Call, email or message us on WhatsApp.",
  },
  "/cart": { title: "Your Cart | Gulchu", noindex: true },
  "/checkout": { title: "Checkout | Gulchu", noindex: true },
};

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname];
    const title = page?.title || (page ? DEFAULT_TITLE : "Page Not Found | Gulchu");
    const description = page?.description || DEFAULT_DESCRIPTION;
    const url = SITE_URL + (page?.canonical ?? (pathname === "/" ? "/" : pathname));
    const robots = !page || page.noindex ? "noindex, follow" : "index, follow";

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", robots);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [pathname]);

  return null;
}

export default RouteSeo;
