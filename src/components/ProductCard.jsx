import React from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";

export default function ProductCard({ product, onClick }) {
  // Safe fallbacks
  const title = product.title || "Product";
  const subtitle = product.subtitle || "Agricultural Input";
  const image = product.image || null; // expecting path like /images/products/bio_prom.png
  const description = product.description || "";

  return (
    <motion.article
      layout
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden cursor-pointer h-full"
      onClick={() => onClick(product)}
    >
      {/* --- Image Section --- */}
      <div className="h-48 w-full bg-slate-50 relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Leaf size={32} />
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-300" />
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-poppins">
            {title}
          </h3>
          <p className="text-xs font-medium text-emerald-600 mt-1 uppercase tracking-wide">
            {subtitle}
          </p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>

        {/* --- Footer / Action --- */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">View Specs</span>
          <button className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}