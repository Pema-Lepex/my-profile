import MainLayout from "@/layouts/MainLayout";
import MainGallery from "./page/MainGallery";

export const metadata = {
  title: "Training Gallery",
  description:
    "Photos from the IC3 digital-literacy certification cohorts Pema Lepcha trained for GovTech's Digital Program for Hotels and Homestays in Thimphu, Bhutan.",
};

const GalleryPage = () => {
  return (
    <MainLayout>
      <MainGallery />
    </MainLayout>
  );
};

export default GalleryPage;
