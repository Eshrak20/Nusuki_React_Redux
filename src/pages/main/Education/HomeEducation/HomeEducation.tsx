import DreamStudy from "./HomeEducationComponent/DreamStudy";
import OurFeatures from "./HomeEducationComponent/OurFeatures";
import OurCoreStrength from "./HomeEducationComponent/OurCoreStrength";
import WhyNusuki from "./HomeEducationComponent/WhyNusuki";
import EducationPartner from "./HomeEducationComponent/EducationPartner";

const HomeEducation = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <OurCoreStrength />
        <DreamStudy />
        <OurFeatures />
        <WhyNusuki />
        <EducationPartner />
      </div>
    </>
  );
};

export default HomeEducation;
