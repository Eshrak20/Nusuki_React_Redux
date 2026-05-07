import { useMemo, useState } from "react";
import { toast } from "sonner";



import {
  initialProfileForm,
  mapProfileToForm,
  type UpdateProfileForm,
  type UploadFieldName,
} from "./types";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/api/authApi/authApi";
import ProfileUpdateHeader from "./ProfileUpdateHeader";
import ProfileEditForm from "./ProfileEditForm";
import ProfileViewCard from "./ProfileViewCard";

const UpdateUserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<UpdateProfileForm>(initialProfileForm);

  const {
    data: profileResponse,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch,
  } = useGetUserProfileQuery();

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const userData = profileResponse?.data;
  const currentProfilePhoto = userData?.profile?.profile_photo_url ?? null;

  const profilePreview = useMemo(() => {
    if (isEditing && form.profile_photo) {
      return URL.createObjectURL(form.profile_photo);
    }

    return currentProfilePhoto;
  }, [isEditing, form.profile_photo, currentProfilePhoto]);

  const handleChange = (key: keyof UpdateProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = (key: UploadFieldName, file?: File) => {
    setForm((prev) => ({
      ...prev,
      [key]: file ?? null,
    }));
  };

  const handleEdit = () => {
    if (!userData) return;

    setForm(mapProfileToForm(userData));
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (userData) {
      setForm(mapProfileToForm(userData));
    }

    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        profile_photo: form.profile_photo ?? undefined,
        passport_image: form.passport_image ?? undefined,
        visa_image: form.visa_image ?? undefined,
      };

      const response = await updateUserProfile(payload).unwrap();

      toast.success(response?.message || "Profile updated successfully");

      await refetch();

      setIsEditing(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        "Failed to update profile. Please try again.";

      toast.error(message);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-background px-4 py-6 text-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="h-7 w-56 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-4 w-80 animate-pulse rounded bg-muted" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProfileError || !userData) {
    return (
      <div className="min-h-screen bg-background px-4 py-6 text-foreground">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Failed to load profile</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProfileUpdateHeader
          profilePreview={profilePreview}
          title={isEditing ? "Update User Profile" : "User Profile"}
          subtitle={
            isEditing
              ? "Edit your personal, passport and travel information."
              : "View your saved personal, passport and travel information."
          }
        />

        {isEditing ? (
          <ProfileEditForm
            form={form}
            isLoading={isUpdating}
            profilePreview={profilePreview}
            onChange={handleChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <ProfileViewCard userData={userData} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default UpdateUserProfile;