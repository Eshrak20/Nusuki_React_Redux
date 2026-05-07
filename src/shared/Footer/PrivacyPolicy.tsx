
import { footerPagesData } from "@/data/footer/footerPagesData";
import FooterContentSections from "./FooterContentSections";
import FooterInfoPageLayout from "./FooterInfoPageLayout";

const PrivacyPolicy = () => {
  const data = footerPagesData.privacyPolicy;

  return (
    <FooterInfoPageLayout title={data.title} description={data.description}>
      <FooterContentSections sections={data.sections} />
    </FooterInfoPageLayout>
  );
};

export default PrivacyPolicy;