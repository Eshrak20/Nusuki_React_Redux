import type { Tuition } from "@/types/education/type.course";

interface CourseFeesProps {
  tuition: Tuition;
}

const CourseFees = ({ tuition }: CourseFeesProps) => {
  return (
    <div className="border p-4 rounded-lg mt-4">
      <h2 className="font-semibold mb-2">Course Fees</h2>

      <ul className="list-disc ml-5 text-sm">
        <li>Amount: {tuition.amount}</li>
        <li>Currency: {tuition.currency}</li>
        <li>Year: {tuition.year}</li>
      </ul>
    </div>
  );
};

export default CourseFees;