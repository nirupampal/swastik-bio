// src/components/Preloader.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Lock scroll when loader is active
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        }
        // Randomize speed for a realistic feel
        const jump = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // When count reaches 100, wait a moment then trigger onComplete
  useEffect(() => {
    if (count === 100) {
      const timeout = setTimeout(() => {
        // Unlock scroll is handled by unmounting or the exit animation
        onComplete(); 
      }, 800); // Wait 0.8s at 100% before lifting
      return () => clearTimeout(timeout);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      // Changed bg to white and text to slate-900 (dark black)
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-slate-900"
    >
      {/* Background Ambience - Adjusted for light theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/60 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-100/60 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Pulsing Logo Image */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }} // Removed opacity pulse for cleaner look on white
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 p-1"
        >
          <img 
            src="/logo.png" 
            alt="Swastik Organic Logo" 
            // Changed border to emerald-500 for contrast and shadow to be subtler
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight mb-3 text-center">
          Swastik <span className="text-emerald-600">Organic</span>
        </h1>
        
        {/* Loading Quote / Tagline - Changed to slate-500 */}
        <p className="text-slate-500 text-sm md:text-base mb-8 font-medium tracking-[0.2em] uppercase text-center">
          Save Soil • Save Farmers
        </p>

        {/* Counter - Changed gradient to be dark to emerald */}
        <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-emerald-600 font-poppins">
          {count}%
        </div>
      </div>

      {/* Progress Bar (Bottom Line) - Changed background track to slate-100 */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100">
        <motion.div 
          className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
}