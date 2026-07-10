import MainLayout from "@/layouts/MainLayout";
import MainContact from "./page/MainContact";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Pema Lepcha — based in Babesa, Thimphu, Bhutan. Open to freelance and full-time work.",
};

const ContactPage = () => {
  return (
    <MainLayout>
      <MainContact />
    </MainLayout>
  );
};

export default ContactPage;
