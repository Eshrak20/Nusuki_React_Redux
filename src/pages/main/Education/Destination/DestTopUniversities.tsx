import type { UniversityItem } from "@/types/education/type.country";

interface Props {
  universities: UniversityItem[];
}

const DestTopUniversities = ({ universities }: Props) => {
  return (
    <section>
      {universities.map((u, i) => (
        <div key={i}>
          <img src={u.image} alt={u.name} />
          <h3>{u.name}</h3>
          <a href={u.website}>Visit</a>
        </div>
      ))}
    </section>
  );
};

export default DestTopUniversities;