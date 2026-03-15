import type { ArticleMeta } from "@/types/education/type.country";

interface Props {
  articles: ArticleMeta[];
}

const DestArticles = ({ articles }: Props) => {
  return (
    <section>
      {articles.map((a, i) => (
        <div key={i}>
          <img src={a.image} alt={a.title} />
          <h3>{a.title}</h3>
          <p>{a.summary}</p>
        </div>
      ))}
    </section>
  );
};

export default DestArticles;