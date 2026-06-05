import type React from "react";

type DashboardPageHeaderProps = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badgeTitle?: string;
  badgeText?: string;
  imageUrl?: string | null;
};

const DashboardPageHeader = ({
  title,
  subtitle,
  icon: Icon,
  imageUrl,
}: DashboardPageHeaderProps) => {
  return (
    <div className="overflow-hidden rounded-sm -mt-6 border bg-card shadow-sm">
      <div className="relative bg-primary px-5 py-8 text-primary-foreground sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%)]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm border border-primary-foreground/20 bg-primary-foreground/10">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon className="h-8 w-8" />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                {subtitle}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPageHeader;