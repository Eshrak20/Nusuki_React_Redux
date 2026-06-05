import { FileImage, UploadCloud } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UploadFieldName } from "./types";


type ProfileFileUploadBoxProps = {
  label: string;
  name: UploadFieldName;
  file?: File | null;
  onChange: (name: UploadFieldName, file?: File) => void;
};

const ProfileFileUploadBox = ({
  label,
  name,
  file,
  onChange,
}: ProfileFileUploadBoxProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <label
        htmlFor={name}
        className="flex cursor-pointer items-center gap-3 rounded-sm border border-dashed bg-background p-4 transition hover:border-primary hover:bg-primary/5"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileImage className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {file ? file.name : `Upload ${label}`}
          </p>
          <p className="text-xs text-muted-foreground">
            Click to choose image file
          </p>
        </div>

        <UploadCloud className="h-5 w-5 shrink-0 text-muted-foreground" />
      </label>

      <Input
        id={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(name, e.target.files?.[0])}
      />
    </div>
  );
};

export default ProfileFileUploadBox;