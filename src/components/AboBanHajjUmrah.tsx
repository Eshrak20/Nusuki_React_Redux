import type { VisaRequirementItem } from "@/types/hajj/types.visa";

const AboBanHajjUmrah = ({ title, description }: VisaRequirementItem) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 bg-card rounded-lg shadow-md">
      {title && (
        <h3
          className="text-2xl font-bold"
          style={{ color: "var(--hajj)" }}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className="text-base text-foreground max-w-7xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default AboBanHajjUmrah;
