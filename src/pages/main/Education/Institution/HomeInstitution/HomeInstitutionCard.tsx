import type { University } from "@/types/education/type.uni";
import { Link } from "react-router-dom";
interface HomeInstitutionCardProps {
  universities: University[];
}
const HomeInstitutionCard = ({ universities }: HomeInstitutionCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {universities.map((uni) => (
        <div
          key={uni.id}
          className="bg-card dark:bg-card-dark rounded-2xl shadow-sm border border-muted dark:border-muted-dark p-6 flex flex-col h-full transition-shadow hover:shadow-md"
        >
          {/* Logo Container */}
          <div className="h-24 w-full flex items-center justify-center mb-4">
            <img
              src={uni.uni_logo}
              alt={uni.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <hr className="border-muted dark:border-muted-dark mb-5" />

          {/* Text Content */}
          <div className="grow">
            <h3 className="font-bold text-foreground dark:text-foreground-dark text-[15px] leading-tight mb-2 line-clamp-2 min-h-10">
              {uni.name}
            </h3>

            <p className="text-sm text-foreground mb-1">
              {uni.location || uni.country}
            </p>

            <p className="text-sm text-foreground dark:text-foreground-dark font-medium truncate mb-4">
              {uni.universityUrl}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <Link
              to={`${uni.id}`}
              className="flex-1 py-2.5 px-2 border border-primary/40 text-primary text-sm font-semibold rounded-lg hover:bg-primary/10 transition-colors text-center flex items-center justify-center"
            >
              Know More
            </Link>
            <button className="flex-1 py-2.5 px-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md flex items-center justify-center">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>

  );
};

export default HomeInstitutionCard;