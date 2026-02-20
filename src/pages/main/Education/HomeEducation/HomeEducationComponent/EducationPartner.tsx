import EduTitle from "@/components/education/EduTitle";
import { partners } from "@/data/education/educationPartnerData";

const EducationPartner = () => {
  return (
    <section className="pt-20 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="-mb-10 text-center">
          <EduTitle name="Our Education Partners" />
        </div>
        <p className="text-muted-foreground mb-16 text-center text-lg">
          Collaborating with world-class institutions to deliver excellence.
        </p>

        {/* Centered Logo Flex Container */}
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="
                group relative flex items-center justify-center 
                p-3 bg-white rounded-2xl border border-gray-100
                shadow-sm hover:shadow-md hover:border-blue-100
                transition-all duration-300 ease-in-out
                /* Responsive Widths */
                w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)]
                max-h-50
              "
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="
                    max-h-25 max-w-50 object-contain 
                    transition-transform duration-500 
                    group-hover:scale-110
                  "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPartner;
