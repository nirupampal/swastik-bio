import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "../i18n";
import { 
  Target, 
  Eye, 
  Sprout, 
  History, 
  Users, 
  CheckCircle2, 
  Quote 
} from "lucide-react";

/**
 * About Component
 * Renders a "Long-form" storytelling page about the company.
 */
export default function About() {
  const { t } = useLocale();

  // --- Data Helpers ---
  const asArray = (key) => {
    const val = t(key);
    if (Array.isArray(val)) return val;
    if (typeof val === "string" && val.trim().length) return [val];
    return [];
  };

  const asString = (key, fallback = "") => {
    const val = t(key);
    return typeof val === "string" ? val : fallback;
  };

  // --- Data Extraction ---
  const headline = asString("about.headline", "About Us");
  const intro = asString("about.intro", "");
  const mission = asString("about.mission", "");
  const vision = asString("about.vision", "");
  const values = asArray("about.values");
  const history = asArray("about.history");
  const team = (() => {
    const v = t("about.team");
    return Array.isArray(v) ? v : [];
  })();

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="relative bg-white overflow-hidden">
      
      {/* --- Section 1: Hero & Intro (Full Width) --- */}
      <div className="relative pt-24 pb-20 px-6 lg:px-8 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 skew-x-12 translate-x-20 -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
              <Sprout size={14} /> Our Story
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-poppins tracking-tight leading-tight mb-8">
              {headline}
            </h1>
            
            {intro && (
              <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-emerald-500 pl-6">
                {intro}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* --- Section 2: Mission & Vision (Split Layout) --- */}
      <div className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg flex-1">
                {mission || "To deliver affordable, science-backed biofertilizers that restore soil fertility."}
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-900 p-10 rounded-3xl shadow-xl flex flex-col text-white relative overflow-hidden"
            >
              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-800 rounded-full blur-3xl" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center mb-6 backdrop-blur-sm">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-poppins relative z-10">Our Vision</h3>
              <p className="text-emerald-100 leading-relaxed text-lg flex-1 relative z-10">
                {vision || "A future where every farmer can grow abundant crops on healthy, living soils."}
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* --- Section 3: Values & History (Asymmetric Grid) --- */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left: Values (Col 1-5) */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-slate-900 mb-8 font-poppins flex items-center gap-3">
                  <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                  Core Values
                </h3>
                <ul className="space-y-6">
                  {(values.length ? values : ["Farmer-first solutions", "Innovation"]).map((val, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="mt-1 shrink-0 text-emerald-500">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-lg text-slate-700 font-medium">{val}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right: History Timeline (Col 6-12) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                 <h3 className="text-3xl font-bold text-slate-900 mb-10 font-poppins flex items-center gap-3">
                  <History className="text-slate-400" />
                  Our Journey
                </h3>

                <div className="relative pl-4 sm:pl-8 border-l-2 border-emerald-100 space-y-12">
                  {history.length > 0 ? history.map((h, i) => {
                     // Try to split year from text if formatted like "2011 — Company founded..."
                     const [year, ...rest] = h.includes("—") ? h.split("—") : [null, h];
                     const text = rest.join("—") || h;

                     return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative"
                      >
                        {/* Timeline Dot */}
                        <span className="absolute -left-[21px] sm:-left-[37px] top-1.5 h-4 w-4 rounded-full bg-white border-[3px] border-emerald-500" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                          {year && (
                            <span className="text-xl font-bold text-emerald-700 font-poppins shrink-0">
                              {year.trim()}
                            </span>
                          )}
                          <p className="text-slate-600 leading-relaxed">{text.trim()}</p>
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <p className="text-slate-500 italic">History data loading...</p>
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* --- Section 4: Leadership Team --- */}
      {team.length > 0 && (
        <div className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins mb-4">
                Meet the Experts
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Combining scientific research with practical farming experience.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {team.map((person, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-slate-100"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {((person.name || "").split(" ").map(n => n[0]).slice(0, 2).join("") || "KM").toUpperCase()}
                      </div>
                      <Quote className="text-slate-200 fill-slate-50" size={32} />
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-900 font-poppins mb-1">
                      {person.name}
                    </h4>
                    <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4">
                      {person.role}
                    </p>
                    
                    {person.bio && (
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {person.bio}
                      </p>
                    )}
                  </div>
                  
                  {/* Decorative bottom strip */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}