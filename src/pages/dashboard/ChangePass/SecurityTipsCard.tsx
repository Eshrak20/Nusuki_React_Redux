import { KeyRound, ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tips = [
  "Use at least 6 characters or more.",
  "Avoid using your name, phone number or email.",
  "Use a mix of uppercase, lowercase, number and symbol.",
  "Do not share your password with anyone.",
];

const SecurityTipsCard = () => {
  return (
    <Card className="h-fit rounded-2xl shadow-sm lg:sticky lg:top-6 overflow-hidden">
      {/* Standardized Header Padding: p-6 pb-2 */}
      <CardHeader className="p-6 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <KeyRound className="h-5 w-5 text-primary" />
          Password Tips
        </CardTitle>

        <CardDescription className="text-sm">
          Follow these tips for better account security.
        </CardDescription>
      </CardHeader>

      {/* Standardized Content Padding: p-6 pt-2 */}
      <CardContent className="space-y-3 p-6 pt-2 text-sm text-muted-foreground">
        {tips.map((tip) => (
          <div 
            key={tip} 
            className="flex gap-3 rounded-xl border bg-muted/20 p-3 transition-colors hover:bg-muted/30"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="leading-relaxed text-foreground/80">{tip}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SecurityTipsCard;