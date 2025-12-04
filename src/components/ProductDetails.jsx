// src/pages/ProductDetails.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, CheckCircle2, Droplets, 
  Sprout, Calendar, ShieldCheck, Thermometer, Scale 
} from "lucide-react";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve product data passed via state
  const product = location.state?.product;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle direct access without state (optional fallback)
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 mb-4">Product data not found.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  const { 
    title, subtitle, image, description, 
    benefits = [], usage, cropRecommendations, 
    storage, safety, packSizes = [] 
  } = product;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      
      {/* --- Breadcrumb / Back --- */}
      <div className="container mx-auto px-6 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <div className="p-2 bg-white border border-slate-200 rounded-full group-hover:border-emerald-200 group-hover:shadow-md transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Products</span>
        </button>
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 pb-24">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row border-b border-slate-100 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/20">
            
            {/* Image */}
            <div className="w-full lg:w-2/5 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
               {image ? (
                 <motion.img 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   src={image} 
                   alt={title} 
                   className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl"
                 />
               ) : (
                 <Sprout size={80} className="text-emerald-200 relative z-10" />
               )}
            </div>

            {/* Info */}
            <div className="w-full lg:w-3/5 p-8 lg:p-16 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  Bio-Input
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-poppins mb-3">
                {title}
              </h1>
              <p className="text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-8">
                {subtitle}
              </p>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 border-l-4 border-emerald-200 pl-6">
                {description}
              </p>

              {/* Pack Sizes */}
              {packSizes.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Available In:</span>
                  <div className="flex flex-wrap gap-2">
                    {packSizes.map(size => (
                      <span key={size} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">
                        <Scale size={14} className="text-emerald-500"/> {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-8 lg:p-16 space-y-16">
            
            {/* 1. Benefits Grid */}
            {benefits.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-emerald-100 text-emerald-600"><CheckCircle2 size={24}/></span>
                  Key Benefits
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((b, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</div>
                      <span className="text-slate-700 font-medium">{b}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Usage Section */}
            {usage && (
               <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-xl">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Droplets size={300} /></div>
                 <div className="relative z-10 p-8 lg:p-12">
                   <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                     <Droplets className="text-emerald-400" /> Application Guide
                   </h3>
                   <div className="grid md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        {usage.method && (
                          <div>
                            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Recommended Method</div>
                            <ul className="space-y-2">
                              {Array.isArray(usage.method) ? usage.method.map((m,i)=>(
                                <li key={i} className="flex gap-2 text-emerald-50"><span className="text-emerald-400">•</span> {m}</li>
                              )) : <li className="text-emerald-50">{usage.method}</li>}
                            </ul>
                          </div>
                        )}
                     </div>
                     {usage.timing && (
                       <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                          <div className="flex gap-3 mb-2">
                            <Calendar className="text-emerald-400" />
                            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-1">When to Apply</div>
                          </div>
                          <p className="text-emerald-50 leading-relaxed pl-9">{usage.timing}</p>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
            )}

            {/* 3. Crop Recommendations */}
            {cropRecommendations && (
               <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-100 text-amber-600"><Sprout size={24}/></span>
                    Target Crops
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(cropRecommendations).map(([key, val]) => (
                      <div key={key} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-xs font-bold uppercase text-slate-400 mb-2">{key.replace(/([A-Z])/g, " $1")}</div>
                        <div className="font-bold text-slate-800">{val}</div>
                      </div>
                    ))}
                  </div>
               </div>
            )}
            
            {/* Footer Info */}
            {(storage || safety) && (
              <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                {storage && (
                  <div className="flex gap-4 items-start">
                    <Thermometer className="text-slate-400 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 text-sm mb-1">Storage</strong>
                      <p className="text-sm text-slate-600">{storage}</p>
                    </div>
                  </div>
                )}
                {safety && (
                  <div className="flex gap-4 items-start p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <ShieldCheck className="text-amber-600 shrink-0" />
                    <div>
                      <strong className="block text-amber-900 text-sm mb-1">Safety Precaution</strong>
                      <p className="text-sm text-amber-800">{Array.isArray(safety) ? safety.join(" ") : safety}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}