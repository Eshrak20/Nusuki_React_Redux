import { useState } from "react";
import EduTestModal from "./EduTestModal";

interface CommonButtonProps {
    title: string;
}

const CommonEnrollButton = ({ title }: CommonButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`hover:brightness-110 transition-all font-semibold cursor-pointer ${title === "Enroll Now" ? "bg-primary text-primary-foreground shadow-primary/20 px-10 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/40 w-max" : "px-8 py-3 md:py-4 rounded-lg dark:hover:shadow-primary/40 bg-secondary text-secondary-foreground dark:bg-primary dark:text-primary-foreground dark:shadow-primary/20 hover:bg-secondary/90 shadow-md hover:shadow-lg focus:ring-2 focus:ring-secondary/50 "}`}
            >
                {title}
            </button>

            <EduTestModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default CommonEnrollButton;