import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import LiquidBackground from "@/components/LiquidBackground";
import ScrollDriver from "@/components/ScrollDriver";
import FeedbackRating from "@/components/FeedbackRating";
import { ContactFlowProvider } from "@/components/ContactFlowProvider";

const Index = () => {
  return (
    <ContactFlowProvider>
      <div className="min-h-screen animate-fade-in" style={{ background: "#000" }}>
        <LiquidBackground />
        <ScrollDriver />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <WorkSection />
          <ContactSection />
          <FeedbackRating />
        </main>
      </div>
    </ContactFlowProvider>
  );
};

export default Index;
