import MainLayout from "@/layouts/MainLayout";
import MainProjects from "./page/MainProjects";

export const metadata = {
  title: "Projects",
  description:
    "Production work and side projects by Pema Lepcha, including the GeoHazard Information System, the Royal Project Initiative System, and Educare Skill.",
};

const ProjectsPage = () => {
  return (
    <MainLayout>
      <MainProjects />
    </MainLayout>
  );
};

export default ProjectsPage;
