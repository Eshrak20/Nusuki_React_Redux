interface Props {
  requirements: string[];
}

const DestAdmissionRequirements = ({ requirements }: Props) => {
  return (
    <ul>
      {requirements.map((req, i) => (
        <li key={i}>{req}</li>
      ))}
    </ul>
  );
};

export default DestAdmissionRequirements;