import type { IntakeSection } from "@/types/education/type.uniDet";

interface Props {
  intakes?: IntakeSection;
}

const DetInstitutionIntakes = ({ intakes }: Props) => {
  if (!intakes) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold">Intakes</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {intakes.intakes?.map((intake, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{intake.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {intake.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetInstitutionIntakes;