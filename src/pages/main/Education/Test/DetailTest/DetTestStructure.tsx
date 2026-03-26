import type { ExamStructure } from "@/types/education/type.tests";

interface DetTestStructureProps {
    structure: ExamStructure;
}

const DetTestStructure = ({ structure }: DetTestStructureProps) => {
    const entries = Object.entries(structure);

    return (
        <section className="py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                    Exam Structure
                </h2>

                {/* Table Container */}
                <div className="overflow-hidden rounded-2xl border border-primary/20 shadow-lg">
                    {/* Header Row */}
                    <div className="bg-primary px-6 py-4">
                        <span className="text-primary-foreground font-bold uppercase tracking-wider text-sm">
                            Exam Pattern
                        </span>
                    </div>

                    {/* Dynamic Rows */}
                    <div className="flex flex-col">
                        {entries.map(([key, value], index) => (
                            <div 
                                key={key}
                                /* Alternating background colors using primary tint for light/dark compatibility */
                                className={`flex flex-col md:flex-row md:items-center px-6 py-5 gap-2 md:gap-10 transition-colors
                                    ${index % 2 === 0 
                                        ? "bg-primary/3 dark:bg-primary/5" 
                                        : "bg-primary/8 dark:bg-primary/12"
                                    }
                                    ${index !== entries.length - 1 ? "border-b border-primary/10" : ""}
                                `}
                            >
                                {/* Label / Section Name */}
                                <div className="w-full md:w-1/3 text-foreground font-semibold text-base">
                                    {key}
                                </div>

                                {/* Description / Value */}
                                <div className="w-full md:w-2/3 text-muted-foreground text-sm md:text-base leading-relaxed">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetTestStructure;