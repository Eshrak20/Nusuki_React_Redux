import type { ImageItem } from "@/types/hajj/types.pack";
import { motion } from "framer-motion";


interface Props {
  images: ImageItem[];
}

const HajjUmDetPackImg = ({ images }: Props) => {
  return (
    <section className="pb-32 px-8 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.slice(1, 5).map((img, idx) => (
                <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`overflow-hidden ${idx % 2 !== 0 ? 'mt-12' : ''}`}
                >
                    <img src={img.image_url} className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700" alt="Hajj" />
                </motion.div>
            ))}
        </div>
      </section>
  );
};

export default HajjUmDetPackImg;