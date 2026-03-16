import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";

import { usePostContactInfoMutation } from "@/redux/api/formSubApi";

// Define Zod schema for study abroad form
const studyAbroadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    levelOfStudy: z.string().min(1, "Please select your level of study"),
    destination: z.string().min(1, "Please select a destination"),
    qualification: z.string().min(1, "Academic qualification is required"),
    englishProficiency: z.string().optional(),
    overallScore: z.string().optional(),
    privacyAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the privacy policy"
    })
});

type StudyAbroadFormValues = z.infer<typeof studyAbroadSchema>;

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder: string;
    dropdownTitle?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string;
}

const CustomSelect = ({ 
    options, 
    placeholder, 
    dropdownTitle, 
    value = "", 
    onChange,
    onBlur,
    error 
}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (onBlur) onBlur();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onBlur]);

    const selectedLabel = options.find(opt => opt.value === value)?.label || "";

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Dropdown Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between border rounded-full px-5 py-3 transition-all cursor-pointer bg-background ${
                    isOpen 
                        ? "border-primary ring-1 ring-primary" 
                        : error 
                            ? "border-red-500" 
                            : "border-border/80 hover:border-border"
                }`}
            >
                <span className={`text-sm select-none truncate ${value ? "text-foreground" : "text-muted-foreground"}`}>
                    {value ? selectedLabel : placeholder}
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
                                    onChange?.(opt.value);
                                    setIsOpen(false);
                                    if (onBlur) onBlur();
                                }}
                                className={`px-5 py-2.5 text-[15px] cursor-pointer transition-colors select-none ${
                                    value === opt.value
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
    const [postContactInfo, { isLoading }] = usePostContactInfoMutation();
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<StudyAbroadFormValues>({
        resolver: zodResolver(studyAbroadSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            levelOfStudy: "",
            destination: "",
            qualification: "",
            englishProficiency: "",
            overallScore: "",
            privacyAccepted: false
        }
    });

    const onSubmit = async (data: StudyAbroadFormValues) => {
        try {
            // Format the data to match your API expected format
            const contactData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: `Study Abroad Enquiry - ${data.destination}`,
                description: `
                    Level of Study: ${data.levelOfStudy}
                    Destination: ${data.destination}
                    Qualification: ${data.qualification}
                    English Proficiency: ${data.englishProficiency || 'Not specified'}
                    Overall Score: ${data.overallScore || 'Not specified'}
                `.trim()
            };

            await postContactInfo(contactData).unwrap();
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                reset();
            }, 5000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>

            {/* 1. Name Field */}
            <div>
                <div className={`flex items-center gap-3 border rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all ${
                    errors.name ? "border-red-500" : "border-border/80"
                }`}>
                    <User className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        {...register("name")}
                    />
                </div>
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-5">{errors.name.message}</p>
                )}
            </div>

            {/* 2. Email Field */}
            <div>
                <div className={`flex items-center gap-3 border rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all ${
                    errors.email ? "border-red-500" : "border-border/80"
                }`}>
                    <Mail className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-5">{errors.email.message}</p>
                )}
            </div>

            {/* 3. Mobile Number Field */}
            <div>
                <div className={`flex items-center gap-3 border rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all ${
                    errors.phone ? "border-red-500" : "border-border/80"
                }`}>
                    <Phone className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    <input
                        type="tel"
                        placeholder="Mobile number"
                        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        {...register("phone")}
                    />
                </div>
                {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 ml-5">{errors.phone.message}</p>
                )}
            </div>

            {/* 4. Level & Destination Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="levelOfStudy"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                placeholder="Interested level of study"
                                dropdownTitle="Level of study"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.levelOfStudy?.message}
                                options={[
                                    { value: "foundation", label: "Foundation / Pathway" },
                                    { value: "bachelor", label: "Bachelor" },
                                    { value: "diploma", label: "Diploma" },
                                    { value: "masters", label: "Masters" },
                                    { value: "pg_diploma", label: "Postgraduate Diploma" }
                                ]}
                            />
                        )}
                    />
                    {errors.levelOfStudy && (
                        <p className="text-red-500 text-xs mt-1 ml-5">{errors.levelOfStudy.message}</p>
                    )}
                </div>

                <div>
                    <Controller
                        name="destination"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                placeholder="Study destination"
                                dropdownTitle="Study destination"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.destination?.message}
                                options={[
                                    { value: "us", label: "USA" },
                                    { value: "gb", label: "UK" },
                                    { value: "ca", label: "Canada" },
                                    { value: "au", label: "Australia" },
                                    { value: "nz", label: "New Zealand" },
                                ]}
                            />
                        )}
                    />
                    {errors.destination && (
                        <p className="text-red-500 text-xs mt-1 ml-5">{errors.destination.message}</p>
                    )}
                </div>
            </div>

            {/* 5. Academic Qualification Field */}
            <div>
                <div className={`flex items-center border rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all ${
                    errors.qualification ? "border-red-500" : "border-border/80"
                }`}>
                    <input
                        type="text"
                        placeholder="Academic Qualification (Exp: HSC: GPA-4, City College, 2024)"
                        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        {...register("qualification")}
                    />
                </div>
                {errors.qualification && (
                    <p className="text-red-500 text-xs mt-1 ml-5">{errors.qualification.message}</p>
                )}
            </div>

            {/* 6. English Proficiency Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                    name="englishProficiency"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            placeholder="English proficiency"
                            dropdownTitle="English proficiency"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            options={[
                                { value: "ielts", label: "IELTS" },
                                { value: "pte", label: "PTE" },
                                { value: "toefl_duolingo", label: "TOEFL/Duolingo" },
                                { value: "preparation", label: "Preparation running" }
                            ]}
                        />
                    )}
                />

                {/* Overall Score */}
                <div className="flex items-center border border-border/80 rounded-full px-5 py-3 bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <input
                        type="text"
                        placeholder="Overall Score"
                        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        {...register("overallScore")}
                    />
                </div>
            </div>

            {/* 7. Privacy Policy Checkbox */}
            <div>
                <label className="flex items-start gap-2 cursor-pointer mt-1 pl-1">
                    <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 rounded border-border/80 text-primary focus:ring-primary cursor-pointer"
                        {...register("privacyAccepted")}
                    />
                    <span className="text-[13px] md:text-sm text-foreground/80 font-medium select-none">
                        By clicking you agree to our Privacy Policy <span className="text-red-500">*</span>
                    </span>
                </label>
                {errors.privacyAccepted && (
                    <p className="text-red-500 text-xs mt-1 ml-5">{errors.privacyAccepted.message}</p>
                )}
            </div>

            {/* 8. Submit Button */}
            <div className="mt-2">
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-950/30 py-3 rounded-full border border-green-200 dark:border-green-900"
                        >
                            <CheckCircle2 size={18} />
                            Enquiry Sent!
                        </motion.div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="group flex items-center justify-between gap-4 bg-primary text-primary-foreground pl-6 pr-1.5 py-1.5 rounded-full hover:brightness-110 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                        >
                            <span className="text-sm font-bold leading-none">
                                {isLoading ? "SENDING..." : "Submit now"}
                            </span>
                            <div className="bg-primary-foreground text-primary p-2 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <ChevronRight size={16} strokeWidth={3} />
                                )}
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
};

export default StudyAbroadForm;