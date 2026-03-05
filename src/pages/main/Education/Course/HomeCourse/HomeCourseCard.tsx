import type { Course } from "@/types/education/type.course";

interface HomeCourseCardProps {
    courses: Course[];
}

const HomeCourseCard = ({ courses }: HomeCourseCardProps) => {
    console.log(courses);

    return (
        <div>

        </div>
    );
};

export default HomeCourseCard;