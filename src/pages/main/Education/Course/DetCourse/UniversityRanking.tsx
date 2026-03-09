import { motion } from "framer-motion";
import type { Ranking } from "@/types/education/type.course";
import { Trophy, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface UniversityRankingProps {
  ranking: Ranking;
}

const UniversityRanking = ({ ranking }: UniversityRankingProps) => {
  if (!ranking.world_ranking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Trophy className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Global Recognition
            </h2>

            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mt-1">
              <Globe className="w-3 h-3" />
              World University Rankings
            </div>
          </div>
        </div>

        {/* Ranking Card */}
        <div
          className={cn(
            "rounded-3xl border bg-card border-border",
            "shadow-sm hover:shadow-md transition-all duration-300",
            "hover:border-primary/30"
          )}
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Rank Section */}
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20">
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-primary/70 uppercase">
                    Rank
                  </p>

                  <p className="text-3xl font-black text-primary">
                    #{ranking.world_ranking}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold text-foreground">
                  Top Global University
                </p>

                <p className="text-sm text-muted-foreground">
                  Based on the latest {ranking.source} rankings
                </p>
              </div>
            </div>

            {/* Source - Highlighted Big */}
            <div className="flex items-center">
              <span className="text-3xl font-black text-primary tracking-tight">
                {ranking.source}
              </span>
            </div>
          </div>
          {/* Bottom Info */}
          <div className="border-t px-8 py-3 bg-muted/30">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Rankings reflect international academic reputation and research performance.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UniversityRanking;