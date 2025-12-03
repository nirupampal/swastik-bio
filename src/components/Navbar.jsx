// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sprout, Phone, Globe } from "lucide-react";
import { useLocale } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { id: "home", key: "nav.home", href: "#home" },
  { id: "products", key: "nav.products", href: "#products" },
  { id: "about", key: "nav.about", href: "#about" },
  { id: "contact", key: "nav.contact", href: "#contact" }
];

export default function Navbar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect: Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-emerald-100/50 py-2" 
          : "bg-white/50 backdrop-blur-sm border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- Logo Section --- */}
  <a href="#home" className="flex items-center gap-3 group">
  <img 
    src="/logo.png" 
    alt="Logo" 
    className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform shadow-sm"
  />
</a>



        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="relative text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors py-2 group/link"
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover/link:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 mx-2" />

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/10 active:transform active:scale-95"
            >
              {t("hero.ctaSecondary") || "Contact Sales"}
            </a>
          </div>
        </nav>

        {/* --- Mobile Controls --- */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-emerald-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-6">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-md active:scale-95 transition-transform"
                >
                  {t("hero.ctaSecondary") || "Contact Sales"}
                </a>
                
                <div className="mt-6 flex justify-center gap-6 text-slate-400">
                  <div className="flex items-center gap-2 text-xs">
                     <Phone size={14} /> <span>+91-7694909846</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                     <Globe size={14} /> <span>swasticorganic.com</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}