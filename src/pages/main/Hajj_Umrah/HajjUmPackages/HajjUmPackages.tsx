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

  /* ---------------- LOADING ---------------- */
  if ((isHajjPack && hajjLoading) || (isUmrahPack && umrahLoading)) {
    return (
      <div className="flex h-40 items-center justify-center animate-pulse text-hajj">
        Loading...
      </div>
    );
  }

  /* ---------------- SAFE DATA EXTRACTION ---------------- */
  const packages = isHajjPack
    ? (hajjResponse?.data ?? [])
    : (umrahResponse?.data ?? []);

  if (packages.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No packages available right now.
      </div>
    );
  }

  /* ================= LOGIC ================= */

  // First 3 items
  const firstRowPackages = packages.slice(0, 3);

  // Remaining
  const remainingPackages = packages.slice(3);

  // Group remaining by category
  const groupedPackages = remainingPackages.reduce(
    (acc: Record<string, typeof packages>, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  return (
    <>
      <HajjUmrahBanner title={bannerTitle} />

      <div className="max-w-387.5 mx-auto py-10 px-4">
        <AboBanHajjUmrah
          title={`Our ${isHajjPack ? "Hajj" : "Umrah"} Packages`}
          description="Choose the package that best suits your spiritual journey, comfort, and budget."
        />

        {/* ===== FIRST ROW ===== */}
        <section className="my-20">
          <HajjUmPackCard packages={firstRowPackages} />
        </section>

        {/* ===== CATEGORY SECTIONS ===== */}
        {Object.entries(groupedPackages).map(([category, items]) => (
          <section key={category} className="my-20">
            <h1 className="mb-10 text-center text-3xl font-semibold">
              {category}
            </h1>

            <HajjUmPackCard packages={items} />
          </section>
        ))}

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
