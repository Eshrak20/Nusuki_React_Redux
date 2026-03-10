import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface StepItem {
    id: number;
    title: string;
    description: string;
}

const steps: StepItem[] = [
    {
        id: 1,
        title: 'Choose Your Visa',
        description: 'Select the country and visa type you need',
    },
    {
        id: 2,
        title: 'Submit Documents',
        description: 'Provide required documents as per checklist',
    },
    {
        id: 3,
        title: 'We Process',
        description: 'Our experts handle the entire process',
    },
    {
        id: 4,
        title: 'Get Your Visa',
        description: 'Receive your approved visa and travel!',
    },
];

const HowItWorks = () => {
    // Framer Motion variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="w-full py-14 lg:py-20">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header Section */}
                <div className="mb-11 lg:mb-16 flex flex-col items-center text-center">
                    <Badge
                        variant="secondary"
                        className="hidden lg:block mb-6 bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/20"
                    >
                        Simple Process
                    </Badge>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
                        How Our Visa Service Works
                    </h2>
                    <p className="text-base text-muted-foreground lg:text-lg">
                        We make the visa application process simple and stress-free
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative mx-auto max-w-5xl">

                    {/* Background Connecting Line (Desktop Only) */}
                    <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-0.5 bg-primary opacity-20 dark:opacity-40 lg:block" />

                    <motion.div
                        className="grid grid-cols-1 gap-13 lg:grid-cols-4 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        {steps.map((step) => (
                            <motion.div
                                key={step.id}
                                variants={itemVariants}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Number Box */}
                                <div
                                    className={`z-10 flex h-18 w-18 lg:h-20 lg:w-20 items-center justify-center rounded-2xl shadow-lg transition-transform hover:-translate-y-1 bg-primary`}
                                >
                                    <span className="text-3xl font-bold text-muted">
                                        {step.id}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <h3 className="mt-5 lg:mt-8 text-xl font-bold text-foreground">
                                    {step.title}
                                </h3>
                                <p className="mt-3 max-w-55 text-sm leading-relaxed text-muted-foreground">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;