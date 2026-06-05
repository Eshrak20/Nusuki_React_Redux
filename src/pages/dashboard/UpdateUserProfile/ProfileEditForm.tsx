import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { UpdateProfileForm, UploadFieldName } from "./types";
import ProfileImageUploadSection from "./ProfileImageUploadSection";
import ProfileInputField from "./ProfileInputField";
import ProfileSectionCard from "./ProfileSectionCard";
import ProfileSelectField from "./ProfileSelectField";

type ProfileEditFormProps = {
  form: UpdateProfileForm;
  profilePreview: string | null;
  isLoading: boolean;
  onChange: (key: keyof UpdateProfileForm, value: string) => void;
  onFileChange: (name: UploadFieldName, file?: File) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const mealTypeOptions = [
  { label: "Muslim Meal", value: "Muslim Meal" },
  { label: "Vegetarian Meal", value: "Vegetarian Meal" },
  { label: "Non Vegetarian Meal", value: "Non Vegetarian Meal" },
  { label: "No Preference", value: "No Preference" },
];

const ProfileEditForm = ({
  form,
  profilePreview,
  isLoading,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) => {
  return (
    <form onSubmit={onSubmit} className="">
      <div className="space-y-8">
        <div className="flex justify-end -mt-2 mb-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded-sm bg-primary text-white mr-3"
          >
            Cancel Edit
          </Button>
        </div>

        <ProfileSectionCard title="Personal Information" icon={UserRound}>
          <ProfileInputField
            label="Full Name"
            value={form.name}
            onChange={(value) => onChange("name", value)}
            placeholder="Tashrif Hasan"
          />

          <ProfileInputField
            label="Given Name"
            value={form.given_name}
            onChange={(value) => onChange("given_name", value)}
            placeholder="Eshrak"
          />

          <ProfileInputField
            label="Surname"
            value={form.surname}
            onChange={(value) => onChange("surname", value)}
            placeholder="Jilan"
          />

          <ProfileSelectField
            label="Gender"
            value={form.gender}
            placeholder="Select gender"
            options={genderOptions}
            onChange={(value) => onChange("gender", value)}
          />

          <ProfileInputField
            label="Date of Birth"
            type="date"
            value={form.date_of_birth}
            onChange={(value) => onChange("date_of_birth", value)}
            icon={CalendarDays}
          />

          <ProfileInputField
            label="Nationality"
            value={form.nationality}
            onChange={(value) => onChange("nationality", value)}
            placeholder="BD"
          />
        </ProfileSectionCard>

        <ProfileSectionCard title="Contact Information" icon={Phone}>
          <ProfileInputField
            label="Phone Country Code"
            value={form.phone_country_code}
            onChange={(value) => onChange("phone_country_code", value)}
            placeholder="+88"
            icon={Phone}
          />

          <ProfileInputField
            label="Phone Number"
            value={form.phone_number}
            onChange={(value) => onChange("phone_number", value)}
            placeholder="01312345234"
            icon={Phone}
          />

          <ProfileInputField
            label="Address"
            value={form.address}
            onChange={(value) => onChange("address", value)}
            placeholder="Dhaka, Bangladesh"
            icon={MapPin}
            className="sm:col-span-2"
          />

          <ProfileInputField
            label="Post Code"
            value={form.post_code}
            onChange={(value) => onChange("post_code", value)}
            placeholder="1207"
          />

          <ProfileInputField
            label="Frequent Flyer No"
            value={form.frequent_flyer_no}
            onChange={(value) => onChange("frequent_flyer_no", value)}
            placeholder="BG123456"
            icon={Mail}
          />
        </ProfileSectionCard>

        <ProfileSectionCard title="Travel Documents" icon={ShieldCheck}>
          <ProfileInputField
            label="Passport No"
            value={form.passport_no}
            onChange={(value) => onChange("passport_no", value)}
            placeholder="A12345678"
          />

          <ProfileInputField
            label="Passport Expire Date"
            type="date"
            value={form.passport_expire_date}
            onChange={(value) => onChange("passport_expire_date", value)}
            icon={CalendarDays}
          />

          <ProfileSelectField
            label="Meal Type"
            value={form.meal_type}
            placeholder="Select meal type"
            options={mealTypeOptions}
            onChange={(value) => onChange("meal_type", value)}
            className="sm:col-span-2"
          />
        </ProfileSectionCard>
      </div>

      <ProfileImageUploadSection
        form={form}
        profilePreview={profilePreview}
        isLoading={isLoading}
        onFileChange={onFileChange}
      />
    </form>
  );
};

export default ProfileEditForm;