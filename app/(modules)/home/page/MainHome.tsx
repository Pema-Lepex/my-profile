import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/section";

const MainHome: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <GallerySection />
      <CertificatesSection />
      <ContactSection />
    </>
  );
};

export default MainHome;
