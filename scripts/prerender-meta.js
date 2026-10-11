// Writes dist/<route>.html for every indexable route with that route's
// title, description, canonical, Open Graph tags and JSON-LD baked in, so
// crawlers and link previews that don't run JavaScript see the right data.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getRouteMeta, indexableRoutes } from "../src/seo/routeMeta.js";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTag(html, pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: ${label} not found in index.html`);
  return html.replace(pattern, (_, start, end) => `${start}${escapeAttr(value)}${end}`);
}

const metaContent = (attr, key) =>
  new RegExp(`(<meta\\s+${attr}="${key.replace(/:/g, "\\:")}"\\s+content=")[^"]*(")`);

function render(pathname) {
  const meta = getRouteMeta(pathname);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);

  const tags = [
    ["name", "description", meta.description],
    ["name", "robots", meta.robots],
    ["property", "og:url", meta.url],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["property", "og:image", meta.image.url],
    ["property", "og:image:secure_url", meta.image.url],
    ["property", "og:image:type", meta.image.type],
    ["property", "og:image:width", meta.image.width],
    ["property", "og:image:height", meta.image.height],
    ["property", "og:image:alt", meta.title],
    ["name", "twitter:title", meta.title],
    ["name", "twitter:description", meta.description],
    ["name", "twitter:image", meta.image.url],
  ];
  for (const [attr, key, value] of tags) html = setTag(html, metaContent(attr, key), value, key);
  html = setTag(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, meta.url, "canonical");

  if (meta.schema.length) {
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": meta.schema }).replace(/</g, "\\u003c");
    html = html.replace("</head>", `  <script type="application/ld+json" id="route-jsonld">${json}</script>\n  </head>`);
  }
  return html;
}

for (const route of indexableRoutes) {
  const file = route === "/" ? join(dist, "index.html") : join(dist, `${route.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(route));
}

console.log(`prerender-meta: wrote ${indexableRoutes.length} pages`);
