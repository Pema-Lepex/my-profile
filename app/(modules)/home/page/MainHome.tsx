import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  ExperienceSection,
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
      <CertificatesSection />
      <ContactSection />
    </>
  );
};

export default MainHome;
