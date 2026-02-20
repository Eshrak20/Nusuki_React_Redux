import EduTitle from "@/components/education/EduTitle";
import { features } from "@/data/education/whyNusukiData";

const WhyNusuki = () => {
  return (
    <section className="py-16 px-4 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="-mb-3">
          <EduTitle name="Why Nusuki ?" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-sm border border-border flex flex-col h-full transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-xl font-bold text-primary mb-4">
                {item.title}
              </h3>

              {/* Changed text-primary/70 to text-muted-foreground for better dark mode contrast */}
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNusuki;
