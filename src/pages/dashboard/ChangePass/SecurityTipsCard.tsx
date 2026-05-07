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
    <Card className="h-fit rounded-2xl shadow-sm lg:sticky lg:top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <KeyRound className="h-5 w-5 text-primary" />
          Password Tips
        </CardTitle>

        <CardDescription>
          Follow these tips for better account security.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        {tips.map((tip) => (
          <div key={tip} className="flex gap-3 rounded-xl border bg-muted/30 p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>{tip}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SecurityTipsCard;