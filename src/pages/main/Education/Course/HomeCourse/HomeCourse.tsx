import { useGetCoursesQuery } from "@/redux/api/educationApi/courseApi";
import HomeCourseCard from "./HomeCourseCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import EduPagination from "@/components/education/EduPagination";
import { setPageCourse } from "@/redux/features/courseFilterSlice";
import EduSearch from "@/components/education/EduSearch";
import EduFilter from "@/components/education/EduFilter"


const HomeCourse = () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    const dispatch = useDispatch();
    const { keyword, study_level, page } = useSelector(
        (state: RootState) => state.courseFilter,
    );

    const { data, isLoading } = useGetCoursesQuery({
        page,
        study_level,
        keyword,
    });

    const courses = data?.data?.data ?? [];
    const pagination = data?.data;
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between my-9 gap-6 md:gap-10 pl-2">
                {/* Showing Results */}
                <p className="text-foreground/80 text-sm font-medium order-3 md:order-1 whitespace-nowrap mr-auto">
                    Showing Results in : {" "}
                    <span className="text-foreground font-semibold">{study_level || "All Degrees"}</span>
                </p>

                {/* First Search Bar */}
                <div className="w-full md:w-1/2 order-1 md:order-2">
                    <EduSearch placeholder="courses" />
                </div>

                {/* Second Search Bar */}
                <div className="w-full md:w-1/4 order-2 md:order-3">
                    <EduFilter />
                </div>
            </div>
            {isLoading ? (
                // <HomeInstitutionCardSkeleton /> 
                <p>
                    Loading.......
                </p>
            ) : courses.length > 0 ? (
                <HomeCourseCard courses={courses} />
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    No courses found matching your criteria.
                </div>
            )}

            {pagination && (
                <EduPagination
                    pagination={{
                        current_page: pagination.current_page,
                        last_page: pagination.last_page,
                    }}
                    onPageChange={(newPage: number) => dispatch(setPageCourse(newPage))}
                />
            )}
        </div>
    );
};

export default HomeCourse;