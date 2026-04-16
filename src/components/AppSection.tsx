import { motion } from "framer-motion";
import appImage from "@/assets/Images/app.webp"; // Using this as the main phone content
import appStore from "@/assets/Images/App-Store.svg";
import qrImage from "@/assets/Images/qrImage.webp";

const playsoteImage =
  "https://cdn.sharetrip.net/sharetrip_net/production/public/images/sample-images/Play-Store.svg";

const AppSection = () => {
  return (
    <section className="relative pt-20 pb-0 max-w-7xl mx-auto overflow-hidden bg-white dark:bg-gray-950">
      <div className="px-4 text-center">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-2"
        >
          <h2 className="text-3xl md:text-5xl font-black text-primary dark:text-white">
            Your all-in-one Travel App
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-7 text-sm md:text-base leading-relaxed">
            Get flights, hotels, holidays and visa assistance in just a few
            taps. Enjoy real-time flight updates, schedules, travel info, play
            games, win trip coins and much more.
          </p>
        </motion.div>

        {/* Store Links & QR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12 lg:mb-16"
        >
          <a href="#" className="hover:scale-105 transition-transform">
            <img src={appStore} alt="App Store" className="h-12 w-auto" />
          </a>

          <div className="hidden md:block p-2 bg-white rounded-xl shadow-lg border border-gray-100">
            <img src={qrImage} alt="QR Code" className="w-16 h-16" />
          </div>

          <a href="#" className="hover:scale-105 transition-transform">
            <img src={playsoteImage} alt="Play Store" className="h-12 w-auto" />
          </a>
        </motion.div>
      </div>
      <div className="relative w-full">
        {/* App Image */}
        <img
          src={appImage}
          alt="appImage"
          className="w-full h-auto object-cover"
        />

        {/* Overlay Gradient */}
        <div
          className="absolute hidden lg:block inset-x-0 bottom-0 h-40 
    bg-linear-to-t 
    from-white dark:from-gray-950 
    via-white/70 dark:via-gray-950/70 
    to-transparent"
        ></div>
      </div>
    </section>
  );
};

export default AppSection;
