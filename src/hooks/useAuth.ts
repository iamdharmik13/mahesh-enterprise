"use client";
import { useState, useEffect } from "react";
import {
  User, signInWithPopup, GoogleAuthProvider,
  signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult,
  signOut, onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/lib/firebase";

declare global { interface Window { recaptchaVerifier?: RecaptchaVerifier; confirmationResult?: ConfirmationResult; } }

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  const isAdmin = user?.email === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithPhone = async (phoneNumber: string) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
    }
    const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    window.confirmationResult = result;
  };

  const confirmOTP = async (otp: string) => {
    if (!window.confirmationResult) throw new Error("No confirmation result");
    await window.confirmationResult.confirm(otp);
  };

  const logout = async () => {
    await signOut(auth);
    if (window.recaptchaVerifier) { window.recaptchaVerifier.clear(); window.recaptchaVerifier = undefined; }
  };

  return { user, loading, isAdmin, signInWithGoogle, signInWithPhone, confirmOTP, logout };
}
