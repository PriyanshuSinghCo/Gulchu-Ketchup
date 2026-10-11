import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { productDetails } from "../data/productDetails";

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

const DEFAULT_IMAGE = { url: `${SITE_URL}/og-image.jpg`, type: "image/jpeg", width: "1200", height: "630" };

const productsByPath = Object.fromEntries(productDetails.map((p) => [p.path, p]));

for (const product of productDetails) {
  const prices = product.variants.map((v) => v.price);
  const sizes = product.variants
    .slice(0, 3)
    .map((v) => v.size.replace(/\s*\(.*\)$/, ""))
    .join(", ");
  const page = pages[product.path] || {};
  page.title = `Gulchu ${product.name} – ${sizes} | Order Online`;
  page.description = `${page.description || product.tagline}. Price from ₹${Math.min(...prices)}. Order on WhatsApp.`.replace(
    /\.\./g,
    "."
  );
  pages[product.path] = page;
}

const sectionCrumbs = {
  "/product": ["Products", "/product"],
  "/about": ["About", "/about"],
};

function breadcrumbsFor(pathname, title) {
  if (pathname === "/" || pathname === "/home") return null;
  const crumbs = [["Home", "/"]];
  const section = Object.keys(sectionCrumbs).find((s) => pathname.startsWith(`${s}/`));
  if (section) crumbs.push(sectionCrumbs[section]);
  crumbs.push([title.split(/ [–|] /)[0].replace(/^Gulchu /, ""), pathname]);

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: SITE_URL + path,
    })),
  };
}

function productSchema(product, url) {
  const prices = product.variants.map((v) => v.price);
  return {
    "@type": "Product",
    name: `Gulchu ${product.name}`,
    description: product.description,
    image: SITE_URL + product.image,
    url,
    category: product.category,
    brand: { "@type": "Brand", name: "Gulchu" },
    manufacturer: { "@type": "Organization", name: "Kaushik Agro Food", url: `${SITE_URL}/` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function setJsonLd(items) {
  let el = document.getElementById("route-jsonld");
  if (!items.length) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "route-jsonld";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": items });
}

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname];
    const product = productsByPath[pathname];
    const title = page?.title || (page ? DEFAULT_TITLE : "Page Not Found | Gulchu");
    const description = page?.description || DEFAULT_DESCRIPTION;
    const url = SITE_URL + (page?.canonical ?? (pathname === "/" ? "/" : pathname));
    const robots = !page || page.noindex ? "noindex, follow" : "index, follow";
    const image = product
      ? { url: SITE_URL + product.image, type: "image/webp", width: "480", height: "720" }
      : DEFAULT_IMAGE;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", robots);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", image.url);
    setMeta('meta[property="og:image:secure_url"]', "content", image.url);
    setMeta('meta[property="og:image:type"]', "content", image.type);
    setMeta('meta[property="og:image:width"]', "content", image.width);
    setMeta('meta[property="og:image:height"]', "content", image.height);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image.url);

    const schema = [];
    if (page && !page.noindex) {
      const crumbs = breadcrumbsFor(pathname, title);
      if (crumbs) schema.push(crumbs);
      if (product) schema.push(productSchema(product, url));
    }
    setJsonLd(schema);
  }, [pathname]);

  return null;
}

export default RouteSeo;
