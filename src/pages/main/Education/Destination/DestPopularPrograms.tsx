interface Props {
  programs: string[];
  title?: string;
  description?: string;
  id?: string; 
}

const DestPopularPrograms = ({
  programs,
  title = "Popular programs to study",
  description = "The UK offers a diverse range of programs across various fields, making it an attractive destination for international students. Some of the most popular and prestigious programs include:",
  id = "progrms" 
}: Props) => {

  if (!programs || programs.length === 0) return null;

  return (
    <section id={id} className="w-full scroll-mt-40">
      {/* Header Section */}
      <div className="max-w-4xl mb-8 space-y-4 text-center mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Badges/Pills Container */}
      <div className="flex flex-wrap gap-3 md:gap-4">
        {programs.map((program, i) => (
          
          <div
            key={i}
            className="group inline-flex items-center space-x-3 bg-card border border-border/60 shadow-sm hover:shadow-md hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-300 rounded-full py-2.5 px-5 md:px-6 cursor-default"
          >
            {/* Beautiful Primary-colored Dot instead of a plain text bullet */}
            <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:scale-110 transition-all duration-300" />

            {/* Program Name */}
            <span className="text-sm md:text-[15px] font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {program}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestPopularPrograms;