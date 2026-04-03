"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const SERVICES = [
  { id:"01", icon:"🏰", title:"Rajwadi Casting Design", subtitle:"Royal Ornamental Metalwork", desc:"Traditional Rajwadi-style ornate metal castings for gates, fences, railings and decorative elements. Each piece carries the grandeur of royal craftsmanship.", features:["Gate finials & decorative spearheads","Ornamental panel inserts & borders","Royal arch & pillar trims","Custom royal patterns on order","MS / CI / SS casting options","Available in all standard sizes"], bg:"#eff6ff", accent:"#2563eb" },
  { id:"02", icon:"✨", title:"CNC Laser Cutting Design", subtitle:"Precision Machine Cutting", desc:"State-of-the-art CNC laser cutting for intricate patterns on MS sheets, SS sheets, and other metals. From simple geometric cuts to complex artistic designs.", features:["Custom pattern design service","MS / SS / Aluminium sheets","Any thickness up to 20mm","Bulk orders accepted","High precision clean finish","Fast 24–48 hr turnaround"], bg:"#f0fdf4", accent:"#16a34a" },
  { id:"03", icon:"🔧", title:"Custom Fabrication", subtitle:"Made-to-Order Hardware", desc:"Complete fabrication solutions including all types of hinges, gate rollers, plate mijagara, anchor fasteners and structural components for construction.", features:["All hinge types — heavy & light","Gate rollers & sliding systems","Foundation & base plates","Anchor bolts & D-hook systems","MS / SS / CI options available","Contractor bulk supply welcome"], bg:"#fff7ed", accent:"#ea580c" },
  { id:"04", icon:"📦", title:"Hardware Supply & Distribution", subtitle:"Wholesale & Retail", desc:"One-stop supply for all fabrication and construction hardware needs. Nuts, bolts, screws, welding rods, fiber sheets and all hardware items — direct from manufacturer.", features:["All welding rods & consumables","Nuts, bolts & screw supply","Fiber & roofing sheet supply","Gate & door hardware full range","Contractor bulk order pricing","Same-day dispatch in stock"], bg:"#fdf4ff", accent:"#9333ea" },
];

const PROCESS = [
  { step:"01", title:"Contact Us", desc:"Call, WhatsApp or fill the contact form with your requirements." },
  { step:"02", title:"Get Quote", desc:"We'll send you a detailed quote within 2 hours during business hours." },
  { step:"03", title:"Confirm Order", desc:"Approve the quote and we start production or pick from stock." },
  { step:"04", title:"Delivery", desc:"Fast dispatch from our Surendranagar warehouse to your location." },
];

export default function ServicesPage() {
  return (
    <div className="page-top" style={{ minHeight: "100vh", background: "#f5f4f0" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e6e0", padding: "24px 16px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", color: "#1d4ed8", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", marginBottom: "10px" }}>
            Our Services
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px" }}>
            What We Do Best
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "500px", lineHeight: 1.6 }}>
            Specialized hardware fabrication services for contractors, builders and individuals across Gujarat.
          </p>
        </div>
      </div>

      {/* Services */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {SERVICES.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "16px", overflow: "hidden" }}>
              {/* Always stack on mobile, side-by-side on md+ */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                {/* Text */}
                <div style={{ padding: "clamp(20px,4vw,36px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ width: "42px", height: "42px", background: s.bg, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>{s.subtitle}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(16px,3vw,20px)", fontWeight: 800, color: "#1a1a1a" }}>{s.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.75, marginBottom: "20px" }}>{s.desc}</p>
                  {/* Features inline on mobile */}
                  <div style={{ background: s.bg, borderRadius: "10px", padding: "14px", marginBottom: "18px" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: s.accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>What&apos;s Included</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {s.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <div style={{ width: "18px", height: "18px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <FiCheck size={10} color={s.accent} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "9px 16px", borderRadius: "8px", textDecoration: "none" }}>
                      <FaWhatsapp size={14} /> WhatsApp
                    </a>
                    <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "9px 16px", borderRadius: "8px", textDecoration: "none" }}>
                      Get Quote <FiArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ background: "#fff", borderTop: "1px solid #e8e6e0", borderBottom: "1px solid #e8e6e0", padding: "40px 16px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, color: "#1a1a1a", marginBottom: "6px" }}>How It Works</h2>
            <p style={{ color: "#6b7280", fontSize: "13px" }}>Simple 4-step process from inquiry to delivery</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "14px" }}>
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ textAlign: "center", padding: "20px 12px" }}>
                  <div style={{ width: "44px", height: "44px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", border: "2px solid #bfdbfe" }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#2563eb", fontSize: "13px" }}>{p.step}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "5px", fontSize: "14px" }}>{p.title}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "48px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,4vw,30px)", fontWeight: 800, color: "#1a1a1a", marginBottom: "10px" }}>Need a Custom Solution?</h2>
            <p style={{ color: "#6b7280", marginBottom: "20px", lineHeight: 1.7, fontSize: "14px" }}>
              We accept all custom fabrication orders. Tell us your requirements and Maheshbhai will get back to you within the hour.
            </p>
            <div className="cta-buttons">
              <a href="https://wa.me/919773481051?text=Hello Maheshbhai! I need a custom fabrication quote." target="_blank" rel="noopener"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px 22px", borderRadius: "10px", textDecoration: "none" }}>
                <FaWhatsapp size={17} /> WhatsApp Now
              </a>
              <a href="tel:+919773481051"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px 22px", borderRadius: "10px", textDecoration: "none" }}>
                <FiPhone size={15} /> Call Maheshbhai
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
