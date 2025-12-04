// src/App.js
import React, { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { LocaleProvider } from "./i18n";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import ImmersiveSection from "./components/ImmersiveSection";
import ImpactSection from "./components/ImpactSection";
import Preloader from "./components/Preloader"; // Import the loader

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Function to finish loading
  const handleLoadComplete = () => {
    setIsLoading(false);
    // Re-enable scrolling when loader is done
    document.body.style.overflow = "auto";
  };

  return (
    <LocaleProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <div className="min-h-screen bg-white">
          
          {/* AnimatePresence handles the exit animation of the loader */}
          <AnimatePresence mode="wait">
            {isLoading && <Preloader key="loader" onComplete={handleLoadComplete} />}
          </AnimatePresence>

          {/* Strategy: We render the app immediately but the Loader 
            sits on top with z-index. This ensures data/images 
            start fetching in the background.
          */}
          {!isLoading && (
            <>
              <Navbar />
              <main>
                <Hero />
                <ImmersiveSection />
                <About />
                <ImpactSection />
                <ProductGrid />
                <Contact />
              </main>
              <Footer />
            </>
          )}

        </div>
      </ReactLenis>
    </LocaleProvider>
  );
}