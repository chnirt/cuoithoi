"use client";
import Link from "next/link";
import { useWeddingData } from "@/context/WeddingContext";
import Countdown from "@/components/Countdown";
import Hero from "@/components/Hero";
import InvitationText from "@/components/InvitationText";
import Gallery from "@/components/Gallery";
import EventInfo from "@/components/EventInfo";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  const { weddingData: contextData } = useWeddingData();
  const couple = contextData?.couple;
  const event = contextData?.event;
  const gallery = contextData?.gallery;

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Countdown targetDate={event.datetime} />

      <Hero couple={couple} event={event} />

      <InvitationText />

      <Gallery images={gallery} />

      <EventInfo event={event} />

      <RSVPForm />

      <Footer />

      <Link
        href="/editor"
        className="fixed bottom-6 right-6 z-[9999] bg-[#b9a27f] text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium hover:bg-[#a89370] transition-all duration-300"
      >
        Làm thiệp nè
      </Link>
    </main>
  );
}
