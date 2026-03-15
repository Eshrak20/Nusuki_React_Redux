import { useGetCountriesQuery } from "@/redux/api/educationApi/educationApi";
import { useParams } from "react-router-dom";
import DestHero from "./DestHero";
import DestOnPageNav from "./DestOnPageNav";
import DestOverview from "./DestOverview";
import DestKeyFacts from "./DestKeyFacts";
import DestAdmissionRequirements from "./DestAdmissionRequirements";
import DestAcademicIntake from "./DestAcademicIntake";
import DestProgramsDuration from "./DestProgramsDuration";
import DestPopularPrograms from "./DestPopularPrograms";
import DestTopUniversities from "./DestTopUniversities";
import DestStudyCost from "./DestStudyCost";
import DestTopCities from "./DestTopCities";
import DestWorkOpportunities from "./DestWorkOpportunities";
import DestArticles from "./DestArticles";
import DestFAQs from "./DestFAQs";

const DestinationMain = () => {
  const { country } = useParams<{ country: string }>();

  const { data, isLoading } = useGetCountriesQuery({ country });

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No data found</div>;

  const destination = data?.data;

  return (
    <div>
      <DestHero hero={destination.hero} />
      <div className="max-w-7xl mx-auto">
        <DestOnPageNav navItems={destination.on_page_nav} />
        <DestOverview overview={destination.overview} />
        <DestKeyFacts facts={destination.key_facts} />
        <DestAdmissionRequirements requirements={destination.admission_requirements} />
        <DestAcademicIntake intake={destination.academic_intake} />
        <DestProgramsDuration programs={destination.programs_duration} />
        <DestPopularPrograms programs={destination.popular_programs} />
        <DestTopUniversities universities={destination.top_universities} />
        <DestStudyCost cost={destination.study_cost} />
        <DestTopCities cities={destination.top_cities} />
        <DestWorkOpportunities opportunities={destination.work_opportunities} />
        <DestArticles articles={destination.articles} />
        <DestFAQs faqs={destination.faqs} />
      </div>
    </div>
  );
};

export default DestinationMain;