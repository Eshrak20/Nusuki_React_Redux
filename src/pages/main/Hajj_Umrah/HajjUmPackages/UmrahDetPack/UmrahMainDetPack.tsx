
import HajjUmDetPackAcc from "./UmrahDetPackAcc";
import HajjUmDetPackImg from "./UmrahDetPackImg";
import HajjUmDetPackInfo from "./UmrahDetPackInfo";
import HajjUmDetPackItinerary from "./UmrahDetPackItinerary";
import HajjUmDetPackOverView from "./UmrahDetPackOverView";
import HajjUmDetBanner from "./UmrahDetBanner";
import { useParams } from "react-router-dom";
import GalleryPreview from "@/components/GalleryPreview";
import { useState, useMemo, useCallback } from "react";
import HajjUmDetCancel from "./UmrahDetCancel";
import HajjUmDetPackageServices from "./UmrahDetPackageServices";
import HajjUmDetPackageSighting from "./UmrahDetPackageSighting";
import HajjUmDetIncludedServices from "./UmrahDetIncludedServices";
import { useGetUmrahPackDetailsQuery } from "@/redux/api/umrahApi";

const UmrahMainDetPack = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);

  const handleOpenGallery = useCallback(() => {
    setIsGalleryOpen(true);
    // Increment key to force GalleryPreview to remount with fresh state
    setGalleryKey((prev) => prev + 1);
  }, []);
  const { id } = useParams();

  const { data, isLoading, isError } = useGetUmrahPackDetailsQuery(Number(id));

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

export default UmrahMainDetPack;
