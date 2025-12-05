// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../i18n"; // Import the hook

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { locale } = useLocale(); // Get current language

  // --- LOCALIZATION LOGIC ---
  // 1. Try current locale, 2. Fallback to English, 3. Empty object safety
  const tData = product.translations?.[locale] || product.translations?.['en'] || {};
  
  // Extract fields from the localized data
  const title = tData.title || product.title || "Product";
  const subtitle = tData.subtitle || product.subtitle || "Agricultural Input";
  const description = tData.description || product.description || "";

  // Image is usually at the root level (shared across languages)
  const image = product.image_url || product.image || null;
  // ---------------------------

  const BASE = import.meta.env.VITE_PUBLIC_IMAGE_URL || "https://swastik.tnbpos.in";

  const normalizeImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const imageSrc = normalizeImage(image);

  // ... (Keep your animation variants and JSX the same below) ...
  
  const cardVariants = {
    rest: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  const buttonVariants = {
    rest: { scale: 1, x: 0 },
    hover: { scale: 1.1, x: 3, transition: { type: "spring", stiffness: 400 } }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden cursor-pointer border border-slate-200/80"
      onClick={handleClick}
    >
      {/* ... (Keep the rest of your JSX exactly as it was, just ensure variables match) ... */}
      
      {/* Image Section */}
      <div className="relative h-56 w-full bg-slate-50/50 overflow-hidden flex items-center justify-center p-6">
         {/* ... (background effects) ... */}
         {imageSrc ? (
            <motion.img
              src={imageSrc}
              alt={title}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
              transition={{ duration: 0.5 }}
              className="relative z-10 h-full w-full object-contain drop-shadow-sm"
            />
         ) : (
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-600 shadow-inner">
              <Leaf size={36} />
            </div>
         )}
         {/* ... (view badge) ... */}
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
        <div className="mb-3">
          <p className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider font-poppins">
            {subtitle}
          </p>
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors duration-300 font-poppins leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>

        {/* ... (Footer button) ... */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between relative">
           <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
             {/* You could even use t("view_details") here if you add it to your i18n json */}
             View Details
           </span>
           <motion.button variants={buttonVariants} className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
             <div className="absolute inset-0 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300" />
             <ArrowRight size={18} className="relative z-10 text-slate-600 group-hover:text-white transition-colors duration-300" />
           </motion.button>
        </div>
      </div>
    </motion.article>
  );
}