import type { OverviewSection } from "@/types/education/type.uniDet";

interface Props {
  overview?: OverviewSection;
}

const DetInstitutionWhyChose = ({ overview }: Props) => {
  if (!overview?.whyChoose) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold">Why Choose This University?</h2>

      <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
        {overview.whyChoose.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetInstitutionWhyChose;