import type { Table } from "@/types/education/type.course";

interface CourseIntakesProps {
  tables: Table[];
}

const CourseIntakes = ({ tables }: CourseIntakesProps) => {
  const intakeTable = tables[0];

  if (!intakeTable) return null;

  return (
    <div className="border p-4 rounded-lg mt-4">
      <h2 className="font-semibold mb-2">Intakes</h2>

      <ul className="list-disc ml-5 text-sm">
        {intakeTable.rows.map((row, index) => (
          <li key={index}>
            {row[0]} - {row[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseIntakes;