"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiPackage, FiPhone, FiSearch } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthState } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "@/components/ui/CartDrawer";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin, signInWithGoogle, logout } = useAuthState();
  const { count } = useCart();
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenu(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { setMenu(false); }, [pathname]);

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : null;

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "#fff", borderBottom: "1px solid #e8e6e0",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.3s",
      }}>

        {/* ═══════════════════════════════════════
            MOBILE HEADER  (hidden on md+)
        ═══════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Blue bar */}
          <div style={{ background: "#2563eb", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "17px", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
                Mahesh <span style={{ color: "#bfdbfe" }}>Enterprise</span>
              </div>
              <div style={{ fontSize: "7px", color: "#93c5fd", letterSpacing: "1.5px", fontWeight: 600 }}>HARDWARE & FABRICATION</div>
            </Link>

            {/* Right icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {/* User avatar circle */}
              <button
                onClick={() => user ? setUserMenu(!userMenu) : signInWithGoogle()}
                style={{ width: "34px", height: "34px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", background: user ? "#1d4ed8" : "rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                {initials
                  ? <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff", letterSpacing: "0.5px" }}>{initials}</span>
                  : <FiUser size={15} color="rgba(255,255,255,0.8)" />
                }
              </button>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                <FiShoppingCart size={16} color="#fff" />
                {count > 0 && (
                  <span style={{ position: "absolute", top: "-3px", right: "-3px", background: "#ef4444", color: "#fff", fontSize: "9px", fontWeight: 700, width: "15px", height: "15px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenu(!menu)}
                style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {menu ? <FiX size={17} color="#fff" /> : <FiMenu size={17} color="#fff" />}
              </button>
            </div>
          </div>

          {/* Mobile user dropdown */}
          <AnimatePresence>
            {userMenu && user && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                style={{ position: "absolute", top: "60px", right: "16px", background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "8px", minWidth: "190px", zIndex: 100, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                <div style={{ padding: "8px 12px 10px", borderBottom: "1px solid #f0efe9" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{user.displayName}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{user.email}</div>
                </div>
                <Link href="/auth/dashboard" onClick={() => setUserMenu(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", fontSize: "13px", color: "#374151", textDecoration: "none" }}>
                  <FiPackage size={14} /> My Orders
                </Link>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setUserMenu(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", fontSize: "13px", color: "#dc2626", textDecoration: "none" }}>
                    🔒 Admin Panel
                  </Link>
                )}
                <button onClick={() => { logout(); setUserMenu(false); }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", fontSize: "13px", color: "#6b7280", background: "none", border: "none", cursor: "pointer", width: "100%", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  <FiLogOut size={14} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile nav dropdown */}
          <AnimatePresence>
            {menu && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
                style={{ background: "#fff", borderTop: "1px solid #e8e6e0" }}>
                <div style={{ padding: "8px 16px 16px" }}>
                  {/* Search */}
                  <div style={{ position: "relative", marginBottom: "4px", marginTop: "8px" }}>
                    <FiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} size={14} />
                    <input type="text" placeholder="Search hinges, rollers, bolts..."
                      style={{ width: "100%", background: "#f5f4f0", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px 10px 36px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a1a1a" }} />
                  </div>

                  {/* Nav links */}
                  {LINKS.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setMenu(false)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 4px", fontSize: "15px", fontWeight: 600,
                      color: pathname === l.href ? "#2563eb" : "#1a1a1a",
                      textDecoration: "none", borderBottom: "1px solid #f5f4f0",
                    }}>
                      {l.label}
                      {pathname === l.href && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb" }} />}
                    </Link>
                  ))}
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMenu(false)} style={{ display: "flex", padding: "12px 4px", fontSize: "15px", fontWeight: 700, color: "#dc2626", textDecoration: "none", borderBottom: "1px solid #f5f4f0" }}>
                      🔒 Admin Panel
                    </Link>
                  )}

                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "10px", marginTop: "12px", marginBottom: "12px" }}>
                    {!user
                      ? <button onClick={() => { signInWithGoogle(); setMenu(false); }} className="btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: "13px" }}>
                          <FiUser size={13} /> Sign In
                        </button>
                      : <button onClick={() => { logout(); setMenu(false); }} className="btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: "13px" }}>
                          <FiLogOut size={13} /> Sign Out
                        </button>
                    }
                    <Link href="/contact" onClick={() => setMenu(false)} className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "13px" }}>
                      Get Quote
                    </Link>
                  </div>

                  {/* Contact strip */}
                  <div style={{ background: "#f5f4f0", borderRadius: "10px", padding: "10px 14px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <a href="tel:+919773481051" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>
                      <FiPhone size={13} /> +91 97734 81051
                    </a>
                    <div style={{ width: "1px", height: "16px", background: "#e8e6e0" }} />
                    <a href="https://wa.me/919773481051" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "#16a34a", textDecoration: "none" }}>
                      <FaWhatsapp size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════════════════════════════════════
            DESKTOP HEADER  (hidden on mobile)
        ═══════════════════════════════════════ */}
        <div className="hidden md:block">
          {/* Blue top bar */}
          <div style={{ background: "#2563eb", padding: "5px 24px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#bfdbfe", fontSize: "11px", fontWeight: 500 }}>
                ⭐ 5.0 Google Rating · Open Mon–Sat 9AM–8PM · Surendranagar, Gujarat
              </span>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="tel:+919773481051" style={{ color: "#bfdbfe", fontSize: "11px", fontWeight: 600, textDecoration: "none" }}>📞 +91 97734 81051</a>
                <a href="https://wa.me/919773481051" target="_blank" rel="noopener" style={{ color: "#bfdbfe", fontSize: "11px", fontWeight: 600, textDecoration: "none" }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>

          {/* White nav bar */}
          <div style={{ padding: "0 24px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", height: "60px", gap: "16px" }}>
              {/* Logo */}
              <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>
                  Mahesh <span style={{ color: "#2563eb" }}>Enterprise</span>
                </div>
                <div style={{ fontSize: "9px", color: "#9ca3af", letterSpacing: "2px", fontWeight: 600 }}>HARDWARE & FABRICATION</div>
              </Link>

              {/* Nav links */}
              <nav style={{ display: "flex", gap: "2px" }}>
                {LINKS.map(l => (
                  <Link key={l.href} href={l.href} style={{
                    fontSize: "13px", fontWeight: 600, padding: "0 12px", height: "60px",
                    display: "flex", alignItems: "center", textDecoration: "none",
                    color: pathname === l.href ? "#2563eb" : "#6b7280",
                    borderBottom: pathname === l.href ? "2px solid #2563eb" : "2px solid transparent",
                    transition: "color 0.2s",
                  }}>{l.label}</Link>
                ))}
                {isAdmin && (
                  <Link href="/admin" style={{ fontSize: "13px", fontWeight: 700, padding: "0 12px", height: "60px", display: "flex", alignItems: "center", textDecoration: "none", color: "#dc2626" }}>
                    🔒 Admin
                  </Link>
                )}
              </nav>

              {/* Search */}
              <div style={{ flex: 1, maxWidth: "260px", marginLeft: "auto", position: "relative" }}>
                <FiSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} size={14} />
                <input type="text" placeholder="Search products..."
                  style={{ width: "100%", background: "#f5f4f0", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "8px 12px 8px 32px", fontSize: "12px", color: "#1a1a1a", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
              </div>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} style={{ width: "38px", height: "38px", borderRadius: "8px", border: "1px solid #e8e6e0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", flexShrink: 0 }}>
                <FiShoppingCart size={17} color="#374151" />
                {count > 0 && (
                  <span style={{ position: "absolute", top: "-5px", right: "-5px", background: "#2563eb", color: "#fff", fontSize: "9px", fontWeight: 700, width: "17px", height: "17px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
                )}
              </button>

              {/* User avatar circle — desktop */}
              <div ref={userRef} style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => user ? setUserMenu(!userMenu) : signInWithGoogle()}
                  title={user ? user.displayName || "Account" : "Sign In"}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    border: user ? "2px solid #2563eb" : "1px solid #e8e6e0",
                    background: user ? "#2563eb" : "#f5f4f0",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden", flexShrink: 0,
                  }}
                >
                  {initials
                    ? <span style={{ fontSize: "13px", fontWeight: 800, color: "#fff", letterSpacing: "0.5px" }}>{initials}</span>
                    : <FiUser size={16} color="#6b7280" />
                  }
                </button>

                <AnimatePresence>
                  {userMenu && user && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      style={{ position: "absolute", top: "46px", right: 0, background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "8px", minWidth: "190px", zIndex: 100, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                      <div style={{ padding: "8px 12px 10px", borderBottom: "1px solid #f0efe9" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#fff", flexShrink: 0 }}>{initials}</div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{user.displayName}</div>
                            <div style={{ fontSize: "10px", color: "#9ca3af" }}>{user.email}</div>
                          </div>
                        </div>
                      </div>
                      <Link href="/auth/dashboard" onClick={() => setUserMenu(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", fontSize: "13px", color: "#374151", textDecoration: "none", borderRadius: "8px" }}>
                        <FiPackage size={14} /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" onClick={() => setUserMenu(false)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", fontSize: "13px", color: "#dc2626", textDecoration: "none", borderRadius: "8px" }}>
                          🔒 Admin Panel
                        </Link>
                      )}
                      <button onClick={() => { logout(); setUserMenu(false); }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", fontSize: "13px", color: "#6b7280", background: "none", border: "none", cursor: "pointer", width: "100%", borderRadius: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                        <FiLogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Get Quote */}
              <Link href="/contact" className="btn-primary" style={{ fontSize: "12px", padding: "9px 16px", flexShrink: 0 }}>
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
