import { useParams } from "react-router-dom";
import GalleryPreview from "@/components/GalleryPreview";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useGetUmrahPackDetailsQuery } from "@/redux/api/umrahApi";
import UmrahDetBanner from "./UmrahDetBanner";
import UmrahDetPackInfo from "./UmrahDetPackInfo";
import UmrahDetPackOverView from "./UmrahDetPackOverView";
import UmrahDetPackImg from "./UmrahDetPackImg";
import UmrahDetPackageServices from "./UmrahDetPackageServices";
import UmrahDetPackAcc from "./UmrahDetPackAcc";
import UmrahDetPackItinerary from "./UmrahDetPackItinerary";
import UmrahDetIncludedServices from "./UmrahDetIncludedServices";
import UmrahDetPackageSighting from "./UmrahDetPackageSighting";
import UmrahDetCancel from "./UmrahDetCancel";

const UmrahMainDetPack = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
      <UmrahDetBanner pack={pack} />
      <UmrahDetPackInfo pack={pack} />
      <UmrahDetPackOverView overview={pack.overview} />
      <UmrahDetPackImg images={pack.images} onSeeAll={handleOpenGallery} />
      <GalleryPreview
        key={galleryKey}
        gallery={galleryImages}
        open={isGalleryOpen}
        onClose={handleCloseGallery}
      />
      <UmrahDetPackageServices services={pack.package_services} />
      <UmrahDetPackAcc accommodations={pack.package_accommodations} />
      <UmrahDetPackItinerary itineraries={pack.package_itineraries} />
      <UmrahDetIncludedServices />
      <UmrahDetPackageSighting sight={pack.package_sight_seeings} />
      <UmrahDetCancel />
    </div>
  );
};

export default UmrahMainDetPack;
