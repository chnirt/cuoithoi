"use client";

import { type WeddingPageProps } from "@/types/wedding";
import Countdown from "./Countdown";
import Hero from "./Hero";
import InvitationText from "./InvitationText";
import Gallery from "./Gallery";
import EventInfo from "./EventInfo";
// import RSVPForm from "./RSVPForm";
import Footer from "./Footer";

export default function WeddingPageView({
  couple,
  event,
  gallery,
}: WeddingPageProps) {
  return (
    <main className="bg-white overflow-hidden">
      <section id="countdown">
        <Countdown targetDate={event.datetime} />
      </section>

      <section id="hero">
        <Hero couple={couple} event={event} />
      </section>

      <section id="invitation">
        <InvitationText />
      </section>

      <section id="gallery">
        <Gallery images={gallery} />
      </section>

      <section id="event">
        <EventInfo event={event} />
      </section>

      {/* <section id="rsvp">
        <RSVPForm />
      </section> */}

      <Footer />
    </main>
  );
}
