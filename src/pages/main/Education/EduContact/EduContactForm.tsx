import { Clock, MapPin, Navigation, CalendarX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const branches = [
  {
    title: "Dhanmondi Branch",
    address:
      "63/C, Mir Taj Square, Level–7th, Lake Circus, West Panthapath, Dhaka 1205",
    hours: "Monday to Thursday, Saturday, and Sunday: 10:00 am to 6:00 pm",
    closed: "Closed on Fridays",
    mapUrl:
      "https://www.google.com/maps?q=WISDOM%20EDUCATION%20Dhanmondi%20Dhaka&output=embed",
    directionUrl:
      "https://www.google.com/maps/search/?api=1&query=WISDOM%20EDUCATION%20Dhanmondi%20Dhaka",
  },
  {
    title: "Banani Branch",
    address:
      "Plot – 35, Abedin Tower, Lift – 4, Kemal Ataturk Avenue, Banani C/A, Next to Sheraton Dhaka Parking Gate, Dhaka – 1213",
    hours: "Monday to Thursday, Saturday, and Sunday: 10:00 am to 6:00 pm",
    closed: "Closed on Fridays",
    mapUrl:
      "https://www.google.com/maps?q=Abedin%20Tower%20Banani%20Dhaka&output=embed",
    directionUrl:
      "https://www.google.com/maps/search/?api=1&query=Abedin%20Tower%20Banani%20Dhaka",
  },
];

const EduContactForm = () => {
  return (
    <section className="relative overflow-hidden bg-background py-14 sm:py-16 lg:py-20">
      {/* Soft Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary))_0%,transparent_28%),radial-gradient(circle_at_bottom_right,hsl(var(--primary-light))_0%,transparent_26%)] opacity-10 dark:opacity-20" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-5xl text-center sm:mb-12">
          <p className="mb-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/15">
            Contact Details
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Follow The Google Map & Below Details to Find WISDOM EDUCATION
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Visit your nearest branch during office hours and get proper guidance
            about programs, admission, counselling, and services.
          </p>
        </div>

        {/* Map Cards */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {branches.map((branch) => (
            <Card
              key={branch.title}
              className="overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-card/80"
            >
              <CardContent className="p-0">
                <div className="border-b border-border bg-primary/5 px-5 py-4 dark:bg-primary/10">
                  <h3 className="text-center text-2xl font-extrabold text-primary sm:text-3xl">
                    {branch.title}
                  </h3>
                </div>

                <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                  <iframe
                    src={branch.mapUrl}
                    title={`${branch.title} Google Map`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <p className="mb-1 font-bold text-foreground">
                        Address
                      </p>
                      <p className="leading-7 text-muted-foreground">
                        {branch.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Clock size={20} />
                    </span>
                    <div>
                      <p className="mb-1 font-bold text-foreground">
                        Opening Hours
                      </p>
                      <p className="leading-7 text-muted-foreground">
                        {branch.hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <CalendarX size={20} />
                    </span>
                    <div>
                      <p className="mb-1 font-bold text-foreground">
                        Weekly Holiday
                      </p>
                      <p className="leading-7 text-muted-foreground">
                        {branch.closed}
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="mt-2 w-full rounded-full font-bold"
                  >
                    <a
                      href={branch.directionUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Direction
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-primary/15 bg-primary/5 px-5 py-6 text-center dark:bg-primary/10 sm:px-8">
          <p className="text-lg font-bold leading-8 text-foreground sm:text-xl">
            You can contact{" "}
            <span className="text-primary">WISDOM EDUCATION</span> during their
            office hours to inquire about their programs and services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EduContactForm;