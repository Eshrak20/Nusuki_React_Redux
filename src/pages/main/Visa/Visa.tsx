import CommonAbout from "@/components/CommonAbout";
import ExclusiveOffer from "@/components/ExclusiveOffer";
import {
  useGetVisaServicesQuery,
  useGetVisaTourPackagesQuery,
} from "@/redux/api/visaApi";
import CmnCardSlider from "@/components/CmnCardSlider";
import SectionTitle from "@/components/SectionTitle";

const Visa = () => {
  const { data: visaPackages } = useGetVisaTourPackagesQuery();
  const { data: visaServices } = useGetVisaServicesQuery();

  const cmnCardSliderList1 = visaServices?.data;
  const cmnCardSliderList2 = visaPackages?.data;

  return (
    <>
      <ExclusiveOffer />
      <div className="mb-16 mt-32">
        <div className="mb-5">
          <SectionTitle title="Our Most Demanding Visa Services" />
        </div>
        <CmnCardSlider cmnCardSliderList={cmnCardSliderList1} />
      </div>
      <div className="mb-16">
        <div className="mb-5">
          <SectionTitle title="Our Tour Packages for You" />
        </div>
        <CmnCardSlider cmnCardSliderList={cmnCardSliderList2} />
      </div>
      <CommonAbout title="Visa" />
    </>
  );
};

export default Visa;
