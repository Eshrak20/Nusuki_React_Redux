import {
  CalendarDays,
  Edit3,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AuthUserProfileData } from "./types";

type ProfileViewCardProps = {
  userData: AuthUserProfileData;
  onEdit: () => void;
};

const ProfileViewCard = ({ userData, onEdit }: ProfileViewCardProps) => {
  const profile = userData.profile;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>

            <Button onClick={onEdit} className="rounded-xl">
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Full Name" value={userData.name} icon={UserRound} />
            <InfoItem label="Email" value={userData.email} icon={Mail} />
            <InfoItem label="Given Name" value={profile?.given_name} />
            <InfoItem label="Surname" value={profile?.surname} />
            <InfoItem label="Gender" value={profile?.gender} />
            <InfoItem
              label="Date of Birth"
              value={profile?.date_of_birth}
              icon={CalendarDays}
            />
            <InfoItem label="Nationality" value={profile?.nationality} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoItem
              label="Phone"
              value={`${profile?.phone_country_code ?? ""} ${
                profile?.phone_number ?? ""
              }`}
              icon={Phone}
            />
            <InfoItem label="Post Code" value={profile?.post_code} />
            <InfoItem
              label="Address"
              value={profile?.address}
              icon={MapPin}
              className="sm:col-span-2"
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Travel Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoItem
              label="Frequent Flyer No"
              value={profile?.frequent_flyer_no}
            />
            <InfoItem label="Passport No" value={profile?.passport_no} />
            <InfoItem
              label="Passport Expire Date"
              value={profile?.passport_expire_date}
              icon={CalendarDays}
            />
            <InfoItem label="Meal Type" value={profile?.meal_type} />
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit rounded-2xl shadow-sm lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Uploaded Documents
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <DocumentPreview
            label="Profile Photo"
            imageUrl={profile?.profile_photo_url}
          />
          <DocumentPreview
            label="Passport Image"
            imageUrl={profile?.passport_image_url}
          />
          <DocumentPreview label="Visa Image" imageUrl={profile?.visa_image_url} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileViewCard;

type InfoItemProps = {
  label: string;
  value?: string | null;
  icon?: React.ElementType;
  className?: string;
};

const InfoItem = ({ label, value, icon: Icon, className }: InfoItemProps) => {
  return (
    <div className={`rounded-xl border bg-muted/30 p-4 ${className ?? ""}`}>
      <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {label}
      </div>

      <p className="break-words text-sm font-semibold text-foreground">
        {value?.trim() ? value : "Not provided"}
      </p>
    </div>
  );
};

type DocumentPreviewProps = {
  label: string;
  imageUrl?: string | null;
};

const DocumentPreview = ({ label, imageUrl }: DocumentPreviewProps) => {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4">
      <p className="mb-3 text-sm font-semibold">{label}</p>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={label}
          className="h-40 w-full rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed bg-background text-sm text-muted-foreground">
          No image uploaded
        </div>
      )}
    </div>
  );
};