import { useGetUniversitiesQuery } from "@/redux/api/educationApi/universityApi";
import HomeInstitutionCard from "./HomeInstitutionCard";
import HomeInstitutionFilter from "./HomeInstitutionFilter";

const HomeInstitution = () => {
  const { data } = useGetUniversitiesQuery({page: 1,search: "",country: "",});
  console.log(data);

  return (
    <div>
        <div className="mt-44">
            Tor matha
        </div>
      <HomeInstitutionFilter />
      <HomeInstitutionCard />
    </div>
  );
};

export default HomeInstitution;
