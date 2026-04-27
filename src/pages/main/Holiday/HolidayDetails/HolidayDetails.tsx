import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGetTourPackageDetailsQuery } from "@/redux/api/holidayApi/holidayApi";

const HolidayDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetTourPackageDetailsQuery(id!, {
    skip: !id,
  });

  const details = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading holiday details...
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load holiday details.
      </div>
    );
  }

  return (
    <section className="mx-auto mt-44 max-w-7xl px-4 py-8">
      <div className="border bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-foreground">
          {details.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {details.city_name}, {details.country_name}
        </p>

        {details.address && (
          <p className="mt-4 text-sm text-muted-foreground">
            {details.address}
          </p>
        )}
      </div>
    </section>
  );
};

export default HolidayDetails;