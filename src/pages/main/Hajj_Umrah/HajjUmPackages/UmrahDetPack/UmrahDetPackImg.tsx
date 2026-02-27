import type { ImageItem } from "@/types/hajj/types.pack";
import { motion } from "framer-motion";

interface Props {
  images: ImageItem[];
  onSeeAll?: () => void;
}

const UmrahDetPackImg = ({ images, onSeeAll }: Props) => {
  const leftImg = images[0];
  const midTopImg = images[1];
  const midBotImg = images[2];
  const rightImg = images[3];

  return (
    <section className="px-8 lg:px-24">
      {/* overflow-hidden on the grid prevents any child from bleeding outside */}
      <div className="grid grid-cols-3 gap-4 h-160 overflow-hidden">
        {/* Column 1 — single tall image */}
        {leftImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl h-full"
          >
            <img
              src={leftImg.image_url}
              alt="Hajj"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        )}

        {/* Column 2 — two stacked images */}
        <div className="flex flex-col gap-4 h-full min-h-0">
          {midTopImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl flex-1 min-h-0"
            >
              <img
                src={midTopImg.image_url}
                alt="Hajj"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          )}
          {midBotImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl flex-1 min-h-0"
            >
              <img
                src={midBotImg.image_url}
                alt="Hajj"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          )}
        </div>

        {/* Column 3 — single tall image + See all button */}
        {rightImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl h-full group"
          >
            <img
              src={rightImg.image_url}
              alt="Hajj"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            {/* Updated Button */}
            <button
              onClick={onSeeAll}
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-hajj text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out dark:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              See all images
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UmrahDetPackImg;
