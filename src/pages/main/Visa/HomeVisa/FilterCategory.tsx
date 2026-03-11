import { motion, AnimatePresence } from "framer-motion";
import { Layers, Briefcase, GraduationCap, Plane, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setVisaCategory } from "@/redux/features/visaFilterSlice"; // Adjust path if needed
import type { RootState } from "@/redux/store"; // Adjust path if needed

const filterCategories = [
    { id: "All", label: "All", icon: Layers },
    { id: "Business Visa", label: "Business Visa", icon: Briefcase },
    { id: "Student Visa", label: "Student Visa", icon: GraduationCap },
    { id: "Tourist Visa", label: "Tourist Visa", icon: Plane },
    { id: "Umrah Visa", label: "Umrah Visa", icon: Tag },
];

const FilterCategory = () => {
    const dispatch = useDispatch();

    // 1. Pull the active filter directly from the Redux store
    const activeFilter = useSelector(
        (state: RootState) => state.visaFilter.visa_category
    );

    return (
        <div className="flex w-full items-center justify-start md:justify-center gap-3 overflow-x-auto py-6 border-b border-border px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filterCategories.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                    <button
                        key={filter.id}
                        onClick={() => dispatch(setVisaCategory(filter.id))}
                        className={cn(
                            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border shadow-sm",
                            isActive
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {filter.label}
                    </button>
                );
            })}

            <AnimatePresence>
                {activeFilter !== "All" && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: "auto" }}
                        exit={{ opacity: 0, scale: 0.8, width: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => dispatch(setVisaCategory("All"))}
                        className="inline-flex items-center justify-center gap-2 px-15 lg:px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-destructive text-white hover:bg-destructive/90 shadow-sm overflow-hidden"
                    >
                        <X className="w-4 h-4 shrink-0" />

                        <span>Clear Filter</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterCategory;