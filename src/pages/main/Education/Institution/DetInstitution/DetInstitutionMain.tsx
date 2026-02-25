import { useGetUniversitiesDetailsQuery } from "@/redux/api/educationApi/universityApi";
import { useParams } from "react-router-dom";
import DetInstitutionCost from "./DetInstitutionCost";
import DetInstitutionOverview from "./DetInstitutionOverview";
import DetInstitutionPrograms from "./DetInstitutionPrograms";
import DetInstitutionRanking from "./DetInstitutionRanking";
import DetInstitutionIntakes from "./DetInstitutionIntakes";
import DetInstitutionAdmissionReq from "./DetInstitutionAdmissionReq";
import DetInstitutionRecruiters from "./DetInstitutionRecruiters";
import DetInstitutionBanner from "./DetInstitutionBanner";
import DetInstitutionCultural from "./DetInstitutionCultural";
import DetInstitutionFaq from "./DetInstitutionFaq";
import DetInstitutionAccomplish from "./DetInstitutionAccomplish";
import type { UniversityBannerCardMini } from "@/types/education/type.uniDet";
import DetInstitutionScholarships from "./DetInstitutionScholarships";

const DetInstitutionMain = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUniversitiesDetailsQuery(
    { id: id! },
    { skip: !id }
  );

  if (!id) return <div>ID not found</div>;
  if (isLoading) return <div>Loading...</div>;

  const university = data?.data;
  const detail = university?.detail_json;

  // ✅ Prepare mini banner card data
  const bannerData: UniversityBannerCardMini | undefined = detail
    ? {
      uni_logo: university?.uni_logo,
      universityName: detail.universityName,
      extraDetail: detail.extraDetail,
      location: detail.location,
      universityUrl: detail.universityUrl,
      universityBannerImage: detail.universityBannerImage,
    }
    : undefined;

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <DetInstitutionBanner detail={bannerData} />
      <DetInstitutionOverview university={university} />
      <DetInstitutionPrograms programs={detail?.topCourseDetail} />
      <DetInstitutionScholarships scholarships={detail?.scholarshipsAvailable} />
      <DetInstitutionRanking ranking={detail?.rankingSection} />
      <DetInstitutionCultural culture={detail?.cultureSection} />
      <DetInstitutionCost cost={detail?.costToStudySection} />
      <DetInstitutionIntakes intakes={detail?.intakeSection} />
      <DetInstitutionAdmissionReq admission={detail?.admissionRequirementDetail} />
      <DetInstitutionRecruiters placement={detail?.universityPlacementSection} />
      <DetInstitutionFaq faq={detail?.faqSection} />
      <DetInstitutionAccomplish accomplish={detail?.accomplishSection} />
    </div>
  );
};

export default DetInstitutionMain;