import { useState, useRef, useEffect } from "react";
import { User, Mail, Phone, ChevronDown, ChevronRight } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder: string;
    dropdownTitle?: string; 
    required?: boolean;
}

const CustomSelect = ({ options, placeholder, dropdownTitle, required = false }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <input
                type="text"
                required={required}
                value={selected}
                onChange={() => { }} 
                className="absolute opacity-0 w-full h-full pointer-events-none -z-10 top-0 left-0"
                tabIndex={-1}
            />

            {/* Dropdown Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between border rounded-full px-5 py-3 transition-all cursor-pointer bg-background ${isOpen ? "border-primary ring-1 ring-primary" : "border-border/80 hover:border-border"
                    }`}
            >
                <span className={`text-sm select-none truncate ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                    {selected ? options.find(o => o.value === selected)?.label : placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown Options Menu */}
            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-card border border-border/60 rounded-4xl shadow-xl z-50 py-3 animate-in fade-in zoom-in-95 duration-200">

                    {/* Header inside the menu */}
                    <div className="px-5 pb-2 text-sm text-foreground font-medium select-none">
                        {dropdownTitle || placeholder}
                    </div>

                    {/* Separator Line */}
                    <div className="mx-4 mb-2 border-b border-border/80" />

                    {/* Scrollable Options List */}
                    <div className="flex flex-col max-h-56 overflow-y-auto">
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    setSelected(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`px-5 py-2.5 text-[15px] cursor-pointer transition-colors select-none ${selected === opt.value
                                    ? "bg-primary text-primary-foreground font-medium" 
                                    : "text-foreground/80 hover:bg-primary hover:text-primary-foreground" 
                                    }`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Form Component ---
const StudyAbroadForm = () => {
    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>

            {/* 1. Name Field */}
            <div className="flex items-center gap-3 border border-border/80 rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <User className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    required
                />
            </div>

            {/* 2. Email Field */}
            <div className="flex items-center gap-3 border border-border/80 rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Mail className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    required
                />
            </div>

            {/* 3. Mobile Number Field */}
            <div className="flex items-center gap-3 border border-border/80 rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Phone className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <input
                    type="tel"
                    placeholder="Mobile number"
                    className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    required
                />
            </div>

            {/* 4. Level & Destination Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomSelect
                    placeholder="Interested level of study"
                    dropdownTitle="Level of study"
                    required
                    options={[
                        { value: "foundation", label: "Foundation / Pathway" },
                        { value: "bachelor", label: "Bachelor" },
                        { value: "diploma", label: "Diploma" },
                        { value: "masters", label: "Masters" },
                        { value: "pg_diploma", label: "Postgraduate Diploma" }
                    ]}
                />
                <CustomSelect
                    placeholder="Study destination"
                    dropdownTitle="Study destination"
                    required
                    options={[
                        { value: "us", label: "USA" },
                        { value: "gb", label: "UK" },
                        { value: "ca", label: "Canada" },
                        { value: "au", label: "Australia" },
                        { value: "nz", label: "New Zealand" },
                    ]}
                />
            </div>

            {/* 5. Academic Qualification Field */}
            <div className="flex items-center border border-border/80 rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <input
                    type="text"
                    placeholder="Academic Qualification (Exp: HSC: GPA-4, City College, 2024)"
                    className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    required
                />
            </div>

            {/* 6. English Proficiency Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomSelect
                    placeholder="English proficiency"
                    dropdownTitle="English proficiency"
                    options={[
                        { value: "ielts", label: "IELTS" },
                        { value: "pte", label: "PTE" },
                        { value: "toefl_duolingo", label: "TOEFL/Duolingo" },
                        { value: "preparation", label: "Preparation running" }
                    ]}
                />

                {/* Overall Score */}
                <div className="flex items-center border border-border/80 rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <input
                        type="text"
                        placeholder="Overall Score"
                        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            {/* 7. Privacy Policy Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer mt-1 pl-1">
                <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-border/80 text-primary focus:ring-primary cursor-pointer"
                    required
                />
                <span className="text-[13px] md:text-sm text-foreground/80 font-medium select-none">
                    By clicking you agree to our Privacy Policy <span className="text-red-500">*</span>
                </span>
            </label>

            {/* 8. Submit Button */}
            <div className="mt-2">
                <button
                    type="submit"
                    className="group flex items-center justify-between gap-4 bg-primary text-primary-foreground pl-6 pr-1.5 py-1.5 rounded-full hover:brightness-110 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer w-fit"
                >
                    <span className="text-sm font-bold leading-none">
                        Submit now
                    </span>
                    <div className="bg-primary-foreground text-primary p-2 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                        <ChevronRight size={16} strokeWidth={3} />
                    </div>
                </button>
            </div>

        </form>
    );
};

export default StudyAbroadForm;