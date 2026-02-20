import EduTitle from "@/components/education/EduTitle";
import { partners } from "@/data/education/educationPartnerData";

const EducationPartner = () => {
  return (
    <section className="bg-white py-16 px-4">
      {/* Centered Container */}
      <div className="">
        <div className="mb-8">
          <EduTitle name="Our Education Partners" />
        </div>

        {/* Logo Grid Container using Flex for easy centering of last row */}
        <div className="flex flex-wrap justify-center border-t border-l border-gray-100">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center p-6
                border-r border-b border-gray-100
                transition-colors duration-300 hover:bg-gray-50/50
                w-1/2 md:w-1/4
              "
            >
              <div className="flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-40 w-48 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPartner;
