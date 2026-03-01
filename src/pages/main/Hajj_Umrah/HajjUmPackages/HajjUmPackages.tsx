import { useMatch } from "react-router-dom";

import HajjUmrahBanner from "@/components/HajjUmrahBanner";
import AboBanHajjUmrah from "@/components/AboBanHajjUmrah";
import AboutImage from "@/assets/reactAssets/Hajj_Umrah/about.jpg";

import { useGetHajjPackQuery } from "@/redux/api/hajjApi";
import { useGetUmrahPackQuery } from "@/redux/api/umrahApi";

import HajjUmPackCard from "./HajjUmPackCard/HajjUmPackCard";
import Faq from "@/components/Faq";
import FormSubmission from "@/components/FormSubmission";
import CommonAbout from "@/components/CommonAbout";
import { faqData } from "@/data/faqData";
import HajjUmPackCardSkeleton from "@/components/skeletons/HajjUmPackCardSkeleton";

const HajjUmPackages = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  /* ---------------- ROUTE MATCHING ---------------- */
  const isHajjPack = !!useMatch("/hajj/packages");
  const isUmrahPack = !!useMatch("/umrah/packages");

  /* ---------------- API CALLS ---------------- */
  const { data: hajjResponse, isLoading: hajjLoading } = useGetHajjPackQuery(
    undefined,
    { skip: !isHajjPack },
  );

  const { data: umrahResponse, isLoading: umrahLoading } = useGetUmrahPackQuery(
    undefined,
    { skip: !isUmrahPack },
  );

  /* ---------------- BANNER TITLE ---------------- */
  const bannerTitle = isHajjPack ? "Hajj Packages 2026" : "Umrah Packages";

  /* ---------------- SAFE DATA EXTRACTION ---------------- */
  const packages = isHajjPack
    ? (hajjResponse?.data.data ?? [])
    : (umrahResponse?.data.data ?? []);

  return (
    <>
      <HajjUmrahBanner title={bannerTitle} />

      <div className="max-w-350 mx-auto py-6 lg:py-10 px-4">
        <AboBanHajjUmrah
          title={`Our ${isHajjPack ? "Hajj" : "Umrah"} Packages`}
          description={`Explore our carefully designed ${isHajjPack ? "Hajj" : "Umrah"} packages crafted to provide you with a smooth, comfortable, and spiritually enriching journey. From visa processing and premium accommodation to guided rituals and transportation, every detail is thoughtfully arranged to ensure peace of mind. Choose the package that aligns with your spiritual goals, preferred comfort level, and budget, and let us support you in making this sacred journey truly memorable and hassle-free.`}
        />

        {/* ===== FIRST ROW ===== */}
        <section className="my-20">
          {(isHajjPack && hajjLoading) || (isUmrahPack && umrahLoading) ? (
            <HajjUmPackCardSkeleton />
          ) : (
            <HajjUmPackCard data={packages} />
          )}
        </section>

        <Faq faqs={faqData} />

        <CommonAbout title={isHajjPack ? "Hajj" : "Umrah"} img={AboutImage} />
        <div>
          <FormSubmission
            title={
              isHajjPack
                ? "Contact Us to Book Your Hajj Package"
                : "Contact Us to Book Your Umrah Package"
            }
          />
        </div>
      </div>
    </>
  );
};

export default HajjUmPackages;
