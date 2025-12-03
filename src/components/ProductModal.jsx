import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Sprout, Beaker, Scale, ShieldCheck, Calendar, Droplets } from "lucide-react";

const CompositionTable = ({ data }) => {
  if (!data) return null;
  const entries = typeof data === 'object' && !Array.isArray(data) ? Object.entries(data) : [];
  if (entries.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden text-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Component</th>
            <th className="px-4 py-3">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {entries.map(([key, value], idx) => (
            <tr key={key} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="px-4 py-2 font-medium text-slate-800 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </td>
              <td className="px-4 py-2 text-slate-600">
                {Array.isArray(value) ? value.join(", ") : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ProductModal({ product, isOpen, onClose }) {
  if (!product) return null;

  // Normalizing Data for the Modal
  const { 
    title, subtitle, image, description, 
    benefits = [], composition, 
    usage, cropRecommendations, 
    storage, safety, packSizes = [] 
  } = product;

  // Determine if usage is simple string or object
  const isUsageObject = typeof usage === 'object' && usage !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              
              {/* Header with Image & Title */}
              <div className="relative shrink-0">
                 {/* Close Button */}
                 <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 rounded-full shadow-lg transition-all"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row bg-slate-50 border-b border-slate-100">
                  {/* Image Section */}
                  <div className="w-full md:w-1/3 h-56 md:h-auto relative bg-white flex items-center justify-center p-6 border-r border-slate-100">
                    {image ? (
                        <img src={image} alt={title} className="max-h-full max-w-full object-contain drop-shadow-md" />
                    ) : (
                        <Sprout size={64} className="text-emerald-200" />
                    )}
                  </div>

                  {/* Title Section */}
                  <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins">{title}</h2>
                    {subtitle && <p className="text-emerald-600 font-medium mt-1 text-lg">{subtitle}</p>}
                    
                    {packSizes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {packSizes.map(size => (
                          <span key={size} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                            <Scale size={12} /> {size}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-8">
                
                {/* Description */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Benefits */}
                    {benefits.length > 0 && (
                    <div>
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                            <CheckCircle2 className="text-emerald-500" /> Key Benefits
                        </h4>
                        <ul className="space-y-3">
                        {benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                {b}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}

                    {/* Composition */}
                    {composition && (
                    <div>
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                            <Beaker className="text-blue-500" /> Composition
                        </h4>
                        <CompositionTable data={composition} />
                    </div>
                    )}
                </div>

                {/* Usage Section */}
                {usage && (
                  <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100">
                    <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900 mb-4">
                        <Droplets className="text-emerald-600" /> Application Guide
                    </h4>
                    
                    {isUsageObject ? (
                        <div className="space-y-4">
                            {usage.general && <p className="text-emerald-800 font-medium italic">"{usage.general}"</p>}
                            
                            {usage.method && (
                                <div>
                                    <span className="text-xs font-bold uppercase text-emerald-700 tracking-wide">Methods</span>
                                    <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700 text-sm">
                                        {Array.isArray(usage.method) 
                                            ? usage.method.map((m, i) => <li key={i}>{m}</li>) 
                                            : <li>{usage.method}</li>
                                        }
                                    </ul>
                                </div>
                            )}
                            
                            {usage.timing && (
                                <div className="flex gap-2 items-start text-sm text-slate-700 bg-white/60 p-3 rounded-lg">
                                    <Calendar size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                    <span><strong className="text-emerald-800">Timing:</strong> {usage.timing}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-slate-700">{usage}</p>
                    )}
                  </div>
                )}

                {/* Crop Recommendations */}
                {cropRecommendations && (
                    <div>
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                            <Sprout className="text-green-600" /> Crop Recommendations
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(cropRecommendations).map(([key, val]) => (
                                <div key={key} className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                                    <h5 className="text-xs font-bold uppercase text-slate-400 mb-1">{key.replace(/([A-Z])/g, " $1")}</h5>
                                    <p className="text-sm font-semibold text-slate-800">{val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer: Safety & Storage */}
                {(safety || storage) && (
                    <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-100">
                        {storage && (
                            <div className="flex-1 bg-slate-50 p-4 rounded-lg text-xs text-slate-600">
                                <strong className="block text-slate-800 mb-1">Storage</strong>
                                {storage}
                            </div>
                        )}
                        {safety && (
                            <div className="flex-1 bg-amber-50 p-4 rounded-lg text-xs text-slate-600">
                                <strong className="block text-amber-800 mb-1 flex items-center gap-1">
                                    <ShieldCheck size={14} /> Safety
                                </strong>
                                {Array.isArray(safety) ? safety.join(" ") : safety}
                            </div>
                        )}
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