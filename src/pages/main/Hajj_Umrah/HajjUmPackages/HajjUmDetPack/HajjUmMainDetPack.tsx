import { useGetHajjPackDetailsQuery } from "@/redux/api/hajjApi";
import HajjUmDetPackAcc from "./HajjUmDetPackAcc";
import HajjUmDetPackImg from "./HajjUmDetPackImg";
import HajjUmDetPackInfo from "./HajjUmDetPackInfo";
import HajjUmDetPackItinerary from "./HajjUmDetPackItinerary";
import HajjUmDetPackOverView from "./HajjUmDetPackOverView";
import HajjUmDetBanner from "./HajjUmDetBanner";

const HajjUmMainDetPack = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const { data, isLoading, isError } =
    useGetHajjPackDetailsQuery(5);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data) return <div>No Data Found</div>;

  const pack = data.data;
  return (
    <div className="space-y-10">
      <HajjUmDetBanner pack={pack} />
      <HajjUmDetPackInfo pack={pack} />
      <HajjUmDetPackOverView overview={pack.overview} />
      <HajjUmDetPackImg
        cardImage={pack.card_image}
        images={pack.images}
      />
      <HajjUmDetPackItinerary
        itineraries={pack.package_itineraries}
      />
      <HajjUmDetPackAcc
        accommodations={pack.package_accommodations}
      />
    </div>
  );
};

export default HajjUmMainDetPack;