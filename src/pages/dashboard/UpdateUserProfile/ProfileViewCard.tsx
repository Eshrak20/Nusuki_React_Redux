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
import DocumentPreview from "./DocumentPreview";

type ProfileViewCardProps = {
  userData: AuthUserProfileData;
  onEdit: () => void;
};

const ProfileViewCard = ({ userData, onEdit }: ProfileViewCardProps) => {
  const profile = userData.profile;

  return (
    <div className="w-full ">
      <div className="space-y-6">
        {/* Personal Information */}
        <Card className="rounded-sm shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-4 p-6 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <UserRound className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>

            <Button onClick={onEdit} className="h-9 text-gray-100  dark:text-gray-800">
              <Edit3 className="mr-2 h-4 w-4 " />
              Edit Profile
            </Button>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2 p-6 pt-2">
            <InfoItem
              label="Full Name"
              value={userData.name}
              icon={UserRound}
            />
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

        {/* Contact Information */}
        <Card className="rounded-sm shadow-sm overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2 p-6 pt-2">
            <InfoItem
              label="Phone"
              value={`${profile?.phone_country_code ?? ""} ${profile?.phone_number ?? ""}`}
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

        {/* Travel Information */}
        <Card className="rounded-sm shadow-sm overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Travel Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2 p-6 pt-2">
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

      <Card className="h-fit rounded-sm shadow-sm  mt-10 overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5 text-primary" />
            Documents
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 p-6 pt-2">
          <DocumentPreview
            label="Profile Photo"
            imageUrl={profile?.profile_photo_url}
          />
          <DocumentPreview
            label="Passport Image"
            imageUrl={profile?.passport_image_url}
          />
          <DocumentPreview
            label="Visa Image"
            imageUrl={profile?.visa_image_url}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const InfoItem = ({ label, value, icon: Icon, className }: InfoItemProps) => {
  return (
    <div
      className={`rounded-sm border bg-muted/20 p-3 transition-colors hover:bg-muted/40 ${className ?? ""}`}
    >
      <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
        {Icon ? <Icon className="h-3 w-3" /> : null}
        {label}
      </div>

      <p className="wrap-break-word text-sm font-semibold text-foreground">
        {value?.trim() ? value : "—"}
      </p>
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
