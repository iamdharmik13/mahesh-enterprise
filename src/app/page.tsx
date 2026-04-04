"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

const CATS = [
  { icon: "🔩", name: "Hinges & Mijagara", count: "50+ items", slug: "Hinges & Mijagara" },
  { icon: "⚙️", name: "Gate Rollers", count: "20+ items", slug: "Gate Rollers" },
  { icon: "🏰", name: "Casting Designs", count: "100+ designs", slug: "Casting Designs" },
  { icon: "✨", name: "Laser Cutting", count: "200+ patterns", slug: "Laser Cutting" },
  { icon: "🔧", name: "Nuts & Bolts", count: "500+ SKUs", slug: "Nuts & Bolts" },
  { icon: "🔥", name: "Welding Items", count: "Full range", slug: "Welding" },
];

const FEATURED = [
  { id: "f1", imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=85", name: "Heavy Duty Gate Hinge (CI)", category: "Hinges & Mijagara", price: "₹280", priceNum: 280, mrp: "₹350", badge: "20% OFF", badgeType: "red", discount: "20% OFF" },
  { id: "f2", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85", name: "MS Sliding Gate Roller", category: "Gate Rollers", price: "₹450", priceNum: 450, mrp: "₹600", badge: "25% OFF", badgeType: "red", discount: "25% OFF" },
  { id: "f3", imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=85", name: "Rajwadi Finial Set (×4)", category: "Casting Designs", price: "₹620", priceNum: 620, mrp: "₹800", badge: "22% OFF", badgeType: "red", discount: "22% OFF" },
  { id: "f4", imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=85", name: "Anchor Fastener D-Hook", category: "Nuts & Bolts", price: "₹45", priceNum: 45, mrp: "₹60", badge: "25% OFF", badgeType: "red", discount: "25% OFF" },
  { id: "f5", imageUrl: "https://images.unsplash.com/photo-1545259742-f5e4c544ea94?w=500&q=85", name: "Industrial Bolt Set (100pc)", category: "Nuts & Bolts", price: "₹180", priceNum: 180, mrp: "₹240", badge: "25% OFF", badgeType: "red", discount: "25% OFF" },
  { id: "f6", imageUrl: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=85", name: "Nylon Gate Roller (Heavy)", category: "Gate Rollers", price: "₹220", priceNum: 220, mrp: "₹280", badge: "21% OFF", badgeType: "red", discount: "21% OFF" },
];

const TESTIMONIALS = [
  { name: "Rameshbhai Patel", role: "Contractor, Rajkot", text: "Best quality fabrication products in all of Saurashtra. Maheshbhai always delivers on time and at the best price." },
  { name: "Dinesh Shah", role: "Iron Shop, Ahmedabad", text: "The Rajwadi casting designs are phenomenal. Royal quality. We source everything from Mahesh Enterprise." },
  { name: "Suresh Fabrication", role: "Fabricator, Surendranagar", text: "One-stop shop for all our hardware needs. Consistent quality, fast supply, excellent service every time." },
];

const badgeColors: Record<string, { bg: string; color: string }> = {
  green: { bg: "#f0fdf4", color: "#166534" },
  blue: { bg: "#eff6ff", color: "#1d4ed8" },
  red: { bg: "#fef2f2", color: "#991b1b" },
};

export default function HomePage() {
  const { addItem } = useCart();
  const handleAdd = (p: typeof FEATURED[0]) => {
    addItem({ id: p.id, name: p.name, price: p.price, priceNum: p.priceNum, category: p.category, imageUrl: p.imageUrl });
    toast.success(`${p.name} added to cart!`);
  };

  return (
    <div className="page-top">

      {/* ─── HERO ─── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8e6e0" }} className="section-pad">
        <div className="hero-grid">
          <motion.div className="hero-text" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", color: "#1d4ed8", fontSize: "11px", fontWeight: 700, padding: "5px 12px", borderRadius: "20px", marginBottom: "16px" }}>
              ⭐ Surendranagar&apos;s #1 Hardware Store
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, color: "#1a1a1a", marginBottom: "12px" }}>
              All Hardware.<br /><span style={{ color: "#2563eb" }}>One Place.</span>
            </h1>
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, marginBottom: "24px", maxWidth: "440px" }}>
              Mahesh Enterprise — specialists in Rajwadi Casting Design, Laser Cutting, Gate Rollers, Hinges & 500+ fabrication products. Direct from manufacturer, best prices guaranteed.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
              <Link href="/products" className="btn-primary" style={{ fontSize: "14px", padding: "12px 24px" }}>
                Shop Now <FiArrowRight size={16} />
              </Link>
              <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "8px", textDecoration: "none" }}>
                <FaWhatsapp size={18} /> WhatsApp Us
              </a>
            </div>
            <div className="stats-row">
              {[["500+", "Products"], ["10+", "Years Exp."], ["1000+", "Clients"], ["5.0", "Rating"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(18px,4vw,24px)", fontWeight: 800, color: "#2563eb" }}>{n}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero card — hidden on mobile/tablet, shown on lg */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            style={{ flexDirection: "column", gap: "10px", width: "220px" }} className="hidden lg:flex">
            {[
              { icon: "🏰", label: "Rajwadi Casting", sub: "100+ royal designs" },
              { icon: "⚙️", label: "Gate Rollers", sub: "MS · CI · Nylon" },
              { icon: "✨", label: "Laser Cutting", sub: "Custom CNC designs" },
            ].map(c => (
              <div key={c.label} style={{ background: "#f9fafb", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "28px" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{c.label}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{c.sub}</div>
                </div>
              </div>
            ))}
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#1d4ed8", marginBottom: "4px" }}>📞 Call Maheshbhai</div>
              <a href="tel:+919773481051" style={{ fontSize: "16px", fontWeight: 800, color: "#1e3a8a", textDecoration: "none" }}>+91 97734 81051</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section style={{ background: "#2563eb", padding: "10px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "6px" }}>
          {["✅ Genuine Products", "🚚 Fast Dispatch", "💬 WhatsApp Support", "📦 Bulk Orders", "⭐ 5.0 Rating"].map(t => (
            <span key={t} style={{ color: "#bfdbfe", fontSize: "11px", fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="section-pad" style={{ background: "#f5f4f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 className="section-title">Shop by Category</h2>
            <Link href="/products" style={{ fontSize: "13px", fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>View all →</Link>
          </div>
          <div className="cat-grid">
            {CATS.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link href={`/products?category=${encodeURIComponent(c.slug)}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "14px 10px", textAlign: "center", transition: "border-color 0.2s, transform 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2563eb"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e6e0"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                    <div style={{ fontSize: "clamp(22px,4vw,28px)", marginBottom: "6px" }}>{c.icon}</div>
                    <div style={{ fontSize: "clamp(10px,2vw,12px)", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px", lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: "10px", color: "#9ca3af" }}>{c.count}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="section-pad" style={{ background: "#f5f4f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px" }}>🔥 Best Sellers</div>
              <h2 className="section-title" style={{ margin: 0 }}>Featured Products</h2>
            </div>
            <Link href="/products" style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "8px 14px", background: "#fff" }}>View all 500+ →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
            {FEATURED.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "transform 0.2s, box-shadow 0.2s", height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}>
                  {/* Image Box */}
                  <div style={{ position: "relative", height: "180px", background: "#f9fafb", overflow: "hidden" }}>
                    <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/300x200/f9fafb/9ca3af?text=Product"; }} />
                    {/* Discount badge */}
                    <div style={{ position: "absolute", top: "10px", left: "10px", background: "#ef4444", color: "#fff", fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "6px", letterSpacing: "0.3px" }}>{p.discount}</div>
                  </div>
                  {/* Info */}
                  <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.8px" }}>{p.category}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.35, minHeight: "36px" }}>{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                      <span style={{ color: "#f59e0b", fontSize: "11px", letterSpacing: "-1px" }}>★★★★★</span>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>(42)</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "2px" }}>
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "#1a1a1a" }}>{p.price}</span>
                      <span style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "line-through" }}>{p.mrp}</span>
                    </div>
                    <button onClick={() => handleAdd(p)} style={{ marginTop: "10px", width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "9px", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#1d4ed8")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#2563eb")}>
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BULK OFFER BANNER ─── */}
      <section className="section-pad" style={{ background: "#f5f4f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "clamp(20px,4vw,32px)" }}>
            <div className="bulk-inner">
              <div>
                <div style={{ background: "#2563eb", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "6px", display: "inline-block", marginBottom: "10px" }}>BULK DISCOUNT</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "6px" }}>Order 50+ units,<br />save up to 20%</h2>
                <p style={{ fontSize: "13px", color: "#93c5fd", marginBottom: "16px" }}>Call or WhatsApp for bulk pricing — all products</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href="https://wa.me/919773481051?text=Hello Maheshbhai! I need bulk pricing." target="_blank" rel="noopener"
                    style={{ background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <FaWhatsapp size={15} /> WhatsApp
                  </a>
                  <a href="tel:+919773481051" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <FiPhone size={13} /> Call Us
                  </a>
                </div>
              </div>
              <div className="bulk-stats">
                {[["20%", "Max Discount"], ["50+", "Min. Units"], ["24h", "Response"]].map(([n, l]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "14px 18px", textAlign: "center", minWidth: "80px" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "#fff" }}>{n}</div>
                    <div style={{ fontSize: "10px", color: "#93c5fd", marginTop: "2px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: "20px" }}>Why Choose Mahesh Enterprise?</h2>
          <div className="why-grid">
            {[
              { icon: "🏭", title: "Direct Manufacturer", desc: "No middlemen — best price always." },
              { icon: "🚚", title: "Fast Dispatch", desc: "In-stock items dispatched same day." },
              { icon: "💬", title: "WhatsApp Support", desc: "Chat directly, get instant quotes." },
              { icon: "⭐", title: "5.0 Google Rating", desc: "1000+ verified happy customers." },
            ].map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "18px", height: "100%" }}>
                  <div style={{ width: "38px", height: "38px", background: "#eff6ff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "10px" }}>{w.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", marginBottom: "5px" }}>{w.title}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.5 }}>{w.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-pad" style={{ background: "#f5f4f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: "20px" }}>What Clients Say</h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "18px", height: "100%" }}>
                  <div style={{ color: "#f59e0b", fontSize: "13px", marginBottom: "10px" }}>★★★★★</div>
                  <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, marginBottom: "14px", fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ borderTop: "1px solid #f0efe9", paddingTop: "10px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{t.name}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad" style={{ background: "#fff", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, color: "#1a1a1a", marginBottom: "12px" }}>
            Ready to Order? <span style={{ color: "#2563eb" }}>Let&apos;s Talk.</span>
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "24px", lineHeight: 1.7, fontSize: "14px" }}>
            Contact Maheshbhai directly for the best prices and fastest service in Surendranagar.
          </p>
          <div className="cta-buttons">
            <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "13px 24px", borderRadius: "10px", textDecoration: "none" }}>
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "14px", padding: "13px 24px" }}>
              Send Inquiry <FiArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}