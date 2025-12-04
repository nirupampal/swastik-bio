import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Sprout } from "lucide-react";
import { useLocale } from "../i18n";
// import emailjs from '@emailjs/browser'; 

export default function Contact() {
  const { t } = useLocale();

  // --- 1. Data Retrieval ---
  const address = t("contact.address") || "Plot No. 365/1, Katalwahi, Post-Musra, Rajnandgaon (C.G)";
  const phone = t("contact.phone") || "+91-7694909846";
  const mapNote = t("contact.mapNote") || "Visit our head office for product demos.";
  
  const rawEmails = t("contact.emails");
  const emails = typeof rawEmails === 'object' ? rawEmails : { 
    info: "info@swasticorganic.com", 
    sales: "sales@swasticorganic.com", 
    support: "support@swasticorganic.com" 
  };

  const rawHours = t("contact.openingHours");
  const hours = typeof rawHours === 'object' ? rawHours : {
    mondayToFriday: "9:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Closed"
  };

  // --- 2. Form State Management ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Sales", 
    message: ""
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Mock success 
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", department: "Sales", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Mail size={14} /> Get in Touch
          </motion.div>
          <h2 className="text-4xl font-extrabold text-slate-900 font-poppins mb-4">
            Let's Start a Conversation
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ready to transform your agriculture? Reach out for expert advice, sales inquiries, or technical support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: Contact Info --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:pt-8"
          >
            {/* Card 1: Head Office */}
            <div className="group flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Head Office</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs text-sm">
                  {address}
                </p>
                {mapNote && (
                  <div className="mt-3 text-xs font-medium text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 size={12} /> {mapNote}
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Contact Points */}
            <div className="group flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Quick Contacts</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">General</p>
                     <a href={`mailto:${emails.info}`} className="block text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">{emails.info}</a>
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sales Team</p>
                     <a href={`mailto:${emails.sales}`} className="block text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">{emails.sales}</a>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Support</p>
                     <a href={`tel:${phone}`} className="block text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors">{phone}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Opening Hours */}
            <div className="group flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Operating Hours</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-medium">Mon - Fri</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">{hours.mondayToFriday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-medium">Saturday</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">{hours.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-medium text-slate-400">Sunday</span>
                    <span className="text-red-500 font-bold text-xs">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: Stylish Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-emerald-600 p-8 md:p-10 rounded-3xl shadow-2xl shadow-emerald-900/20 overflow-hidden"
          >
            {/* Decorative Background Elements inside Form */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-800 rounded-full opacity-50 blur-3xl" />
            <div className="absolute top-10 right-10 opacity-10 rotate-12 pointer-events-none">
                <Sprout size={120} color="white" />
            </div>

            <div className="relative z-10">
                {status === "success" ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-white text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-[bounce_1s_ease-in-out_1]">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                    <p className="text-emerald-100 mb-8 max-w-xs">
                        Thank you for contacting Swastic Organic. We will get back to you shortly.
                    </p>
                    <button 
                        onClick={() => setStatus("idle")}
                        className="px-6 py-2 bg-emerald-700/50 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors border border-emerald-500"
                    >
                        Send another message
                    </button>
                </div>
                ) : (
                <>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                        <p className="text-emerald-100 text-sm">We typically reply within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white uppercase tracking-wide ml-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-emerald-900 placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-400/30 outline-none transition-all"
                        />
                        </div>
                        <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white uppercase tracking-wide ml-1">Phone</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91..."
                            className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-emerald-900 placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-400/30 outline-none transition-all"
                        />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white uppercase tracking-wide ml-1">Email Address</label>
                        <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-emerald-900 placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-400/30 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white uppercase tracking-wide ml-1">Department</label>
                        <div className="relative">
                            <select 
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-emerald-900 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-400/30 outline-none transition-all appearance-none cursor-pointer"
                            >
                            <option value="Sales">Sales & Distributorship</option>
                            <option value="Support">Technical Support (R&D)</option>
                            <option value="General">General Inquiry</option>
                            <option value="Research">Research Collaboration</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-white uppercase tracking-wide ml-1">Message</label>
                        <textarea 
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you restore your soil health?"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-emerald-900 placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-400/30 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    {status === "error" && (
                        <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-100 text-sm rounded-lg flex items-center gap-2">
                        <AlertCircle size={16} />
                        Failed to send. Please try again or email us.
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-4 px-6 rounded-xl bg-white text-emerald-600 font-bold text-lg hover:bg-slate-100 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 group"
                    >
                        {status === "sending" ? (
                        "Sending..."
                        ) : (
                        <>
                            Send Message 
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                        )}
                    </button>
                    </form>
                </>
                )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}