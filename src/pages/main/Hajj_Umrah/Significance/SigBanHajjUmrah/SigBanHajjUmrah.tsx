import { doubleLineBreaker } from "@/lib/utils";
import type { SignificanceAbout } from "@/types/hajj/types.sig";

const SigBanHajjUmrah = ({ title, description }: SignificanceAbout) => {
  const paragraphs = doubleLineBreaker(description);

  return (
    <section className="relative overflow-hidden lg:rounded-2xl">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6 lg:mb-12 ">
          <span className="text-hajj -mt-10">{title}</span>
        </h1>

        <div className="text-sm lg:text-md text-muted-foreground leading-relaxed space-y-4">
          {paragraphs?.map((para, index) => (
            <p key={index}>{para}.</p>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full  blur-3xl" />
    </section>
  );
};

export default SigBanHajjUmrah;
