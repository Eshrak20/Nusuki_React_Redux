import { Phone, Mail } from 'lucide-react';

const NeedAssistance = () => {
    return (
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-primary dark:bg-card dark:border dark:border-border p-6 shadow-lg md:p-8">
            {/* Background Gradient matching your banner theme - Hidden in dark mode to keep the card clean */}
            <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/20 mix-blend-multiply dark:hidden" />

            <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-primary-foreground dark:text-card-foreground">
                    Need Assistance?
                </h3>

                <p className="mb-2 text-base text-primary-foreground/80 dark:text-muted-foreground">
                    Our visa experts are available to help you with your application.
                </p>

                <div className="flex flex-col gap-5">
                    {/* Phone Contact */}
                    <a
                        href="tel:+88096100000000"
                        className="flex items-center gap-3 text-primary-foreground/90 transition-all hover:text-primary-foreground hover:opacity-100 dark:text-card-foreground dark:hover:text-primary"
                    >
                        <Phone className="h-5 w-5 fill-current dark:fill-none dark:text-primary" />
                        <span className="font-semibold tracking-wide">+880 9610 0000000</span>
                    </a>

                    {/* Email Contact */}
                    <a
                        href="mailto:visa.skyroute@tamimiqbal.com"
                        className="flex items-center gap-3 text-primary-foreground/90 transition-all hover:text-primary-foreground hover:opacity-100 dark:text-card-foreground dark:hover:text-primary"
                    >
                        <Mail className="h-5 w-5 fill-current dark:fill-none dark:text-primary" />
                        <span className="font-semibold tracking-wide">visa.skyroute@tamimiqbal.com</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NeedAssistance;