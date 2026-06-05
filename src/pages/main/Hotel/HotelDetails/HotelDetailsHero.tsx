"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Star } from "lucide-react";

type HotelImage = {
  url?: string;
};

type HotelDetailsHeroHotel = {
  hotel_code?: string;
  name?: string;
  logo?: string | null;
  star_rating?: number | string | null;

  address?: {
    full_address?: string | null;
  } | null;

  images?: Array<string | HotelImage> | null;

  chain?: {
    name?: string | null;
  } | null;

  brand?: {
    name?: string | null;
  } | null;

  property_type?: {
    name?: string | null;
  } | null;

  property_quality?: {
    name?: string | null;
  } | null;

  property_info?: {
    rooms?: string | number | null;
  } | null;
};

type HotelDetailsHeroProps = {
  hotel?: HotelDetailsHeroHotel | null;
};

const HotelDetailsHero = ({ hotel }: HotelDetailsHeroProps) => {
  const address = hotel?.address?.full_address || "Address not available";
  const image = getHotelImage(hotel);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
        <div className="relative h-64 bg-muted lg:h-full">
          {image ? (
            <img
              src={image}
              alt={hotel?.name || "Hotel image"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/60">
              <Building2 className="size-16 text-muted-foreground" />
            </div>
          )}

          {hotel?.star_rating ? (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur">
              <Star className="size-3.5 fill-primary text-primary" />
              {hotel.star_rating} Star
            </div>
          ) : null}
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            {hotel?.chain?.name ? (
              <Badge>{hotel.chain.name}</Badge>
            ) : null}

            {hotel?.property_type?.name ? (
              <Badge variant="muted">{hotel.property_type.name}</Badge>
            ) : null}
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {hotel?.name || "Hotel Name"}
          </h1>

          <div className="mt-3 flex gap-2 text-sm leading-6 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{address}</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoBox label="Hotel Code" value={hotel?.hotel_code || "N/A"} />
            <InfoBox label="Brand" value={hotel?.brand?.name || "N/A"} />
            <InfoBox
              label="Quality"
              value={hotel?.property_quality?.name || "N/A"}
            />
            <InfoBox
              label="Rooms"
              value={formatValue(hotel?.property_info?.rooms)}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HotelDetailsHero;

const InfoBox = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="rounded-sm border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/60">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-foreground">
        {value}
      </p>
    </div>
  );
};

const Badge = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "muted";
}) => {
  return (
    <span
      className={
        variant === "primary"
          ? "rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          : "rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
      }
    >
      {children}
    </span>
  );
};

const getHotelImage = (hotel?: HotelDetailsHeroHotel | null) => {
  const firstImage = hotel?.images?.[0];

  if (typeof firstImage === "string") {
    return firstImage;
  }

  if (firstImage?.url) {
    return firstImage.url;
  }

  return hotel?.logo || "";
};

const formatValue = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return value;
};