"use client";
import { motion } from "framer-motion";

export default function FloatingButtons() {
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px" }}>
      <motion.a
        href="https://wa.me/919773481051?text=Hello Maheshbhai! I need help with fabrication products."
        target="_blank" rel="noopener"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.12 }}
        title="WhatsApp Chat"
        style={{ width: "52px", height: "52px", background: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 4px 16px rgba(22,163,74,0.4)", fontSize: "24px" }}
      >💬</motion.a>
      <motion.a
        href="tel:+919773481051"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.12 }}
        title="Call Now"
        style={{ width: "52px", height: "52px", background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,99,235,0.4)", fontSize: "22px" }}
      >📞</motion.a>
    </div>
  );
}
