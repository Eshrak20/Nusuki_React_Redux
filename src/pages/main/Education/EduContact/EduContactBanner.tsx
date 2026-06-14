import { ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// image path ta tomar project onujayi update kore nio
import officeImage from "@/assets/images/nusuki-office.png";

const EduContactBanner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-primary-light/25 py-14 sm:py-16 lg:py-24 dark:from-primary/10 dark:via-background dark:to-primary/10">
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full border border-primary/30" />
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full border border-primary-light/30" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full border border-primary/20" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-[52px]">
            Let&apos;s contact NUSUKI EDUCATION to inquire about their programs
            and services.
          </h1>

          <div className="mt-8 max-w-2xl space-y-5 text-base font-medium leading-8 text-foreground/80 sm:text-lg dark:text-muted-foreground">
            <p>
              Are you ready to begin a journey of learning and discovery like
              never before?
            </p>

            <p>
              Get ready to dive into the world of knowledge and exploration with
              NUSUKI EDUCATION! We&apos;re here to introduce you to an exciting
              opportunity.
            </p>

            <p>
              So, let&apos;s contact NUSUKI EDUCATION to discover the incredible
              programs and services they offer.
            </p>
          </div>

          <Button
            size="lg"
            className="mt-8 rounded-full px-6 text-base font-extrabold shadow-lg transition hover:-translate-y-0.5"
          >
            <ArrowRightCircle className="mr-2 h-5 w-5" />
            Book A Free Online Counselling
          </Button>
        </div>

        <Card className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-2xl">
          <img
            src={officeImage}
            alt="NUSUKI Education office"
            className="h-65 w-full object-cover sm:h-90 lg:h-105"
          />
        </Card>
      </div>
    </section>
  );
};

export default EduContactBanner;