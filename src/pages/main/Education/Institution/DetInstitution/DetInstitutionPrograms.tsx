import type { TopCourseCategory } from "@/types/education/type.uniDet";

interface Props {
  programs?: TopCourseCategory[];
}

const DetInstitutionPrograms = ({ programs }: Props) => {
  return (
    <section className="max-w-6xl mx-auto px-4">
      {programs?.map((category) => (
        <div key={category.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{category.name}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {category.cardDetail?.map((course) => (
              <div key={course.id} className="border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">{course.courseName}</h3>
                <p>{course.title1} - {course.subTitle1}</p>
                <p>{course.title2} - {course.subTitle2}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default DetInstitutionPrograms;