import type { CostToStudySection } from "@/types/education/type.uniDet";

interface Props {
  cost?: CostToStudySection;
}

const DetInstitutionCost = ({ cost }: Props) => {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">{cost?.heading}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {(cost?.cost || []).map((item) => (
          <div key={item.id} className="bg-white shadow rounded-xl p-6">
            <p className="font-medium">{item.expenseType}</p>
            <p className="text-lg font-bold">{item.annualExpenses}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetInstitutionCost;