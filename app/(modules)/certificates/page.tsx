import MainLayout from "@/layouts/MainLayout";
import MainCertificates from "./page/MainCertificates";

export const metadata = {
  title: "Certificates",
  description:
    "Certifications and recognitions earned by Pema Lepcha, including IC3 Digital Literacy and Certified Full-Stack Developer.",
};

const CertificatesPage = () => {
  return (
    <MainLayout>
      <MainCertificates />
    </MainLayout>
  );
};

export default CertificatesPage;
