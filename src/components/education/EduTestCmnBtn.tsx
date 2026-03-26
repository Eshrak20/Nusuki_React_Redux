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
                className={`${title === "Enroll Now" ? "bg-primary text-primary-foreground px-10 py-2.5 rounded-lg shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 hover:brightness-110 transition-all font-semibold w-max" : "px-8 py-3 md:py-4 rounded-lg cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-secondary/50 focus:outline-none"}`}
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