"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiShoppingCart } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { getProducts, Product } from "@/lib/firestore";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

const CATS = ["All", "Hinges & Mijagara", "Gate Rollers", "Casting Designs", "Laser Cutting", "Nuts & Bolts", "Welding", "MS/SS Items"];

const DEMO: Product[] = [
  { id: "p1", name: "Heavy Duty Gate Hinge (CI)", category: "Hinges & Mijagara", description: "Cast iron heavy duty gate hinge for main gates. All sizes available.", imageUrl: "🔩", featured: true, price: "₹280" },
  { id: "p2", name: "MS Sliding Gate Roller", category: "Gate Rollers", description: "Durable MS sliding gate roller with smooth operation.", imageUrl: "⚙️", featured: true, price: "₹450" },
  { id: "p3", name: "Rajwadi Finial Set (×4)", category: "Casting Designs", description: "Ornamental royal-style finials for gates and fences.", imageUrl: "🏰", featured: true, price: "₹620" },
  { id: "p4", name: "Custom Laser Cut Panel", category: "Laser Cutting", description: "CNC laser cutting on MS/SS sheets, any design.", imageUrl: "✨", featured: false, price: "Quote" },
  { id: "p5", name: "Anchor Fastener D-Hook", category: "Nuts & Bolts", description: "Heavy duty wall anchors and D-hooks for structural mounting.", imageUrl: "🔧", featured: false, price: "₹45" },
  { id: "p6", name: "Trolley Caster Wheel", category: "Gate Rollers", description: "360° swivel caster with polyurethane wheel for heavy loads.", imageUrl: "🛞", featured: false, price: "₹380" },
  { id: "p7", name: "Mangalam Welding Rod", category: "Welding", description: "High quality welding electrodes, all gauges.", imageUrl: "🔥", featured: false, price: "₹72/kg" },
  { id: "p8", name: "Self Drilling Screw (Pack)", category: "Nuts & Bolts", description: "Self drilling tek screws for roofing and cladding.", imageUrl: "🪛", featured: false, price: "₹120/pack" },
  { id: "p9", name: "MS Foundation Plate", category: "MS/SS Items", description: "Structural base plates for fabrication and construction.", imageUrl: "🔲", featured: false, price: "₹150" },
  { id: "p10", name: "Nylon Gate Roller", category: "Gate Rollers", description: "Quiet and smooth nylon gate roller for residential gates.", imageUrl: "⚙️", featured: false, price: "₹220" },
  { id: "p11", name: "Collapsible Gate Fitting Set", category: "Hinges & Mijagara", description: "Complete fitting set for accordion/collapsible security gates.", imageUrl: "🔩", featured: false, price: "₹550/set" },
  { id: "p12", name: "MS/SS Round Ball Finial", category: "Casting Designs", description: "Decorative ball finials for fencing and gate tops.", imageUrl: "🏰", featured: false, price: "₹95" },
];

const priceNum = (p: string) => parseInt(p.replace(/[^0-9]/g, "")) || 0;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(DEMO);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const { addItem } = useCart();

  useEffect(() => { getProducts().then(d => { if (d.length > 0) setProducts(d); }).catch(() => { }); }, []);

  const filtered = products.filter(p => {
    const mc = cat === "All" || p.category === cat;
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const handleAdd = (p: Product) => {
    addItem({ id: p.id!, name: p.name, price: p.price || "₹0", priceNum: priceNum(p.price || "0"), category: p.category, imageUrl: p.imageUrl });
    toast.success(`${p.name} added to cart!`);
  };

  return (
    <div className="page-top" style={{ minHeight: "100vh", background: "#f5f4f0" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e6e0", padding: "24px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,5vw,32px)", fontWeight: 800, marginBottom: "4px" }}>All Products</div>
          <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>500+ fabrication & hardware products in stock</div>
          <div style={{ position: "relative", maxWidth: "100%" }}>
            <FiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} size={15} />
            <input type="text" placeholder="Search hinges, rollers, bolts..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: "460px", background: "#f5f4f0", border: "1px solid #e8e6e0", borderRadius: "10px", padding: "10px 12px 10px 36px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a1a1a" }} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky-cats" style={{ background: "#fff", borderBottom: "1px solid #e8e6e0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", gap: "2px", overflowX: "auto", paddingBottom: "1px", scrollbarWidth: "none" }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              flexShrink: 0, padding: "10px 14px", border: "none",
              borderBottom: cat === c ? "2px solid #2563eb" : "2px solid transparent",
              background: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
              color: cat === c ? "#2563eb" : "#9ca3af", fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "color 0.2s"
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
        <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px", fontWeight: 500 }}>{filtered.length} products found</div>
        <div className="product-grid">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ delay: i * 0.03 }}>
                <div onClick={() => setSelected(p)} style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", height: "100%" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
                  <div style={{ height: "180px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    {p.imageUrl?.startsWith("http") ? <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} /> : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "32px" }}>📦</span><span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600, fontFamily: "sans-serif" }}>No Image</span></div>}
                    {p.featured && <span style={{ position: "absolute", top: "7px", left: "7px", background: "#eff6ff", color: "#1d4ed8", fontSize: "8px", fontWeight: 700, padding: "2px 6px", borderRadius: "5px" }}>Featured</span>}
                  </div>
                  <div style={{ padding: "10px" }}>
                    <div style={{ fontSize: "9px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>{p.category}</div>
                    <div style={{ fontSize: "clamp(11px,2.5vw,13px)", fontWeight: 700, color: "#1a1a1a", marginBottom: "5px", lineHeight: 1.3 }}>{p.name}</div>
                    {p.price && <div style={{ fontSize: "clamp(13px,3vw,15px)", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px" }}>{p.price}</div>}
                    <button onClick={e => { e.stopPropagation(); handleAdd(p); }} style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: "7px", padding: "8px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                      <FiShoppingCart size={12} /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "#fff", borderRadius: "16px", maxWidth: "480px", width: "100%", overflow: "hidden" }}>
              <div style={{ height: "240px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                {selected.imageUrl?.startsWith("http") ? <img src={selected.imageUrl} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span>{selected.imageUrl || "📦"}</span>}
                <button onClick={() => setSelected(null)} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", background: "#fff", border: "1px solid #e8e6e0", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiX size={16} color="#374151" />
                </button>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", marginBottom: "5px" }}>{selected.category}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(16px,4vw,22px)", fontWeight: 800, marginBottom: "8px" }}>{selected.name}</div>
                {selected.price && <div style={{ fontSize: "clamp(16px,4vw,22px)", fontWeight: 800, color: "#2563eb", marginBottom: "10px" }}>{selected.price}</div>}
                <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7, marginBottom: "18px" }}>{selected.description}</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleAdd(selected)} style={{ flex: 1, background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <FiShoppingCart size={15} /> Add to Cart
                  </button>
                  <a href={`https://wa.me/919773481051?text=Hi! I'm interested in: ${selected.name}`} target="_blank" rel="noopener"
                    style={{ flex: 1, background: "#16a34a", color: "#fff", borderRadius: "10px", padding: "12px", fontSize: "13px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <FaWhatsapp size={15} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}