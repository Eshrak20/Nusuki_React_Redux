import type { ImageItem } from "@/types/hajj/types.pack";

interface Props {
  cardImage: string;
  images: ImageItem[];
}

const HajjUmDetPackImg = ({ cardImage, images }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Package Images
      </h3>

      <img
        src={cardImage}
        alt="Card"
        className="w-full max-w-md mb-4 rounded-lg"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.image_url}
            alt="Package"
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default HajjUmDetPackImg;