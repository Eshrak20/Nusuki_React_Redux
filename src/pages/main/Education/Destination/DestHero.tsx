import type { HeroSection } from "@/types/education/type.country";

interface Props {
  hero: HeroSection;
}

const DestHero = ({ hero }: Props) => {
  return (
    <section>
      <h1>{hero.title}</h1>
      <img src={hero.background_image} alt={hero.title} />
      <a href={hero.cta_url}>{hero.cta_text}</a>
    </section>
  );
};

export default DestHero;