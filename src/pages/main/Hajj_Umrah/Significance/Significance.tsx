import { useMatch } from "react-router-dom";
import { sigData } from "../../../../data/significanceData";
import HajjUmrahBanner from "@/components/HajjUmrahBanner";
import SideImages from "@/components/SideImages";

import { useGetHajjSigQuery } from "@/redux/api/hajjApi";
import { useGetUmrahSigQuery } from "@/redux/api/umrahApi";
import SigBanHajjUmrah from "../Significance/SigBanHajjUmrah/SigBanHajjUmrah";
import StepGuide from "../Significance/StepGuide/StepGuide";
import SigFoot from "../Significance/SigFoot/SigFoot";
import SideImagesSkeleton from "@/components/skeletons/SideImagesSkeleton";
import SigBanHajjUmrahSkeleton from "@/components/skeletons/SigBanHajjUmrahSkeleton";
import StepGuideSkeleton from "@/components/skeletons/StepGuideSkeleton";
import SigFootSkeleton from "@/components/skeletons/SigFootSkeleton";

const Significance = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  /* ---------------- ROUTE MATCHING ---------------- */
  const isHajjSig = !!useMatch("/hajj/significance");
  const isUmrahSig = !!useMatch("/umrah/significance");

  /* ---------------- API CALLS ---------------- */
  const hajjSig = useGetHajjSigQuery(undefined, {
    skip: !isHajjSig,
  });

  const umrahSig = useGetUmrahSigQuery(undefined, {
    skip: !isUmrahSig,
  });

  /* ---------------- BANNER TITLE ---------------- */
  let bannerTitle = "";
  if (isHajjSig) bannerTitle = "Hajj Steps & Benefits";
  if (isUmrahSig) bannerTitle = "Umrah Steps & Benefits";

  /* ---------------- LOADING STATE ---------------- */
  const isLoading =
    (isHajjSig && hajjSig.isLoading) || (isUmrahSig && umrahSig.isLoading);

  /* ---------------- DATA PICKING ---------------- */
  const pageData = isHajjSig
    ? hajjSig.data?.data?.[0]
    : umrahSig.data?.data?.[0];

  /* ---------------- SAFETY CHECK ---------------- */
  /* ---------------- RENDER ---------------- */
  return (
    <>
      <HajjUmrahBanner title={bannerTitle} />

      {/* MAIN CONTENT */}

      <div className="max-w-350 mx-auto py-7 lg:py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Content Section */}
          <div className="flex flex-col justify-center">
            {isLoading || !pageData ? (
              <SigBanHajjUmrahSkeleton />
            ) : (
              <SigBanHajjUmrah
                title={pageData.title}
                description={pageData.description}
              />
            )}
          </div>

          {/* Images Section */}
          <div className="flex justify-center items-center ">
            {isLoading || !pageData ? (
              <SideImagesSkeleton />
            ) : (
              <SideImages images={[pageData.image]} />
            )}
          </div>
        </div>

        {isLoading || !pageData ? (
          <StepGuideSkeleton />
        ) : (
          <StepGuide
            guide_title={
              isHajjSig ? sigData[0].guide_title : sigData[1].guide_title
            }
            guide_des={isHajjSig ? sigData[0].guide_des : sigData[1].guide_des}
            requirements={
              isHajjSig ? sigData[0].requirements : sigData[1].requirements
            }
          />
        )}

        {/* FOOTER */}

        {isLoading || !pageData ? (
          <SigFootSkeleton />
        ) : (
          <SigFoot
            footer_title={pageData.title}
            footer_des={pageData.description}
          />
        )}
      </div>
    </>
  );
};

export default Significance;
