import type { FAQSection } from "@/types/education/type.uniDet";

export interface DetInstitutionFaqProps {
  faq?: FAQSection; // Make it optional with ?
}

const DetInstitutionFaq = ({ faq }: DetInstitutionFaqProps) => {
  if (!faq || !faq.faqDetail || faq.faqDetail.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          {faq.iconImage && (
            <img 
              src={faq.iconImage.imageUrl} 
              alt={faq.iconImage.imageAltTag || "FAQ"}
              className="w-8 h-8"
            />
          )}
          <h2 className="text-3xl font-bold">{faq.heading}</h2>
        </div>

        {faq.description && (
          <div 
            className="text-gray-600 mb-8"
            dangerouslySetInnerHTML={{ __html: faq.description }}
          />
        )}

        <div className="space-y-4">
          {faq.faqDetail.map((faqItem) => (
            <div key={faqItem.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faqItem.title}
                  </h3>
                  <span className="text-2xl group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="p-6 bg-white">
                  <div 
                    className="text-gray-700 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: faqItem.description }}
                  />
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetInstitutionFaq;