import type { Offering } from "@/types/education/type.tests";
import { CheckCircle2 } from "lucide-react";

interface OfferingProps {
    offerings: Offering[];
}

const DetTestOfferings = ({ offerings }: OfferingProps) => {
    // Logic: If there are fewer than 3 items, we center them.
    // On mobile, they stack anyway, so this primarily affects tablet/desktop.
    const isUnderfilled = offerings.length > 0 && offerings.length < 3;

    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                    Our Offerings
                </h2>

                {/* Logic applied: 
                    1. We use 'flex flex-wrap' instead of 'grid' to allow for centering.
                    2. 'justify-center' handles the middle alignment.
                */}
                <div className={`flex flex-wrap ${isUnderfilled ? "justify-center" : "justify-start"} gap-8 lg:gap-12 max-w-7xl mx-auto`}>
                    {offerings.map((offering, index) => (
                        <div 
                            key={index} 
                            // We set the width manually to mimic the grid-cols-3 behavior (approx 33% minus gap)
                            className="flex flex-col bg-card rounded-2xl overflow-hidden shadow-lg border border-border transition-transform duration-300 hover:-translate-y-1 w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-3rem)]"
                        >
                            {/* Card Header */}
                            <div className="bg-primary/10 dark:bg-primary/20 p-8 text-center border-b border-primary/10">
                                <h3 className="text-xl font-bold text-primary h-14 uppercase tracking-wide">
                                    {offering.plan}
                                </h3>
                                <div className="mt-2 h-15 flex flex-col items-center justify-center">
                                    <span className="text-3xl md:text-4xl font-extrabold text-foreground">
                                        {offering.price}
                                    </span>
                                    {offering.extra_text && (
                                        <span className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-tighter">
                                            {offering.extra_text}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="p-8 grow space-y-4">
                                {offering.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 group">
                                        <div className="mt-1 shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetTestOfferings;