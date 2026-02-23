import type { PlacementSection } from "@/types/education/type.uniDet";

interface Props {
  placement?: PlacementSection;
}

const DetInstitutionRecruiters = ({ placement }: Props) => {
  if (!placement) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold">Top Recruiters</h2>

      <div className="flex flex-wrap gap-3">
        {(placement.recruiters || []).map((recruiter, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm"
          >
            {recruiter}
          </span>
        ))}
      </div>

      {(placement.averageSalary || []).length > 0 && (
        <div className="mt-4 text-sm">
          <strong>Average Salary:</strong>
          <ul>
            {(placement.averageSalary || []).map((sal) => (
              <li key={sal.id}>
                {sal.expenceType}: {sal.totalSalary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetInstitutionRecruiters;