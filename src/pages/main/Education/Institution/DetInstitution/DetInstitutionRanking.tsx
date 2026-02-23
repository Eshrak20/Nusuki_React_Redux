import type { RankingSection } from "@/types/education/type.uniDet";

interface Props {
  ranking?: RankingSection;
}

const DetInstitutionRanking = ({ ranking }: Props) => {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">{ranking?.heading}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {ranking?.rankingCard?.map((item) => (
          <div key={item.id} className="bg-gray-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p>{item.subTitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetInstitutionRanking;