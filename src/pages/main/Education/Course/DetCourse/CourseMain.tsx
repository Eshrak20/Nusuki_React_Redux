import CourseDescription from "./CourseDescription";
import CourseEntryRequirements from "./CourseEntryRequirements";
import CourseFees from "./CourseFees";
import CourseHeader from "./CourseHeader";
import CourseIntakes from "./CourseIntakes";
import CourseMajors from "./CourseMajors";
import CourseOverview from "./CourseOverview";
import CourseProvider from "./CourseProvider";
import UniversityRanking from "./UniversityRanking";

const CourseMain = () => {
    return (
        <div>
            <CourseHeader/>
            <CourseOverview/>
            <CourseDescription/>
            <CourseMajors/>
            <CourseFees/>
            <CourseIntakes/>
            <CourseEntryRequirements/>
            <UniversityRanking/>
            <CourseProvider/>
        </div>
    );
};

export default CourseMain;