import type { OtherDetails } from "@/types/education/type.tests";
import EduTestCmnBtn from "@/components/education/EduTestCmnBtn";

interface DetailsProps {
    details: OtherDetails;
}

const DetTestOtherDetails = ({ details }: DetailsProps) => {
    // Convert object to entries for dynamic mapping
    const entries = Object.entries(details);

    return (
        <section className="py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Table Container */}
                <div className="overflow-hidden rounded-sm border border-primary/20 shadow-lg mb-10">
                    {/* Header Row */}
                    <div className="bg-primary px-6 py-4">
                        <span className="text-primary-foreground font-bold uppercase tracking-wider text-sm">
                            Other Details
                        </span>
                    </div>

                    {/* Dynamic Rows */}
                    <div className="flex flex-col">
                        {entries.map(([key, value], index) => (
                            <div
                                key={key}
                                /* Alternating background using primary tints */
                                className={`flex flex-col md:flex-row md:items-center px-6 py-5 gap-2 md:gap-10 transition-colors
                                    ${index % 2 === 0
                                        ? "bg-primary/3 dark:bg-primary/5"
                                        : "bg-primary/8 dark:bg-primary/12"
                                    }
                                    ${index !== entries.length - 1 ? "border-b border-primary/10" : ""}
                                `}
                            >
                                {/* Label Side */}
                                <div className="w-full md:w-1/3 text-foreground font-bold text-base">
                                    {key}
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-2/3 text-muted-foreground text-sm md:text-base leading-relaxed wrap-break-word">
                                    {key.toLowerCase().includes('link') || key.toLowerCase().includes('website') ? (
                                        <a
                                            href={value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline font-medium"
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <span>{value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Centered CTA Button */}
                <div className="flex justify-center">
                    <EduTestCmnBtn title="Enroll Now" />
                </div>
            </div>
        </section>
    );
};

export default DetTestOtherDetails;