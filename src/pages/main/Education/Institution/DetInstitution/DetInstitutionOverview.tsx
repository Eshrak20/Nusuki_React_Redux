import type { UniversityData } from "@/types/education/type.uniDet";

interface Props {
  university?: UniversityData;
}

const DetInstitutionOverview = ({ university }: Props) => {
  const overview = university?.detail_json?.overviewSection;

  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">{overview?.heading}</h2>

      <div
        className="text-gray-600 mb-8"
        dangerouslySetInnerHTML={{ __html: overview?.description || "" }}
      />

      <div className="grid md:grid-cols-4 gap-6">
        {overview?.overviewCard?.map((card) => (
          <div key={card.id} className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.subTitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetInstitutionOverview;