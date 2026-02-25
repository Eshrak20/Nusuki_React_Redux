import type { VisaRequirementItem } from "@/types/hajj/types.visa";

const AboBanHajjUmrah = ({ title, description }: VisaRequirementItem) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 bg-card lg:rounded-lg lg:shadow-md">
      {title && (
        <h3
          className="text-xl lg:text-2xl font-bold"
          style={{ color: "var(--hajj)" }}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className="lg:text-base text-[12px] text-left lg:text-center text-foreground max-w-7xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default AboBanHajjUmrah;
