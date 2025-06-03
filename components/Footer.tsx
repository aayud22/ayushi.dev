"use client";

import { m as motion } from "framer-motion";
import Link from "next/link";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiArrowUp,
} from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: <FiGithub />, url: "https://github.com", label: "GitHub" },
    { icon: <FiTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FiLinkedin />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FiInstagram />, url: "https://instagram.com", label: "Instagram" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scroll to top button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transform -translate-y-1/2 transition-all duration-300 hover:shadow-lg"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>
        </div>

        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <Link href="#home" className="text-2xl font-bold text-white">
                Ayushi.dev
              </Link>
              <p className="mt-4 text-secondary-400 max-w-xs">
                A passionate web developer focused on creating beautiful,
                functional, and user-centered digital experiences.
              </p>

              {/* Social links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-full text-secondary-400 hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-secondary-400 mb-4">
                Subscribe to my newsletter for the latest updates and articles.
              </p>

              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-md bg-secondary-800 border border-secondary-700 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-500">
              © {new Date().getFullYear()} Ayushi.dev. All rights reserved.
            </p>

            <p className="text-secondary-500 mt-4 md:mt-0">
              Designed & Built with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
