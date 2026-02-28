import EduTitle from "@/components/education/EduTitle";
import { features } from "@/data/education/ourFeaturesData";

const OurFeatures = () => {
  return (
    // Changed to use theme-based background
    <section className="lg:py-16 px-4 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Added wrapper to match your site's standard width */}
        <div className="-mb-7 lg:-mb-3">
          <EduTitle name="Our Features" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((service, index) => (
            <div
              key={index}
              // Changed bg-white to bg-card and border-gray-200 to border-border
              className="bg-card p-5 lg:p-8 rounded-xl border border-border shadow-md flex flex-col lg:h-full hover:shadow-md transition-shadow"
            >
              <div className="hidden lg:block mb-4">{service.icon}</div>

              {/* text-primary remains as it's a theme variable in your index.css */}
              <h3 className="text-lg lg:text-xl lg:h-12.5 font-bold text-primary mb-3 leading-tight">
                {service.title}
              </h3>

              {/* Changed text-gray-600 to text-muted-foreground */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-0 lg:mb-6 grow">
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
