"use client";

import { type WeddingPageProps } from "@/types/wedding";
import Countdown from "./Countdown";
import Hero from "./Hero";
import InvitationText from "./InvitationText";
import Gallery from "./Gallery";
import EventInfo from "./EventInfo";
// import RSVPForm from "./RSVPForm";
import Footer from "./Footer";
import WeddingAnniversary from "./AnniversaryCounter";
import AnniversaryHero from "./AnniversaryHero";
import WishesSection from "./WishesSection";

export default function WeddingPageView({
  couple,
  event,
  gallery,
}: WeddingPageProps) {
  const isPastWedding = event?.datetime
    ? new Date(event.datetime).getTime() < new Date().getTime()
    : false;

  if (isPastWedding) {
    return (
      <main className="bg-white overflow-hidden">
        <section id="hero">
          <AnniversaryHero couple={couple} weddingDate={event.datetime} />
        </section>

        <section id="celebration">
          <WeddingAnniversary weddingDate={event.datetime} />
        </section>

        <section id="wishes">
          <WishesSection />
        </section>

        <section id="gallery">
          <Gallery images={gallery} />
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white overflow-hidden">
      <section id="hero">
        <Hero couple={couple} event={event} />
      </section>

      <section id="countdown">
        <Countdown targetDate={event.datetime} />
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
