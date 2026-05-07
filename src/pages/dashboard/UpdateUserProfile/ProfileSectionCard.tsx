import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProfileSectionCardProps = {
  title: string;
  icon: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const ProfileSectionCard = ({
  title,
  icon: Icon,
  children,
  className,
}: ProfileSectionCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      {/* Reduced bottom padding to bring content closer to title */}
      <CardHeader className="p-6 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>

      {/* Standardized side padding and reduced top padding */}
      <CardContent className="p-6 pt-2">
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
           {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSectionCard;