import type { CityItem } from "@/types/education/type.country";

interface Props {
  cities: CityItem[];
}

const DestTopCities = ({ cities }: Props) => {
  return (
    <section>
      {cities.map((city, i) => (
        <div key={i}>
          <img src={city.image} alt={city.city} />
          <h3>{city.city}</h3>
          <p>{city.description}</p>
        </div>
      ))}
    </section>
  );
};

export default DestTopCities;