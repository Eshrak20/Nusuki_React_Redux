import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const DetFreeCounselling = () => {
    const location = useLocation();
    const countryName = location.pathname.endsWith("/us") ? "USA" :
        location.pathname.endsWith("/au") ? "Australia" :
            location.pathname.endsWith("/nz") ? "New Zealand" :
                location.pathname.endsWith("/ca") ? "Canada" :
                    location.pathname.endsWith("/gb") ? "UK" :
                        "";

    return (
        <section className="w-full my-20">
            {/* Banner Container */}
            <div className="relative w-full rounded-[2rem] overflow-hidden bg-primary py-16 px-6 md:px-12 flex flex-col items-center justify-center shadow-xl">

                {/* Dark gradient overlay for the background (Left to Right) */}
                <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/40 mix-blend-multiply" />

                {/* Content Wrapper (z-10 ensures it stays above the gradient overlay) */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Banner Title */}
                    <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-primary-foreground text-center tracking-tight mb-10 max-w-4xl leading-[1.1]">
                        Want to study in {countryName}? Get a free counselling
                    </h2>


                    <a target='blank' href='https://www.csbbd.com/apply-now' className="group flex items-center justify-between gap-4 bg-primary-foreground text-primary pl-6 pr-2 py-2 rounded-full hover:brightness-110 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                        <span className="text-sm md:text-base font-bold leading-tight text-center">
                            Apply now
                        </span>

                        {/* Inner Circle Icon */}
                        <div className="bg-primary text-primary-foreground p-2 md:p-3 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                            <ChevronRight size={20} strokeWidth={3} />
                        </div>
                    </a>

                </div>

            </div>
        </section>
    );
};

export default DetFreeCounselling;