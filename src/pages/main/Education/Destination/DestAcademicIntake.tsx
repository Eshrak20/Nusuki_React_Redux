import type { AcademicIntake } from "@/types/education/type.country";

interface Props {
  intake: AcademicIntake;
}

const DestAcademicIntake = ({ intake }: Props) => {
  return (
    <section>
      <h2>{intake.title}</h2>
      <p>{intake.description}</p>
    </section>
  );
};

export default DestAcademicIntake;