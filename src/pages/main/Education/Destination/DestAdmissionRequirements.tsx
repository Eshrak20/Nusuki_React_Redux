interface Props {
  requirements: string[];
  title?: string;
  id?: string; // Used to link with the navbar
}

const DestAdmissionRequirements = ({
  requirements,
  title = "Requirements to Study Abroad",
  id = "admissions-requrements" // Make sure this matches your navbar data's href!
}: Props) => {
  if (!requirements || requirements.length === 0) return null;

  return (
    <section id={id} className="w-full my-16 scroll-mt-32">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 tracking-tight">
        {title}
      </h2>

      {/* Grid Layout for Pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {requirements.map((req, i) => (

          /* Pill Container */
          <div
            key={i}
            className="flex items-center justify-between bg-card border border-border rounded-full py-4 px-6 md:px-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Requirement Text */}
            <p className="text-sm md:text-[15px] font-medium text-foreground leading-snug pr-4">
              {req}
            </p>

            {/* Small Grey Dot on the right */}
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 shrink-0" />
          </div>

        ))}
      </div>
    </section>
  );
};

export default DestAdmissionRequirements;