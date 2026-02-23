import type { AdmissionRequirementDetail } from "@/types/education/type.uniDet";

interface Props {
  admission?: AdmissionRequirementDetail;
}

const DetInstitutionAdmissionReq = ({ admission }: Props) => {
  if (!admission) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold">Admission Requirements</h2>

      {/* Masters */}
      {admission.masters && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Master's Requirements</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <p><strong>GPA:</strong> {admission.masters.gpa}</p>
            <p><strong>IELTS:</strong> {admission.masters.ielts}</p>
            <p><strong>TOEFL:</strong> {admission.masters.toefl}</p>
            <p><strong>GRE/GMAT:</strong> {admission.masters.gre}</p>
          </div>
        </div>
      )}

      {/* Bachelors */}
      {admission.bachelors && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Bachelor's Requirements</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <p><strong>High School GPA:</strong> {admission.bachelors.gpa}</p>
            <p><strong>IELTS:</strong> {admission.bachelors.ielts}</p>
            <p><strong>TOEFL:</strong> {admission.bachelors.toefl}</p>
            <p><strong>SAT/ACT:</strong> {admission.bachelors.sat}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetInstitutionAdmissionReq;