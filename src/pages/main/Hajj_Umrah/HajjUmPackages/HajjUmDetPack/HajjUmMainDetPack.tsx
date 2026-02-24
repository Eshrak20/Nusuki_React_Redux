import { useGetHajjPackDetailsQuery } from "@/redux/api/hajjApi";
import HajjUmDetPackAcc from "./HajjUmDetPackAcc";
import HajjUmDetPackImg from "./HajjUmDetPackImg";
import HajjUmDetPackInfo from "./HajjUmDetPackInfo";
import HajjUmDetPackItinerary from "./HajjUmDetPackItinerary";
import HajjUmDetPackOverView from "./HajjUmDetPackOverView";
import HajjUmDetBanner from "./HajjUmDetBanner";
import { useParams } from "react-router-dom";
import GalleryPreview from "@/components/GalleryPreview";
import { useState } from "react";

const HajjUmMainDetPack = () => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { id } = useParams();

  // window.scrollTo({
  //   top: 0,
  //   behavior: "smooth",
  // });
  const { data, isLoading, isError } = useGetHajjPackDetailsQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data) return <div>No Data Found</div>;

  const pack = data.data;

  const galleryImages = pack.images.map(img => img.image_url);
  


  const handleOpenGallery = () => {
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };
  return (
    <div className="space-y-10">
      <HajjUmDetBanner pack={pack} />
      <HajjUmDetPackInfo pack={pack} />
      <HajjUmDetPackOverView overview={pack.overview} />
      <HajjUmDetPackImg images={pack.images} onSeeAll={handleOpenGallery} />
       <GalleryPreview 
        gallery={galleryImages} 
        open={isGalleryOpen} 
        onClose={handleCloseGallery} 
      />
      <HajjUmDetPackItinerary itineraries={pack.package_itineraries} />
      <HajjUmDetPackAcc accommodations={pack.package_accommodations} />
    </div>
  );
};

export default HajjUmMainDetPack;
