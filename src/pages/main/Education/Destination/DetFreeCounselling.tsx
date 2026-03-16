import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EduFormSubmission from '@/components/education/EduFormSubmission';
import { useState } from 'react';

const DetFreeCounselling = () => {
    const [isOpen, setIsOpen] = useState(false);
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
            <div className="relative w-full rounded-[2rem] overflow-hidden bg-primary dark:bg-muted/10 py-16 px-6 md:px-12 flex flex-col items-center justify-center shadow-xl">

                {/* Dark gradient overlay for the background (Left to Right) */}
                <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/40 mix-blend-multiply" />

                {/* Content Wrapper (z-10 ensures it stays above the gradient overlay) */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Banner Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground dark:text-gray-200 text-center tracking-tight mb-10 max-w-3xl leading-[1.1]">
                        Want to study in {countryName}? Get a free counselling
                    </h2>


                   <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            {/* Inverted Button */}
                            <button className="group flex items-center justify-between gap-4 bg-primary-foreground text-primary dark:bg-gray-300 dark:text-muted pl-6 pr-2 py-2 rounded-full hover:brightness-110 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                                <span className="text-sm md:text-base font-bold leading-tight text-center">
                                    Apply now
                                </span>
                                
                                {/* Inner Circle Icon */}
                                <div className="bg-primary text-primary-foreground dark:bg-muted dark:text-gray-300 p-2 md:p-3 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                    <ChevronRight size={20} strokeWidth={3} />
                                </div>
                            </button>
                        </DialogTrigger>

                        {/* Modal Content */}
                        <DialogContent className="sm:max-w-120 overflow-hidden rounded-[2rem] border-none bg-background/95 p-0 shadow-2xl backdrop-blur-2xl">
                            <DialogHeader className="hidden">
                                <DialogTitle>Application Form</DialogTitle>
                            </DialogHeader>
                            
                            <div className="max-h-[85vh] overflow-y-auto">
                                <EduFormSubmission title={`Apply for ${countryName} Free Counselling`} />
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>

            </div>
        </section>
    );
};

export default DetFreeCounselling;