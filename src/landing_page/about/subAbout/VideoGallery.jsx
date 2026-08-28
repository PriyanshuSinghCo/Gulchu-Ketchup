import React, { useState } from "react";
import { motion } from "framer-motion";

const videos = [
  {
    id: "XZQ7bYXEE5g",
    title: "Gulchu — Freshness in every bite",
    blurb: "See how Gulchu brings farm-fresh taste to everyday cooking.",
  },
  {
    id: "dpAJDYnqVJs",
    title: "Crafted with care",
    blurb: "From Chatra kitchens to your table—quality you can taste.",
  },
];

function VideoGallery() {
  const [activeId, setActiveId] = useState(videos[0].id);
  const active = videos.find((v) => v.id === activeId) || videos[0];

  return (
    <section className="min-h-[100svh] bg-[#faf7f2] px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <p className="hero-copy text-xs font-bold uppercase tracking-[0.28em] text-[#c62828]">
            Watch
          </p>
          <h1 className="hero-headline mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1] text-[#1a1210]">
            Our Videos
          </h1>
          <p className="hero-copy mt-4 text-base leading-relaxed text-[#1a1210]/65 md:text-lg">
            Stories, craft, and flavour from Kaushik Agro Food—watch Gulchu come
            to life.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.75fr] lg:items-start lg:gap-10">
          {/* Featured player */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
          >
            <div className="overflow-hidden border border-[#1a1210]/10 bg-[#1a1210]">
              <div className="aspect-video w-full">
                <iframe
                  key={active.id}
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${active.id}?rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="hero-headline text-2xl text-[#1a1210] md:text-3xl">
                {active.title}
              </h2>
              <p className="hero-copy mt-2 text-sm leading-relaxed text-[#1a1210]/65 md:text-base">
                {active.blurb}
              </p>
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="flex flex-col gap-3"
          >
            <p className="hero-copy text-xs font-bold uppercase tracking-[0.2em] text-[#1a1210]/45">
              More videos
            </p>
            {videos.map((video, index) => {
              const isActive = video.id === activeId;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveId(video.id)}
                  className={`group flex gap-3 border p-3 text-left transition-colors ${
                    isActive
                      ? "border-[#c62828]/40 bg-[#c62828]/8"
                      : "border-[#1a1210]/10 bg-white hover:border-[#c62828]/30"
                  }`}
                >
                  <span className="relative h-20 w-32 shrink-0 overflow-hidden bg-[#1a1210]">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt=""
                      className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className={`absolute inset-0 flex items-center justify-center ${
                        isActive ? "bg-[#c62828]/25" : "bg-black/25"
                      }`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#c62828]">
                        ▶
                      </span>
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-col justify-center">
                    <span className="hero-copy text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a1210]/40">
                      Video {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`hero-copy mt-1 text-sm font-bold leading-snug ${
                        isActive ? "text-[#c62828]" : "text-[#1a1210]"
                      }`}
                    >
                      {video.title}
                    </span>
                    <span className="hero-copy mt-1 line-clamp-2 text-xs text-[#1a1210]/55">
                      {video.blurb}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VideoGallery;
