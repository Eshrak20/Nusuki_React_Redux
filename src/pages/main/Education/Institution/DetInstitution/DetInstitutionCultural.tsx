import type { DetInstitutionCulturalProps } from "@/types/education/type.uniDet";

const DetInstitutionCultural = ({ culture }: DetInstitutionCulturalProps) => {
  const videos = culture?.medias.filter((media) => media.videoUrl);
  const images = culture?.medias.filter((media) => !media.videoUrl && media.desktopImage);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{culture?.title}</h2>

        {videos?.length ? (
          <div>
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Campus Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos?.map((video) => (
                  <div key={video.id} className="aspect-video">
                    <iframe
                      src={video.videoUrl!}
                      title="Campus Video"
                      className="w-full h-full rounded-lg shadow-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}



        {/* Images Gallery */}

        {images?.length ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Campus Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images?.map((image) => (
                <div
                  key={image.id}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={image.desktopImage?.url || image.mobileImage?.url}
                    alt={image.desktopImage?.alternativeText || "Campus life"}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DetInstitutionCultural;