import { useMatch } from "react-router-dom";
import HajjUmrahBanner from "../../../../components/HajjUmrahBanner";

import {
  useGetHajjPreRegisterQuery,
  useGetHajjVisaQuery,
} from "../../../../redux/api/hajjApi";
import { useGetUmrahVisaQuery } from "../../../../redux/api/umrahApi";

import ReqList from "./ReqList/ReqList";
import SideImages from "../../../../components/SideImages";
import AboBanHajjUmrah from "../../../../components/AboBanHajjUmrah";
import AboBanHajjUmrahSkeleton from "@/components/skeletons/AboBanHajjUmrahSkeleton";
import ReqListSkeleton from "@/components/skeletons/ReqListSkeleton";
import SideImagesSkeleton from "@/components/skeletons/SideImagesSkeleton";
import FormSubmissionSkeleton from "@/components/skeletons/FormSubmissionSkeleton";
import FormSubmission from "@/components/FormSubmission";

const VisaRequirements = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  const isHajjVisa = !!useMatch("/hajj/visa-requirements");
  const isUmrahVisa = !!useMatch("/umrah/visa-requirements");
  const isHajjPreRegister = !!useMatch("/hajj/pre-register");
  const isUmrahPreRegister = !!useMatch("/umrah/pre-register");


  const hajjVisa = useGetHajjVisaQuery(undefined, {
    skip: !isHajjVisa,
  });

  const umrahVisa = useGetUmrahVisaQuery(undefined, {
    skip: !isUmrahVisa,
  });

  const hajjPreRegister = useGetHajjPreRegisterQuery(undefined, {
    skip: !isHajjPreRegister,
  });

  let bannerTitle = "";

  if (isHajjVisa) bannerTitle = "Hajj Visa Requirement";
  if (isUmrahVisa) bannerTitle = "Umrah Visa Requirement";
  if (isHajjPreRegister) bannerTitle = "Hajj Pre-Registration";
  if (isUmrahPreRegister) bannerTitle = "Umrah Pre-Registration";

  const isLoading =
    (isHajjVisa && hajjVisa.isLoading) ||
    (isUmrahVisa && umrahVisa.isLoading) ||
    (isHajjPreRegister && hajjPreRegister.isLoading);

  const rawData = isHajjVisa
    ? hajjVisa.data?.data?.[0]
    : isUmrahVisa
      ? umrahVisa.data?.data?.[0]
      : isHajjPreRegister
        ? hajjPreRegister.data?.data?.[0]
        : null;

  const pageData = rawData
    ? {
        about_title: rawData.title,
        about_des: rawData.description,
        requirements_title: "Visa Requirements",
        requirements: rawData.items?.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.short_desc,
        })),
        note_des: rawData.imp_note,
        images: [
          rawData.image1 ?? rawData.image, 
          rawData.image2, 
        ].filter((img): img is string => !!img),
      }
    : null;

  return (
    <>
      <HajjUmrahBanner title={bannerTitle} />

      {isLoading || !pageData ? (
        <AboBanHajjUmrahSkeleton />
      ) : (
        <AboBanHajjUmrah
          title={pageData.about_title}
          description={pageData.about_des}
        />
      )}
      <div className="max-w-350 mx-auto lg:py-10 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 px-4 lg:px-0 max-w-188.75">
            {isLoading || !pageData ? (
              <ReqListSkeleton />
            ) : (
              <ReqList
                title={pageData.requirements_title}
                requirements={pageData.requirements}
                note={pageData.note_des}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            {isLoading || !pageData ? (
              <SideImagesSkeleton />
            ) : (
              <SideImages images={pageData.images} />
            )}
          </div>
        </div>

        <div>
          {isLoading || !pageData ? (
            <FormSubmissionSkeleton />
          ) : (
            <FormSubmission title={pageData.about_title} />
          )}
        </div>
      </div>
    </>
  );
};

export default VisaRequirements;
