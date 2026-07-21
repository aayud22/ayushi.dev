"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-16 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-4 z-50">
          <a
            href="/#about"
            onClick={closeMenu}
            className="flex items-center text-base font-medium text-slate-700 hover:text-slate-900 h-12 border-b border-slate-100"
          >
            About
          </a>
          <a
            href="/#skills"
            onClick={closeMenu}
            className="flex items-center text-base font-medium text-slate-700 hover:text-slate-900 h-12 border-b border-slate-100"
          >
            Skills
          </a>
          <a
            href="/#experience"
            onClick={closeMenu}
            className="flex items-center text-base font-medium text-slate-700 hover:text-slate-900 h-12 border-b border-slate-100"
          >
            Experience
          </a>
          <a
            href="/#projects"
            onClick={closeMenu}
            className="flex items-center text-base font-medium text-slate-700 hover:text-slate-900 h-12 border-b border-slate-100"
          >
            Projects
          </a>
          <a
            href="/#contact"
            onClick={closeMenu}
            className="flex items-center text-base font-medium text-slate-700 hover:text-slate-900 h-12 border-b border-slate-100"
          >
            Contact
          </a>
          
          <a
            href="/#contact"
            onClick={closeMenu}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-base font-semibold text-white hover:bg-slate-800"
          >
            Hire Me
          </a>
        </div>
      )}
    </div>
  );
}
