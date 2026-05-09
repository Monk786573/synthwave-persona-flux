import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import Scene3D from "@/components/Scene3D";
import ScrollDriver from "@/components/ScrollDriver";
import FeedbackRating from "@/components/FeedbackRating";
import { ContactFlowProvider } from "@/components/ContactFlowProvider";

const Index = () => {
  return (
    <ContactFlowProvider>
      <div className="min-h-screen animate-fade-in" style={{ background: "#050507" }}>
        <Scene3D />
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
