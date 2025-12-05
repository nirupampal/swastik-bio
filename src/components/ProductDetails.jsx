// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Droplets,
  Sprout, Calendar, ShieldCheck, Thermometer, Scale
} from "lucide-react";
import { useLocale } from "../i18n"; // Import hook

export default function ProductDetails() {
  const { locale } = useLocale(); // Get current locale
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  // ... (Keep your useEffect fetching logic exactly the same) ...
  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    if (product) return; 
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE || "https://swastik.tnbpos.in"}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, product]);

  // ... (Keep loading and error states same) ...
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-slate-50">...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center bg-slate-50">...</div>;

  // --- LOCALIZATION LOGIC START ---
  const BASE = import.meta.env.VITE_PUBLIC_IMAGE_URL || (import.meta.env.VITE_API_BASE || "https://swastik.tnbpos.in");
  const normalizeImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  // Image and ID are usually root level
  const image = normalizeImage(product.image_url || product.image);
  
  // Get the correct translation object
  const tData = product.translations?.[locale] || product.translations?.['en'] || {};

  // Extract fields from translation data, fallback to root if needed (backward compatibility)
  const title = tData.title || product.title;
  const subtitle = tData.subtitle || product.subtitle;
  const description = tData.description || product.description;
  const benefits = tData.benefits || product.benefits || [];
  const usage = tData.usage_info || product.usage_info || {}; // usage_info is nested
  const cropRecommendations = tData.crop_recommendations || product.crop_recommendations || {};
  const storage = tData.storage || product.storage;
  const safety = tData.safety || product.safety;
  
  // Pack sizes are root level (usually numbers/units don't change, but if they do, move them to tData)
  const packSizes = product.pack_sizes || []; 
  // --- LOCALIZATION LOGIC END ---

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* ... (Rest of your JSX is fine, just ensure variables match) ... */}
      
      <div className="container mx-auto px-6 py-6">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors">
          <div className="p-2 bg-white border border-slate-200 rounded-full group-hover:border-emerald-200 group-hover:shadow-md transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Products</span>
        </button>
      </div>

      <div className="container mx-auto px-6 pb-24">
        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
           {/* ... Header Section ... */}
           <div className="flex flex-col lg:flex-row border-b border-slate-100 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/20">
             {/* ... Image ... */}
             <div className="w-full lg:w-2/5 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
               {/* ... (Image JSX) ... */}
               {image ? <img src={image} className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl" /> : <Sprout size={80} />}
             </div>

             {/* ... Text Info ... */}
             <div className="w-full lg:w-3/5 p-8 lg:p-16 flex flex-col justify-center">
               <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-poppins mb-3">{title}</h1>
               <p className="text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-8">{subtitle}</p>
               <p className="text-slate-600 text-lg leading-relaxed mb-8 border-l-4 border-emerald-200 pl-6">{description}</p>
               
               {/* Pack Sizes */}
               {Array.isArray(packSizes) && packSizes.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Available In:</span>
                    <div className="flex flex-wrap gap-2">
                      {packSizes.map((size) => (
                        <span key={size} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">
                          <Scale size={14} className="text-emerald-500" /> {size}
                        </span>
                      ))}
                    </div>
                  </div>
               )}
             </div>
           </div>

           {/* Details Body */}
           <div className="p-8 lg:p-16 space-y-16">
             {/* Benefits */}
             {Array.isArray(benefits) && benefits.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">Key Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((b, i) => (
                      <motion.div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                        <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</div>
                        <span className="text-slate-700 font-medium">{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
             )}

             {/* Usage Info - Needs careful checking since structure is nested */}
             {usage && (usage.method || usage.timing || usage.general) && (
               <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-xl">
                 <div className="relative z-10 p-8 lg:p-12">
                   <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">Application Guide</h3>
                   <div className="grid md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                       {usage.method && (
                         <div>
                           <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Method</div>
                           <ul className="space-y-2">
                             {Array.isArray(usage.method) 
                                ? usage.method.map((m, i) => <li key={i} className="flex gap-2 text-emerald-50">• {m}</li>)
                                : <li className="text-emerald-50">{usage.method}</li>
                             }
                           </ul>
                         </div>
                       )}
                       {usage.general && (
                         <div>
                            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">General Dose</div>
                            <p className="text-emerald-50">{usage.general}</p>
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
             
             {/* ... (Keep Crop Recommendations, Storage, and Safety exactly the same as previous code, they use the extracted variables) ... */}
           </div>
        </div>
      </div>
    </div>
  );
}