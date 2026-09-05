import { Aurora } from "@/components/ui";
import { CursorGlow, ScrollProgress } from "@/components/motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageRail from "./components/PageRail";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <ScrollProgress />
      <Aurora />
      <CursorGlow />
      <Navbar />
      <PageRail />
      <main>{children}</main>
      <Footer />
    </>
  );
}
