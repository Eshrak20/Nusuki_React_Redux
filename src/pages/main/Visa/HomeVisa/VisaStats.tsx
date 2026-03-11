import { motion } from 'framer-motion';

interface StatItem {
  id: number;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { id: 1, value: '50+', label: 'Countries Covered' },
  { id: 2, value: '98%', label: 'Approval Rate' },
  { id: 3, value: '5000+', label: 'Visas Processed' },
  { id: 4, value: '24/7', label: 'Expert Support' },
];

const VisaStats = () => {
  // Framer Motion variants for a clean, staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full bg-background py-8 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 gap-x-0 gap-y-7 lg:flex lg:justify-between lg:gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="flex flex-col items-center justify-center text-center"
            >
              <h3 className="mb-2 text-3xl font-bold tracking-tight text-primary lg:text-4xl">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-muted-foreground lg:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisaStats;