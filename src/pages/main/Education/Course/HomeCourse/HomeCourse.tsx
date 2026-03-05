import { useGetCoursesQuery } from "@/redux/api/educationApi/courseApi";
import HomeCourseCard from "./HomeCourseCard";


const HomeCourse = () => {

    const { data, isLoading } = useGetCoursesQuery();
    
    const courses = data?.data?.data ?? [];

    return (
        <div className="">
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
        </div>
    );
};

export default HomeCourse;