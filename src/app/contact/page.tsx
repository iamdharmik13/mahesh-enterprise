"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { addInquiry } from "@/lib/firestore";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) { toast.error("Please fill name, phone & message"); return; }
    setLoading(true);
    try {
      await addInquiry(form);
      toast.success("Inquiry sent! Maheshbhai will contact you soon.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch { toast.error("Failed to send. Please WhatsApp or call directly."); }
    setLoading(false);
  };

  return (
    <div className="page-top" style={{ minHeight: "100vh", background: "#f5f4f0" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e6e0", padding: "24px 16px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,5vw,32px)", fontWeight: 800 }}>Contact Us</div>
          <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>We respond within 1 hour during business hours</div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 16px" }}>
        <div className="contact-grid">
          {/* Info column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: <FiPhone color="#2563eb" size={17}/>, label: "Phone / WhatsApp", content: <a href="tel:+919773481051" style={{ fontSize: "clamp(15px,4vw,18px)", fontWeight: 800, color: "#1a1a1a", textDecoration: "none" }}>+91 97734 81051</a>, sub: "Maheshbhai Davda · Fast response" },
              { icon: <FaWhatsapp color="#16a34a" size={17}/>, label: "WhatsApp Chat", content: <a href="https://wa.me/919773481051" target="_blank" rel="noopener" style={{ fontSize: "14px", fontWeight: 700, color: "#16a34a", textDecoration: "none" }}>Chat on WhatsApp →</a>, sub: "Send product photos & get instant quotes" },
              { icon: <FiMapPin color="#2563eb" size={17}/>, label: "Address", content: <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>Jintan Udyognagar Main Gate,<br/>Post Office Line Street (Right Side),<br/>Surendranagar, Gujarat — 363001</div>, sub: "" },
              { icon: <FiClock color="#2563eb" size={17}/>, label: "Business Hours", content: <div style={{ fontSize: "13px", color: "#374151" }}>Mon–Sat: 9 AM – 8 PM<br/>Sunday: 10 AM – 2 PM</div>, sub: "" },
            ].map(item => (
              <div key={item.label} style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "16px", borderLeft: "3px solid #2563eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  {item.icon}
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</span>
                </div>
                {item.content}
                {item.sub && <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{item.sub}</div>}
              </div>
            ))}
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e8e6e0", height: "200px" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14688.5!2d71.6602!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39588d8a49fffff%3A0x1!2sSurendranagar%2C+Gujarat!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "16px", padding: "clamp(20px,5vw,32px)" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(18px,4vw,22px)", fontWeight: 800, marginBottom: "4px" }}>Send Inquiry</div>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "20px" }}>Fill the form below and we&apos;ll call you back.</div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="form-row">
                  {[["name","Your Name *","Rameshbhai Patel","text"],["phone","Phone Number *","+91 98765 43210","tel"]].map(([k,l,ph,t]) => (
                    <div key={k}>
                      <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>{l}</label>
                      <input type={t} placeholder={ph} value={form[k as keyof typeof form]} onChange={e => setForm(p => ({...p,[k]:e.target.value}))}
                        style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "10px", padding: "10px 13px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a1a1a" }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Email (Optional)</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({...p,email:e.target.value}))}
                    style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "10px", padding: "10px 13px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a1a1a" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Message *</label>
                  <textarea rows={5} placeholder="Tell us what products you need, quantity, size requirements..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))}
                    style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "10px", padding: "10px 13px", fontSize: "13px", outline: "none", resize: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a1a1a" }} />
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button type="submit" disabled={loading} style={{ flex: 1, minWidth: "140px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif", opacity: loading ? 0.7 : 1 }}>
                    <FiSend size={14} /> {loading ? "Sending..." : "Send Inquiry"}
                  </button>
                  <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
                    style={{ flex: 1, minWidth: "140px", background: "#16a34a", color: "#fff", borderRadius: "10px", padding: "12px", fontSize: "13px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <FaWhatsapp size={16} /> WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
