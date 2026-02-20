import type { TitleProps } from "@/types/types.common";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePostContactInfoMutation } from "@/redux/api/formSubApi";

import { Sparkles, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { contactSchema } from "@/schemas/contact.schema";

const FormSubmission = ({ title }: TitleProps) => {
  const [postContactInfo, { isLoading }] = usePostContactInfoMutation();

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
      const res = await postContactInfo(values).unwrap();
      alert("Your message has been sent successfully!");

      form.reset();
    } catch (error) {
      alert("Something went wrong. Please try again. ❌");
      console.error(error);
    }
  };

  return (
    <div className="relative py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-[2.5rem] border border-white bg-white/80 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12"
      >
        <div className="lg:col-span-4 bg-hajj p-10 lg:p-12 text-white flex flex-col justify-between relative">

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} className="text-white" /> Professional Support
            </div>
            <h2 className="text-4xl font-serif font-black leading-tight mb-6">
              Ready to help you start your journey.
            </h2>

            <ul className="space-y-6">
              <ContactInfoItem
                icon={<Clock size={20} />}
                title="Response Time"
                desc="Within 12-24 hours"
              />
              <ContactInfoItem
                icon={<MapPin size={20} />}
                title="Office Location"
                desc="Dhaka, Bangladesh"
              />
              <ContactInfoItem
                icon={<CheckCircle2 size={20} />}
                title="Reliability"
                desc="Trusted by 10k+ Pilgrims"
              />
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
            <p className="text-white text-sm italic">
              "Providing spiritual guidance and logistical excellence for your
              sacred travels."
            </p>
          </div>
        </div>

        {/* Right Section: The Form (8 Cols) */}
        <div className="lg:col-span-8 p-8 md:p-14">
          <header className="mb-10">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              {title}
            </h3>
            <div className="h-1.5 w-20 bg-hajj rounded-full" />
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Adam Ahmed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Premium Hajj Package" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can our experts help you?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 px-10 bg-hajj text-white"
              >
                {isLoading ? "Sending..." : "Sent Message"}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

const ContactInfoItem = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <li className="flex gap-4">
    <div className="bg-white/15 p-3 rounded-2xl text-white h-fit">{icon}</div>
    <div>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-white text-xs tracking-wide">{desc}</p>
    </div>
  </li>
);

export default FormSubmission;
