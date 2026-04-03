"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiPackage, FiLogOut, FiMessageSquare, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthState } from "@/hooks/useAuth";
import { getUserOrders, Order } from "@/lib/firestore";

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pending:    { bg: "#fff7ed", color: "#9a3412", label: "Pending" },
  processing: { bg: "#eff6ff", color: "#1d4ed8", label: "Processing" },
  completed:  { bg: "#f0fdf4", color: "#166534", label: "Completed" },
  cancelled:  { bg: "#fef2f2", color: "#991b1b", label: "Cancelled" },
};

export default function DashboardPage() {
  const { user, loading, logout } = useAuthState();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { if (!loading && !user) router.push("/auth"); }, [user, loading, router]);
  useEffect(() => { if (user) getUserOrders(user.uid).then(setOrders).catch(() => {}); }, [user]);

  if (loading || !user) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "32px", height: "32px", border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f0", paddingTop: "120px", paddingBottom: "48px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8e6e0", padding: "24px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {user.photoURL
              ? <img src={user.photoURL} alt="" style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2px solid #e8e6e0" }} />
              : <div style={{ width: "52px", height: "52px", background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "20px", color: "#2563eb" }}>{(user.displayName || user.phoneNumber || "U")[0]}</div>
            }
            <div>
              <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>My Account</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: 800 }}>{user.displayName || user.phoneNumber || "Customer"}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>{user.email || user.phoneNumber}</div>
            </div>
          </div>
          <button onClick={() => { logout(); router.push("/"); }}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: "8px", padding: "9px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <FiLogOut size={14} /> Sign Out
          </button>
        </motion.div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Total Orders", value: orders.length, icon: "📦" },
            { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: "⏳" },
            { label: "Completed", value: orders.filter(o => o.status === "completed").length, icon: "✅" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: 800, color: "#2563eb" }}>{s.value}</div>
              <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8e6e0", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid #e8e6e0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "18px", fontWeight: 800 }}>My Orders</div>
            <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
              style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
              <FaWhatsapp size={14} /> Ask Maheshbhai
            </a>
          </div>

          {orders.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
              <div style={{ fontWeight: 700, color: "#374151", marginBottom: "6px" }}>No orders yet</div>
              <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "20px" }}>Browse our products and place your first order!</div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <a href="/products" style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 20px", borderRadius: "8px", textDecoration: "none" }}>Browse Products</a>
                <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
                  style={{ background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FaWhatsapp size={14} /> WhatsApp Order
                </a>
              </div>
            </div>
          ) : (
            <div>
              {orders.map((order, i) => {
                const s = STATUS_STYLE[order.status] || STATUS_STYLE.pending;
                return (
                  <div key={order.id} style={{ padding: "18px 24px", borderBottom: i < orders.length - 1 ? "1px solid #f5f4f0" : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>
                        {order.products.map(p => `${p.productName} ×${p.quantity}`).join(", ")}
                      </div>
                      {order.message && <div style={{ fontSize: "12px", color: "#9ca3af", fontStyle: "italic", marginBottom: "4px" }}>"{order.message}"</div>}
                      <div style={{ fontSize: "11px", color: "#b0a9a0" }}>{order.createdAt?.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                    </div>
                    <span style={{ background: s.bg, color: s.color, fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", flexShrink: 0 }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
          <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
            style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "16px", textDecoration: "none" }}>
            <FaWhatsapp size={22} color="#16a34a" />
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#15803d" }}>WhatsApp Chat</div>
              <div style={{ fontSize: "11px", color: "#4ade80" }}>Get instant support</div>
            </div>
          </a>
          <a href="tel:+919773481051"
            style={{ display: "flex", alignItems: "center", gap: "10px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "16px", textDecoration: "none" }}>
            <FiPhone size={20} color="#2563eb" />
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1d4ed8" }}>Call Maheshbhai</div>
              <div style={{ fontSize: "11px", color: "#60a5fa" }}>+91 97734 81051</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
