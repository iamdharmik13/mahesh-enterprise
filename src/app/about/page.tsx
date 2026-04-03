"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMapPin, FiPhone, FiClock, FiArrowRight, FiCheck } from "react-icons/fi";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";

const HIGHLIGHTS = [
  "Direct from manufacturer — no middlemen, best prices",
  "Rajwadi & royal casting designs — exclusive ornate patterns",
  "All laser cutting types — custom sizes and designs accepted",
  "Widest range of hinges, rollers & fabrication hardware",
  "Serving contractors, fabricators & retail customers",
  "Same-day dispatch for all in-stock items",
];

const TEAM = [
  { name: "Maheshbhai Davda", role: "Founder & Owner", initial: "M", desc: "10+ years of experience in steel fabrication and hardware supply across Saurashtra." },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "108px", background: "#f5f4f0" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e6e0", padding: "40px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", color: "#1d4ed8", fontSize: "11px", fontWeight: 700, padding: "5px 12px", borderRadius: "20px", marginBottom: "14px" }}>
              🏭 Our Story
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#1a1a1a", marginBottom: "10px" }}>
              About Mahesh Enterprise
            </h1>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, maxWidth: "560px" }}>
              Surendranagar's trusted hardware & fabrication supplier. Serving contractors, builders and businesses across Gujarat with quality and integrity.
            </p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Story + Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "16px", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 800, color: "#1a1a1a", marginBottom: "16px" }}>
                Precision Metal Craftsmanship,<br />
                <span style={{ color: "#2563eb" }}>Trusted Across Gujarat</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", color: "#6b7280", fontSize: "14px", lineHeight: 1.75 }}>
                <p>
                  <strong style={{ color: "#1a1a1a" }}>Mahesh Enterprise</strong>, founded and operated by Maheshbhai Davda, is a premier fabrication and casting design business based in Surendranagar, Gujarat. We specialize in providing high-quality metal fabrication products to contractors, fabricators, builders and businesses across Saurashtra.
                </p>
                <p>
                  Our specialty lies in <strong style={{ color: "#2563eb" }}>Rajwadi Casting Designs</strong> — ornate, royal-style metal castings that bring elegance and grandeur to gates, fences, and architectural elements.
                </p>
                <p>
                  We also offer state-of-the-art laser cutting, complete hardware supply, and custom fabrication services — making us a true one-stop shop for all fabrication needs.
                </p>
              </div>
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {HIGHLIGHTS.map(h => (
                  <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ width: "18px", height: "18px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                      <FiCheck size={10} color="#2563eb" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: "13px", color: "#374151" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Stats card */}
              <div style={{ background: "#2563eb", borderRadius: "16px", padding: "28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {[["500+", "Products in Stock"], ["10+", "Years Experience"], ["1000+", "Happy Clients"], ["5.0", "Google Rating"]].map(([n, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "32px", fontWeight: 800, color: "#fff" }}>{n}</div>
                      <div style={{ fontSize: "11px", color: "#bfdbfe", fontWeight: 500, marginTop: "2px" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google rating card */}
              <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "#eff6ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FaGoogle size={22} color="#2563eb" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Google Maps Rating</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: 800, color: "#1a1a1a" }}>⭐ 5.0 / 5.0</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>Verified Business · Surendranagar, Gujarat</div>
                </div>
              </div>

              {/* Owner card */}
              <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "16px", padding: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Our Team</div>
                {TEAM.map(t => (
                  <div key={t.name} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "50px", height: "50px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: 800, color: "#2563eb", flexShrink: 0 }}>
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{t.name}</div>
                      <div style={{ fontSize: "11px", color: "#2563eb", fontWeight: 600, marginBottom: "4px" }}>{t.role}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.5 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>

        {/* Contact Info Row */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginBottom: "20px" }}>
            {[
              {
                icon: <FiPhone size={20} color="#2563eb" />, label: "Call / WhatsApp",
                main: <a href="tel:+919773481051" style={{ fontSize: "18px", fontWeight: 800, color: "#1a1a1a", textDecoration: "none" }}>+91 97734 81051</a>,
                sub: "Maheshbhai Davda · Fast response",
                bg: "#eff6ff", border: "#bfdbfe",
              },
              {
                icon: <FiMapPin size={20} color="#2563eb" />, label: "Our Location",
                main: <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>Jintan Udyognagar Main Gate,<br />Post Office Line, Surendranagar<br />Gujarat — 363001</div>,
                sub: "",
                bg: "#f9fafb", border: "#e8e6e0",
              },
              {
                icon: <FiClock size={20} color="#2563eb" />, label: "Business Hours",
                main: <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.8 }}>Mon – Sat: 9:00 AM – 8:00 PM<br />Sunday: 10:00 AM – 2:00 PM</div>,
                sub: "Open 7 days a week",
                bg: "#f9fafb", border: "#e8e6e0",
              },
            ].map(c => (
              <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "12px", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  {c.icon}
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>{c.label}</span>
                </div>
                {c.main}
                {c.sub && <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{c.sub}</div>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e8e6e0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#1a1a1a" }}>Find Us on the Map</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Jintan Udyognagar, Surendranagar, Gujarat</div>
              </div>
              <a href="https://maps.google.com/?q=Jintan+Udyognagar+Surendranagar+Gujarat" target="_blank" rel="noopener"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "12px", padding: "8px 14px", borderRadius: "8px", textDecoration: "none" }}>
                <FiMapPin size={13} /> Open in Maps
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14688.5!2d71.6602!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39588d8a49fffff%3A0x1!2sSurendranagar%2C+Gujarat!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="300" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "36px", textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "26px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
              Ready to Work With Us?
            </h2>
            <p style={{ color: "#93c5fd", fontSize: "14px", marginBottom: "24px" }}>
              Browse our 500+ products or contact Maheshbhai directly for custom orders and bulk pricing.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/products"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#1a1a1a", fontWeight: 700, fontSize: "14px", padding: "12px 22px", borderRadius: "10px", textDecoration: "none" }}>
                Browse Products <FiArrowRight size={15} />
              </Link>
              <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px 22px", borderRadius: "10px", textDecoration: "none" }}>
                <FaWhatsapp size={17} /> WhatsApp Now
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
