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
    // image: "/nishu.jpg", // add later
    linkedin: "https://linkedin.com/in/nishu-singh",
    email: "nishu@example.com",
    bio: "Nishu Singh leads Gulchu as Managing Director, guiding brand growth, quality, and day-to-day excellence across the business.",
  },
  {
    name: "Saurabh Sharma",
    role: "GM",
    // image: "/saurabh.jpg", // add later
    linkedin: "https://linkedin.com/in/saurabh-sharma",
    email: "saurabh@example.com",
    bio: "Saurabh Sharma serves as GM, overseeing operations and ensuring quality and efficiency across Gulchu’s supply and production.",
  },
];

function MemberAvatar({ image, name, size = "lg" }) {
  const sizeClass =
    size === "lg"
      ? "h-28 w-28 text-4xl"
      : "h-24 w-24 text-3xl";

  if (image) {
    return (
      <img
        src={image}
        alt={name}
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
            <motion.button
              key={member.name}
              type="button"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              onClick={() => setSelectedMember(member)}
              className="group border border-[#1a1210]/10 bg-white p-6 text-left transition-colors hover:border-[#c62828]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]"
            >
              <div className="transition-transform duration-300 group-hover:scale-[1.03]">
                <MemberAvatar image={member.image} name={member.name} />
              </div>
              <h2 className="hero-copy mt-5 text-center text-lg font-bold text-[#1a1210] group-hover:text-[#c62828]">
                {member.name}
              </h2>
              <p className="hero-copy mt-1 text-center text-sm font-medium text-[#1a1210]/55">
                {member.role}
              </p>

              <div
                className="mt-5 flex justify-center gap-4 text-lg text-[#1a1210]/45"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#0a66c2]"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <FaLinkedin />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="transition-colors hover:text-[#c62828]"
                  aria-label={`Email ${member.name}`}
                >
                  <FaEnvelope />
                </a>
              </div>
            </motion.button>
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
