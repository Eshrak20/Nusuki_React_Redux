import EduTitle from "@/components/education/EduTitle";
import image from "../../../../../assets/reactAssets/Education/image.png";
import { ourCoreStrengthData } from "@/data/education/ourCoreStrengthData";

const OurCoreStrength = () => {
  return (
    <section className="relative pt-44 bg-white overflow-hidden">
      {/* Top Blue Curve Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-primary/90 rounded-b-full opacity-80" />

      <div className="">
        <EduTitle name="Our Core Strengths" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ourCoreStrengthData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className={`text-5xl font-bold mb-4 text-primary`}>
                {item.value}
              </span>
              <h3 className="text-xl font-bold text-primary mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <h1 className="pt-24 pb-8 text-primary text-3xl font-bold">
          Your Study Abroad Steps
        </h1>
        <img className="w-full" src={image} alt="" />
      </div>
    </section>
  );
};

export default OurCoreStrength;
