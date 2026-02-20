import EduTitle from "@/components/education/EduTitle";
import { features } from "@/data/education/whyNusukiData";

const WhyNusuki = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="">
        <div className="-mb-3">
          <EduTitle name="Why Nusuki ?" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-xl font-bold text-primary mb-4">
                {item.title}
              </h3>

              <p className="text-primary/70 text-[15px] leading-relaxed mb-6 grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNusuki;
