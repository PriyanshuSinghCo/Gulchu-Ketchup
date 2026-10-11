import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaUser } from "react-icons/fa";

const teamMembers = [
  {
    name: "Mr. Praveen Kumar Singh",
    role: "Founder & Managing Director",
    image: "/Praveen Singh.jpeg",
    linkedin: "https://linkedin.com/in/praveen-kumar",
    email: "praveen@example.com",
    bio: "Praveen brings 20+ years of agro-industrial experience and leads with a vision of innovation and trust.",
  },
  {
    name: "Nishu Singh",
    role: "Managing Director",
    image: "/Nishu.jpeg",
    imagePosition: "50% 30%",
    linkedin: "https://linkedin.com/in/nishu-singh",
    email: "nishu@example.com",
    bio: "Nishu Singh leads Gulchu as Managing Director, guiding brand growth, quality, and day-to-day excellence across the business.",
  },
  {
    name: "Saurabh Sharma",
    role: "GM",
    image: "/Sourav.png",
    linkedin: "https://linkedin.com/in/saurabh-sharma",
    email: "saurabh@example.com",
    bio: "Saurabh Sharma serves as GM, overseeing operations and ensuring quality and efficiency across Gulchu’s supply and production.",
  },
];

function MemberAvatar({ image, imagePosition = "50% 15%", name, size = "lg" }) {
  const sizeClass =
    size === "lg"
      ? "h-28 w-28 text-4xl"
      : "h-24 w-24 text-3xl";

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        style={{ objectPosition: imagePosition }}
        className={`mx-auto rounded-full object-cover ring-4 ring-[#f3eee8] ${sizeClass}`}
      />
    );
  }

  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-full bg-[#f3eee8] text-[#c62828] ring-4 ring-white ${sizeClass}`}
      aria-hidden
    >
      <FaUser />
    </div>
  );
}

function ManagementTeam() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="min-h-[100svh] bg-[#faf7f2] px-6 pb-20 pt-10 text-[#1a1210] md:pb-28 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="hero-copy text-xs font-bold uppercase tracking-[0.28em] text-[#c62828]">
            Leadership
          </p>
          <h1 className="hero-headline mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] text-[#1a1210]">
            Our Management Team
          </h1>
          <p className="hero-copy mt-4 text-base leading-relaxed text-[#1a1210]/65 md:text-lg">
            Meet the people behind Kaushik Agro Food—driving innovation, quality,
            and trust across every Gulchu product.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl bg-white px-6 pb-6 text-center ring-1 ring-[#1a1210]/8 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(139,30,30,0.5)] hover:ring-[#c62828]/25">
                <div className="relative -mx-6 h-24 w-[calc(100%+3rem)] overflow-hidden bg-gradient-to-br from-[#d32f2f] via-[#b71c1c] to-[#7a1212]">
                  <span
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                    aria-hidden
                  />
                  <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-white/20 transition-transform duration-700 group-hover:scale-125" aria-hidden />
                  <span className="absolute -left-6 -bottom-12 h-24 w-24 rounded-full bg-[#f5b301]/25 blur-xl" aria-hidden />
                  <span className="hero-copy absolute left-5 top-4 text-xs font-bold tabular-nums tracking-[0.2em] text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative -mt-14">
                  <span
                    className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#f5b301,#c62828,#f5b301,#c62828,#f5b301)] opacity-0 transition-opacity duration-500 group-hover:animate-[spin_5s_linear_infinite] group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="relative block rounded-full bg-white p-1 transition-transform duration-500 group-hover:scale-[1.04]">
                    <MemberAvatar image={member.image} imagePosition={member.imagePosition} name={member.name} />
                  </span>
                </div>

                <h2 className="hero-copy mt-5 text-lg font-extrabold tracking-tight text-[#1a1210] transition-colors group-hover:text-[#c62828] sm:text-xl">
                  {member.name}
                </h2>
                <span className="hero-copy mt-2 rounded-full bg-[#c62828]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#c62828]">
                  {member.role}
                </span>
                <p className="hero-copy mt-4 line-clamp-2 text-sm leading-relaxed text-[#1a1210]/60">
                  {member.bio}
                </p>

                <div className="mt-auto flex w-full items-center justify-between border-t border-[#1a1210]/8 pt-4">
                  <span className="hero-copy inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1210]/70 transition-colors group-hover:text-[#c62828]">
                    View profile
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                  </span>
                  <div className="relative z-20 flex gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#faf7f2] text-[#1a1210]/55 transition-colors hover:bg-[#0a66c2] hover:text-white"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#faf7f2] text-[#1a1210]/55 transition-colors hover:bg-[#c62828] hover:text-white"
                      aria-label={`Email ${member.name}`}
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]"
                  aria-label={`View ${member.name}'s profile`}
                />
              </article>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1a1210]/55 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="team-member-name"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md border border-[#1a1210]/10 bg-white p-7 pt-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-2xl text-[#1a1210]/45 transition-colors hover:text-[#c62828]"
                aria-label="Close"
              >
                ×
              </button>

              <MemberAvatar
                image={selectedMember.image}
                imagePosition={selectedMember.imagePosition}
                name={selectedMember.name}
                size="md"
              />
              <h3
                id="team-member-name"
                className="hero-headline mt-4 text-center text-2xl text-[#1a1210]"
              >
                {selectedMember.name}
              </h3>
              <p className="hero-copy mt-1 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#c62828]">
                {selectedMember.role}
              </p>
              <p className="hero-copy mt-4 text-center text-sm leading-relaxed text-[#1a1210]/70">
                {selectedMember.bio}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ManagementTeam;
