"use client";

import { useWeddingData } from "@/context/WeddingContext";
import Countdown from "./Countdown";
import Hero from "./Hero";
import InvitationText from "./InvitationText";
import Gallery from "./Gallery";
import EventInfo from "./EventInfo";
import RSVPForm from "./RSVPForm";
import Footer from "./Footer";

export default function PreviewPanel() {
  const { weddingData: contextData } = useWeddingData();
  const couple = contextData?.couple;
  const event = contextData?.event;
  const gallery = contextData.gallery;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full lg:h-[calc(100vh-200px)] lg:flex lg:flex-col">
      <div className="w-full bg-white overflow-y-auto flex-1">
        <div className="bg-white">
          {/* Countdown */}
          <Countdown targetDate={event.datetime} />

          {/* Hero */}
          <Hero couple={couple} event={event} />

          {/* Lời mời */}
          <InvitationText />

          {/* Bộ sưu tập */}
          <Gallery images={gallery} />

          {/* Thông tin sự kiện */}
          <EventInfo event={event} />

          {/* Form RSVP */}
          <RSVPForm />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
