import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ProfileInputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ElementType;
  className?: string;
};

const ProfileInputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  className,
}: ProfileInputFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>

      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        ) : null}

        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn("h-11 rounded-xl", Icon && "pl-10")}
        />
      </div>
    </div>
  );
};

export default ProfileInputField;