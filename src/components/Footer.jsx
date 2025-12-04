// src/components/Footer.jsx
import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ArrowRight, 
  Sprout 
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "../i18n"; 

export default function Footer() {
  const { t } = useLocale();

  // --- Helper Data Access ---
  const title = "Swastik Organic"; // Updated per your instruction
  const tagline = "Save Soil, Save Farmers";
  const address = t("contact.address") || "Plot No. 365/1, Katalwahi, Post-Musra, Rajnandgaon (C.G)";
  const phone = t("contact.phone") || "+91-7694909846";
  const email = t("site.email") || "info@swasticorganic.com";
  
  const social = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#"
  };

  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative bg-emerald-950 text-emerald-50 font-sans overflow-hidden">
      
      {/* --- Ambient Background Effects (Matches Preloader) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px]" />
      </div>

      {/* --- Top Section: Main Grid --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          
          {/* Column 1: Brand Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <a href="#home" className="flex items-center gap-3 group w-fit">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-emerald-800 group-hover:border-emerald-500 transition-colors shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl tracking-tight text-white">{title}</h3>
                  <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Kisan Mitra</span>
                </div>
              </a>

              <p className="mt-4 text-sm text-emerald-100/60 leading-relaxed max-w-xs">
                {tagline}. Dedicated to research, development, and production of high-quality bio-fertilizers for over a decade.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialLink href={social.facebook} icon={<Facebook size={18} />} />
              <SocialLink href={social.twitter} icon={<Twitter size={18} />} />
              <SocialLink href={social.linkedin} icon={<Linkedin size={18} />} />
              <SocialLink href={social.instagram} icon={<Instagram size={18} />} />
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              Company <span className="h-px w-8 bg-emerald-800"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="#home" label={t("nav.home") || "Home"} />
              <FooterLink href="#about" label={t("nav.about") || "About Us"} />
              <FooterLink href="#research" label={t("nav.research") || "R&D"} />
              <FooterLink href="#distributors" label={t("nav.distributors") || "Distributors"} />
              <FooterLink href="#contact" label={t("nav.contact") || "Contact"} />
            </ul>
          </motion.div>

          {/* Column 3: Products */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              Products <span className="h-px w-8 bg-emerald-800"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="#products" label="BIO PROM" />
              <FooterLink href="#products" label="BIO CHAR" />
              <FooterLink href="#products" label="BIO POTASH" />
              <FooterLink href="#products" label="BIO NPK" />
              <FooterLink href="#products" label="Plant Booster" />
            </ul>
          </motion.div>

          {/* Column 4: Contact & Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              Get in Touch <span className="h-px w-8 bg-emerald-800"></span>
            </h4>
            <ul className="space-y-5 text-sm mb-8">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors mt-0.5">
                    <MapPin size={16} />
                </div>
                <span className="text-emerald-100/70 leading-snug group-hover:text-emerald-50 transition-colors">{address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone size={16} />
                </div>
                <span className="text-emerald-100/70 group-hover:text-emerald-50 transition-colors">{phone}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Mail size={16} />
                </div>
                <span className="text-emerald-100/70 group-hover:text-emerald-50 transition-colors">{email}</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Subscribe to newsletter" 
                className="w-full bg-emerald-900/30 border border-emerald-800/50 rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-emerald-500 focus:bg-emerald-900/50 text-emerald-50 placeholder-emerald-700 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-md text-white transition-all shadow-lg hover:shadow-emerald-500/25">
                <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>

        </motion.div>
      </div>

      {/* --- Bottom Section: Copyright --- */}
      <div className="relative z-10 border-t border-emerald-900/50 bg-emerald-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-400/60">
          <p className="flex items-center gap-1">
            © {currentYear} {title}. <span className="hidden sm:inline">|</span> <span className="flex items-center gap-1"><Sprout size={12} /> Cultivating Future</span>
          </p>
          <div className="flex gap-8">
            <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function FooterLink({ href, label }) {
  return (
    <li>
      <a 
        href={href} 
        className="group flex items-center gap-2 text-emerald-100/60 hover:text-emerald-400 transition-colors duration-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
      </a>
    </li>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a 
      href={href} 
      className="w-9 h-9 rounded-lg bg-emerald-900/40 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
    >
      {icon}
    </a>
  );
}