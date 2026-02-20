import EduTitle from "@/components/education/EduTitle";
import { features } from "@/data/education/ourFeaturesData";

const OurFeatures = () => {
  return (
    <section className="py-16 px-4">
      <div className="">
        <div className="-mb-6">
          <EduTitle name="Our Features" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-md flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>

              <h3 className="text-xl h-12.5 font-bold text-primary mb-3 leading-tight">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;
