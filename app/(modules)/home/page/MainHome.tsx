import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  IdentityBand,
  ProjectsSection,
  SkillsSection,
  StatementSection,
} from "@/components/section";

const MainHome: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatementSection />
      <SkillsSection />
      <ProjectsSection />
      <IdentityBand />
      <ExperienceSection />
      <GallerySection />
      <CertificatesSection />
      <ContactSection />
    </>
  );
};

export default MainHome;
