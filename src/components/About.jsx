// src/components/About.jsx
import React, { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center, Html } from "@react-three/drei";
import { useLocale } from "../i18n";
import Parallax from "../components/Parallax";
import { 
  Target, 
  Eye, 
  History, 
  CheckCircle2, 
  Quote, 
  Leaf,
  Microscope,
  Award
} from "lucide-react";

// --- 3D Model Component (with slight pointer-based tilt) ---
function SoilModel(props) {
  // Access the model from the public folder
  const { scene } = useGLTF("/images/products/soil_profile.glb");
  const ref = useRef();

  // useFrame to create a gentle follow effect based on mouse
  useFrame((state) => {
    if (!ref.current) return;
    // state.mouse.x / y are in -1..1 range; scale down heavily for subtlety
    const targetY = state.mouse.x * 0.12; // yaw
    const targetX = -state.mouse.y * 0.06; // pitch (negative so moving up tilts model up)
    // lerp rotation
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.08;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.08;
  });

  return <primitive ref={ref} object={scene} {...props} />;
}

// --- 3D Loader Fallback ---
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 bg-white/80 p-4 rounded-xl backdrop-blur-sm shadow-lg">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Loading Soil...</p>
      </div>
    </Html>
  );
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function About() {
  const { t } = useLocale();

  // --- Data Helpers ---
  const getList = (key) => {
    const data = t(key);
    return Array.isArray(data) ? data : [];
  };

  const getHistoryData = () => {
    const rawHistory = getList("about.history");
    return rawHistory.map(item => {
      if (typeof item === "object") return item;
      const parts = item.split("—");
      return {
        year: parts[0] ? parts[0].trim() : "",
        text: parts[1] ? parts[1].trim() : item
      };
    });
  };

  const historyData = getHistoryData();
  const teamData = getList("about.team");
  const valuesData = getList("about.values");

  const statsData = [
    { label: t("stats.experience_label", { defaultValue: "Years Experience" }), value: "14+" },
    { label: t("stats.farmers_label", { defaultValue: "Farmers Impacted" }), value: "10k+" },
    { label: t("stats.acres_label", { defaultValue: "Acres Restored" }), value: "50k+" }
  ];

  return (
    <div className="bg-white font-sans text-slate-800 overflow-x-hidden">
      
      {/* --- Section 1: Hero & 3D Model --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        {/* Abstract Background Blobs - now parallaxed */}
        <Parallax depth={0.10} className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none">
          <div className="w-full h-full bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </Parallax>

        <Parallax depth={0.05} className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none">
          <div className="w-full h-full bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </Parallax>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-emerald-700 text-sm font-bold uppercase tracking-wider mb-6">
                <Leaf size={16} className="fill-emerald-100" />
                {t("hero.title")}
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
                {t("hero.title")}
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
                {t("hero.subtitle")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1">
                    {t("hero.ctaPrimary")}
                  </button>
                  <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-xl transition-all">
                    {t("hero.ctaSecondary")}
                  </button>
              </motion.div>
            </motion.div>

            {/* 3D Canvas Area - parent parallax */}
            <Parallax depth={0.12} className="relative h-[400px] lg:h-[600px] w-full cursor-grab active:cursor-grabbing">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="w-full h-full"
              >
                <Canvas camera={{ position: [0, 0, 7], fov: 100 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <spotLight position={[-10, 10, -5]} intensity={0.5} />
                  
                  <Suspense fallback={<Loader />}>
                    <Center>
                      <SoilModel scale={1.8} />
                    </Center>
                    <Environment preset="park" />
                  </Suspense>

                  <OrbitControls 
                    enableZoom={false} 
                    autoRotate 
                    autoRotateSpeed={1}
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 2}
                  />
                </Canvas>
              </motion.div>
            </Parallax>

          </div>
        </div>
      </section>

      {/* --- Section 2: Stats Strip --- */}
      <div className="bg-emerald-900 py-12 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800">
            {statsData.map((stat, idx) => (
                <div key={idx} className="pt-4 md:pt-0">
                  <div className="text-4xl md:text-5xl font-bold text-emerald-300 mb-2">{stat.value}</div>
                  <div className="text-emerald-100 uppercase tracking-widest text-xs font-semibold">{stat.label}</div>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section 3: Mission & Vision --- */}
 <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t("about.headline")}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("about.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission - Updated to Teal/Organic Theme */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group p-8 rounded-3xl bg-teal-50/50 border border-teal-100 relative overflow-hidden hover:bg-gradient-to-br hover:from-emerald-700 hover:to-emerald-900 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-teal-200/50"
              >
                 {/* Icon Container */}
                 <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-teal-600 transition-colors duration-300 shadow-sm">
                   <Target size={24} />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-300">Mission</h3>
                 
                 <p className="text-slate-600 leading-relaxed group-hover:text-teal-50 transition-colors duration-300">
                    {t("about.mission")}
                 </p>
              </motion.div>

              {/* Vision - Updated to Emerald/Lime Theme */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100 relative overflow-hidden hover:bg-gradient-to-br hover:from-emerald-700 hover:to-emerald-900 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-emerald-200/50"
              >
                 {/* Icon Container */}
                 <div className="w-12 h-12 bg-emerald-200 text-emerald-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-emerald-700 transition-colors duration-300 shadow-sm">
                   <Eye size={24} />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-300">Vision</h3>
                 
                 <p className="text-slate-700 leading-relaxed group-hover:text-emerald-50 transition-colors duration-300">
                    {t("about.vision")}
                 </p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Values & History --- */}
     <section className="py-24 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
      
      {/* Left: Values */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Award size={24}/>
          </span>
          <h3 className="text-3xl font-bold text-slate-900">Core Values</h3>
        </div>
        
        <div className="grid gap-4">
          {valuesData.length > 0 ? valuesData.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ 
                x: 6, 
                backgroundColor: "rgb(240 253 244)", 
                scale: 1.015 
              }}
              className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-[0_8px_30px_-6px_rgba(16,185,129,0.18)] transition-all duration-300 group"
            >
              <CheckCircle2 
                className="text-emerald-500 shrink-0 group-hover:scale-125 transition-transform duration-300" 
                size={22} 
              />
              <span className="font-medium text-slate-700 text-lg group-hover:text-slate-900 transition-colors">
                {val}
              </span>
            </motion.div>
          )) : (
            <p>Loading values...</p>
          )}
        </div>

        {/* Research Badge */}
        <Parallax depth={0.06} className="mt-12 inline-block">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
            <Microscope className="text-blue-600 shrink-0 mt-1" size={26} />
            <div>
              <h4 className="font-bold text-blue-900 text-lg">{t("research.headline")}</h4>
              <p className="text-sm text-blue-800 mt-1 leading-relaxed">{t("research.overview")}</p>
            </div>
          </div>
        </Parallax>
      </div>

      {/* Right: History Timeline */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <History size={24}/>
          </span>
          <h3 className="text-3xl font-bold text-slate-900">Our Journey</h3>
        </div>

        <div className="relative pl-8 border-l-2 border-emerald-200 space-y-14">
          {historyData.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-white border-4 border-emerald-500 group-hover:scale-150 transition-transform duration-300 shadow-sm" />

              {/* Big Floating Year */}
              <span className="text-4xl font-extrabold text-emerald-900/10 absolute -top-6 -left-6 -z-10 select-none group-hover:text-emerald-900/20 transition-colors duration-300 tracking-tight">
                {item.year}
              </span>

              {/* Year Title */}
              <h4 className="text-xl font-bold text-emerald-800 mb-1 group-hover:text-emerald-900 transition-colors duration-300">
                {item.year}
              </h4>

              {/* Text */}
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/* --- Section 5: Team --- */}
<section className="py-24 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 border-t border-slate-100">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-6xl tracking-widest font-bold text-white">Meet the Experts</h2>
      <p className="text-slate-100 mt-4 text-xl">Merging science with soil.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {teamData.map((member, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ y: -10 }}
          className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 
                     text-center hover:border-white 
                     hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.2)] 
                     transition-all duration-300 group"
        >
          <div className="w-24 h-24 mx-auto rounded-full 
                          bg-gradient-to-br from-emerald-100 to-teal-100 
                          text-emerald-700 flex items-center justify-center 
                          text-2xl font-bold mb-6 border-4 border-white shadow-sm 
                          group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
            {(member.name || "").split(" ").slice(0, 2).map(n => n[0]).join("")}
          </div>

          <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
            {member.name}
          </h4>

          <p className="text-emerald-600 font-medium text-sm tracking-wide uppercase mb-4">
            {member.role}
          </p>

          <div className="flex justify-center mb-6">
            <Quote size={20} className="text-slate-300 group-hover:text-emerald-300 transition-colors" />
          </div>

          <p className="text-slate-600 italic group-hover:text-slate-800 transition-colors">
            "{member.bio}"
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      

    </div>
  );
}