"use client";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: <FiGithub />, url: "https://github.com/aayud22", label: "GitHub" },
    { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/aayushi-diyora-0aa453208/", label: "LinkedIn" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="#home" className="text-3xl font-bold text-white mb-6 inline-block">
              Ayushi.dev
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Crafting exceptional digital experiences through clean code and thoughtful design.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-primary-600 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Navigation
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-0.5 bg-primary-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400">Have a project in mind? Let's talk about how I can help you.</p>
              <a 
                href="mailto:contact@ayushi.dev" 
                className="text-primary-400 hover:text-primary-300 transition-colors duration-300 inline-block mt-2"
              >
                contact@ayushi.dev
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ayushi.dev. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Back to top"
          >
            <span className="mr-2">Back to top</span>
            <FiArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
