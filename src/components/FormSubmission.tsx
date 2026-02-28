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

const FormSubmission = ({ title }: TitleProps) => {
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
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

      alert(errorMessage);
    }
  };

  return (
    <section className="py-16 min-h-screen flex items-center justify-center from-muted/40 via-background to-muted/40 dark:from-background dark:via-muted/30 dark:to-background transition-colors">

      <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-border bg-white/70 dark:bg-card/70 backdrop-blur-xl shadow-2xl dark:shadow-black/40 transition-all">

        {/* Header */}
        <div className="bg-linear-to-r from-hajj via-hajj/90 to-hajj/70 dark:from-hajj dark:via-hajj/80 dark:to-hajj/60 p-10 text-center text-white relative overflow-hidden">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Contact Inquiry
          </motion.div>

          <h2 className="text-2xl md:text-4xl  font-semibold">
            {title}
          </h2>

          <p className="text-white/80 mt-3 text-sm max-w-md mx-auto">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Form Area */}
        <div className="p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

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
                          className={`group flex items-center border-b-2 transition-all duration-300 ${focusedField === item.name
                              ? "border-hajj"
                              : "border-border"
                            }`}
                        >
                          <item.icon
                            size={18}
                            className={`mr-3 transition-colors ${focusedField === item.name
                                ? "text-hajj"
                                : "text-muted-foreground"
                              }`}
                          />

                          <div className="relative flex-1">
                            <label
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === item.name
                                  ? "-top-5 text-[10px] font-bold text-hajj uppercase tracking-wide"
                                  : "top-2 text-muted-foreground text-sm"
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
                                className="w-full py-2 bg-transparent outline-none text-foreground font-medium"
                              />
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage className="text-[11px] absolute -bottom-5" />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 relative mt-4">
                      <div
                        className={`group flex items-start border-b-2 transition-all duration-300 ${focusedField === "description"
                            ? "border-hajj"
                            : "border-border"
                          }`}
                      >
                        <MessageSquare
                          size={18}
                          className={`mr-3 mt-3 transition-colors ${focusedField === "description"
                              ? "text-hajj"
                              : "text-muted-foreground"
                            }`}
                        />

                        <div className="relative flex-1">
                          <label
                            className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === "description"
                                ? "-top-5 text-[10px] font-bold text-hajj uppercase tracking-wide"
                                : "top-2 text-muted-foreground text-sm"
                              }`}
                          >
                            Your Message
                          </label>

                          <FormControl>
                            <textarea
                              {...field}
                              onFocus={() => setFocusedField("description")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full py-2 bg-transparent outline-none text-foreground font-medium resize-none mt-1 h-16 lg:h-24"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage className="text-[11px] absolute -bottom-5" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <div className="pt-6 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold"
                    >
                      <CheckCircle2 size={20} />
                      Message Sent Successfully!
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full md:w-auto px-14 py-4 bg-hajj text-white rounded-2xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-hajj/30 hover:shadow-hajj/50 hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {isLoading ? "SENDING..." : "SEND MESSAGE"}
                      <Send size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default FormSubmission;