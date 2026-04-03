"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiMessageSquare, FiX, FiUpload, FiCheck, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthState } from "@/hooks/useAuth";
import { getProducts, addProduct, updateProduct, deleteProduct, getOrders, getInquiries, updateOrderStatus, updateInquiryStatus, Product, Order, Inquiry } from "@/lib/firestore";
import toast from "react-hot-toast";

const CATS = ["Hinges & Mijagara","Gate Rollers","Casting Designs","Laser Cutting","Nuts & Bolts","Welding","MS/SS Items"];
const TABS = [{ id:"products", label:"Products", icon:"📦" },{ id:"orders", label:"Orders", icon:"🛒" },{ id:"inquiries", label:"Inquiries", icon:"💬" }];
const EMPTY = { name:"", category:CATS[0], description:"", price:"", imageUrl:"", featured:false };

const SBadge = ({ s }: { s: string }) => {
  const m: Record<string, { bg: string; color: string }> = {
    pending:{ bg:"#fff7ed", color:"#9a3412" }, processing:{ bg:"#eff6ff", color:"#1d4ed8" },
    completed:{ bg:"#f0fdf4", color:"#166534" }, cancelled:{ bg:"#fef2f2", color:"#991b1b" },
    new:{ bg:"#fef9c3", color:"#854d0e" }, read:{ bg:"#eff6ff", color:"#1d4ed8" }, replied:{ bg:"#f0fdf4", color:"#166534" },
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

  const openAdd = () => { setEditing(null); setForm(EMPTY); setImgFile(null); setModal(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ name:p.name, category:p.category, description:p.description, price:p.price||"", imageUrl:p.imageUrl, featured:p.featured }); setImgFile(null); setModal(true); };
  const handleDelete = async (id: string) => { if (!confirm("Delete this product?")) return; await deleteProduct(id); toast.success("Deleted"); load(); };

  const handleSave = async () => {
    if (!form.name || !form.description) { toast.error("Name and description required"); return; }
    setSaving(true);
    try {
      if (editing?.id) { await updateProduct(editing.id, form, imgFile||undefined); toast.success("Product updated!"); }
      else { await addProduct(form, imgFile||undefined); toast.success("Product added!"); }
      setModal(false); load();
    } catch { toast.error("Failed to save"); }
    setSaving(false);
  };

  if (loading || !isAdmin) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:"32px", height:"32px", border:"3px solid #2563eb", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ paddingTop:"92px", minHeight:"100vh", background:"#f5f4f0" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"24px" }}>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
          <div>
            <div style={{ fontSize:"11px", fontWeight:700, color:"#dc2626", textTransform:"uppercase", letterSpacing:"1px", marginBottom:"2px" }}>🔒 Admin Panel</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"28px", fontWeight:800 }}>Dashboard</div>
          </div>
          {tab === "products" && <button onClick={openAdd} style={{ background:"#2563eb", color:"#fff", border:"none", borderRadius:"10px", padding:"11px 20px", fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}><FiPlus size={16}/> Add Product</button>}
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"20px" }}>
          {[["📦", "Products", products.length], ["🛒", "Orders", orders.length], ["💬", "Inquiries", inquiries.length]].map(([e,l,v]) => (
            <div key={l as string} style={{ background:"#fff", border:"1px solid #e8e6e0", borderRadius:"12px", padding:"18px", textAlign:"center" }}>
              <div style={{ fontSize:"24px", marginBottom:"4px" }}>{e}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"28px", fontWeight:800, color:"#2563eb" }}>{v}</div>
              <div style={{ fontSize:"11px", color:"#9ca3af" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"0", borderBottom:"1px solid #e8e6e0", background:"#fff", borderRadius:"12px 12px 0 0", marginBottom:"0", overflow:"hidden" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1, padding:"14px", border:"none", background:"none", cursor:"pointer", fontSize:"13px", fontWeight:700, color: tab===t.id ? "#2563eb" : "#9ca3af", borderBottom: tab===t.id ? "2px solid #2563eb" : "2px solid transparent", fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ background:"#fff", border:"1px solid #e8e6e0", borderTop:"none", borderRadius:"0 0 12px 12px", padding:"20px" }}>

          {/* Products */}
          {tab === "products" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:"12px" }}>
              {products.map(p => (
                <div key={p.id} style={{ border:"1px solid #e8e6e0", borderRadius:"12px", overflow:"hidden" }}>
                  <div style={{ height:"100px", background:"#f9fafb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"36px", position:"relative" }}>
                    {p.imageUrl?.startsWith("http") ? <img src={p.imageUrl} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.8 }} /> : <span>{p.imageUrl||"📦"}</span>}
                    {p.featured && <span style={{ position:"absolute", top:"6px", left:"6px", background:"#eff6ff", color:"#1d4ed8", fontSize:"8px", fontWeight:700, padding:"2px 6px", borderRadius:"4px" }}>Featured</span>}
                  </div>
                  <div style={{ padding:"10px" }}>
                    <div style={{ fontSize:"10px", color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"2px" }}>{p.category}</div>
                    <div style={{ fontSize:"12px", fontWeight:700, color:"#1a1a1a", marginBottom:"4px" }}>{p.name}</div>
                    {p.price && <div style={{ fontSize:"12px", color:"#6b7280", marginBottom:"8px" }}>{p.price}</div>}
                    <div style={{ display:"flex", gap:"6px" }}>
                      <button onClick={() => openEdit(p)} style={{ flex:1, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", borderRadius:"6px", padding:"6px", fontSize:"11px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}><FiEdit2 size={11}/> Edit</button>
                      <button onClick={() => handleDelete(p.id!)} style={{ flex:1, border:"1px solid #fecaca", background:"#fef2f2", color:"#dc2626", borderRadius:"6px", padding:"6px", fontSize:"11px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}><FiTrash2 size={11}/> Del</button>
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"40px", color:"#9ca3af" }}>No products yet. Click "Add Product" to start.</div>}
            </div>
          )}

          {/* Orders */}
          {tab === "orders" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {orders.map(o => (
                <div key={o.id} style={{ border:"1px solid #e8e6e0", borderRadius:"10px", padding:"16px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px", flexWrap:"wrap" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:"#1a1a1a", marginBottom:"2px" }}>{o.userName} · {o.userPhone}</div>
                    <div style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"4px" }}>{o.userEmail}</div>
                    <div style={{ fontSize:"13px", color:"#374151" }}>{o.products.map(p => `${p.productName} ×${p.quantity}`).join(", ")}</div>
                    {o.message && <div style={{ fontSize:"12px", color:"#9ca3af", fontStyle:"italic", marginTop:"2px" }}>"{o.message}"</div>}
                    <div style={{ fontSize:"11px", color:"#b0a9a0", marginTop:"4px" }}>{o.createdAt?.toDate().toLocaleString("en-IN")}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px", alignItems:"flex-end" }}>
                    <SBadge s={o.status} />
                    <select value={o.status} onChange={e => updateOrderStatus(o.id!, e.target.value as Order["status"]).then(load)}
                      style={{ border:"1px solid #e8e6e0", borderRadius:"6px", padding:"5px 8px", fontSize:"11px", fontFamily:"'Plus Jakarta Sans',sans-serif", background:"#fff" }}>
                      {["pending","processing","completed","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div style={{ display:"flex", gap:"6px" }}>
                      <a href={`tel:${o.userPhone}`} style={{ background:"#eff6ff", color:"#2563eb", border:"1px solid #bfdbfe", borderRadius:"6px", padding:"5px 10px", fontSize:"11px", fontWeight:700, textDecoration:"none" }}>📞 Call</a>
                      <a href={`https://wa.me/91${o.userPhone.replace(/\D/g,"")}`} target="_blank" rel="noopener" style={{ background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", borderRadius:"6px", padding:"5px 10px", fontSize:"11px", fontWeight:700, textDecoration:"none" }}>💬 WA</a>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <div style={{ textAlign:"center", padding:"40px", color:"#9ca3af" }}>No orders yet.</div>}
            </div>
          )}

          {/* Inquiries */}
          {tab === "inquiries" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {inquiries.map(inq => (
                <div key={inq.id} style={{ border:"1px solid #e8e6e0", borderRadius:"10px", padding:"16px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px", flexWrap:"wrap" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:"#1a1a1a", marginBottom:"2px" }}>{inq.name}</div>
                    <div style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"8px" }}>{inq.phone} {inq.email && `· ${inq.email}`}</div>
                    <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.6, maxWidth:"500px" }}>{inq.message}</div>
                    <div style={{ fontSize:"11px", color:"#b0a9a0", marginTop:"6px" }}>{inq.createdAt?.toDate().toLocaleString("en-IN")}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px", alignItems:"flex-end" }}>
                    <SBadge s={inq.status} />
                    <select value={inq.status} onChange={e => updateInquiryStatus(inq.id!, e.target.value as Inquiry["status"]).then(load)}
                      style={{ border:"1px solid #e8e6e0", borderRadius:"6px", padding:"5px 8px", fontSize:"11px", fontFamily:"'Plus Jakarta Sans',sans-serif", background:"#fff" }}>
                      {["new","read","replied"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div style={{ display:"flex", gap:"6px" }}>
                      <a href={`tel:${inq.phone}`} style={{ background:"#eff6ff", color:"#2563eb", border:"1px solid #bfdbfe", borderRadius:"6px", padding:"5px 10px", fontSize:"11px", fontWeight:700, textDecoration:"none" }}>📞 Call</a>
                      <a href={`https://wa.me/91${inq.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener" style={{ background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", borderRadius:"6px", padding:"5px 10px", fontSize:"11px", fontWeight:700, textDecoration:"none" }}>💬 WA</a>
                    </div>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && <div style={{ textAlign:"center", padding:"40px", color:"#9ca3af" }}>No inquiries yet.</div>}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }} onClick={() => setModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:"16px", maxWidth:"480px", width:"100%", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", borderBottom:"1px solid #e8e6e0" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"18px", fontWeight:800 }}>{editing ? "Edit Product" : "Add Product"}</div>
              <button onClick={() => setModal(false)} style={{ background:"#f5f4f0", border:"none", borderRadius:"8px", width:"32px", height:"32px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><FiX size={16}/></button>
            </div>
            <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:"14px" }}>
              {[["name","Product Name *","e.g. Heavy Duty Hinge","text"],["price","Price (optional)","e.g. ₹200 – ₹800","text"]].map(([k,l,ph,t]) => (
                <div key={k}>
                  <label style={{ fontSize:"12px", fontWeight:700, color:"#374151", display:"block", marginBottom:"5px" }}>{l}</label>
                  <input type={t} placeholder={ph} value={form[k as keyof typeof form] as string} onChange={e => setForm(p => ({...p,[k]:e.target.value}))}
                    style={{ width:"100%", border:"1px solid #e8e6e0", borderRadius:"8px", padding:"10px 12px", fontSize:"13px", outline:"none", fontFamily:"'Plus Jakarta Sans',sans-serif" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize:"12px", fontWeight:700, color:"#374151", display:"block", marginBottom:"5px" }}>Category</label>
                <select value={form.category} onChange={e => setForm(p => ({...p,category:e.target.value}))}
                  style={{ width:"100%", border:"1px solid #e8e6e0", borderRadius:"8px", padding:"10px 12px", fontSize:"13px", outline:"none", fontFamily:"'Plus Jakarta Sans',sans-serif", background:"#fff" }}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:"12px", fontWeight:700, color:"#374151", display:"block", marginBottom:"5px" }}>Description *</label>
                <textarea rows={3} placeholder="Product details..." value={form.description} onChange={e => setForm(p => ({...p,description:e.target.value}))}
                  style={{ width:"100%", border:"1px solid #e8e6e0", borderRadius:"8px", padding:"10px 12px", fontSize:"13px", outline:"none", resize:"none", fontFamily:"'Plus Jakarta Sans',sans-serif" }} />
              </div>
              <div>
                <label style={{ fontSize:"12px", fontWeight:700, color:"#374151", display:"block", marginBottom:"5px" }}>Product Image</label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setImgFile(e.target.files?.[0]||null)} />
                <button onClick={() => fileRef.current?.click()} style={{ width:"100%", border:"2px dashed #bfdbfe", background:"#eff6ff", borderRadius:"8px", padding:"12px", fontSize:"12px", color:"#2563eb", fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  <FiUpload size={14}/> {imgFile ? imgFile.name : "Upload Image"}
                </button>
                <input value={form.imageUrl} onChange={e => setForm(p => ({...p,imageUrl:e.target.value}))} placeholder="Or paste image URL"
                  style={{ width:"100%", border:"1px solid #e8e6e0", borderRadius:"8px", padding:"8px 12px", fontSize:"12px", outline:"none", fontFamily:"'Plus Jakarta Sans',sans-serif", marginTop:"6px" }} />
              </div>
              <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                <div onClick={() => setForm(p => ({...p,featured:!p.featured}))} style={{ width:"20px", height:"20px", border:"2px solid #2563eb", borderRadius:"4px", background: form.featured ? "#2563eb" : "#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {form.featured && <FiCheck size={12} color="#fff"/>}
                </div>
                <span style={{ fontSize:"13px", fontWeight:600, color:"#374151" }} onClick={() => setForm(p => ({...p,featured:!p.featured}))}>Mark as Featured Product</span>
              </label>
            </div>
            <div style={{ padding:"16px 24px", borderTop:"1px solid #e8e6e0", display:"flex", gap:"10px" }}>
              <button onClick={() => setModal(false)} style={{ flex:1, border:"1px solid #e8e6e0", background:"#fff", borderRadius:"10px", padding:"12px", fontSize:"13px", fontWeight:600, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex:2, background:"#2563eb", color:"#fff", border:"none", borderRadius:"10px", padding:"12px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", opacity:saving?0.7:1 }}>
                {saving ? "Saving..." : editing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
