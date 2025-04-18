import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="text-gray-300 bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">
              TechElectronics
            </h3>
            <p className="mb-4">
              Your trusted destination for premium electronics and tech
              accessories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/featured"
                  className="transition-colors hover:text-white"
                >
                  Featured Products
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="transition-colors hover:text-white"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="transition-colors hover:text-white"
                >
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/account"
                  className="transition-colors hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/account/orders"
                  className="transition-colors hover:text-white"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/account/wishlist"
                  className="transition-colors hover:text-white"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="transition-colors hover:text-white"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div id="contact">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 mt-1 mr-2" size={18} />
                <span>123 Tech Street, Electronics City, Bangalore 560100</span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 mr-2" size={18} />
                <a
                  href="tel:+919876543210"
                  className="transition-colors hover:text-white"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 mr-2" size={18} />
                <a
                  href="mailto:support@techelectronics.com"
                  className="transition-colors hover:text-white"
                >
                  support@techelectronics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-sm md:mb-0">
            &copy; {new Date().getFullYear()} TechElectronics. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-sm transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="text-sm transition-colors hover:text-white"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
