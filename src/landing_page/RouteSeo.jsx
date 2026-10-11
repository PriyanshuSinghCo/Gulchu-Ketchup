import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "../seo/routeMeta.js";

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
    const { title, description, url, robots, image, schema } = getRouteMeta(pathname);

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
    setMeta('meta[property="og:image:alt"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image.url);
    setJsonLd(schema);
  }, [pathname]);

  return null;
}

export default RouteSeo;
