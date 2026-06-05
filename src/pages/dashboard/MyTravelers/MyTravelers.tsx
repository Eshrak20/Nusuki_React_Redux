import { useMemo, useState } from "react";
import { SquarePen, Trash2, Search, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  useCreateMyTravellerMutation,
  useDeleteMyTravellerMutation,
  useGetMyTravellersQuery,
  useUpdateMyTravellerMutation,
} from "@/redux/api/flightApi/myTravellersApi";

import MyTravellerModal from "./MyTravellerModal";

import type {
  MyTraveller,
  MyTravellerFormPayload,
} from "@/types/flight/myTravellers.types";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

const getFullName = (traveller: MyTraveller) => {
  return `${traveller.title || ""} ${traveller.given_name || ""} ${traveller.surname || ""
    }`
    .replace(/\s+/g, " ")
    .trim();
};

const getTravellerEmail = (traveller: MyTraveller) => {
  const emailTraveller = traveller as MyTraveller & {
    email?: string | null;
    user?: {
      email?: string | null;
    } | null;
  };

  return emailTraveller.email || emailTraveller.user?.email || "No email";
};

const MyTravelers = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTraveller, setSelectedTraveller] =
    useState<MyTraveller | null>(null);
  const [travellerToDelete, setTravellerToDelete] =
    useState<MyTraveller | null>(null);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useGetMyTravellersQuery();

  const [createTraveller, { isLoading: isCreating }] =
    useCreateMyTravellerMutation();

  const [updateTraveller, { isLoading: isUpdating }] =
    useUpdateMyTravellerMutation();

  const [deleteTraveller, { isLoading: isDeleting }] =
    useDeleteMyTravellerMutation();

  const travellers = data?.data || [];

  const filteredTravellers = useMemo(() => {
    const query = searchText.toLowerCase().trim();

    if (!query) return travellers;

    return travellers.filter((traveller) => {
      const fullName = getFullName(traveller);
      const email = getTravellerEmail(traveller);

      return (
        fullName.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query)
      );
    });
  }, [travellers, searchText]);

  const handleAddNew = () => {
    setSelectedTraveller(null);
    setShowForm(true);
  };

  const handleEdit = (traveller: MyTraveller) => {
    setSelectedTraveller(traveller);
    setShowForm(true);
  };

  const handleCancel = () => {
    setSelectedTraveller(null);
    setShowForm(false);
  };


const handleSubmit = async (payload: MyTravellerFormPayload) => {
  try {
    if (selectedTraveller) {
      const response = await updateTraveller({
        id: selectedTraveller.id,
        body: payload,
      }).unwrap();

      if (!response.success) {
        toast.error(response.message || "Traveller update failed.");
        return;
      }

      toast.success(response.message || "Traveller updated successfully.");
    } else {
      const response = await createTraveller(payload).unwrap();

      if (!response.success) {
        toast.error(response.message || "Traveller creation failed.");
        return;
      }

      toast.success(response.message || "Traveller created successfully.");
    }

    setShowForm(false);
    setSelectedTraveller(null);
  } catch (error: unknown) {
    console.error("Traveller Submit Error:", error);

    toast.error(
      getApiErrorMessage(error, "Failed to save traveller."),
    );
  }
};

  const handleDeleteClick = (traveller: MyTraveller) => {
    setTravellerToDelete(traveller);
  };

  const handleDeleteConfirm = async () => {
    if (!travellerToDelete) return;

    try {
      const response = await deleteTraveller(travellerToDelete.id).unwrap();

      if (!response.success) {
        toast.error(response.message || "Traveller delete failed.");
        return;
      }

      toast.success(response.message || "Traveller deleted successfully.");
      setTravellerToDelete(null);
    } catch (error: unknown) {
      console.error("Traveller Delete Error:", error);

      const apiError = error as {
        data?: {
          message?: string;
        };
      };

      toast.error(apiError?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-5 md:px-6 lg:px-8">
        <div className="rounded-sm border bg-card text-card-foreground shadow-sm">
          <div className="border-b px-4 py-4 sm:px-5 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Traveler Info
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  You have {travellers.length}{" "}
                  {travellers.length === 1 ? "traveller" : "travellers"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddNew}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 md:w-auto"
              >
                <Plus className="h-4 w-4" />
                Add Traveller
              </button>
            </div>

            <div className="relative mt-4 w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by name or email..."
                className="h-11 w-full rounded-sm border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="px-4 py-2 sm:px-5 md:px-6">
            {isLoading ? (
              <div className="flex min-h-40 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Loading travellers...
                </p>
              </div>
            ) : null}

            {isError ? (
              <div className="my-4 rounded-sm border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                Failed to load travellers.
              </div>
            ) : null}

            {!isLoading && !isError && filteredTravellers.length === 0 ? (
              <div className="flex min-h-52 flex-col items-center justify-center text-center">
                <h3 className="text-base font-semibold text-foreground">
                  No traveller found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Add your first traveller to use it during flight booking and
                  PNR creation.
                </p>

                <button
                  type="button"
                  onClick={handleAddNew}
                  className="mt-4 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Add Traveller
                </button>
              </div>
            ) : null}

            {!isLoading && !isError && filteredTravellers.length > 0 ? (
              <div className="divide-y">
                {filteredTravellers.map((traveller, index) => {
                  const fullName = getFullName(traveller);
                  const email = getTravellerEmail(traveller);
                  const isPrimaryTraveller = index === 0;

                  return (
                    <div
                      key={traveller.id}
                      className="flex flex-col gap-3 py-4 transition hover:bg-muted/30 sm:px-2 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-sm font-bold uppercase tracking-wide text-foreground sm:text-base">
                            {fullName || "Unnamed Traveller"}
                          </h3>

                          {isPrimaryTraveller ? (
                            <span className="rounded-sm border border-primary px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-primary">
                              Primary Traveler
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
                          {email}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4 md:justify-end">
                        <button
                          type="button"
                          onClick={() => handleEdit(traveller)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition hover:text-primary/80 sm:text-sm"
                        >
                          <SquarePen className="h-4 w-4 stroke-[2.4]" />
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDeleteClick(traveller)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive transition hover:text-destructive/80 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showForm ? (
        <MyTravellerModal
          key={selectedTraveller?.id || "add-traveller"}
          open={showForm}
          selectedTraveller={selectedTraveller}
          isSubmitting={isCreating || isUpdating}
          onSubmit={handleSubmit}
          onClose={handleCancel}
        />
      ) : null}

      <AlertDialog
        open={Boolean(travellerToDelete)}
        onOpenChange={(open) => {
          if (!open) setTravellerToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete traveller?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {travellerToDelete ? getFullName(travellerToDelete) : ""}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              disabled={isDeleting}
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyTravelers;