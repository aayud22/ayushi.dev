"use client";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowUp, FiTwitter } from "react-icons/fi";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      icon: <FiGithub className="w-5 h-5" />,
      url: "https://github.com/aayud22",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/aayushi-diyora-0aa453208/",
      label: "LinkedIn",
    },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 border-t border-gray-800/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8">
          {/* Brand Section */}
          <motion.div className="md:col-span-5 space-y-4" variants={item}>
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-cyan-400 inline-block"
            >
              Ayushi.dev
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              Crafting Web Experiences
            </p>

            {/* Social Links */}
            <motion.div className="md:col-span-3" variants={item}>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800/50 hover:bg-primary-900/20 text-gray-300 hover:text-white transition-colors duration-300 border border-gray-800 hover:border-primary-500/30"
                    aria-label={social.label}
                    variants={item}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div className="md:col-span-4 md:col-start-7" variants={item}>
            <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm font-light transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={item}
        >
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Ayushi.dev. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Back to top"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to top</span>
            <FiArrowUp className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
