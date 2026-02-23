import type { DetInstitutionScholarshipsProps } from "@/types/education/type.uniDet";


const DetInstitutionScholarships = ({ scholarships }: DetInstitutionScholarshipsProps) => {
  if (!scholarships || !scholarships.scholarshipsCard || scholarships.scholarshipsCard.length === 0) {
    return null;
  }

  // Helper function to parse scholarship details
  const parseDetail = (detail: string) => {
    const [label, value] = detail.split(':');
    return { label: label.trim(), value: value?.trim() || '' };
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          {scholarships.iconImage && (
            <img 
              src={scholarships.iconImage.imageUrl} 
              alt={scholarships.iconImage.imageAltTag || "Scholarships"}
              className="w-8 h-8"
            />
          )}
          <h2 className="text-3xl font-bold text-gray-900">{scholarships.heading}</h2>
        </div>

        <div 
          className="text-gray-700 mb-8 prose max-w-3xl"
          dangerouslySetInnerHTML={{ __html: scholarships.description }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.scholarshipsCard.map((scholarship) => (
            <div 
              key={scholarship.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h3 className="text-xl font-bold text-white">{scholarship.name}</h3>
              </div>
              
              <div className="p-6 space-y-3">
                {scholarship.detail.map((detail, index) => {
                  const { label, value } = parseDetail(detail);
                  return (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm text-gray-500">{label}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetInstitutionScholarships;