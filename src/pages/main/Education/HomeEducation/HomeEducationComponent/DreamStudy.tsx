import EduTitle from "@/components/education/EduTitle";
import { destinations } from "@/data/education/dreamStudyData";

const DreamStudy = () => {
  return (
    <section className="pt-30 pb-10 px-4 bg-white">
      <div className="">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-start -mb-12">
            <EduTitle name="Your dream study destination awaits" />
          </div>

          <p className="text-gray-500 text-sm md:text-base">
            Start your inspiring academic journey in these vibrant and welcoming
            study destinations
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer shadow-md"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Country Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold tracking-wide">
                  {dest.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DreamStudy;
