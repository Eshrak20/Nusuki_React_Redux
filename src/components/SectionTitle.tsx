import type { TitleProps } from "@/types/types.common";

const SectionTitle = ({title}: TitleProps) => {
    return (
        <div>
      <h1 className="text-primary text-center text-3xl font-bold">
        {title}
      </h1>
        </div>
    );
};

export default SectionTitle;