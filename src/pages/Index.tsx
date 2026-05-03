import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PhilosophySection from "@/components/PhilosophySection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import GlowCursor from "@/components/GlowCursor";
import JarvisOrb from "@/components/JarvisOrb";
import CubeReveal from "@/components/CubeReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain animate-page-load">
      <GlowCursor />
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <CubeReveal axis="x"><AboutSection /></CubeReveal>
      <CubeReveal axis="y"><SkillsSection /></CubeReveal>
      <CubeReveal axis="x"><PhilosophySection /></CubeReveal>
      <CubeReveal axis="y"><WorkSection /></CubeReveal>
      <CubeReveal axis="x"><ContactSection /></CubeReveal>
      <JarvisOrb />
    </div>
  );
};

export default Index;
