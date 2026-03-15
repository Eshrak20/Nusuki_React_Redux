import type { StudyCost } from "@/types/education/type.country";

interface Props {
  cost: StudyCost;
}

const DestStudyCost = ({ cost }: Props) => {
  return <h2>{cost.title}</h2>;
};

export default DestStudyCost;