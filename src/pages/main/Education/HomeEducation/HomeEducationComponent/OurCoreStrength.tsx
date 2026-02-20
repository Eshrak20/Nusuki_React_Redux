import EduTitle from "@/components/education/EduTitle";
import image from "../../../../../assets/reactAssets/Education/image.png";
import { ourCoreStrengthData } from "@/data/education/ourCoreStrengthData";

const OurCoreStrength = () => {
  return (
    <section className="relative pt-36 pb-12 bg-white overflow-hidden">
      {/* Subtle Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-linear-to-b from-primary/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <EduTitle name="Our Core Strengths" />
        </div>

        {/* Core Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {ourCoreStrengthData.map((item, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                {/* Number/Stat */}
                <span className="text-5xl font-extrabold mb-4 text-primary tracking-tight">
                  {item.value}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
                  {item.title}
                </h3>

                {/* Decorative Divider */}
                <div className="w-10 h-1 bg-primary/10 mb-4 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Study Abroad Steps Section */}
        <div className="">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="flex-1">
              <h2 className="text-primary text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Your Study Abroad Steps
              </h2>
            </div>
            
          </div>

          <div className="relative group rounded-3xl overflow-hidden bg-white p-2">
            <img
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              src={image}
              alt="Study Abroad Process Roadmap"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCoreStrength;
