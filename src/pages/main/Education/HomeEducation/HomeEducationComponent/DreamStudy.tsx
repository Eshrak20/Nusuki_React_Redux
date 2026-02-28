import EduTitle from "@/components/education/EduTitle";
import { destinations } from "@/data/education/dreamStudyData";

const DreamStudy = () => {
  
  return (
    <section className="pt-10 lg:pt-30 lg:pb-10 px-4 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          {/* Removed negative margin to let the text breathe */}
          <div className="lg:hidden flex flex-start -mb-14">
            <EduTitle name="Your dream destination" />
          </div>
          <div className="hidden lg:flex flex-start -mb-12">
            <EduTitle name="Your dream study destination awaits" />
          </div>

          {/* Fixed p tag: added text-muted-foreground for dark mode compatibility */}
          <p className="text-muted-foreground text-base md:text-lg text-left -mx-1 lg:mx-0 max-w-2xl leading-relaxed">
            Start your inspiring academic journey in these vibrant and welcoming
            study destinations.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer shadow-md border border-border"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay - Darker on hover for better text contrast */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Country Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold tracking-wide drop-shadow-md">
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