import { useMemo, useState } from "react";
import {
  useCreateMyTravellerMutation,
  useDeleteMyTravellerMutation,
  useGetMyTravellersQuery,
  useUpdateMyTravellerMutation,
} from "@/redux/api/flightApi/myTravellersApi";

import MyTravellerForm from "./MyTravellerForm";

import type {
  MyTraveller,
  MyTravellerFormPayload,
} from "@/types/flight/myTravellers.types";

const MyTravelers = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTraveller, setSelectedTraveller] =
    useState<MyTraveller | null>(null);
  const [searchText, setSearchText] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetMyTravellersQuery();

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
      const fullName = `${traveller.given_name} ${traveller.surname}`;

      return (
        fullName.toLowerCase().includes(query) ||
        traveller.phone?.toLowerCase().includes(query) ||
        traveller.passport_no?.toLowerCase().includes(query) ||
        traveller.passenger_type?.toLowerCase().includes(query)
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
          alert(response.message || "Traveller update failed.");
          return;
        }

        alert(response.message || "Traveller updated successfully.");
      } else {
        const response = await createTraveller(payload).unwrap();

        if (!response.success) {
          alert(response.message || "Traveller creation failed.");
          return;
        }

        alert(response.message || "Traveller created successfully.");
      }

      setShowForm(false);
      setSelectedTraveller(null);
    } catch (error: unknown) {
      console.error("Traveller Submit Error:", error);

      const apiError = error as {
        data?: {
          message?: string;
        };
      };

      alert(apiError?.data?.message || "Something went wrong.");
    }
  };

  const handleDelete = async (traveller: MyTraveller) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${traveller.given_name} ${traveller.surname}?`,
    );

    if (!confirmed) return;

    try {
      const response = await deleteTraveller(traveller.id).unwrap();

      if (!response.success) {
        alert(response.message || "Traveller delete failed.");
        return;
      }

      alert(response.message || "Traveller deleted successfully.");
    } catch (error: unknown) {
      console.error("Traveller Delete Error:", error);

      const apiError = error as {
        data?: {
          message?: string;
        };
      };

      alert(apiError?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="overflow-hidden rounded-2xl border bg-gradient-to-r from-primary/10 via-background to-background p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              My Travellers
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your saved travellers for faster flight booking and PNR
              creation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            + Add Traveller
          </button>
        </div>
      </div>

      {showForm ? (
        <MyTravellerForm
          selectedTraveller={selectedTraveller}
          isSubmitting={isCreating || isUpdating}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : null}

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Saved Travellers
            </h2>
            <p className="text-sm text-muted-foreground">
              Total travellers: {travellers.length}
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name, phone, passport..."
              className="w-full rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 md:w-80"
            />

            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Refresh
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed">
            <p className="text-sm text-muted-foreground">
              Loading travellers...
            </p>
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Failed to load travellers.
          </div>
        ) : null}

        {!isLoading && !isError && filteredTravellers.length === 0 ? (
          <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed text-center">
            <h3 className="text-base font-semibold">No traveller found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first traveller to use it during PNR creation.
            </p>

            <button
              type="button"
              onClick={handleAddNew}
              className="mt-4 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Add Traveller
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && filteredTravellers.length > 0 ? (
          <>
            <div className="hidden overflow-hidden rounded-xl border md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/70 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Traveller</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">DOB</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Passport</th>
                    <th className="px-4 py-3">Expiry</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTravellers.map((traveller) => (
                    <tr
                      key={traveller.id}
                      className="border-t transition hover:bg-muted/40"
                    >
                      <td className="px-4 py-4">
                        <div className="font-semibold text-foreground">
                          {traveller.title} {traveller.given_name}{" "}
                          {traveller.surname}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {traveller.gender === "M" ? "Male" : "Female"} ·{" "}
                          {traveller.nationality}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {traveller.passenger_type}
                        </span>
                      </td>

                      <td className="px-4 py-4">{traveller.date_of_birth}</td>

                      <td className="px-4 py-4">{traveller.phone}</td>

                      <td className="px-4 py-4">
                        <div className="font-medium">
                          {traveller.passport_no}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {traveller.passport_issuing_country}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {traveller.passport_expire_date}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(traveller)}
                            className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => handleDelete(traveller)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {filteredTravellers.map((traveller) => (
                <div
                  key={traveller.id}
                  className="rounded-xl border bg-background p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">
                        {traveller.title} {traveller.given_name}{" "}
                        {traveller.surname}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {traveller.passenger_type} ·{" "}
                        {traveller.gender === "M" ? "Male" : "Female"}
                      </p>
                    </div>

                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {traveller.passenger_type}
                    </span>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <p>
                      <span className="font-medium">DOB:</span>{" "}
                      {traveller.date_of_birth}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {traveller.phone}
                    </p>
                    <p>
                      <span className="font-medium">Passport:</span>{" "}
                      {traveller.passport_no}
                    </p>
                    <p>
                      <span className="font-medium">Expire:</span>{" "}
                      {traveller.passport_expire_date}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(traveller)}
                      className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => handleDelete(traveller)}
                      className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MyTravelers;