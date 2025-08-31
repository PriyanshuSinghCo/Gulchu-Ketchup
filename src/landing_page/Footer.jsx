import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Gulchu</h2>
          <p className="text-sm text-gray-300 mb-4">
            Bringing the rich flavors of India to every home, one bottle at a time.
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF className="hover:text-blue-400" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="hover:text-pink-400" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="hover:text-blue-300" /></a>
            <a href="mailto:info@gulchu.com"><FaEnvelope className="hover:text-yellow-300" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/team" className="hover:text-white">Team</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <p className="text-sm text-gray-300">Kaushik Agro Food Pvt. Ltd.</p>
          <p className="text-sm text-gray-300">Chatra, Jharkhand – 825408</p>
          <p className="text-sm text-gray-300 mt-2">Phone: +91 9905120896</p>
          <p className="text-sm text-gray-300">Email: kaushikagrofoods@gmail.com
</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Gulchu | Kaushik Agro Food Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
