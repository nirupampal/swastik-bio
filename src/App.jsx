import React from "react";
import { LocaleProvider } from "./i18n";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <LocaleProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <ProductGrid />
          <Contact />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
