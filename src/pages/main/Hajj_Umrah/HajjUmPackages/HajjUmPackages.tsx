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

  // if (packages.length === 0) {
  //   return (
  //     <div className="py-48 text-center text-gray-500">
  //       No packages available right now.
  //     </div>
  //   );
  // }

  /* ================= LOGIC ================= */

  // // First 3 items
  // const firstRowPackages = packages?.slice(0, 6);

  // // Remaining
  // const remainingPackages = packages?.slice(3);


  return (
    <>
      <HajjUmrahBanner title={bannerTitle} />

      <div className="max-w-350 mx-auto py-10 px-4">
        <AboBanHajjUmrah
          title={`Our ${isHajjPack ? "Hajj" : "Umrah"} Packages`}
          description="Choose the package that best suits your spiritual journey, comfort, and budget."
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

        <div>
          <FormSubmission
            title={
              isHajjPack
                ? "Contact Us to Book Your Hajj Package"
                : "Contact Us to Book Your Umrah Package"
            }
          />
        </div>

        <CommonAbout title={isHajjPack ? "Hajj" : "Umrah"} img={AboutImage} />
      </div>
    </>
  );
};

export default HajjUmPackages;
