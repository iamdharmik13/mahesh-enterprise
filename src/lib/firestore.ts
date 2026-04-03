import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, orderBy, where, serverTimestamp, Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Product {
  id?: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  imageUrl: string;
  featured: boolean;
  createdAt?: Timestamp;
}

export interface Order {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  products: { productId: string; productName: string; quantity: number }[];
  message: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: Timestamp;
}

export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt?: Timestamp;
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(collection(db, "products"), where("featured", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function addProduct(product: Omit<Product, "id" | "createdAt">, imageFile?: File): Promise<string> {
  let imageUrl = product.imageUrl;
  if (imageFile) {
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }
  const docRef = await addDoc(collection(db, "products"), {
    ...product, imageUrl, createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>, imageFile?: File): Promise<void> {
  let imageUrl = product.imageUrl;
  if (imageFile) {
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }
  await updateDoc(doc(db, "products", id), { ...product, imageUrl });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "products", id));
}

// ─── Orders ───────────────────────────────────────────────────────────────────
export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
}

export async function addOrder(order: Omit<Order, "id" | "createdAt" | "status">): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order, status: "pending", createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await updateDoc(doc(db, "orders", id), { status });
}

// ─── Inquiries ────────────────────────────────────────────────────────────────
export async function getInquiries(): Promise<Inquiry[]> {
  const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Inquiry));
}

export async function addInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "status">): Promise<string> {
  const docRef = await addDoc(collection(db, "inquiries"), {
    ...inquiry, status: "new", createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<void> {
  await updateDoc(doc(db, "inquiries", id), { status });
}
