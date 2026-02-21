import { useDispatch } from "react-redux";
import { setPage } from "@/redux/features/universityFilterSlice";

const EduPagination = ({ pagination }) => {
  const dispatch = useDispatch();

  if (!pagination) return null;

  const { current_page, last_page } = pagination;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= last_page) {
      dispatch(setPage(page));
    }
  };

  const pages = Array.from({ length: last_page }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button onClick={() => handlePageChange(current_page - 1)} disabled={current_page === 1}>
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={p === current_page ? "font-bold underline" : ""}
        >
          {p}
        </button>
      ))}

      <button onClick={() => handlePageChange(current_page + 1)} disabled={current_page === last_page}>
        Next
      </button>
    </div>
  );
};

export default EduPagination;