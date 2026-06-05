"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Hotel, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetHotelDetailMutation } from "@/redux/api/hotelApi/hotelApi";

import HotelDetailsHero from "./HotelDetailsHero";
import HotelStaySummary from "./HotelStaySummary";
import HotelDescriptionSection from "./HotelDescriptionSection";
import HotelAmenitiesSection from "./HotelAmenitiesSection";
import HotelRoomsSection from "./HotelRoomsSection";
import HotelContactCard from "./HotelContactCard";

const HotelDetails = () => {
  const navigate = useNavigate();

  const { search_id: searchId, hotel_id: hotelId } = useParams<{
    search_id: string;
    hotel_id: string;
  }>();

  const [getHotelDetail, { data, isLoading, isError }] =
    useGetHotelDetailMutation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchId, hotelId]);

  useEffect(() => {
    if (!searchId || !hotelId) return;

    getHotelDetail({
      search_id: searchId,
      hotel_id: hotelId,
    });
  }, [searchId, hotelId, getHotelDetail]);

  const detail = data?.data;
  const hotel = detail?.hotel;
  const stay = detail?.stay;
  const rooms = detail?.rooms ?? [];

  if (!searchId || !hotelId) {
    return (
      <PageShell>
        <EmptyState
          icon={<AlertCircle className="size-6" />}
          title="Missing hotel information"
          description="Search ID or Hotel ID was not found."
          actionLabel="Go Back"
          onAction={() => navigate(-1)}
        />
      </PageShell>
    );
  }

  if (isLoading) {
    return (
      <PageShell center>
        <LoadingCard />
      </PageShell>
    );
  }

  if (isError || !hotel) {
    return (
      <PageShell>
        <EmptyState
          icon={<Hotel className="size-6" />}
          title="Hotel details not found"
          description="Please go back and try again."
          actionLabel="Go Back"
          onAction={() => navigate(-1)}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl space-y-5 pt-20 sm:pt-24"
      >
        <HotelDetailsHero hotel={hotel} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_330px]">
          <div className="space-y-5">
            <HotelStaySummary stay={stay} />
            <HotelDescriptionSection descriptions={hotel.descriptions} />
            <HotelAmenitiesSection amenities={hotel.amenities} />
            <HotelRoomsSection
              rooms={rooms || []}
              stay={stay}
              searchId={detail?.search_id}
            />
          </div>

          <div className="min-w-0 space-y-5">
            <HotelContactCard hotel={hotel} />
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
};

export default HotelDetails;

const PageShell = ({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) => {
  return (
    <main
      className={
        center
          ? "flex min-h-screen items-center justify-center bg-background px-3 py-6 text-foreground sm:px-5 lg:px-8"
          : "min-h-screen bg-background px-3 py-6 text-foreground sm:px-5 lg:px-8"
      }
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,--theme(--color-primary/0.08),transparent_34%),radial-gradient(circle_at_bottom_right,--theme(--color-muted/0.35),transparent_30%)]" />

      {children}
    </main>
  );
};

const LoadingCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-3 rounded-sm border border-border bg-card px-6 py-4 text-card-foreground shadow-sm"
    >
      <div className="flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
        <Loader2 className="size-5 animate-spin" />
      </div>

      <div>
        <p className="text-sm font-bold text-foreground">
          Loading hotel details...
        </p>
        <p className="text-xs text-muted-foreground">
          Please wait while we prepare the latest hotel information.
        </p>
      </div>
    </motion.div>
  );
};

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="mx-auto w-full max-w-xl rounded-sm border border-border bg-card p-6 text-center text-card-foreground shadow-sm sm:p-8"
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-sm bg-primary/10 text-primary">
          {icon}
        </div>

        <h2 className="mt-5 text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
        >
          <ArrowLeft className="size-4" />
          {actionLabel}
        </button>
      </motion.div>
    </div>
  );
};