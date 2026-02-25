import { Car, Train, MapPin, Clock } from "lucide-react";
import serviceImg from "@/assets/Images/service.jpeg";
const HajjUmDetIncludedServices = () => {
    const transports = [
        {
            title: "Private Car",
            description: "Transfer Description",
            icon: <Car className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        },
        {
            title: "Train",
            location: "Haramain Railway Station",
            duration: "~2 hours",
            icon: <Train className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        },
        {
            title: "Train",
            location: "Haramain Railway Station",
            duration: "~2 hours",
            icon: <Train className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        },
        {
            title: "Train",
            location: "Haramain Railway Station",
            duration: "~2 hours",
            icon: <Train className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        },
    ];

    return (
        <div className="max-w-425 mx-auto space-y-8 mb-20 bg-background text-foreground">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Included services
                </h2>
                <p className="text-muted-foreground">Included To Package</p>
            </div>

            {/* Grid for Transport Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {transports.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow space-y-4"
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                            {item.icon}
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            {item.description && (
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}
                            {item.location && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                                        <MapPin className="w-3 h-3" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                                        <Clock className="w-3 h-3" />
                                        <span>Average duration: {item.duration}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Personal Assistant Card */}
            <div className="max-w-xs">
                <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative w-full">
                        <img
                            src={serviceImg} // Replace with your actual image path
                            alt="Personal Assistant"
                            className="object-cover"
                        />
                    </div>
                    <div className="p-5 space-y-3">
                        <h3 className="font-bold text-lg">Personal Assistant</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your personal assistant will be with you from the moment you arrive
                            until the flight departs. Your details and transportation will be
                            the same, and you will coordinate with the service provider and
                            implement every request with precision and flexibility.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HajjUmDetIncludedServices;