import type { ReqListProps } from "../../../../../types/hajj/types.visa";

const ReqList = ({ title, requirements, note }: ReqListProps) => {
  return (
    <div className="max-w-4xl space-y-10">
      {/* Header Section */}
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-hajj lg:text-4xl">
          {title}
        </h2>
        <div className="h-1.5 w-20 rounded-full bg-hajj" />
      </header>

      {/* Requirements List */}
      <div className="grid grid-cols-2 gap-8">
        {requirements.map((item) => (
          <div key={item.id} className="group relative flex items-start gap-4">
            {/* Visual Bullet Point */}
            <div className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hajj/10 text-hajj group-hover:bg-hajj group-hover:text-white transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h4 className="text-lg font-bold leading-none text-foreground">
                {item.title}
              </h4>
              <p className="text-[15px] leading-relaxed text-muted-foreground/90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Note Box */}
      {note && (
        <div className="relative mt-12 overflow-hidden rounded-xl border border-hajj/20 bg-muted/30 p-6">
          <div className="absolute top-0 left-0 h-full w-1 bg-hajj" />
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-hajj shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div className="space-y-1">
              <span className="text-sm font-bold uppercase tracking-wider text-hajj">
                Important Note
              </span>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {note}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReqList;
