import type { KeyFactsCategory } from "@/types/education/type.country";

interface Props {
  facts: KeyFactsCategory[];
}

const DestKeyFacts = ({ facts }: Props) => {
  return (
    <section>
      {facts.map((category, i) => (
        <div key={i}>
          <h3>{category.category}</h3>
          {category.facts.map((fact, j) => (
            <div key={j}>
              <strong>{fact.value}</strong>
              <p>{fact.label}</p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default DestKeyFacts;