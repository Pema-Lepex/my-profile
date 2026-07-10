import MainLayout from "@/layouts/MainLayout";
import MainExperience from "./page/MainExperience";

export const metadata = {
  title: "Experience",
  description:
    "The roles, studies, and awards behind Pema Lepcha's work — from Software Developer at iBEST Technologies to Certified Full-Stack Developer.",
};

const ExperiencePage = () => {
  return (
    <MainLayout>
      <MainExperience />
    </MainLayout>
  );
};

export default ExperiencePage;
