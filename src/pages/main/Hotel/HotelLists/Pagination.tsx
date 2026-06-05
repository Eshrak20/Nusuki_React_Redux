import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({ page, totalPages, onPrev, onNext }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <p className="text-sm font-semibold text-slate-500">
        Page <span className="text-[#13275f]">{page}</span> of{" "}
        <span className="text-[#13275f]">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="inline-flex h-10 items-center gap-2 rounded-sm border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="inline-flex h-10 items-center gap-2 rounded-sm bg-[#13275f] px-4 text-sm font-bold text-white transition hover:bg-[#0f1f4c] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;