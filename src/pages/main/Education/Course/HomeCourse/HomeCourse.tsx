import { useGetCoursesQuery } from "@/redux/api/educationApi/courseApi";
import HomeCourseCard from "./HomeCourseCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import EduPagination from "@/components/education/EduPagination";
import { setPage } from "@/redux/features/courseFilterSlice";
import EduSearch from "@/components/education/EduSearch";


const HomeCourse = () => {

    const dispatch = useDispatch();
    const { keyword, page } = useSelector(
        (state: RootState) => state.courseFilter,
    );

    const { data, isLoading } = useGetCoursesQuery({
        page,
        keyword,
    });

    const courses = data?.data?.data ?? [];
    const pagination = data?.data;
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mt-10 lg:mt-20">
                <EduSearch placeholder ="courses" />
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
                    onPageChange={(newPage: number) => dispatch(setPage(newPage))}
                />
            )}
        </div>
    );
};

export default HomeCourse;