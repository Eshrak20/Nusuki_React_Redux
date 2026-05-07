import { Camera, Loader2, Save, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfileFileUploadBox from "./ProfileFileUploadBox";
import type { UpdateProfileForm, UploadFieldName } from "./types";

type ProfileImageUploadSectionProps = {
  form: UpdateProfileForm;
  profilePreview: string | null;
  isLoading: boolean;
  onFileChange: (name: UploadFieldName, file?: File) => void;
};

const ProfileImageUploadSection = ({
  form,
  profilePreview,
  isLoading,
  onFileChange,
}: ProfileImageUploadSectionProps) => {
  return (
    <Card className="rounded-2xl shadow-sm lg:sticky lg:top-6 overflow-hidden">
      {/* Reduced bottom padding: p-6 pb-2 */}
      <CardHeader className="p-6 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <UploadCloud className="h-5 w-5 text-primary" />
          Upload Images
        </CardTitle>
      </CardHeader>

      {/* Consistent content padding: p-6 pt-2 */}
      <CardContent className="space-y-5 p-6 pt-2">
        <div className="flex flex-col items-center rounded-2xl border bg-muted/20 p-4 text-center">
          <div className="mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-background shadow-sm">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="h-9 w-9 text-muted-foreground" />
            )}
          </div>

          <p className="text-sm font-semibold">Profile Photo</p>
          <p className="mt-1 text-[11px] text-muted-foreground uppercase tracking-wider">
            JPG, PNG or WEBP
          </p>
        </div>

        {/* These components should ideally also have consistent internal spacing */}
        <div className="space-y-4">
          <ProfileFileUploadBox
            label="Profile Photo"
            name="profile_photo"
            file={form.profile_photo}
            onChange={onFileChange}
          />

          <ProfileFileUploadBox
            label="Passport Image"
            name="passport_image"
            file={form.passport_image}
            onChange={onFileChange}
          />

          <ProfileFileUploadBox
            label="Visa Image"
            name="visa_image"
            file={form.visa_image}
            onChange={onFileChange}
          />
        </div>

        <Separator className="my-2" />

        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-xl font-semibold shadow-sm transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Profile
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUploadSection;