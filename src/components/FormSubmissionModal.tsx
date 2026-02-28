/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

// shadcn/ui components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { usePostContactInfoMutation } from "@/redux/api/formSubApi";
import { contactSchema } from "@/schemas/contact.schema";

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    type?: "default" | "education";
}

const FormSubmissionModal = ({ open, onClose, title, type = "default" }: Props) => {
    const [postContactInfo, { isLoading }] = usePostContactInfoMutation();
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: title,
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            let finalDescription = values.description;

            if (type === "education") {
                const { city, destination, coaching, loan } = form.getValues() as any;
                finalDescription = `
                            City: ${city || "N/A"}
                            Preferred Destination: ${destination || "N/A"}
                            Coaching: ${coaching || "N/A"}
                            Loan: ${loan || "N/A"}

                            Message:
                            ${values.description}`;
            }

            await postContactInfo({
                ...values,
                description: finalDescription,
            }).unwrap();

            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                form.reset();
                onClose();
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            {/* The DialogContent automatically handles:
          1. Centering (fixed inset-0 etc)
          2. Backdrop blur (via DialogOverlay inside shadcn)
          3. Closing on 'X' or click outside 
      */}
            <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto border-none p-0 bg-background dark:bg-zinc-950 rounded-3xl overflow-hidden">

                {/* Header with Primary Gradient */}
                <DialogHeader className="bg-primary p-8 text-primary-foreground">
                    <DialogTitle className="text-2xl font-semibold underline text-center">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 md:p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Basic Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email@example.com" type="email" {...field} className="rounded-xl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+880..." {...field} className="rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Education Specific Fields */}
                            {type === "education" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
                                    <Input {...form.register("city" as any)} placeholder="Your City" className="bg-background rounded-lg" />
                                    <Input {...form.register("destination" as any)} placeholder="Preferred Destination" className="bg-background rounded-lg" />
                                    <Input {...form.register("coaching" as any)} placeholder="Coaching? (Yes/No)" className="bg-background rounded-lg" />
                                    <Input {...form.register("loan" as any)} placeholder="Education Loan? (Yes/No)" className="bg-background rounded-lg" />
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us more..."
                                                className="min-h-25 rounded-xl resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col items-center pt-2">
                                {isSuccess ? (
                                    <div className="flex items-center gap-2 text-primary font-medium animate-in zoom-in-95 duration-300">
                                        <CheckCircle2 className="w-5 h-5" />
                                        Message Sent Successfully!
                                    </div>
                                    ) : (
                                        <Button
                                            type="submit"
                                        disabled={isLoading}
                                        className="w-full md:w-auto px-12 py-6 rounded-xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isLoading ? "Submitting..." : "Submit Application"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FormSubmissionModal;