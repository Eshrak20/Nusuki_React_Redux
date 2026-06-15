import { CalendarX, Clock, Headphones, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const branches = [
  {
    title: "Topkhana Branch",
    address:
      "218, Shahid Syed Nazrul Islam Sharani, 45 Topkhana Road, Tropicana Tower, 2nd Floor, Suit-F2, Dhaka 1000",
    hours: "Monday to Thursday, Saturday, and Sunday: 10:00 am to 6:00 pm",
    closed: "Closed on Fridays",
    mapUrl:
      "https://www.google.com/maps?q=218%2C%20Shahid%20Syed%20Nazrul%20Islam%20Sharani%2C%2045%20Topkhana%20Road%2C%20Tropicana%20Tower%2C%202nd%20Floor%2C%20Suit-F2%2C%20Dhaka%201000&output=embed",
    directionUrl: "https://maps.app.goo.gl/Ac3ULxW3QbZV9M489",
  },
  {
    title: "Mohammadpur Branch",
    address:
      "218, Shahid Syed Nazrul Islam Sharani, 45 Topkhana Road, Tropicana Tower, 2nd Floor, Suit-F2, Dhaka 1000",
    hours: "Monday to Thursday, Saturday, and Sunday: 10:00 am to 6:00 pm",
    closed: "Closed on Fridays",
    mapUrl:
      "https://www.google.com/maps?q=218%2C%20Shahid%20Syed%20Nazrul%20Islam%20Sharani%2C%2045%20Topkhana%20Road%2C%20Tropicana%20Tower%2C%202nd%20Floor%2C%20Suit-F2%2C%20Dhaka%201000&output=embed",
    directionUrl: "https://maps.app.goo.gl/MTkEjrRVR5rVFSoF6",
  },
];

const EduContactFooter = () => {
  return (
    <>
      {/* Branches Section */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24 dark:bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Find <span className="text-primary">NUSUKI EDUCATION</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Follow the Google Map or check the details below to visit our
              nearest branch.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {branches.map((branch) => (
              <Card
                key={branch.title}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-0">
                  {/* Card Header */}
                  <div className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-6 text-center dark:from-primary/20 dark:to-primary/5">
                    <h3 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                      {branch.title}
                    </h3>
                  </div>

                  {/* Map Embed */}
                  <div className="aspect-video w-full overflow-hidden bg-muted transition-opacity group-hover:opacity-95">
                    <iframe
                      src={branch.mapUrl}
                      title={`${branch.title} map`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0 grayscale-20 transition-all duration-500 group-hover:grayscale-0"
                      allowFullScreen
                    />
                  </div>

                  {/* Details Area */}
                  <div className="space-y-6 p-6 sm:p-8">
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <MapPin size={20} />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold tracking-wide uppercase text-muted-foreground/80">
                          Address
                        </h4>
                        <p className="mt-1 font-medium leading-relaxed text-foreground/90">
                          {branch.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Clock size={20} />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold tracking-wide uppercase text-muted-foreground/80">
                          Opening Hours
                        </h4>
                        <p className="mt-1 font-medium leading-relaxed text-foreground/90">
                          {branch.hours}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                        <CalendarX size={20} />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold tracking-wide uppercase text-muted-foreground/80">
                          Weekly Holiday
                        </h4>
                        <p className="mt-1 font-medium leading-relaxed text-destructive/90">
                          {branch.closed}
                        </p>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full rounded-xl font-bold shadow-sm transition-transform active:scale-[0.98]"
                    >
                      <a
                        href={branch.directionUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Navigation className="mr-2 h-4 w-4 fill-current" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Notice Banner */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-primary/10 bg-linear-to-b from-card to-muted/20 px-6 py-5 text-center shadow-sm">
            <p className="text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
              You can contact{" "}
              <span className="font-bold text-primary">NUSUKI EDUCATION</span>{" "}
              during their office hours to inquire about programs, admissions,
              and services.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic CTA Footer Section */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        {/* Curved aesthetic borders */}
        <div className="absolute -top-16 left-0 h-32 w-full rounded-b-[50%] bg-muted/30 dark:bg-background" />
        <div className="absolute -bottom-16 left-0 h-32 w-full rounded-t-[50%] bg-background/10" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left md:justify-between max-w-5xl mx-auto">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:text-left">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm ring-1 ring-primary-foreground/20">
                <Headphones className="h-12 w-12 text-primary-foreground" />
              </div>

              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Your Future, Our Priority
                </h2>
                <p className="mt-2 max-w-xl text-sm font-normal leading-relaxed text-primary-foreground/80 sm:text-base">
                  Get personalized support for a brighter tomorrow. Unlock
                  opportunities for success with expert personalized guidance.
                  Let us guide you through the journey to your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EduContactFooter;
