// src/pages/HomePage.jsx
import React from "react";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";
import About from "./About";
import Contact from "./Contact";
import ImmersiveSection from "./ImmersiveSection";
import ImpactSection from "./ImpactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImmersiveSection />
      <About />
      <ImpactSection />
      <ProductGrid />
      <Contact />
    </>
  );
}