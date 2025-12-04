import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Sprout, 
  Beaker, 
  Scale, 
  ShieldCheck, 
  Calendar, 
  Droplets,
  Thermometer
} from "lucide-react";
import CompositionTable from "./CompositionTable";

export default function ProductModal({ product, isOpen, onClose }) {
  if (!isOpen) return null;

  // Normalizing Data
  const { 
    title, subtitle, image, description, 
    benefits = [], composition, 
    usage, cropRecommendations, 
    storage, safety, packSizes = [] 
  } = product || {};

  // Animation Variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.95, y: 40 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* --- Backdrop --- */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
          />

          {/* --- Modal Wrapper --- */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto ring-1 ring-slate-900/5"
            >
              
              {/* === HEADER SECTION === */}
              <div className="relative shrink-0 flex flex-col md:flex-row border-b border-slate-100 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30">
                
                {/* Close Button (UPDATED: Dark Emerald Hover) */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 group p-2 bg-white/80 backdrop-blur border border-slate-200 rounded-full shadow-sm 
                  hover:bg-emerald-950 hover:border-emerald-900 hover:text-emerald-400 
                  transition-all duration-300"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Left: Product Image */}
                <div className="w-full md:w-2/5 h-64 md:h-auto relative flex items-center justify-center p-8 overflow-hidden group">
                  {/* Decorative blobs */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl group-hover:bg-emerald-300/30 transition-colors duration-500" />
                  
                  {image ? (
                    <img 
                      src={image} 
                      alt={title} 
                      className="relative z-10 max-h-full max-w-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="relative z-10 w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                       <Sprout size={48} />
                    </div>
                  )}
                </div>

                {/* Right: Key Info */}
                <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
                        Bio-Input
                      </span>
                      {packSizes.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                          <Scale size={10} /> {packSizes[0]}
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-poppins leading-tight mb-2">
                      {title}
                    </h2>
                    <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-6">
                      {subtitle}
                    </p>

                    <p className="text-slate-600 leading-relaxed text-base mb-6 border-l-4 border-emerald-200 pl-4">
                      {description}
                    </p>

                    {/* Pack Sizes Pills */}
                    {packSizes.length > 0 && (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Available In:</span>
                        <div className="flex flex-wrap gap-2">
                          {packSizes.map(size => (
                            <span key={size} className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* === BODY SECTION (Scrollable) === */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <div className="p-6 md:p-10 space-y-12">

                  {/* 1. Benefits & Composition Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Benefits */}
                    {benefits.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-600">
                            <CheckCircle2 size={18} /> 
                          </div>
                          Key Benefits
                        </h4>
                        <ul className="space-y-3">
                          {benefits.map((b, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i }}
                              className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors"
                            >
                              <div className="mt-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                <span className="text-white text-[10px] font-bold">✓</span>
                              </div>
                              <span className="text-slate-700 text-sm font-medium leading-relaxed">{b}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Composition */}
                    {composition && (
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <div className="p-1.5 rounded-md bg-blue-100 text-blue-600">
                            <Beaker size={18} />
                          </div>
                          Composition
                        </h4>
                        <CompositionTable data={composition} />
                      </div>
                    )}
                  </div>

                  {/* 2. Usage Section */}
                  {usage && (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-lg">
                      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                          <Droplets size={200} />
                      </div>

                      <div className="relative z-10 p-6 md:p-8">
                        <h4 className="flex items-center gap-2 text-xl font-bold mb-6 text-emerald-100">
                          <Droplets className="text-emerald-400" /> Application Guide
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                           {/* Left: General/Method */}
                           <div className="space-y-6">
                             {usage.general && (
                               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                 <p className="text-emerald-50 italic">"{usage.general}"</p>
                               </div>
                             )}
                             {usage.method && (
                               <div>
                                  <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Recommended Method</div>
                                  <ul className="space-y-2">
                                   {Array.isArray(usage.method) ? usage.method.map((m, i) => (
                                     <li key={i} className="flex gap-2 text-sm text-emerald-50">
                                       <span className="text-emerald-400">•</span> {m}
                                     </li>
                                   )) : (
                                     <li className="text-sm text-emerald-50">{usage.method}</li>
                                   )}
                                  </ul>
                               </div>
                             )}
                           </div>

                           {/* Right: Timing */}
                           {usage.timing && (
                             <div className="bg-white/5 rounded-xl p-5 border border-white/10 flex gap-4">
                                <Calendar size={24} className="text-emerald-400 shrink-0" />
                                <div>
                                  <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">When to Apply</div>
                                  <p className="text-sm text-emerald-50 leading-relaxed">{usage.timing}</p>
                                </div>
                             </div>
                           )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Crop Recommendations (Grid of Cards) */}
                  {cropRecommendations && (
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <div className="p-1.5 rounded-md bg-amber-100 text-amber-600">
                           <Sprout size={18} />
                        </div>
                        Target Crops
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.entries(cropRecommendations).map(([key, val]) => (
                          <div key={key} className="group p-4 rounded-xl bg-white border border-slate-200 
                            hover:border-emerald-800 hover:shadow-[0_8px_30px_rgb(6,78,59,0.12)] 
                            transition-all duration-300 cursor-default"
                          >
                            <h5 className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-800 mb-1 transition-colors">
                              {key.replace(/([A-Z])/g, " $1")}
                            </h5>
                            <p className="text-sm font-bold text-slate-800 line-clamp-2">{val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* === FOOTER SECTION (Sticky Bottom) === */}
                {(safety || storage) && (
                  <div className="bg-slate-50 border-t border-slate-200 p-6 md:px-10">
                    <div className="grid md:grid-cols-2 gap-4">
                      {storage && (
                        <div className="flex gap-3 items-start p-3">
                          <Thermometer size={18} className="text-slate-400 shrink-0 mt-0.5" />
                          <div className="text-xs text-slate-600">
                            <strong className="block text-slate-800 mb-0.5">Storage</strong>
                            {storage}
                          </div>
                        </div>
                      )}
                      {safety && (
                        <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg border border-amber-100">
                          <ShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-xs text-amber-800">
                            <strong className="block text-amber-900 mb-0.5">Safety Precaution</strong>
                            {Array.isArray(safety) ? safety.join(" ") : safety}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}