const HomeInstitutionCard = ({ universities }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {universities.map((uni) => (
        <div
          key={uni.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full transition-shadow hover:shadow-md"
        >
          {/* Logo Container */}
          <div className="h-24 w-full flex items-center justify-center mb-4">
            <img
              src={uni.uni_logo}
              alt={uni.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <hr className="border-gray-100 mb-5" />

          {/* Text Content */}
          <div className="grow">
            {/* line-clamp-2: Truncates text after 2 lines 
                min-h-[3rem]: Keeps the height consistent across all cards
            */}
            <h3 className="font-bold text-gray-800 text-[15px] leading-tight mb-2 line-clamp-2 min-h-10">
              {uni.name}
            </h3>
            
            <p className="text-[13px] text-gray-400 mb-1">
              {uni.location || uni.country}
            </p>
            
            <p className="text-[13px] text-gray-800 font-medium truncate mb-4">
              {uni.universityUrl}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <button className="flex-1 py-2.5 px-2 border border-primary/40 text-primary text-sm font-semibold rounded-lg hover:bg-primary/10 transition-colors">
              Know More
            </button>
            <button className="flex-1 py-2.5 px-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeInstitutionCard;