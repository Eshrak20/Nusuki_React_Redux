
import { footerPagesData } from "@/data/footer/footerPagesData";
import FooterContentSections from "./FooterContentSections";
import FooterInfoPageLayout from "./FooterInfoPageLayout";

const SupportCenter = () => {
  const data = footerPagesData.support;

  return (
    <FooterInfoPageLayout title={data.title} description={data.description}>
      <FooterContentSections sections={data.sections} />
    </FooterInfoPageLayout>
  );
};

export default SupportCenter;