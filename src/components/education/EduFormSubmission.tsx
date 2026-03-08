import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    User,
    Mail,
    Phone,
    BookOpen,
    MessageSquare,
    Send,
    CheckCircle2,
} from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { usePostContactInfoMutation } from "@/redux/api/formSubApi";
import { contactSchema } from "@/schemas/contact.schema";
import type { TitleProps } from "@/types/types.common";

const EduFormSubmission = ({ title }: TitleProps) => {
    const [postContactInfo, { isLoading }] = usePostContactInfoMutation();
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            await postContactInfo(values).unwrap();
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                form.reset();
            }, 5000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="w-full bg-card flex flex-col transition-all">
            {/* Header - Optimized for Sidebar */}
            {/* Animated Header */}
            <div className="bg-primary p-6 text-center text-primary-foreground relative overflow-hidden">
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none"
                />
                <h2 className="text-xl md:text-2xl font-bold leading-tight relative z-10">
                    {title}
                </h2>
                <p className="text-primary-foreground/80 mt-2 text-xs relative z-10">
                    Get expert guidance within 24 hours.
                </p>
            </div>

            {/* Form Area - Forced Single Column */}
            <div className="p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            {[
                                { name: "name", label: "Full Name", icon: User, type: "text" },
                                { name: "email", label: "Email Address", icon: Mail, type: "email" },
                                { name: "phone", label: "Phone Number", icon: Phone, type: "tel" },
                                { name: "subject", label: "Subject", icon: BookOpen, type: "text" },
                            ].map((item) => (
                                <FormField
                                    key={item.name}
                                    control={form.control}
                                    name={item.name as never}
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <div
                                                className={`group flex items-center border-b transition-all duration-300 ${focusedField === item.name ? "border-primary" : "border-border"
                                                    }`}
                                            >
                                                <item.icon
                                                    size={16}
                                                    className={`mr-3 transition-colors ${focusedField === item.name ? "text-primary" : "text-muted-foreground"
                                                        }`}
                                                />
                                                <div className="relative flex-1">
                                                    <label
                                                        className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === item.name
                                                                ? "-top-4 text-[10px] font-bold text-primary uppercase tracking-wider"
                                                                : "top-1 text-muted-foreground text-sm"
                                                            }`}
                                                    >
                                                        {item.label}
                                                    </label>
                                                    <FormControl>
                                                        <input
                                                            {...field}
                                                            type={item.type}
                                                            onFocus={() => setFocusedField(item.name)}
                                                            onBlur={() => setFocusedField(null)}
                                                            className="w-full py-1 bg-transparent outline-none text-foreground text-sm font-medium"
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <FormMessage className="text-[10px] absolute -bottom-5" />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="relative mt-2">
                                        <div
                                            className={`group flex items-start border-b transition-all duration-300 ${focusedField === "description" ? "border-primary" : "border-border"
                                                }`}
                                        >
                                            <MessageSquare
                                                size={16}
                                                className={`mr-3 mt-2 transition-colors ${focusedField === "description" ? "text-primary" : "text-muted-foreground"
                                                    }`}
                                            />
                                            <div className="relative flex-1">
                                                <label
                                                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === "description"
                                                            ? "-top-4 text-[10px] font-bold text-primary uppercase tracking-wider"
                                                            : "top-1 text-muted-foreground text-sm"
                                                        }`}
                                                >
                                                    How can we help?
                                                </label>
                                                <FormControl>
                                                    <textarea
                                                        {...field}
                                                        onFocus={() => setFocusedField("description")}
                                                        onBlur={() => setFocusedField(null)}
                                                        className="w-full py-1 bg-transparent outline-none text-foreground text-sm font-medium resize-none h-20"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <FormMessage className="text-[10px] absolute -bottom-5" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-950/30 py-3 rounded-xl border border-green-200 dark:border-green-900"
                                    >
                                        <CheckCircle2 size={18} />
                                        Message Sent!
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold tracking-widest text-[11px] flex items-center justify-center gap-3   transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? "SENDING..." : "ENQUIRE NOW"}
                                        <Send size={14} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EduFormSubmission;