import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLocale } from "../i18n";
// import emailjs from '@emailjs/browser'; // Uncomment this after installing emailjs

export default function Contact() {
  const { t } = useLocale();

  // --- 1. Data Retrieval (using your JSON structure) ---
  const address = t("contact.address") || "Plot No. 365/1, Katalwahi, Post-Musra, Rajnandgaon (C.G)";
  const phone = t("contact.phone") || "+91-7694909846";
  const mapNote = t("contact.mapNote") || "Visit our head office for product demos.";
  
  // Handling the nested email object safely
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
    department: "Sales", // Default to sales
    message: ""
  });

  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // --- EMAILJS INTEGRATION HERE ---
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY'
    
    /* emailjs.send(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID', 
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        department: formData.department,
        message: formData.message,
        to_email: formData.department === 'Sales' ? emails.sales : emails.info
      }, 
      'YOUR_PUBLIC_KEY'
    )
    .then((result) => {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", department: "Sales", message: "" });
    }, (error) => {
        setStatus("error");
    });
    */

    // Mock success for display purposes (Remove this block when using real EmailJS)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", department: "Sales", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Mail size={14} /> Get in Touch
          </motion.div>
          <h2 className="text-4xl font-extrabold text-slate-900 font-poppins">We'd love to hear from you</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions about bio-fertilizers or need a soil consultation? Our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT COLUMN: Contact Info --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Card 1: Head Office */}
            <div className="flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Head Office</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs">
                  {address}
                </p>
                {mapNote && (
                  <div className="mt-3 text-sm bg-emerald-50/50 border border-emerald-100 p-2 rounded text-emerald-800 inline-block">
                    {mapNote}
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Contact Points */}
            <div className="flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Contact Channels</h3>
                <div className="space-y-2 text-slate-600">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 w-16">General:</span> 
                    <a href={`mailto:${emails.info}`} className="hover:text-emerald-600 transition-colors">{emails.info}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 w-16">Sales:</span> 
                    <a href={`mailto:${emails.sales}`} className="hover:text-emerald-600 transition-colors">{emails.sales}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 w-16">Phone:</span> 
                    <a href={`tel:${phone}`} className="hover:text-emerald-600 transition-colors">{phone}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Opening Hours */}
            <div className="flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Operating Hours</h3>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between w-64 border-b border-dashed border-slate-200 pb-1">
                    <span>Mon - Fri</span>
                    <span className="font-medium">{hours.mondayToFriday}</span>
                  </div>
                  <div className="flex justify-between w-64 border-b border-dashed border-slate-200 pb-1 pt-1">
                    <span>Saturday</span>
                    <span className="font-medium">{hours.saturday}</span>
                  </div>
                  <div className="flex justify-between w-64 pt-1">
                    <span>Sunday</span>
                    <span className="text-red-500 font-medium">{hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                <p className="text-slate-600 mt-2">Thank you for contacting Swastic Organic. <br/>We will get back to you shortly.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-emerald-600 font-medium underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91..."
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Department / Interest</label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  >
                    <option value="Sales">Sales & Distributorship</option>
                    <option value="Support">Technical Support (R&D)</option>
                    <option value="General">General Inquiry</option>
                    <option value="Research">Research Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you restore your soil health?"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {status === "error" && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    Failed to send message. Please try again or email us directly.
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 px-6 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}