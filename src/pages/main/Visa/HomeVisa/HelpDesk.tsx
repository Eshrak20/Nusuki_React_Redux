import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const HelpDesk = () => {
    return (
        <section className="relative overflow-hidden bg-primary py-16 lg:py-24">

            {/* Dark gradient overlay for the background */}
            <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/40 mix-blend-multiply" />

            {/* Explicit SVG Curved Shape at the bottom */}
            <div className="absolute hidden lg:block bottom-0 left-0 z-0 w-full overflow-hidden leading-0">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="h-10 w-full sm:h-20 lg:h-30"
                >
                    <path
                        d="M0,120 C300,0 900,0 1200,120 Z"
                        className="fill-black/15 dark:fill-black/30"
                    />
                </svg>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">

                <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground lg:text-5xl">
                    Need Help With Your Visa Application?
                </h2>

                <p className="mx-auto mb-10 max-w-2xl text-base text-primary-foreground/90 lg:text-lg">
                    Our visa experts are ready to assist you. Get free consultation today!
                </p>

                <div className="flex flex-col items-center justify-center gap-4 lg:pb-7 sm:flex-row sm:gap-6">
                    {/* Call Now Button */}
                    <a
                        href="tel:+88096100000000"
                        className="h-14 flex items-center justify-center w-full rounded-full bg-primary-foreground px-10 text-base font-semibold text-primary shadow-lg hover:bg-primary-foreground/90 sm:w-auto"
                    >
                        <Phone className="mr-2 h-5 w-5 fill-current" />
                        <span>Call Now</span>
                    </a>

                    {/* WhatsApp button */}
                    <button

                        className="h-14 flex items-center justify-center w-full rounded-full bg-[#25D366] px-10 text-base font-semibold text-white shadow-lg hover:bg-[#25D366]/90 sm:w-auto"
                    >
                        <FaWhatsapp className="mr-2 h-5 w-5" />
                        <span>WhatsApp Us</span>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default HelpDesk;