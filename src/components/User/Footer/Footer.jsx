import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6 font-sans">
      <div className="max-w-[1170px] mx-auto px-6 lg:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left mb-16">
          {/* Account */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Account</h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-300">
              <li>
                <Link to="/account" className="hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white">
                  Login / Signup
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Support</h2>

            <address className="not-italic text-sm md:text-base leading-relaxed text-gray-300">
              Sector 62, Noida
              <br />
              Uttar Pradesh 201301
              <br />
              India
            </address>

            <p className="text-gray-300">
              <a
                href="mailto:support@exclusive.com"
                className="hover:text-white transition-colors"
              >
                support@exclusive.com
              </a>
            </p>

            <p className="text-gray-300">
              <a
                href="tel:+919876543210"
                className="hover:text-white transition-colors"
              >
                +91 98765 43210
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Quick Link</h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Our Location</h2>

            {/* Map */}
            <div className="relative w-full overflow-hidden rounded-lg border border-gray-700">
              <div className="aspect-[16/9] relative">
                <iframe
                  title="Google Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56061.631995400734!2d77.27949583264211!3d28.574206630549256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce44e79b40629%3A0x5b9c7ae1aa7e89ba!2sNoida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 flex justify-between items-center">
                <span className="text-xs text-white">📍 Noida, India</span>
                <a
                  href="https://www.google.com/maps/place/Noida,+Uttar+Pradesh+201301"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-white text-black px-2 py-1 rounded hover:bg-gray-200 transition"
                >
                  Open Map
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-6 pt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook className="w-5 h-5 hover:text-blue-500 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
              <a href="https://www.instagram.com/raliteeofficial/" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
              </a>
              <a href="https://www.linkedin.com/company/ralitee-official/posts/?feedView=all" target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5 hover:text-blue-600 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center opacity-50 text-sm">
          © Copyright Rimel 2022. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
