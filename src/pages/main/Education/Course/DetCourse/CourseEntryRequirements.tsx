import type { Section } from "@/types/education/type.course";

interface CourseEntryRequirementsProps {
  sections: Section[];
}

const CourseEntryRequirements = ({
  sections,
}: CourseEntryRequirementsProps) => {

  const entry = sections.find((s) =>
    s.heading.toLowerCase().includes("entry")
  );

  if (!entry) return null;

  return (
    <div className="border p-4 rounded-lg mt-4">
      <h2 className="font-semibold mb-2">{entry.heading}</h2>

      <p className="text-sm text-gray-700 leading-relaxed">
        {entry.text}
      </p>
    </div>
  );
};

export default CourseEntryRequirements;