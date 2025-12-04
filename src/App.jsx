// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";
import { LocaleProvider } from "./i18n";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop"; // Optional helper

// Pages / Sections
import HomePage from "./components/HomePage"; // We will create this wrapper
import ProductDetails from "./components/ProductDetails"; // The new page

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "auto";
  };

  return (
    <LocaleProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <div className="min-h-screen bg-white">
          <AnimatePresence mode="wait">
            {isLoading && <Preloader key="loader" onComplete={handleLoadComplete} />}
          </AnimatePresence>

          {!isLoading && (
            <Router>
              {/* Optional: Ensures scroll resets on navigation */}
              <ScrollToTop /> 
              
              <Navbar />
              
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
              </main>
              
              <Footer />
            </Router>
          )}
        </div>
      </ReactLenis>
    </LocaleProvider>
  );
}