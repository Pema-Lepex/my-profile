import MainLayout from "@/layouts/MainLayout";
import MainGallery from "./page/MainGallery";

export const metadata = {
  title: "Gallery",
  description:
    "Photo albums from Pema Lepcha's work — starting with the IC3 digital-literacy certification cohorts trained for GovTech's Digital Program for Hotels and Homestays in Thimphu, Bhutan.",
};

const GalleryPage = () => {
  return (
    <MainLayout>
      <MainGallery />
    </MainLayout>
  );
};

export default GalleryPage;
