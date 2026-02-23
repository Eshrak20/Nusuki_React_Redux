import type { DetInstitutionAccomplishProps } from "@/types/education/type.uniDet";


const DetInstitutionAccomplish = ({ accomplish }: DetInstitutionAccomplishProps) => {
  if (!accomplish) return null;

  const bgColor = accomplish.sectionBgColor || '#6C48F0';
  const titleColor = accomplish.sectionTitleColor || '#FFFFFF';

  return (
    <section 
      className="py-16"
      style={{ 
        background: `linear-gradient(135deg, ${accomplish.sectionBgColorTop || bgColor} 0%, ${accomplish.sectionBgColorBottom || bgColor} 100%)`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: titleColor }}
        >
          {accomplish.sectionTitle}
        </h2>
        
        {accomplish.button && (
          <button
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: accomplish.button.bgColor || '#FFFFFF',
              color: accomplish.button.textColor || bgColor
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