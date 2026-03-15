interface Props {
  programs: string[];
}

const DestPopularPrograms = ({ programs }: Props) => {
  return (
    <ul>
      {programs.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  );
};

export default DestPopularPrograms;