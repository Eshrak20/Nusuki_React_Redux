import type { Ranking } from "@/types/education/type.course";

interface UniversityRankingProps {
  ranking: Ranking;
}

const UniversityRanking = ({ ranking }: UniversityRankingProps) => {
  return (
    <div className="border p-4 rounded-lg mt-4">
      <h2 className="font-semibold mb-2">University Ranking</h2>

      <ul className="list-disc ml-5 text-sm">
        <li>Source: {ranking.source}</li>
        <li>World Ranking: {ranking.world_ranking}</li>
      </ul>
    </div>
  );
};

export default UniversityRanking;