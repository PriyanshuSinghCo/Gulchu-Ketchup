import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-5 bg-gray-900 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-red-500">Gulchu</h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-300">
            Bringing the rich flavors of India to every home, one bottle at a time.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:text-blue-300">
              <FaLinkedin />
            </a>
            <a href="mailto:kaushikagrofoods@gmail.com" aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:text-yellow-300">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/about" className="inline-flex min-h-11 items-center hover:text-white">About Us</Link></li>
            <li><Link to="/product" className="inline-flex min-h-11 items-center hover:text-white">Products</Link></li>
            <li><Link to="/contact" className="inline-flex min-h-11 items-center hover:text-white">Contact</Link></li>
            <li><Link to="/about/ManagementTeam" className="inline-flex min-h-11 items-center hover:text-white">Team</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Contact Us</h3>
          <p className="text-sm leading-relaxed text-gray-300">Kaushik Agro Food</p>
          <p className="text-sm leading-relaxed text-gray-300">Itkhori, Chatra, Jharkhand – 825408</p>
          <a href="tel:+919905120896" className="mt-2 inline-flex min-h-11 items-center text-sm text-gray-300 hover:text-white">
            Phone: +91 9905120896
          </a>
          <br />
          <a href="mailto:kaushikagrofoods@gmail.com" className="inline-flex min-h-11 items-center text-sm text-gray-300 hover:text-white">
            Email: kaushikagrofoods@gmail.com
          </a>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Gulchu | Kaushik Agro Food. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
