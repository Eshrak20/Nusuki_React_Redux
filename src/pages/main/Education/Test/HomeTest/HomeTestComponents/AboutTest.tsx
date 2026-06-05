import { CheckCircle2 } from "lucide-react";
import EduTaskCmnBtn from "@components/education/EduTestCmnBtn";
import image from "@/assets/reactAssets/Education/images.png"

const AboutTest = () => {
    const benefits = [
        "Access top quality test-prep material",
        "Interactive online audio/video content",
        "Small class sizes – personalized attention",
        "Rich database of practice questions",
        "Mock tests simulating real test environment",
    ];

    return (
        <section className="py-16 px-6 md:py-24 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 md:mb-20 text-foreground">
                    Nusuki Education : The Academy of Top Scorers
                </h2>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left Column: Image with Decorative Background */}
                    <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-md md:max-w-lg aspect-4/4 rounded-sm overflow-hidden shadow-2xl border border-border bg-muted">
                            <img
                                src={image}
                                alt="Student studying"
                                /* FIX: Changed 'h-auto' to 'h-full' 
                                   This forces the image to stretch vertically to fill the 4:3 box
                                */
                                className="w-full h-full object-cover block antialiased"
                                style={{ imageRendering: 'auto' }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                Welcome to <span className="text-primary font-semibold">Nusuki Education</span>,
                                a group of highly motivated and skilled tutors, who have over two decades
                                of expertise of driving thousands of ambitious test seekers like you to
                                excellence.
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                Our students routinely achieve top test scores, thanks to the exceptional
                                tutoring by our passionate and accomplished faculties and our test prep
                                methodologies that are highly effective, yet are easy, interactive & fun.
                                Enrol with us and get the score you are aiming for, effortlessly.
                            </p>
                        </div>

                        {/* Benefits List */}
                        <ul className="space-y-4 py-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                    </div>
                                    <span className="text-foreground font-medium text-sm md:text-base">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Enroll Now Button */}
                        <div className="pt-4 flex justify-center lg:justify-start">
                            <EduTaskCmnBtn title="Enroll Now" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTest;