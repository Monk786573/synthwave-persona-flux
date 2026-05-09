import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import Scene3D from "@/components/Scene3D";

const Index = () => {
  return (
    <div className="min-h-screen animate-fade-in" style={{ background: "#050507" }}>
      <Scene3D />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
