"use client";
import Link from "next/link";
import WeddingPageView from "@/components/WeddingPageView";
import { defaultWeddingData } from "@/mock/defaultWeddingData";

export default function Home() {
  const data = defaultWeddingData;
  const couple = data.couple;
  const event = data.event;
  const gallery = data.gallery;

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <WeddingPageView couple={couple} event={event} gallery={gallery} />

      <Link
        href="/editor"
        className="fixed bottom-6 right-6 z-[9999] bg-[#b9a27f] text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium hover:bg-[#a89370] transition-all duration-300"
      >
        Làm thiệp nè
      </Link>
    </main>
  );
}
