import HeroSection from "@/components/sections/HeroSection";
import UrgencyStrip from "@/components/sections/UrgencyStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import SeeThrough from "@/components/sections/SeeThrough";
import VaultBento from "@/components/sections/VaultBento";
import SocialProof from "@/components/sections/SocialProof";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import BookingForm from "@/components/sections/BookingForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <UrgencyStrip />
      <HowItWorks />
      <SeeThrough />
      <VaultBento />
      <SocialProof />
      <FAQSection />
      <FinalCTA />
      <BookingForm />
      <Footer />
    </main>
  );
}
