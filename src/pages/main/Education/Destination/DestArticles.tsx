import type { ArticleMeta } from "@/types/education/type.country";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <section id={id} className="w-full py-24 scroll-mt-20 container mx-auto px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-2xl text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Popular & <span className="text-primary">recent</span> articles
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest insights and guides for your international education journey.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {articles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col-reverse md:flex-row bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-[2.5rem] p-3 sm:p-4 gap-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Left Column: Text Content */}
            <div className="flex flex-col flex-1 justify-center px-4 py-4 md:py-2">
              
              {/* Meta Info Row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold">
                  {article.meta[0] || "Guide"}
                </span>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold">
                  <Calendar size={14} className="text-primary/60" />
                  <span>{article.meta[2] || "2024"}</span>
                </div>
              </div>

              {/* Article Title */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>

              {/* Article Summary */}
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-6 opacity-80">
                {article.summary}
              </p>

              {/* "Read More" Interaction */}
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <span>Read Article</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>

            {/* Right Column: High-End Image Container */}
            <div className="relative w-full md:w-52 lg:w-60 shrink-0 aspect-[16/10] md:aspect-square overflow-hidden rounded-[2rem] z-0">
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Glassmorphism float tag (Optional UI Polish) */}
              <div className="absolute bottom-3 right-3 z-20 backdrop-blur-md bg-white/10 border border-white/20 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                 <ArrowRight size={18} className="text-white -rotate-45" />
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DestArticles;