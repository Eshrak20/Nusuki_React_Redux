import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; 

type SelectOption = {
  label: string;
  value: string;
};

type ProfileSelectFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
};

const ProfileSelectField = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  className,
}: ProfileSelectFieldProps) => {
  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Matching the label style of ProfileInputField for consistency */}
      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">
        {label}
      </Label>

      <Select value={value} onValueChange={onChange}>
        {/* Added w-full here to fix the width issue */}
        <SelectTrigger className="w-full h-11 rounded-xl bg-muted/5 border-muted-foreground/20 focus:ring-primary">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfileSelectField;