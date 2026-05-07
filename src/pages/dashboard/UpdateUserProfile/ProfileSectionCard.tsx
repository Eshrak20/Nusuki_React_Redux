import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProfileSectionCardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

const ProfileSectionCard = ({
  title,
  icon: Icon,
  children,
}: ProfileSectionCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default ProfileSectionCard;