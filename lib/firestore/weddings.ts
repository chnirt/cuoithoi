// lib/firestore/weddings.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, deleteDoc } from "firebase/firestore";
import type { WeddingPageProps } from "@/types/wedding";
import { createWeddingSlug, getUserIdFromSlug } from "@/utils/wedding";

/** Lưu wedding */
export async function saveWedding(
  data: WeddingPageProps & { userId: string; slug?: string }
) {
  const slug =
    data.slug || (data.couple.bride && data.couple.groom)
      ? createWeddingSlug(data.couple.bride, data.couple.groom, data.userId)
      : "";

  const weddingRef = doc(collection(db, "weddings"), data.userId);
  await setDoc(weddingRef, { ...data, slug });
  return slug;
}

/** Lấy wedding theo userId */
export async function fetchWeddingByUserId(userId: string) {
  if (!userId) return null;
  const weddingRef = doc(collection(db, "weddings"), userId);
  const snap = await getDoc(weddingRef);
  if (!snap.exists()) return null;
  return snap.data() as WeddingPageProps & { slug?: string };
}

/** Lấy wedding theo slug */
export async function getWedding(slug: string) {
  const userId = getUserIdFromSlug(slug);
  if (!userId) return null;

  const weddingRef = doc(collection(db, "weddings"), userId);
  const snap = await getDoc(weddingRef);
  if (!snap.exists()) return null;

  return snap.data() as WeddingPageProps & { slug: string };
}
