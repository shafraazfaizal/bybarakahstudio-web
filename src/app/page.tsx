import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto, { Marquee } from "@/components/Manifesto";
import Collection from "@/components/Collection";
import NurSection from "@/components/NurSection";
import KidsSection from "@/components/KidsSection";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Collection />
        <NurSection />
        <KidsSection />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
