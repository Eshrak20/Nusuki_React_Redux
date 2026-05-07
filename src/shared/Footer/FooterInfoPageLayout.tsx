import type { ReactNode } from "react";
window.scrollTo({ top: 0, behavior: "smooth" });
type FooterInfoPageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const FooterInfoPageLayout = ({
  title,
  description,
  children,
}: FooterInfoPageLayoutProps) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b bg-primary/5 dark:bg-primary/10">
        <div className="absolute inset-0 opacity-70 dark:opacity-30">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,90 C90,70 140,120 230,90 C300,65 330,110 420,80 C520,45 610,70 700,95 C780,120 850,55 940,70 C1030,85 1070,35 1160,60 C1250,85 1320,55 1440,75 L1440,180 L0,180 Z"
              className="fill-primary/15 dark:fill-primary/20"
            />
            <path
              d="M0,130 C130,110 210,155 340,118 C460,85 560,125 680,130 C820,135 910,85 1040,105 C1170,125 1260,95 1440,120 L1440,180 L0,180 Z"
              className="fill-primary/10 dark:fill-primary/15"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-14 md:py-16 mt-24">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="text-sm leading-7 text-foreground/90 md:text-base">
          {children}
        </div>
      </section>
    </main>
  );
};

export default FooterInfoPageLayout;
