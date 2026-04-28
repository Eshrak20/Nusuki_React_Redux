// HolidayPackageHeader.tsx
import { PlaneTakeoff, Sparkles } from "lucide-react";
import HolidayCustomTourDialog from "./HolidayCustomTourDialog";

interface Props {
  videoUrl?: string;
}

const HolidayPackageHeader = ({ videoUrl }: Props) => {
  return (
    <section className="relative h-[320px] mb-14 overflow-hidden border-b bg-slate-950 md:h-[380px]">
      {videoUrl && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* dark premium overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/45 to-slate-950/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/25 to-slate-950/60" />

      {/* soft bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
            <Sparkles className="size-3.5" />
            Need a customized tour?
          </div>

          <div className="flex items-start gap-4">
            <div className="hidden size-16 shrink-0 items-center justify-center rounded-md bg-white/15 text-white shadow-xl backdrop-blur-md md:flex">
              <PlaneTakeoff size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Build your dream holiday package
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
                Tell us your destination, budget, and date. Our expert team will
                contact you with the best custom holiday plan.
              </p>

              <div className="mt-7">
                <HolidayCustomTourDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidayPackageHeader;