import { Skeleton } from "@/components/ui/skeleton";

const FormSubmissionSkeleton = () => {
  return (
    <div className="relative py-16 px-4">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/80 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,61,51,0.1)] grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sidebar Skeleton */}
        <div className="lg:col-span-4 bg-hajj p-10 lg:p-12 flex flex-col justify-between relative space-y-6">
          <Skeleton className="h-6 w-2/5 rounded-full" />{" "}
          {/* Professional Support badge */}
          <Skeleton className="h-10 w-3/4 rounded-md" /> {/* Heading */}
          <ul className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <li key={idx} className="flex gap-4 items-center">
                  <Skeleton className="h-8 w-8 rounded-full" /> {/* Icon */}
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-3/4 rounded-md" /> {/* Title */}
                    <Skeleton className="h-3 w-5/6 rounded-md" />{" "}
                    {/* Description */}
                  </div>
                </li>
              ))}
          </ul>
          <div className="mt-12 pt-8 border-t border-white/10">
            <Skeleton className="h-4 w-full rounded-md" /> {/* Footer quote */}
          </div>
        </div>

        {/* Right Form Skeleton */}
        <div className="lg:col-span-8 p-8 md:p-14 space-y-8">
          {/* Header */}
          <Skeleton className="h-8 w-2/5 rounded-md mb-3" />
          <Skeleton className="h-1.5 w-20 rounded-full mb-8" />

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name Field */}
              <Skeleton className="md:col-span-2 h-14 w-full rounded-2xl" />
              {/* Email Field */}
              <Skeleton className="h-14 w-full rounded-2xl" />
              {/* Phone Field */}
              <Skeleton className="h-14 w-full rounded-2xl" />
              {/* Subject Field */}
              <Skeleton className="md:col-span-2 h-14 w-full rounded-2xl" />
              {/* Message Field */}
              <Skeleton className="md:col-span-2 h-40 w-full rounded-2xl" />
            </div>

            {/* Footer / Submit Button */}
            <div className="flex items-center justify-between gap-6 pt-6">
              <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Privacy text */}
              <Skeleton className="h-16 w-48 rounded-4xl" />{" "}
              {/* Submit button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionSkeleton;
