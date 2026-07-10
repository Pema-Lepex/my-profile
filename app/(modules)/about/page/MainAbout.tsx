import { AboutSection } from "@/components/section";

// The extra top padding clears the fixed navbar. On the home page the hero's
// own padding does that job, so it only belongs on the standalone route.
const MainAbout: React.FC = () => {
  return <AboutSection className="pt-32 sm:pt-40" />;
};

export default MainAbout;
