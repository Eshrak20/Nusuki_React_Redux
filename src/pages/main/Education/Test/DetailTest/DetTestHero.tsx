import type { Hero } from "@/types/education/type.tests";
import { Sparkles, Trophy, Circle } from "lucide-react";
import EduTestCmnBtn from "@/components/education/EduTestCmnBtn";

interface HeroProps {
    hero: Hero
}

const DetTestHero = ({ hero }: HeroProps) => {

    return (
        <section className="relative bg-primary dark:bg-background text-white overflow-hidden shadow-xl mt-6">
            
            {/* --- Decorative Background Elements (Hidden on very small screens for clarity) --- */}
            <div className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none  z-0">
                {/* Large concentric circles on the right */}
                <div className="absolute -right-32 -top-32 w-96 h-96 border border-primary-foreground/20 rounded-full" />
                <div className="absolute -right-48 -top-48 w-125 h-125 border border-primary-foreground/10 rounded-full" />
                
                {/* Scattered Icons */}
                <Sparkles className="absolute top-12 left-1/2 w-8 h-8 rotate-12" />
                <Sparkles className="absolute bottom-12 right-1/4 w-6 h-6 -rotate-12" />
                <Circle className="absolute top-1/4 left-10 w-3 h-3 fill-primary-foreground/20" />
                <Circle className="absolute bottom-1/3 right-10 w-2 h-2 fill-primary-foreground/20" />
                <Trophy className="absolute bottom-8 right-12 w-16 h-16 opacity-50" />
            </div>

            {/* --- Main Content Layout --- */}
            <div className="relative max-w-7xl mx-auto z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 sm:p-12 lg:py-10 lg:px-3">
                
                {/* Left Column: Text & CTA */}
                <div className="w-full lg:w-[55%] flex flex-col items-start space-y-6">

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        {hero.title}
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-lg leading-relaxed max-w-2xl">
                        {hero.description}
                    </p>

                    <EduTestCmnBtn title="Book Free Demo Class"/>
                </div>

                {/* Right Column: Image */}
                <div className="w-full lg:w-[45%] relative">
                    {/* Subtle glow behind the image */}
                    <div className="absolute -inset-2 bg-background/20 blur-xl rounded-[2rem] z-0" />
                    
                    <div className="relative z-10 w-full aspect-4/3 rounded-sm overflow-hidden shadow-2xl border border-white/20">
                        <img 
                            src={hero.image} 
                            alt={hero.image_alt || hero.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DetTestHero;