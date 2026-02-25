import type { DetInstitutionAccomplishProps } from "@/types/education/type.uniDet";

const DetInstitutionAccomplish = ({ accomplish }: DetInstitutionAccomplishProps) => {

  if (!accomplish) return null;

  const handleBookClick = () => {
    // console.log("Book is clicked");
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
      />

      {/* Dark mode overlay */}
      <div className="absolute inset-0 bg-background/5 dark:bg-background/40" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          {accomplish.sectionTitle}
        </h2>

        {accomplish.button && (
          <button
            onClick={handleBookClick}
            className={`
              px-8 py-4 rounded-lg font-semibold text-lg 
              transition-all duration-300 
              hover:scale-105 hover:shadow-xl 
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${!accomplish.button.bgColor && !accomplish.button.textColor
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary'
                : ''
              }
            `}
            style={{
              ...(accomplish.button.bgColor && {
                backgroundColor: accomplish.button.bgColor,
              }),
              ...(accomplish.button.textColor && {
                color: accomplish.button.textColor,
              }),
            }}
          >
            {accomplish.button.label}
          </button>
        )}
      </div>
    </section>
  );
};

export default DetInstitutionAccomplish;