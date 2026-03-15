import type { WorkOpportunity } from "@/types/education/type.country";

interface Props {
  opportunities: WorkOpportunity[];
}

const DestWorkOpportunities = ({ opportunities }: Props) => {
  return (
    <section>
      {opportunities.map((o, i) => (
        <div key={i}>
          <h3>{o.title}</h3>
          <p>{o.content}</p>
        </div>
      ))}
    </section>
  );
};

export default DestWorkOpportunities;