import type { ProgramsDuration } from "@/types/education/type.country";

interface Props {
  programs: ProgramsDuration;
  id?: string; 
}

const DestProgramsDuration = ({ programs, id = "programs" }: Props) => {
  if (!programs || !programs.table) return null;

  return (
    <section id={id} className="w-full scroll-mt-40">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {programs.title}
        </h2>
        {programs.description && (
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {programs.description}
          </p>
        )}
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto border border-border/50 rounded-2xl shadow-sm bg-card">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-150">
          
          {/* Dynamic Table Header */}
          <thead className="bg-muted/30 border-b border-border/50">
            <tr>
              {programs.table.headers.map((header, i) => (
                <th 
                  key={i} 
                  className={`py-5 px-6 md:px-8 font-semibold text-foreground ${
                    i === 0 ? "w-[60%]" : "w-[20%]" 
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Dynamic Table Body */}
          <tbody className="divide-y divide-border/50">
            {programs.table.rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-muted/10 transition-colors duration-200"
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex} 
                    className={`py-5 px-6 md:px-8 ${
                      cellIndex === 0 
                        ? "text-foreground font-medium" 
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

export default DestProgramsDuration;