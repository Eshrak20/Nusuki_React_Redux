import { useGetHajjPackDetailsQuery } from "@/redux/api/hajjApi";
import HajjUmDetPackAcc from "./HajjUmDetPackAcc";
import HajjUmDetPackImg from "./HajjUmDetPackImg";
import HajjUmDetPackInfo from "./HajjUmDetPackInfo";
import HajjUmDetPackItinerary from "./HajjUmDetPackItinerary";
import HajjUmDetPackOverView from "./HajjUmDetPackOverView";
import HajjUmDetBanner from "./HajjUmDetBanner";
import { useParams } from "react-router-dom";
import GalleryPreview from "@/components/GalleryPreview";
import { useState, useMemo, useCallback } from "react";
import HajjUmDetCancel from "./HajjUmDetCancel";
import HajjUmDetPackageServices from "./HajjUmDetPackageServices";
import HajjUmDetPackageSighting from "./HajjUmDetPackageSighting";
import HajjUmDetIncludedServices from "./HajjUmDetIncludedServices";

const HajjUmMainDetPack = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);

  const handleOpenGallery = useCallback(() => {
    setIsGalleryOpen(true);
    // Increment key to force GalleryPreview to remount with fresh state
    setGalleryKey((prev) => prev + 1);
  }, []);
  const { id } = useParams();

  const { data, isLoading, isError } = useGetHajjPackDetailsQuery(Number(id));

  const galleryImages = useMemo(
    () => data?.data?.images?.map((img) => img.image_url) ?? [],
    [data],
  );

  const handleCloseGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  // Handle loading/error states with conditional rendering, not early returns
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.data) {
    return <div>No Data Found</div>;
  }

  const pack = data.data;
  // console.log(pack.package_services)

  return (
    <div className="space-y-10">
      <HajjUmDetBanner pack={pack} />
      <HajjUmDetPackInfo pack={pack} />
      <HajjUmDetPackOverView overview={pack.overview} />
      <HajjUmDetPackImg images={pack.images} onSeeAll={handleOpenGallery} />
      <GalleryPreview
        key={galleryKey}
        gallery={galleryImages}
        open={isGalleryOpen}
        onClose={handleCloseGallery}
      />
      <HajjUmDetPackageServices services={pack.package_services} />
      <HajjUmDetPackAcc accommodations={pack.package_accommodations} />
      <HajjUmDetPackItinerary itineraries={pack.package_itineraries} />
      <HajjUmDetIncludedServices />
      <HajjUmDetPackageSighting sight={pack.package_sight_seeings}/>
      <HajjUmDetCancel />
    </div>
  );
};

export default HajjUmMainDetPack;
