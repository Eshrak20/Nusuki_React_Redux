import type { ProgramsDuration } from "@/types/education/type.country";

interface Props {
  programs: ProgramsDuration;
}

const DestProgramsDuration = ({ programs }: Props) => {
  return (
    <section>
      <h2>{programs.title}</h2>
    </section>
  );
};

export default DestProgramsDuration;