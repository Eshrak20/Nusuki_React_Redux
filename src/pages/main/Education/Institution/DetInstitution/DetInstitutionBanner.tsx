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
            <Card className="py-0 overflow-hidden border-none shadow-2xl bg-background ring-1 ring-black/5">
                <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row min-h-112.5">

                        {/* Left Content Section: High Impact Typography */}
                        <div className="lg:w-[45%] p-8 md:p-12 flex flex-col justify-between bg-white z-20">
                            <div className="space-y-8">
                                {/* Bigger, more prominent Logo */}
                                <div className="relative ">
                                    <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/20 rounded-2xl blur-lg" />
                                    <div className="relative bg-white p-4 rounded-2xl border shadow-sm group transition-colors">
                                        <img
                                            src={detail.uni_logo}
                                            alt={detail.universityName}
                                            className="w-full h-full  object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        {detail.extraDetail && (
                                            <Badge variant="default" className="bg-primary/10 text-primary border-none hover:bg-primary/20 transition-all">
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                {detail.extraDetail}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Highlighted Heading */}
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                        {detail.universityName}
                                    </h1>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">{detail.location}</span>
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
                                <Button size="lg" className="bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all px-10 h-14 text-lg font-bold shadow-lg shadow-primary/20">
                                    Apply with NUSUKI
                                </Button>
                                {/* <Button variant="ghost" size="lg" className="h-14 px-8 text-slate-600 hover:text-primary">
                  View Programs
                </Button> */}
                            </div>
                        </div>

                        {/* Right Visual Section: Cinematic Video Effect */}
                        <div className="lg:w-[55%] relative overflow-hidden bg-slate-900">
                            {/* Cinematic Gradient Overlays */}
                            <div className="absolute inset-0 bg-linear-to-r from-black/30  via-transparent to-transparent z-10 hidden lg:block" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-10" />

                            {/* "Cinematic" Zoom Image */}
                            <div className="w-full h-full relative">
                                <img
                                    src={detail.universityBannerImage}
                                    alt={`${detail.universityName} campus`}
                                    className="w-full h-full object-cover animate-ken-burns scale-110"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 right-8 z-20">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary rounded-full p-2">
                                            <GraduationCap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Verified Institution</p>
                                            <p className="text-sm font-semibold text-white/90">Official Admissions Partner</p>
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