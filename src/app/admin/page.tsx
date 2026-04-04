"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiCheck, FiTag, FiPackage, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthState } from "@/hooks/useAuth";
import { getProducts, addProduct, updateProduct, deleteProduct, getOrders, getInquiries, updateOrderStatus, updateInquiryStatus, Product, Order, Inquiry } from "@/lib/firestore";
import toast from "react-hot-toast";

const CATS = ["Hinges & Mijagara", "Gate Rollers", "Casting Designs", "Laser Cutting", "Nuts & Bolts", "Welding", "MS/SS Items"];
const TABS = [{ id: "products", label: "Products", icon: "📦" }, { id: "orders", label: "Orders", icon: "🛒" }, { id: "inquiries", label: "Inquiries", icon: "💬" }];
const EMPTY = { name: "", category: CATS[0], description: "", price: "", mrp: "", discount: "", badge: "", stock: "in_stock" as Product["stock"], imageUrl: "", featured: false };

const SBadge = ({ s }: { s: string }) => {
  const m: Record<string, { bg: string; color: string }> = {
    pending: { bg: "#fff7ed", color: "#9a3412" }, processing: { bg: "#eff6ff", color: "#1d4ed8" },
    completed: { bg: "#f0fdf4", color: "#166534" }, cancelled: { bg: "#fef2f2", color: "#991b1b" },
    new: { bg: "#fef9c3", color: "#854d0e" }, read: { bg: "#eff6ff", color: "#1d4ed8" }, replied: { bg: "#f0fdf4", color: "#166534" },
  };
  const c = m[s] || m.pending;
  return <span style={{ background: c.bg, color: c.color, fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px" }}>{s}</span>;
};

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuthState();
  const router = useRouter();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (!loading && (!user || !isAdmin)) router.push("/auth"); }, [user, loading, isAdmin, router]);
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const load = async () => {
    try {
      const [p, o, i] = await Promise.all([getProducts(), getOrders(), getInquiries()]);
      setProducts(p); setOrders(o); setInquiries(i);
    } catch { toast.error("Failed to load data"); }
  };

  const openAdd = () => { setEditing(null); setForm(EMPTY); setImgFile(null); setImgPreview(""); setModal(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, category: p.category, description: p.description, price: p.price || "", mrp: p.mrp || "", discount: p.discount || "", badge: p.badge || "", stock: p.stock || "in_stock", imageUrl: p.imageUrl, featured: p.featured });
    setImgFile(null); setImgPreview(p.imageUrl || ""); setModal(true);
  };
  const handleDelete = async (id: string) => { if (!confirm("Delete this product?")) return; await deleteProduct(id); toast.success("Deleted"); load(); };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "rtmk3e5b");
    const res = await fetch("https://api.cloudinary.com/v1_1/drvdowruu/image/upload", { method: "POST", body: data });
    const json = await res.json();
    if (!json.secure_url) throw new Error("Upload failed");
    return json.secure_url;
  };

  const handleSave = async () => {
    if (!form.name || !form.description) { toast.error("Name and description required"); return; }
    setSaving(true);
    try {
      let finalForm = { ...form };
      if (imgFile) {
        toast.loading("Uploading image...");
        const imageUrl = await uploadToCloudinary(imgFile);
        finalForm = { ...finalForm, imageUrl };
      }
      if (editing?.id) { await updateProduct(editing.id, finalForm); toast.success("Product updated! ✅"); }
      else { await addProduct(finalForm); toast.success("Product added! ✅"); }
      setModal(false); load();
    } catch { toast.error("Failed to save. Try again."); }
    setSaving(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  if (loading || !isAdmin) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "32px", height: "32px", border: "3px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ paddingTop: "92px", minHeight: "100vh", background: "#f5f4f0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>🔒 Admin Panel</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: 800 }}>Dashboard</div>
          </div>
          {tab === "products" && <button onClick={openAdd} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "11px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}><FiPlus size={16} /> Add Product</button>}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "20px" }}>
          {[[" 📦", "Products", products.length], [" 🛒", "Orders", orders.length], [" 💬", "Inquiries", inquiries.length]].map(([e, l, v]) => (
            <div key={l as string} style={{ background: "#fff", border: "1px solid #e8e6e0", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{e}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: 800, color: "#2563eb" }}>{v}</div>
              <div style={{ fontSize: "11px", color: "#9ca3af" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e8e6e0", background: "#fff", borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "14px", border: "none", background: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, color: tab === t.id ? "#2563eb" : "#9ca3af", borderBottom: tab === t.id ? "2px solid #2563eb" : "2px solid transparent", fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e8e6e0", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "20px" }}>

          {/* Products */}
          {tab === "products" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px" }}>
              {products.map(p => (
                <div key={p.id} style={{ border: "1px solid #e8e6e0", borderRadius: "12px", overflow: "hidden", transition: "box-shadow 0.2s" }}>
                  <div style={{ height: "130px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    {p.imageUrl?.startsWith("http")
                      ? <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "32px" }}>📦</span><span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 600 }}>No Image</span></div>
                    }
                    {p.discount && <span style={{ position: "absolute", top: "6px", left: "6px", background: "#ef4444", color: "#fff", fontSize: "9px", fontWeight: 800, padding: "2px 7px", borderRadius: "5px" }}>{p.discount}</span>}
                    {p.featured && <span style={{ position: "absolute", top: "6px", right: "6px", background: "#2563eb", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>⭐ Featured</span>}
                  </div>
                  <div style={{ padding: "10px" }}>
                    <div style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>{p.category}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                      {p.price && <span style={{ fontSize: "13px", fontWeight: 800, color: "#1a1a1a" }}>{p.price}</span>}
                      {p.mrp && <span style={{ fontSize: "10px", color: "#9ca3af", textDecoration: "line-through" }}>{p.mrp}</span>}
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => openEdit(p)} style={{ flex: 1, border: "1px solid #bfdbfe", background: "#eff6ff", color: "#1d4ed8", borderRadius: "6px", padding: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}><FiEdit2 size={11} /> Edit</button>
                      <button onClick={() => handleDelete(p.id!)} style={{ flex: 1, border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", borderRadius: "6px", padding: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}><FiTrash2 size={11} /> Del</button>
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#9ca3af" }}>No products yet. Click "Add Product" to start.</div>}
            </div>
          )}

          {/* Orders */}
          {tab === "orders" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {orders.map(o => (
                <div key={o.id} style={{ border: "1px solid #e8e6e0", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{o.userName} · {o.userPhone}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>{o.userEmail}</div>
                    <div style={{ fontSize: "13px", color: "#374151" }}>{o.products.map(p => `${p.productName} ×${p.quantity}`).join(", ")}</div>
                    {o.message && <div style={{ fontSize: "12px", color: "#9ca3af", fontStyle: "italic", marginTop: "2px" }}>"{o.message}"</div>}
                    <div style={{ fontSize: "11px", color: "#b0a9a0", marginTop: "4px" }}>{o.createdAt?.toDate().toLocaleString("en-IN")}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                    <SBadge s={o.status} />
                    <select value={o.status} onChange={e => updateOrderStatus(o.id!, e.target.value as Order["status"]).then(load)}
                      style={{ border: "1px solid #e8e6e0", borderRadius: "6px", padding: "5px 8px", fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fff" }}>
                      {["pending", "processing", "completed", "cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <a href={`tel:${o.userPhone}`} style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "6px", padding: "5px 10px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>📞 Call</a>
                      <a href={`https://wa.me/91${o.userPhone.replace(/\D/g, "")}`} target="_blank" rel="noopener" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "5px 10px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>💬 WA</a>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>No orders yet.</div>}
            </div>
          )}

          {/* Inquiries */}
          {tab === "inquiries" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {inquiries.map(inq => (
                <div key={inq.id} style={{ border: "1px solid #e8e6e0", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{inq.name}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>{inq.phone} {inq.email && `· ${inq.email}`}</div>
                    <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, maxWidth: "500px" }}>{inq.message}</div>
                    <div style={{ fontSize: "11px", color: "#b0a9a0", marginTop: "6px" }}>{inq.createdAt?.toDate().toLocaleString("en-IN")}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                    <SBadge s={inq.status} />
                    <select value={inq.status} onChange={e => updateInquiryStatus(inq.id!, e.target.value as Inquiry["status"]).then(load)}
                      style={{ border: "1px solid #e8e6e0", borderRadius: "6px", padding: "5px 8px", fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fff" }}>
                      {["new", "read", "replied"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <a href={`tel:${inq.phone}`} style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "6px", padding: "5px 10px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>📞 Call</a>
                      <a href={`https://wa.me/91${inq.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "5px 10px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>💬 WA</a>
                    </div>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>No inquiries yet.</div>}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", maxWidth: "520px", width: "100%", maxHeight: "92vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e8e6e0", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "18px", fontWeight: 800 }}>{editing ? "✏️ Edit Product" : "➕ Add Product"}</div>
              <button onClick={() => setModal(false)} style={{ background: "#f5f4f0", border: "none", borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiX size={16} /></button>
            </div>

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Image Upload Section */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "8px" }}>📸 Product Image</label>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

                {imgPreview ? (
                  <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", height: "160px", marginBottom: "8px" }}>
                    <img src={imgPreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button onClick={() => { setImgFile(null); setImgPreview(""); setForm(p => ({ ...p, imageUrl: "" })); }}
                      style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiX size={14} />
                    </button>
                  </div>
                ) : null}

                <button onClick={() => fileRef.current?.click()} style={{ width: "100%", border: "2px dashed #bfdbfe", background: "#eff6ff", borderRadius: "10px", padding: "14px", fontSize: "13px", color: "#2563eb", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  <FiUpload size={15} /> {imgFile ? `✅ ${imgFile.name}` : "📷 Upload Photo from Phone/PC"}
                </button>
                <div style={{ textAlign: "center", fontSize: "11px", color: "#9ca3af", margin: "6px 0" }}>— or paste image URL below —</div>
                <input value={form.imageUrl} onChange={e => { setForm(p => ({ ...p, imageUrl: e.target.value })); setImgPreview(e.target.value); }}
                  placeholder="https://i.ibb.co/... or Cloudinary URL"
                  style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "9px 12px", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
              </div>

              {/* Product Name */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Product Name *</label>
                <input type="text" placeholder="e.g. Heavy Duty Gate Hinge (CI)" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fff" }}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Price Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Selling Price</label>
                  <input type="text" placeholder="e.g. ₹280" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                    style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>MRP (Cross Price)</label>
                  <input type="text" placeholder="e.g. ₹350" value={form.mrp} onChange={e => setForm(p => ({ ...p, mrp: e.target.value }))}
                    style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
                </div>
              </div>

              {/* Discount + Badge Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#ef4444", display: "block", marginBottom: "5px" }}>🔥 Discount Label</label>
                  <input type="text" placeholder="e.g. 20% OFF" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))}
                    style={{ width: "100%", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fff5f5" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Badge Text</label>
                  <input type="text" placeholder="e.g. Top Seller / New" value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))}
                    style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Stock Status</label>
                <select value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value as Product["stock"] }))}
                  style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fff" }}>
                  <option value="in_stock">✅ In Stock</option>
                  <option value="limited">⚠️ Limited Stock</option>
                  <option value="out_of_stock">❌ Out of Stock</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px" }}>Description *</label>
                <textarea rows={3} placeholder="Product details, sizes available, material..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", resize: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
              </div>

              {/* Featured toggle */}
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", background: "#f9fafb", padding: "12px", borderRadius: "10px", border: "1px solid #e8e6e0" }}>
                <div onClick={() => setForm(p => ({ ...p, featured: !p.featured }))} style={{ width: "22px", height: "22px", border: "2px solid #2563eb", borderRadius: "5px", background: form.featured ? "#2563eb" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
                  {form.featured && <FiCheck size={13} color="#fff" />}
                </div>
                <div onClick={() => setForm(p => ({ ...p, featured: !p.featured }))}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>⭐ Mark as Featured Product</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>Shows on homepage featured section</div>
                </div>
              </label>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid #e8e6e0", display: "flex", gap: "10px", position: "sticky", bottom: 0, background: "#fff" }}>
              <button onClick={() => setModal(false)} style={{ flex: 1, border: "1px solid #e8e6e0", background: "#fff", borderRadius: "10px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, background: saving ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {saving ? "⏳ Saving..." : editing ? "✅ Update Product" : "➕ Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}