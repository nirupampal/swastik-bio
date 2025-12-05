import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Leaf, Loader2, AlertCircle } from "lucide-react";
import ProductCard from "./ProductCard"; 
import ProductModal from "./ProductModal"; 
import { useLocale } from "../i18n";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function ProductGrid() {
  const { t } = useLocale();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- DATA FETCHING LOGIC ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // 1. Fetch from your backend
        const response = await fetch("https://swastik.tnbpos.in/api/products");
        console.log(response);
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        // 2. Parse JSON
        const data = await response.json();
        console.log(data);
        
        // 3. Update State (Handle structure: { list: [...] } or just [...])
        // Based on your JSON snippet, it looked like { list: [...] }
        const productList = data.list || data || []; 
        setProducts(productList);
        
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="relative py-24 bg-slate-50 overflow-hidden min-h-screen">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-100/50 blur-[100px] opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-teal-50/50 blur-[80px] opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <motion.div 
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 rotate-12 shadow-sm cursor-default"
            >
              <Sprout size={28} />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-poppins tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900">
              {t("nav.products", "Our Products")}
            </span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 text-lg">
            {t("products.intro", "Scientifically developed inputs for sustainable farming.")}
          </p>
        </motion.div>

        {/* --- LOADING STATE --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading products...</p>
          </div>
        )}

        {/* --- ERROR STATE --- */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-red-500">
            <AlertCircle size={48} className="mb-4 opacity-80" />
            <p className="text-slate-800 font-medium mb-2">Oops! Something went wrong.</p>
            <p className="text-slate-500 text-sm">{error}</p>
          </div>
        )}

        {/* --- SUCCESS GRID --- */}
        {!loading && !error && (
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
              <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-20">
                <Leaf size={48} className="mb-4 opacity-50" />
                <p>No products found.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal Integration */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={closeModal} 
      />
    </section>
  );
}