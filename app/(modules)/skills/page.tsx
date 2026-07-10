import MainLayout from "@/layouts/MainLayout";
import MainSkills from "./page/MainSkills";

export const metadata = {
  title: "Skills",
  description:
    "The languages, frameworks, and tools Pema Lepcha works with day to day — JavaScript, TypeScript, React, Next.js, Tailwind CSS, GraphQL, and more.",
};

const SkillsPage = () => {
  return (
    <MainLayout>
      <MainSkills />
    </MainLayout>
  );
};

export default SkillsPage;
