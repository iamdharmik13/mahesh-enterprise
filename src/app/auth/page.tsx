"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FiPhone, FiArrowRight, FiMessageSquare } from "react-icons/fi";
import { useAuthState } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function AuthPage() {
  const { user, loading, signInWithGoogle, signInWithPhone, confirmOTP } = useAuthState();
  const router = useRouter();
  const [tab, setTab] = useState<"google" | "phone">("google");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!loading && user) router.push("/auth/dashboard");
  }, [user, loading, router]);

  const handleGoogle = async () => {
    try { await signInWithGoogle(); toast.success("Signed in with Google!"); }
    catch { toast.error("Google sign-in failed. Please try again."); }
  };

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) { toast.error("Enter a valid 10-digit phone number"); return; }
    setSending(true);
    try {
      await signInWithPhone(`+91${phone.replace(/\D/g, "")}`);
      setOtpSent(true);
      toast.success("OTP sent to your phone!");
    } catch { toast.error("Failed to send OTP. Please try again."); }
    setSending(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) { toast.error("Enter the 6-digit OTP"); return; }
    setSending(true);
    try {
      await confirmOTP(otp);
      toast.success("Phone verified! Signed in successfully.");
    } catch { toast.error("Invalid OTP. Please try again."); }
    setSending(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", paddingTop: "120px" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8e6e0", padding: "40px", maxWidth: "420px", width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 800, marginBottom: "4px" }}>
            Mahesh <span style={{ color: "#2563eb" }}>Enterprise</span>
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Sign in to track orders & get quotes</div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", background: "#f5f4f0", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
          {[["google", "Google Account"], ["phone", "Phone / OTP"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t as "google" | "phone")}
              style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif",
                background: tab === t ? "#fff" : "transparent", color: tab === t ? "#1a1a1a" : "#9ca3af",
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              {l}
            </button>
          ))}
        </div>

        {tab === "google" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button onClick={handleGoogle}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", background: "#fff", border: "1px solid #e8e6e0", borderRadius: "10px", padding: "14px", cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a1a1a", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
              <FaGoogle size={18} color="#ea4335" /> Continue with Google
            </button>
            <div style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", margin: "4px 0" }}>
              Quick & secure · No password needed
            </div>
          </div>
        )}

        {tab === "phone" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Phone input */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>Mobile Number</label>
              <div style={{ display: "flex", border: "1px solid #e8e6e0", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ background: "#f5f4f0", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "13px", fontWeight: 600, color: "#374151", borderRight: "1px solid #e8e6e0" }}>+91</div>
                <input type="tel" placeholder="97734 81051" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} maxLength={10}
                  style={{ flex: 1, padding: "12px", border: "none", outline: "none", fontSize: "14px", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fff" }} />
              </div>
            </div>

            {!otpSent ? (
              <button onClick={handleSendOTP} disabled={sending}
                style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", opacity: sending ? 0.7 : 1 }}>
                {sending ? "Sending OTP..." : "Send OTP via SMS"}
              </button>
            ) : (
              <>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>Enter OTP</label>
                  <input type="text" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} maxLength={6}
                    style={{ width: "100%", border: "1px solid #e8e6e0", borderRadius: "10px", padding: "12px", fontSize: "18px", fontWeight: 700, letterSpacing: "8px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", textAlign: "center" }} />
                </div>
                <button onClick={handleVerifyOTP} disabled={sending}
                  style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {sending ? "Verifying..." : "Verify & Sign In"}
                </button>
                <button onClick={() => { setOtpSent(false); setOtp(""); }} style={{ background: "none", border: "none", color: "#2563eb", fontSize: "13px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Resend OTP
                </button>
              </>
            )}
            <div id="recaptcha-container" />
          </div>
        )}

        <div style={{ marginTop: "24px", padding: "16px", background: "#f0fdf4", borderRadius: "10px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "18px" }}>💬</span>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#166534", marginBottom: "2px" }}>Quick Alternative</div>
            <div style={{ fontSize: "12px", color: "#4b7a5e" }}>No sign-in? Just WhatsApp Maheshbhai directly at
              <a href="https://wa.me/919773481051" target="_blank" rel="noopener" style={{ color: "#16a34a", fontWeight: 700 }}> +91 97734 81051</a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
