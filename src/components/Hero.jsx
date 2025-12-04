// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "../i18n";
import { 
  ArrowRight, 
  Leaf, 
  FlaskConical, 
  Sprout, 
  ShieldCheck,
  PlayCircle 
} from "lucide-react";
import Parallax from "./Parallax";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

// New variant for the light leak animation
const lightLeakAnim = {
  animate: {
    opacity: [0.4, 0.6, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Hero() {
  const { t } = useLocale();

  // --- Data Access with Fallbacks ---
  const title = t("hero.title") || "Restoring Soil. Empowering Farmers.";
  const subtitle = t("hero.subtitle") || "Research-driven organic bio-fertilizers to increase yield & soil health.";
  const ctaPrimary = t("hero.ctaPrimary") || "Explore Products";
  const ctaSecondary = t("hero.ctaSecondary") || "Contact Sales";

  return (
    <section id="home" className="relative bg-slate-50 overflow-hidden pt-20 pb-20 lg:pt-20 lg:pb-32">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Sunlight Light Leaks - New addition */}
        <Parallax depth={0.05} className="absolute top-0 left-0 w-full h-full z-0 mix-blend-screen pointer-events-none">
          <motion.div
            variants={lightLeakAnim}
            animate="animate"
            className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-gradient-radial from-orange-100/40 via-amber-100/10 to-transparent blur-[120px] rotate-12 opacity-50"
          />
          <motion.div
            variants={lightLeakAnim}
            animate="animate"
            transition={{ delay: 4 }}
            className="absolute top-[10%] left-[5%] w-[60%] h-[60%] bg-gradient-radial from-yellow-100/30 via-orange-50/5 to-transparent blur-[100px] -rotate-12 opacity-40"
          />
        </Parallax>

        {/* Organic Gradient Blob (Top Right) */}
        <Parallax depth={0.12} className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-emerald-100/40 to-teal-50/0 rounded-full blur-3xl opacity-60" />
        </Parallax>

        {/* Organic Gradient Blob (Bottom Left) */}
        <Parallax depth={0.06} className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tr from-blue-50/40 to-emerald-50/0 rounded-full blur-3xl opacity-60" />
        </Parallax>
        
        {/* Grid Pattern Overlay (slight parallax) */}
        <Parallax depth={0.03} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </Parallax>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* --- LEFT: Content --- */}
          <div className="max-w-2xl">
            
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 shadow-sm text-emerald-800 text-xs font-bold tracking-widest uppercase">
                <FlaskConical size={14} className="text-emerald-600" />
                Science-Backed Agriculture
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-poppins leading-[1.1] tracking-tight mb-6"
            >
              {title.split(" ").map((word, i) => (
                <span key={i} className={word.toLowerCase().includes("soil") || word.toLowerCase().includes("farmers") ? "text-emerald-700" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-emerald-700 rounded-full overflow-hidden shadow-lg shadow-emerald-700/20 transition-all hover:bg-emerald-800 hover:scale-105 active:scale-95"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                {ctaPrimary}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-full shadow-sm transition-all hover:bg-slate-50 hover:border-emerald-200 hover:text-emerald-700"
              >
                {ctaSecondary}
              </a>
            </motion.div>

            {/* Trust Features (Horizontal Strip) */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4"
            >
              {[
                { icon: ShieldCheck, text: "14+ Years R&D" },
                { icon: Leaf, text: "Eco-Friendly" },
                { icon: Sprout, text: "Yield Focused" }
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 leading-tight">
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* --- RIGHT: Visuals --- */}
          <motion.div variants={itemVariants} className="relative z-10 lg:h-auto flex items-center justify-center">
            
            {/* Decorative background blob behind image (light parallax) */}
            <Parallax depth={0.06} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-full blur-[60px] opacity-40 transform scale-90" />
            </Parallax>

            {/* Main Image Container (parent parallax) */}
            <Parallax depth={0.08} className="relative w-full max-w-lg aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              {/* Image */}
              <img 
                src="/soil.png" 
                alt="Healthy soil in hands" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl ring-1 ring-slate-900/5"
              />

              {/* Floating Glassmorphism Card 1: Results (stronger parallax for pop) */}
              <Parallax depth={0.16} className="absolute top-10 -right-6 md:-right-12">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="bg-white/90 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl max-w-[200px]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Sprout size={20} fill="currentColor" className="opacity-20" />
                      <Sprout size={20} className="absolute" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Yield</div>
                      <div className="text-lg font-bold text-slate-900">+18%</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[80%]" />
                  </div>
                </motion.div>
              </Parallax>

              {/* Floating Glassmorphism Card 2: Research (slightly less) */}
              <Parallax depth={0.14} className="absolute bottom-10 -left-6 md:-left-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center gap-4 pr-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
                      <FlaskConical size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">Lab Tested</div>
                    <div className="text-emerald-400 text-xs font-medium">Certified Bio-Input</div>
                  </div>
                </motion.div>
              </Parallax>

            </Parallax>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}