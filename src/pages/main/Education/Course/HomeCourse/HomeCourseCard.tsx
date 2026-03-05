import type { Course } from "@/types/education/type.course";

interface HomeCourseCardProps {
    courses: Course[];
}

const HomeCourseCard = ({ courses }: HomeCourseCardProps) => {

    return (
        <div>
            {courses?.length}
        </div>
    );
};

export default HomeCourseCard;