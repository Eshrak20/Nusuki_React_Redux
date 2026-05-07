import type { FooterSection } from "@/data/footer/footerPagesData";
import { CheckCircle2 } from "lucide-react";

type FooterContentSectionsProps = {
  sections: FooterSection[];
};



const FooterContentSections = ({ sections }: FooterContentSectionsProps) => {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section key={index} className="space-y-3">
          {section.title ? (
            <h2 className="text-lg font-bold text-foreground">
              {section.title}
            </h2>
          ) : null}

          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}

          {section.list ? (
            <ul className="grid gap-3 pt-2 sm:grid-cols-2">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 rounded-xl border bg-card p-3 text-sm text-muted-foreground shadow-sm dark:bg-card/70"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
};

export default FooterContentSections;
