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
    <Card className="rounded-2xl shadow-sm lg:sticky lg:top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <UploadCloud className="h-5 w-5 text-primary" />
          Upload Images
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-col items-center rounded-2xl border bg-muted/40 p-5 text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-background shadow-sm">
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

          <p className="font-semibold">Profile Photo</p>
          <p className="mt-1 text-xs text-muted-foreground">
            JPG, PNG or WEBP supported
          </p>
        </div>

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

        <Separator />

        <Button type="submit" disabled={isLoading} className="h-11 w-full rounded-xl">
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