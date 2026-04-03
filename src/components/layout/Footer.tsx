import Link from "next/link";
import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a1a", color: "#e5e7eb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px 28px" }}>
        {/* Top grid: brand full width on mobile, 4-col on desktop */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px" }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>
              Mahesh <span style={{ color: "#60a5fa" }}>Enterprise</span>
            </div>
            <div style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "2px", marginBottom: "14px" }}>HARDWARE & FABRICATION SHOP</div>
            <p style={{ fontSize: "13px", color: "#9ca3af", lineHeight: 1.7, marginBottom: "16px" }}>
              Surendranagar&apos;s trusted hardware store. Rajwadi casting design, laser cutting, gate rollers, hinges & all fabrication items.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="tel:+919773481051" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", textDecoration: "none", fontSize: "13px" }}>
                <FiPhone size={13} color="#60a5fa" /> +91 97734 81051 · Maheshbhai Davda
              </a>
              <a href="https://maps.google.com/?q=Jintan+Udyognagar+Surendranagar" target="_blank" rel="noopener"
                style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "#9ca3af", textDecoration: "none", fontSize: "13px" }}>
                <FiMapPin size={13} color="#60a5fa" style={{ flexShrink: 0, marginTop: 2 }} />
                Jintan Udyognagar, Post Office Line Street, Surendranagar, Gujarat — 363001
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9ca3af" }}>
                <FiClock size={13} color="#60a5fa" /> Mon–Sat 9AM–8PM · Sun 10AM–2PM
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
              <a href="https://wa.me/919773481051" target="_blank" rel="noopener"
                style={{ background: "#16a34a", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "7px 14px", borderRadius: "8px", textDecoration: "none" }}>
                💬 WhatsApp
              </a>
              <a href="tel:+919773481051"
                style={{ background: "#2563eb", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "7px 14px", borderRadius: "8px", textDecoration: "none" }}>
                📞 Call Now
              </a>
            </div>
          </div>

          {/* Links grid: 3-col on mobile sm, stays 3-col */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Shop</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["Hinges & Mijagara", "Gate Rollers", "Casting Designs", "Laser Cutting", "Nuts & Bolts", "Welding Items"].map(item => (
                  <Link key={item} href="/products" style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[["About Us", "/about"], ["Our Services", "/services"], ["Contact", "/contact"], ["Admin Panel", "/admin"]].map(([l, h]) => (
                  <Link key={h} href={h} style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Account</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[["Sign In", "/auth"], ["My Orders", "/auth/dashboard"], ["Get Quote", "/contact"], ["Bulk Orders", "/contact"]].map(([l, h]) => (
                  <Link key={h} href={h} style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #2a2a2a", padding: "14px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ fontSize: "11px", color: "#4b5563" }}>© 2024 Mahesh Enterprise. Fabrication ne lagti tamam vastuo malse.</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["⭐ 5.0 Google", "✅ Verified", "📍 Surendranagar"].map(b => (
              <span key={b} style={{ background: "#222", border: "1px solid #333", color: "#6b7280", fontSize: "10px", padding: "3px 8px", borderRadius: "6px" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
