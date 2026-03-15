import type { OverviewSection } from "@/types/education/type.country";

interface Props {
  overview: OverviewSection;
}

const DestOverview = ({ overview }: Props) => {
  return (
    <section>
      {overview?.section_titles?.map((title, i) => (
        <h2 key={i}>{title}</h2>
      ))}

      {overview?.paragraphs?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
};

export default DestOverview;