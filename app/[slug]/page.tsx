"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getWedding } from "@/lib/firestore/weddings";
import { WeddingPageProps } from "@/types/wedding";
import WeddingPageView from "@/components/WeddingPageView";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundPage from "../not-found";

export default function WeddingPage() {
  const pathname = usePathname();
  const slug = pathname?.split("/").filter(Boolean).pop() || null;

  const [data, setData] = useState<WeddingPageProps | null>(null);
  const [loading, setLoading] = useState<boolean>(!!slug);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchWedding = async () => {
      try {
        const wedding = await getWedding(slug);
        if (!cancelled) setData(wedding);
      } catch (err) {
        console.error("Lỗi khi fetch wedding:", err);
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWedding();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) return <NotFoundPage />;

  if (loading) return <LoadingOverlay show={true} />;

  if (!data) return <NotFoundPage />;

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <WeddingPageView
        couple={data.couple}
        event={data.event}
        gallery={data.gallery}
      />
    </main>
  );
}
