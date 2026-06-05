import type { StudyCost } from "@/types/education/type.country";

interface Props {
  cost: StudyCost;
  id?: string; 
}

const DestStudyCost = ({ cost, id = "cost" }: Props) => {
  if (!cost || !cost.table) return null;

  return (
    <section id={id} className="w-full scroll-mt-40">
      {/* Header Section */}
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
          {cost.title}
        </h2>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto border border-border/50 rounded-sm shadow-sm bg-card">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-175">
          
          {/* Dynamic Table Header */}
          <thead className="bg-muted/10 border-b border-border/50">
            <tr>
              {cost.table.headers.map((header, i) => (
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
            {cost.table.rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-muted/5 transition-colors duration-200"
              >
                {/* Loop through each cell in the current row */}
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

export default DestStudyCost;