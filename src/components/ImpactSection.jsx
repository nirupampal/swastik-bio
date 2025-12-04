// src/components/ImpactSection.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImpactSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // PARALLAX CONFIGURATION
  // Text moves slightly faster here for a dynamic feel
  const yText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  // Background moves in reverse depth (slightly subtle)
  const yBackground = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* 1. BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBackground }}
      >
        <div
          className="w-full h-[120%] -top-[10%] absolute bg-center bg-cover bg-no-repeat"
          style={{
            // Suggestion: Use an image of technology, drones, or a golden harvest field
            backgroundImage: 'url("/images/harvest-tech.jpg")', 
          }}
        />
        {/* Darker Overlay for high contrast */}
        <div className="absolute inset-0 bg-slate-900/60 "></div>
      </motion.div>

      {/* 2. CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div style={{ y: yText, opacity: opacityText }}>
          
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-amber-400 mb-6">
            Global Impact
          </h2>

          <h3 className="text-4xl md:text-7xl font-serif font-medium leading-tight mb-8">
            Cultivating the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
              Future of Farming
            </span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mt-12 bg-black/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div>
              <h4 className="text-xl font-bold mb-2 text-amber-100">Precision Agriculture</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Using AI-driven analytics to monitor soil health in real-time, ensuring zero waste and maximum efficiency per acre.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 text-amber-100">Sustainable Yields</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our methods have increased crop resilience by 40% while reducing water usage across three different continents.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}