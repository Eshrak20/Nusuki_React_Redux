import { Phone, Mail } from 'lucide-react';

const NeedAssistance = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 shadow-lg mb-5">
            {/* Background Gradient matching your banner theme */}
            <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/20 mix-blend-multiply" />

            <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-primary-foreground">
                    Need Assistance?
                </h3>

                <p className="mb-2 text-base text-primary-foreground/80">
                    Our visa experts are available to help you with your application.
                </p>

                <div className="flex flex-col gap-5">
                    {/* Phone Contact */}
                    <a
                        href="tel:+88096100000000"
                        className="flex items-center gap-3 text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                    >
                        <Phone className="h-5 w-5 fill-current" />
                        <span className="font-semibold tracking-wide">+880 9610 0000000</span>
                    </a>

                    {/* Email Contact */}
                    <a
                        href="mailto:visa.skyroute@tamimiqbal.com"
                        className="flex items-center gap-3 text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                    >
                        <Mail className="h-5 w-5 fill-current" />
                        <span className="font-semibold tracking-wide">visa.skyroute@tamimiqbal.com</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NeedAssistance;