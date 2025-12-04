// src/components/ImmersiveSection.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImmersiveSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Text Parallax
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  // BACKGROUND PARALLAX
  const yBackground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* 1. THE BACKGROUND VIDEO 
          Wrapped in motion.div for parallax
      */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBackground }}
      >
        <video
          className="absolute w-full h-[120%] -top-[10%] object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Ensure the path is correct relative to your public folder */}
          <source src="/images/14562476_1280_720_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay - MODIFIED FOR BRIGHTNESS */}
        {/* Changed bg-black/40 to bg-black/10 to make the video much brighter */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      </motion.div>

      {/* 2. THE FLOATING CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div style={{ y: yText, opacity: opacityText }}>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-emerald-300 mb-4">
            Our Philosophy
          </h2>

          <h3 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-8">
            "We don't just feed the plants.<br />
            We feed the <span className="italic text-emerald-200">ecosystem</span>."
          </h3>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Healthy soil is a living, breathing entity. By restoring the
            microbial balance, we unlock nature's own ability to protect crops
            and boost yields sustainably.
          </p>

          <div className="mt-12">
            <button className="px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-emerald-900 transition-all duration-300">
              Read Our Research
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}