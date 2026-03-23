import type { TestPreparation } from "@/types/education/type.tests";

interface HomeTestCardProps {
  tests: TestPreparation[];
}

const HomeTestCard = ({tests}: HomeTestCardProps) => {
    return (
        <div>
            {tests.length} tests found.
        </div>
    );
};

export default HomeTestCard;