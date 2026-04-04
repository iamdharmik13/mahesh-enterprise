"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, total, count } = useCart();

  const waMsg = encodeURIComponent(
    `Hello Maheshbhai! I want to order:\n${items.map(i => `• ${i.name} x${i.quantity} = ₹${(i.priceNum * i.quantity).toLocaleString("en-IN")}`).join("\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}`
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200 }} />

          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: "380px", maxWidth: "100vw",
              background: "#fff", zIndex: 201, display: "flex", flexDirection: "column",
              boxShadow: "-4px 0 30px rgba(0,0,0,0.1)"
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px", borderBottom: "1px solid #e8e6e0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "18px", fontWeight: 800 }}>Your Cart</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{count} {count === 1 ? "item" : "items"}</div>
              </div>
              <button onClick={onClose} style={{ background: "#f5f4f0", border: "none", borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <FiX size={18} color="#374151" />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 24px" }}>
                  <FiShoppingCart size={40} color="#d1d5db" style={{ margin: "0 auto 12px" }} />
                  <div style={{ fontWeight: 700, color: "#374151", marginBottom: "6px" }}>Cart is empty</div>
                  <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "20px" }}>Browse our products and add items</div>
                  <Link href="/products" onClick={onClose} className="btn-primary" style={{ fontSize: "13px" }}>Browse Products</Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {items.map(item => (
                    <div key={item.id} style={{ background: "#f9fafb", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "12px", display: "flex", gap: "12px" }}>
                      <div style={{ width: "54px", height: "54px", background: "#fff", borderRadius: "8px", border: "1px solid #e8e6e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, overflow: "hidden" }}>
                        {item.imageUrl?.startsWith("http") ? <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span>🔩</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{item.name}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "8px" }}>{item.category}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: "24px", height: "24px", borderRadius: "6px", border: "1px solid #e8e6e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <FiMinus size={11} color="#374151" />
                            </button>
                            <span style={{ fontSize: "13px", fontWeight: 700, width: "20px", textAlign: "center" }}>{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: "24px", height: "24px", borderRadius: "6px", border: "1px solid #e8e6e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <FiPlus size={11} color="#374151" />
                            </button>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontWeight: 800, color: "#2563eb", fontSize: "14px" }}>
                              ₹{(item.priceNum * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                              <FiTrash2 size={14} color="#dc2626" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "16px", borderTop: "1px solid #e8e6e0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#6b7280" }}>
                  <span>Subtotal ({count} items)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "13px", color: "#6b7280" }}>
                  <span>Delivery</span>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>Free</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "2px solid #e8e6e0" }}>
                  <span style={{ fontWeight: 800, fontSize: "16px" }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "18px", color: "#2563eb" }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <a href={`https://wa.me/919773481051?text=${waMsg}`} target="_blank" rel="noopener"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "#16a34a", color: "#fff", borderRadius: "10px", padding: "13px", fontWeight: 700, fontSize: "14px", textDecoration: "none", marginBottom: "8px" }}>
                  <FaWhatsapp size={18} /> Order via WhatsApp
                </a>
                <Link href="/contact" onClick={onClose} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%",
                  background: "#2563eb", color: "#fff", borderRadius: "10px", padding: "13px",
                  fontWeight: 700, fontSize: "14px", textDecoration: "none"
                }}>
                  Place Order / Get Quote
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}