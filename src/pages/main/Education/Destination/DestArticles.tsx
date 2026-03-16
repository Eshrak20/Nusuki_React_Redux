import type { ArticleMeta } from "@/types/education/type.country";
import { Calendar } from "lucide-react";

interface ExtendedArticleMeta extends ArticleMeta {
  category?: string;
  date?: string;
}

interface Props {
  articles: ExtendedArticleMeta[]; 
  id?: string; 
}

const DestArticles = ({ articles, id = "articles" }: Props) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section id={id} className="w-full my-20 scroll-mt-40">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Popular and recent articles
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {articles.map((article, i) => (
          
          /* Article Card */
          <div 
            key={i} 
            className="group flex flex-col-reverse sm:flex-row bg-card border border-border/60 rounded-[2rem] p-4 sm:p-5 gap-6 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 cursor-pointer"
          >
            {/* Left Column: Text Content */}
            <div className="flex flex-col flex-1 justify-center sm:pl-2 py-2">
              
              {/* Meta Info Row: Badge & Date */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full border border-border text-xs md:text-sm text-muted-foreground font-medium">
                  {/* 3. Safely access the properties without 'any' */}
                  {article.meta[0] || "Study Abroad"}
                </span>
                
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs md:text-sm font-medium">
                  <Calendar size={14} className="opacity-70" />
                  <span>{article.meta[2] || "Recent"}</span>
                </div>
              </div>

              {/* Article Title */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-3">
                {article.title}
              </h3>

              {/* Article Summary */}
              <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed line-clamp-3 md:line-clamp-4">
                {article.summary}
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="w-full sm:w-55 shrink-0 aspect-4/3 sm:aspect-square overflow-hidden rounded-[1.5rem] shadow-sm">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

          </div>

        ))}
      </div>
    </section>
  );
};

export default DestArticles;