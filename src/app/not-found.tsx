import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
      <div>
        <div style={{ fontSize: "72px", marginBottom: "16px" }}>🔩</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "80px", fontWeight: 800, color: "#e8e6e0", lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 800, color: "#1a1a1a", margin: "12px 0 8px" }}>Page Not Found</h1>
        <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "28px" }}>This page doesn't exist. Let's get you back to the shop.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "10px", textDecoration: "none" }}>Go Home</Link>
          <Link href="/products" style={{ background: "#fff", color: "#1a1a1a", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", border: "1px solid #e8e6e0" }}>Browse Products</Link>
        </div>
      </div>
    </div>
  );
}
