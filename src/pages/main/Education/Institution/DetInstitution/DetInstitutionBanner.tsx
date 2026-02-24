import { GraduationCap, MapPin, Globe, Sparkles } from "lucide-react";
import type { UniversityBannerCardMini } from "@/types/education/type.uniDet";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
    detail?: UniversityBannerCardMini;
}

const DetInstitutionBanner = ({ detail }: Props) => {
    if (!detail) return null;

    return (
        <div className="w-full pt-20">
            <Card className="py-0 overflow-hidden border-none shadow-2xl bg-card ring-1 ring-border">
                <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row min-h-112.5">

                        {/* Left Content Section */}
                        <div className="lg:w-[45%] p-8 md:p-12 flex flex-col justify-between bg-background z-20">
                            <div className="space-y-8">

                                {/* Logo */}
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/20 rounded-2xl blur-lg" />
                                    <div className="relative bg-card p-4 rounded-2xl border border-border shadow-sm transition-colors">
                                        <img
                                            src={detail.uni_logo}
                                            alt={detail.universityName}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        {detail.extraDetail && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-primary/10 text-primary border-none hover:bg-primary/20 transition-all"
                                            >
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                {detail.extraDetail}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Heading */}
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                                        {detail.universityName}
                                    </h1>

                                    <div className="flex flex-wrap gap-4 pt-2">

                                        <div className="flex items-center gap-2 text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">
                                                {detail.location}
                                            </span>
                                        </div>

                                        <a
                                            href={`https://${detail.universityUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-primary font-semibold hover:opacity-80 transition-all"
                                        >
                                            <div className="bg-primary/10 p-1.5 rounded-full">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            {detail.universityUrl}
                                        </a>

                                    </div>
                                </div>
                            </div>

                            {/* Action Section */}
                            <div className="mt-12 flex flex-wrap items-center gap-4">
                                <Button
                                    size="lg"
                                    className="px-10 h-14 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Apply with NUSUKI
                                </Button>
                            </div>
                        </div>

                        {/* Right Visual Section */}
                        <div className="lg:w-[55%] relative overflow-hidden bg-muted">

                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent z-10 hidden lg:block dark:from-black/60" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent z-10" />

                            <div className="w-full h-full relative">
                                <img
                                    src={detail.universityBannerImage}
                                    alt={`${detail.universityName} campus`}
                                    className="w-full h-full object-cover animate-ken-burns scale-110"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 right-8 z-20">
                                <div className="bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-border rounded-2xl p-4 text-foreground shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary rounded-full p-2">
                                            <GraduationCap className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">
                                                Verified Institution
                                            </p>
                                            <p className="text-sm font-semibold text-muted-foreground">
                                                Official Admissions Partner
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DetInstitutionBanner;