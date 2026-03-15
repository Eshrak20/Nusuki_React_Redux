import type { AcademicIntake } from "@/types/education/type.country";

interface Props {
  intake: AcademicIntake;
  id?: string; // Added to link with the navbar
}

const DestAcademicIntake = ({ intake, id = "intake" }: Props) => {
  if (!intake || !intake.table) return null;

  return (
    <section id={id} className="w-full scroll-mt-32">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {intake.title}
        </h2>
        {intake.description && (
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {intake.description}
          </p>
        )}
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto border border-border/50 rounded-2xl shadow-sm bg-card">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-150">

          {/* Dynamic Table Header */}
          <thead className="bg-muted/30 border-b border-border/50">
            <tr>
              {intake.table.headers.map((header, i) => (
                <th
                  key={i}
                  className="py-5 px-6 md:px-8 font-semibold text-foreground w-1/3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Dynamic Table Body */}
          <tbody className="divide-y divide-border/50">
            {intake.table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-muted/10 transition-colors duration-200"
              >
                {/* Loop through each cell in the current row */}
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-5 px-6 md:px-8 ${cellIndex === 0
                        ? "text-foreground font-medium" // Highlight the first column slightly
                        : "text-foreground/80"
                      }`}
                  >
                    {cell || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </section>
  );
};

export default DestAcademicIntake;