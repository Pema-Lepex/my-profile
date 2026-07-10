import MainLayout from "@/layouts/MainLayout";
import MainAbout from "./page/MainAbout";

export const metadata = {
  title: "About",
  description:
    "Pema Lepcha — a self-taught software developer from Thimphu, Bhutan, turning complex ideas into simple interfaces with React and Next.js.",
};

const AboutPage = () => {
  return (
    <MainLayout>
      <MainAbout />
    </MainLayout>
  );
};

export default AboutPage;
