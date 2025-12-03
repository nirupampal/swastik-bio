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
import { useLocale } from "../i18n";

export default function Footer() {
  const { t } = useLocale();

  // --- Helper Data Access ---
  const title = t("site.title") || "Kisan Mitra Swastic Organic";
  const tagline = t("site.tagline") || "Save Soil — Save Farmers";
  const address = t("contact.address") || "Plot No. 365/1, Katalwahi, Post-Musra, Rajnandgaon (C.G)";
  const phone = t("contact.phone") || "+91-7694909846";
  const email = t("site.email") || "info@swasticorganic.com"; // Assuming email is in site or contact
  
  // Safe access for social links (mock data if not in JSON)
  const social = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#"
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-emerald-900">
      
      {/* --- Top Section: Main Grid --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Info */}
      <div className="space-y-6">
  <div>
    <a href="#home" className="flex items-center gap-3 group">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform shadow-sm"
      />
    </a>

    <p className="mt-3 text-sm text-emerald-100/70 leading-relaxed">
      {tagline}. Dedicated to research, development, and production of high-quality bio-fertilizers for over a decade.
    </p>
  </div>

  {/* Social Icons */}
  <div className="flex items-center gap-4">
    <SocialLink href={social.facebook} icon={<Facebook size={18} />} />
    <SocialLink href={social.twitter} icon={<Twitter size={18} />} />
    <SocialLink href={social.linkedin} icon={<Linkedin size={18} />} />
    <SocialLink href={social.instagram} icon={<Instagram size={18} />} />
  </div>
</div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="#home" label={t("nav.home") || "Home"} />
              <FooterLink href="#about" label={t("nav.about") || "About Us"} />
              <FooterLink href="#research" label={t("nav.research") || "R&D"} />
              <FooterLink href="#distributors" label={t("nav.distributors") || "Distributors"} />
              <FooterLink href="#contact" label={t("nav.contact") || "Contact"} />
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="#products" label="BIO PROM" />
              <FooterLink href="#products" label="BIO CHAR" />
              <FooterLink href="#products" label="BIO POTASH" />
              <FooterLink href="#products" label="BIO NPK" />
              <FooterLink href="#products" label="Plant Booster" />
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span className="text-slate-400">{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span className="text-slate-400">{email}</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-emerald-500 text-white placeholder-slate-600 transition-colors"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-white transition-colors">
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* --- Bottom Section: Copyright --- */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {title}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="/sitemap" className="hover:text-emerald-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components for Clean Code ---

function FooterLink({ href, label }) {
  return (
    <li>
      <a 
        href={href} 
        className="text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200 inline-block"
      >
        {label}
      </a>
    </li>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a 
      href={href} 
      className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
    >
      {icon}
    </a>
  );
}