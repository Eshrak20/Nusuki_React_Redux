import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, MapPin, Globe, GraduationCap, CheckCircle2, X, BookOpen, Banknote } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePostContactInfoMutation } from "@/redux/api/formSubApi";
import { contactSchema } from "@/schemas/contact.schema";

type ContactFormValues = z.infer<typeof contactSchema>;

interface FormFieldItem {
    name: keyof ContactFormValues;
    label: string;
    icon: React.ElementType;
    isMobile?: boolean;
}

interface ApiError {
    data?: { message?: string };
}

interface EduTestModalProps {
    open: boolean;
    onClose: () => void;
}

const EduTestModal = ({ open, onClose }: EduTestModalProps) => {
    const [postContactInfo, { isLoading }] = usePostContactInfoMutation();
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            city: "",
            office: "",
            destination: "",
            coaching: "",
            loan: "",
            subject: "Test Session Request",
            description: ""
        },
    });

  const onSubmit = async (values: ContactFormValues) => {
  try {
    const combinedDescription = [
      `Destination: ${values.destination || "N/A"}`,
      `Coaching: ${values.coaching || "N/A"}`,
      `Loan: ${values.loan || "N/A"}`,
      `City: ${values.city || "N/A"}`,
      `Office: ${values.office || "N/A"}`,
      `Message: ${values.description || "No additional message"}`
    ].join("\n");

    await postContactInfo({
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: values.subject ?? "Test Session Request", // Fallback for TS
      description: combinedDescription, // join() always returns a string
    }).unwrap();

    setIsSuccess(true);
    // ... timer logic
  } catch (error: unknown) {
    const err = error as ApiError;
    alert(err?.data?.message || "Something went wrong.");
  }
};

    const fields: FormFieldItem[] = [
        { name: "name", label: "Student Full Name", icon: User },
        { name: "city", label: "Student City", icon: MapPin },
        { name: "email", label: "Student Email", icon: Mail },
        { name: "office", label: "Nearest Office", icon: Globe },
        { name: "phone", label: "Student Mobile", icon: Phone, isMobile: true },
        { name: "destination", label: "Preferred Destination", icon: GraduationCap },
        { name: "coaching", label: "Looking for Coaching?", icon: BookOpen },
        { name: "loan", label: "Looking for Education Loan?", icon: Banknote },
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden w-[95vw] sm:w-full max-w-4xl border-none bg-transparent shadow-none custom-close-hidden">
                <div className="w-full max-h-[95dvh] bg-card flex flex-col overflow-y-auto rounded-2xl border shadow-2xl relative">
                    
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 md:right-4 md:top-4 p-2 rounded-full hover:bg-muted transition-colors z-50 group bg-background/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                    >
                        <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </button>

                    <div className="p-6 md:p-8 border-b text-center bg-muted/20 shrink-0">
                        <h2 className="text-xl md:text-3xl font-bold text-foreground tracking-tight pr-7 md:pr-0">
                            Start Your Exam Prep Now – Enquire for Free Demo Session!
                        </h2>
                        <p className="text-muted-foreground text-xs pr-7 md:text-sm mt-2">
                            Please fill in your details below to get started
                        </p>
                    </div>

                    <div className="p-5 md:p-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
                                    {fields.map((item) => (
                                        <FormField
                                            key={item.name}
                                            control={form.control}
                                            name={item.name}
                                            render={({ field }) => (
                                                <FormItem className="relative">
                                                    <div className={`group flex items-center border-b-2 transition-all duration-300 ${focusedField === item.name ? "border-primary" : "border-border"}`}>
                                                        <div className="relative flex-1">
                                                            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === item.name ? "-top-6 text-[11px] md:text-[12px] font-bold text-primary uppercase tracking-wider" : "top-1 text-foreground text-sm md:text-base "}`}>
                                                                {item.label} <span className="text-destructive">*</span>
                                                            </label>

                                                            <div className="flex items-center gap-2 mt-2">
                                                                {item.isMobile && (
                                                                    <div className="flex mt-3 items-center gap-1 pr-2 border-r text-sm font-semibold text-muted-foreground">
                                                                        <span className="text-lg">BD</span> +880
                                                                    </div>
                                                                )}

                                                                <FormControl>
                                                                    <input
                                                                        {...field}
                                                                        value={field.value ?? ""}
                                                                        onFocus={() => setFocusedField(item.name)}
                                                                        onBlur={() => setFocusedField(null)}
                                                                        className="w-full pb-2 bg-transparent outline-none text-foreground text-sm md:text-base font-medium placeholder:opacity-0 focus:placeholder:opacity-50"
                                                                        placeholder={item.label}
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                        <item.icon className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${focusedField === item.name ? "text-primary" : "text-muted-foreground/40"}`} />
                                                    </div>
                                                    <FormMessage className="text-[10px] md:text-[11px] absolute -bottom-5 md:-bottom-6 font-medium" />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>

                                <div className="pt-6 md:pt-8 flex justify-center pb-4 md:pb-0">
                                    <AnimatePresence mode="wait">
                                        {isSuccess ? (
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="flex items-center gap-3 text-green-600 font-bold bg-green-50 px-6 md:px-10 py-3 md:py-4 rounded-xl border border-green-100 text-sm md:text-base"
                                            >
                                                <CheckCircle2 size={24} className="h-5 w-5 md:h-6 md:w-6" /> Enquiry Sent Successfully!
                                            </motion.div>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.02, translateY: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full md:w-2/3 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold tracking-widest text-xs md:text-sm uppercase"
                                            >
                                                {isLoading ? "PROCESSING..." : "Submit"}
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EduTestModal;