import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
}

const SectionHeader = ({ title, subtitle, viewAllLink }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div className="space-y-2">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-[#002365] dark:text-white tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 max-w-lg">
            {subtitle}
          </p>
        )}
        <div className="w-16 h-1.5 bg-[#ba9863] rounded-full" />
      </div>

      {viewAllLink && (
        <motion.a
          href={viewAllLink}
          whileHover={{ x: 5 }}
          className="text-[#ba9863] font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-all"
        >
          View all Collections
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </motion.a>
      )}
    </div>
  );
};

export default SectionHeader;