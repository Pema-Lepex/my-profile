import { CertificatesSection } from "@/components/section";

// The extra top padding clears the fixed navbar. On the home page the hero's
// own padding does that job, so it only belongs on the standalone route.
const MainCertificates: React.FC = () => {
  return <CertificatesSection className="pt-32 sm:pt-40" />;
};

export default MainCertificates;
