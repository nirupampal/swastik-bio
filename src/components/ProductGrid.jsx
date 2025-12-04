// src/components/ProductGrid.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import Hook
import ProductCard from "./ProductCard";
import { useLocale } from "../i18n";
import { Sprout, Leaf } from "lucide-react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function ProductGrid() {
  const { t } = useLocale();
  const navigate = useNavigate(); // Initialize navigation

  const raw = t("products.list");
  const productsFromTranslations = Array.isArray(raw) ? raw : [];

  const products = useMemo(() => {
    return productsFromTranslations.map((p, idx) => ({
      id: p.id || `prod_${idx}`,
      title: p.title || `Product ${idx + 1}`,
      subtitle: p.subtitle || "",
      image: p.image || null,
      description: p.description || "",
      benefits: p.benefits,
      usage: p.usage,
      cropRecommendations: p.cropRecommendations,
      packSizes: p.packSizes,
      storage: p.storage,
      safety: p.safety
      // Note: Composition removed as requested
    }));
  }, [productsFromTranslations]);

  const handleProductClick = (product) => {
    // Navigate to the details page and pass the product data via state
    // This avoids needing to re-fetch the data on the next page
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <section id="products" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-50/0 blur-3xl opacity-70 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 rotate-12 shadow-sm">
              <Sprout size={28} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-poppins tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900">
               {t("nav.products")}
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mb-6" />
        </motion.div>

        <motion.div
          className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={gridContainerVariants}
        >
          {products.length > 0 ? (
            products.map((p) => (
              <motion.div key={p.id} variants={gridItemVariants} className="h-full">
                <ProductCard product={p} onClick={handleProductClick} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-slate-500 py-20">
              <Leaf size={48} className="text-slate-300 mb-4" />
              <p>No products found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}