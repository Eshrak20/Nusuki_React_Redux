
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { highlights } from "@/data/commonAboData";

const CommonAbout = ({ title, img }: { title: string; img: string }) => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full  blur-3xl" />

      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
            About Nusuki
          </Badge>

          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Why Choose Nusuki for <span className="text-hajj">{title}</span>?
          </h2>

          <Separator className="mx-auto mt-6 h-1 w-24 bg-hajj" />
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          <div className="w-full space-y-10 lg:w-[60%]">
            <div className="space-y-6">
              <p className="text-xl font-semibold leading-relaxed text-foreground">
                {title} is more than a journey — it’s a sacred spiritual
                transformation.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground dark:text-gray-300">
                At Nusuki, we ensure your {title} experience is smooth,
                comfortable, and deeply fulfilling through expert planning and
                sincere care.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="
                      group cursor-pointer
                      h-[72px]
                      border border-muted/40
                      bg-background
                      transition-all duration-300
                      hover:border-hajj/40
                      hover:bg-hajj/5
                      hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.18)]
                    "
                  >
                    <CardContent className="flex h-full items-center gap-3 px-4 py-2">
                      <div className="rounded-lg bg-hajj/10 p-2">
                        <Icon className="h-5 w-5 text-hajj" />
                      </div>

                      <p className="text-sm font-medium leading-snug text-muted-foreground">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Card className="border-l-4 border-l-hajj bg-muted/30">
              <CardContent className="p-6 italic text-muted-foreground">
                “What sets Nusuki apart is our commitment to transparency,
                reliability, and personalized care — from preparation to safe
                return.”
              </CardContent>
            </Card>
          </div>

          <div className="relative w-full lg:w-1/2 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md lg:max-w-lg group">
              {/* Decorative Background Element - Adjusted for subtle depth */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-hajj/5 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 lg:-bottom-8 lg:-right-8" />

              {/* Main Image Card */}
              <Card className="relative overflow-hidden rounded-3xl border-none shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative aspect-4/5 overflow-hidden">
                    <img
                      src={img}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Floating Badge - Positioned to stay within bounds */}
              <div className="absolute -left-6 bottom-12 hidden rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 md:block dark:bg-slate-900">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-black tracking-tight text-hajj">
                    100%
                  </span>
                  <span className="max-w-20 text-center text-[10px] font-bold uppercase leading-tight tracking-wider text-muted-foreground">
                    Guided Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonAbout;
