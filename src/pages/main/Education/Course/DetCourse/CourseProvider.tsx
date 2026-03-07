import type { Provider } from "@/types/education/type.course";

interface CourseProviderProps {
  provider: Provider;
}

const CourseProvider = ({ provider }: CourseProviderProps) => {
  return (
    <div className="border p-4 rounded-lg mt-4 flex gap-3 items-center">
      <img src={provider.logo} className="w-10 h-10" />

      <div>
        <h2 className="font-semibold">{provider.name}</h2>

        <a
          href={provider.url}
          target="_blank"
          className="text-blue-500 text-sm"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default CourseProvider;