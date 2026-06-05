import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import {
  initialProfileForm,
  mapProfileToForm,
  type UpdateProfileForm,
  type UploadFieldName,
} from "./types";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/authApi/authApi";
import { updateUser } from "@/redux/features/auth/authSlice";

import ProfileEditForm from "./ProfileEditForm";
import ProfileViewCard from "./ProfileViewCard";
import DashboardPageHeader from "../Common/DashboardPageHeader";
import { UserRound } from "lucide-react";

const UpdateUserProfile = () => {
  const dispatch = useDispatch();

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

      const refetchResponse = await refetch();

      const latestUserData =
        refetchResponse?.data?.data || response?.data || userData;

      dispatch(
        updateUser({
          name: latestUserData?.name ?? form.name,
          email: latestUserData?.email ?? userData?.email,
          profile: {
            ...(latestUserData?.profile ?? userData?.profile ?? {}),
            profile_photo_url:
              latestUserData?.profile?.profile_photo_url ??
              userData?.profile?.profile_photo_url ??
              null,
          },
        })
      );

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
        <div className="w-full">
          <div className="rounded-sm border bg-card p-8 shadow-sm">
            <div className="h-7 w-56 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-4 w-80 animate-pulse rounded bg-muted" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-sm bg-muted"
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
        <div className="mx-auto max-w-3xl rounded-sm border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Failed to load profile</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-sm bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-background py-6 text-foreground">
      <div className="w-full space-y-6">
        <DashboardPageHeader
          title="User Profile"
          subtitle="View your saved personal, passport and travel information."
          icon={UserRound}
          imageUrl={profilePreview}
          badgeTitle="Profile Status"
          badgeText="Information saved"
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