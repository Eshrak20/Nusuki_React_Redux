"use client";

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="lg:py-20 -py-8 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white lg:rounded-3xl lg:shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-hajj p-8 lg:p-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:inline-block hidden lg:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Contact Inquiry
          </motion.div>
          <h2 className="text-lg lg:text-3xl md:text-4xl italic">{title}</h2>
          <p className="text-white/70 mt-3 hidden lg:block text-sm max-w-md mx-auto">
            Fill out the form below and our team will get back to you within 24
            hours.
          </p>
        </div>

        <div className="p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Reusable Input Component Logic */}
                {[
                  {
                    name: "name",
                    label: "Full Name",
                    icon: User,
                    type: "text",
                  },
                  {
                    name: "email",
                    label: "Email Address",
                    icon: Mail,
                    type: "email",
                  },
                  {
                    name: "phone",
                    label: "Phone Number",
                    icon: Phone,
                    type: "tel",
                  },
                  {
                    name: "subject",
                    label: "Subject",
                    icon: BookOpen,
                    type: "text",
                  },
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
                              : "border-gray-200"
                            }`}
                        >
                          <item.icon
                            size={18}
                            className={`mr-3 transition-colors ${focusedField === item.name ? "text-hajj" : "text-gray-400"}`}
                          />
                          <div className="relative flex-1">
                            <label
                              className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === item.name
                                  ? "-top-5 text-[10px] font-bold text-hajj uppercase tracking-tighter"
                                  : "top-2 text-gray-400 text-sm"
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
                                className="w-full py-2 bg-transparent outline-none text-gray-800 font-medium"
                              />
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage className="text-[10px] absolute -bottom-5" />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Description - Full Width */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 relative mt-4">
                      <div
                        className={`group flex items-start border-b-2 transition-all duration-300 ${focusedField === "description"
                            ? "border-hajj"
                            : "border-gray-200"
                          }`}
                      >
                        <MessageSquare
                          size={18}
                          className={`mr-3 mt-3 transition-colors ${focusedField === "description" ? "text-hajj" : "text-gray-400"}`}
                        />
                        <div className="relative flex-1">
                          <label
                            className={`absolute left-0 transition-all duration-300 pointer-events-none ${field.value || focusedField === "description"
                                ? "-top-5 text-[10px] font-bold text-hajj uppercase tracking-tighter"
                                : "top-2 text-gray-400 text-sm"
                              }`}
                          >
                            Your Message
                          </label>
                          <FormControl>
                            <textarea
                              {...field}
                              onFocus={() => setFocusedField("description")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full py-2 bg-transparent outline-none text-gray-800 font-medium resize-none mt-1 h-12 lg:h-20"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage className="text-[10px] absolute -bottom-5" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button Area */}
              <div className="pt-6 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-green-600 font-bold"
                    >
                      <CheckCircle2 size={20} /> Message Sent Successfully!
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full md:w-auto px-12 py-4 bg-hajj text-white rounded-xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-hajj/20 hover:bg-hajj/90 transition-all disabled:opacity-50"
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
