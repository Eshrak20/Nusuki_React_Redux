import type { AboutExam } from "@/types/education/type.tests";
import EduTestCmnBtn from "@/components/education/EduTestCmnBtn";

interface TestAboutProps {
    about: AboutExam;
}

const DetTestAbout = ({ about }: TestAboutProps) => {
    return (
        <section className="py-12 md:py-16 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column: Image with Decorative Background */}
                    <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-md lg:max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
                            <img
                                src={about.image}
                                alt={about.image_alt || about.title}
                                className="w-full h-full object-cover scale-125 object-bottom-right block antialiased"
                                style={{ imageRendering: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6">

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            {about.title}
                        </h2>

                        {/* Paragraphs mapped dynamically from about */}
                        <div className="space-y-4">
                            {about.paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-muted-foreground text-sm md:text-base leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* CTA Button using your common component */}
                        <div className="pt-4">
                            <EduTestCmnBtn title="Enroll Now" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetTestAbout;