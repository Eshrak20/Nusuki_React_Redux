
import { footerPagesData } from "@/data/footer/footerPagesData";
import FooterContentSections from "./FooterContentSections";
import FooterInfoPageLayout from "./FooterInfoPageLayout";

const Security = () => {
  const data = footerPagesData.security;

  return (
    <FooterInfoPageLayout title={data.title} description={data.description}>
      <FooterContentSections sections={data.sections} />
    </FooterInfoPageLayout>
  );
};

export default Security;