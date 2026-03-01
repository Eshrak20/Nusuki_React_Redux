import type { VisaRequirementItem } from "@/types/hajj/types.visa";

const AboBanHajjUmrah = ({ title, description }: VisaRequirementItem) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-3 lg:p-6 space-y-4 bg-card lg:rounded-lg ">
      {title && (
        <h3
          className="text-2xl lg:text-4xl font-bold"
          style={{ color: "var(--hajj)" }}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className="lg:text-base text-[14px] text-left lg:text-center text-foreground max-w-7xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default AboBanHajjUmrah;
