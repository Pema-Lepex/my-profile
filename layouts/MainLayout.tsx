import { Aurora } from "@/components/ui";
import { ScrollProgress } from "@/components/motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <ScrollProgress />
      <Aurora />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
