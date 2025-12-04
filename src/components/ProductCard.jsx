import React from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, Sparkles } from "lucide-react";

export default function ProductCard({ product, onClick }) {
  // Safe fallbacks
  const title = product.title || "Product";
  const subtitle = product.subtitle || "Agricultural Input";
  const image = product.image || null;
  const description = product.description || "";

  // Card Animation Variants
  const cardVariants = {
    rest: { 
      y: 0, 
      scale: 1,
      boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)"
    },
    hover: { 
      y: -8, 
      scale: 1.01,
      // Gradient Shadow "Glow"
      boxShadow: "0px 20px 25px -5px rgba(16, 185, 129, 0.15), 0px 10px 10px -5px rgba(56, 189, 248, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1, x: 0 },
    hover: { scale: 1.1, x: 3, transition: { type: "spring", stiffness: 400 } }
  };

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden cursor-pointer"
      // Add a subtle gradient border effect using an 'after' pseudo-element in CSS
      style={{ 
        // This creates a subtle border that colors up on hover via CSS class below
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}
      onClick={() => onClick(product)}
    >
      {/* Invisible Gradient Border overlay that activates on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-emerald-400/20 via-transparent to-cyan-400/20 -z-10 blur-xl" />

      {/* --- Image Section --- */}
      <div className="relative h-56 w-full bg-slate-50/50 overflow-hidden flex items-center justify-center p-6">
        
        {/* Subtle background radial gradient behind image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {image ? (
          <motion.img 
            src={image} 
            alt={title}
            // Use framer motion for smoother image scaling
            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
            transition={{ duration: 0.5 }}
            className="relative z-10 h-full w-full object-contain drop-shadow-sm" 
          />
        ) : (
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-600 shadow-inner">
            <Leaf size={36} />
          </div>
        )}
        
        {/* Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
        
        {/* Optional "New" or feature badge */}
        <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
             <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100/80 backdrop-blur-md text-emerald-700 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <Sparkles size={10} /> View
             </span>
        </div>
      </div>

      {/* --- Content Section --- */}
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

        {/* --- Footer / Action --- */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between relative">
          <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
            View Details
          </span>
          
          <motion.button 
            variants={buttonVariants}
            className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-sm"
          >
            {/* Button Background Gradient */}
             <div className="absolute inset-0 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300" />
            
            {/* Icon */}
            <ArrowRight size={18} className="relative z-10 text-slate-600 group-hover:text-white transition-colors duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}