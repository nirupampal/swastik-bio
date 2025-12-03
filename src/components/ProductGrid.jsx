import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal"; // Import the new modal
import { useLocale } from "../i18n";

export default function ProductGrid() {
  const { t } = useLocale();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 1. Get raw data from translations/JSON
  const raw = t("products.list");
  const productsFromTranslations = Array.isArray(raw) ? raw : [];

  // 2. Normalize logic: Pass through raw objects (composition, usage) so the modal can handle them
  const products = useMemo(() => {
    return productsFromTranslations.map((p, idx) => ({
      id: p.id || `prod_${idx}`,
      title: p.title || `Product ${idx + 1}`,
      subtitle: p.subtitle || "",
      image: p.image || null, // Ensure this field exists in your JSON
      description: p.description || "",
      // Pass complex objects directly
      benefits: p.benefits,
      composition: p.composition, 
      usage: p.usage,
      cropRecommendations: p.cropRecommendations,
      packSizes: p.packSizes,
      storage: p.storage,
      safety: p.safety
    }));
  }, [productsFromTranslations]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    // Optional: Lock body scroll
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    // Unlock body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-poppins tracking-tight mb-4">
            {t("nav.products")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("products.intro") !== "products.intro" ? t("products.intro") : "Explore our range of premium agricultural inputs."}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {products.length > 0 ? (
            products.map((p) => (
              <motion.div
                key={p.id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="h-full"
              >
                <ProductCard product={p} onClick={handleOpenModal} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-500 py-12">
              No products found.
            </div>
          )}
        </motion.div>
      </div>

      {/* Popup Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={handleCloseModal} 
      />
    </section>
  );
}