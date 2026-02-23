import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, MapPin, BadgeCheck, Building2, Star, Quote, ArrowRight 
} from "lucide-react";
import type { HajjPackageDetails } from "@/types/hajj/types.pack";

interface Props {
  pack: HajjPackageDetails;
}

const HajjUmDetPackInfo = ({ pack }: Props) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-[#FAF9F6] overflow-x-hidden font-sans">
      
      {/* --- SECTION 1: HERO (Using cardImage) --- */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row w-full items-center gap-12 lg:gap-0">
          
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[65%] h-[60vh] lg:h-[90vh] relative z-10"
          >
            <img
              src={pack.card_image}
              alt={pack.name}
              className="w-full h-full object-cover shadow-2xl"
            />
            <div className="absolute inset-0 bg-black/5"></div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-[45%] px-8 lg:px-20 lg:-ml-[10%] z-20 bg-[#FAF9F6]/95 backdrop-blur-md py-16 shadow-2xl lg:shadow-none"
          >
            <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-amber-600 block mb-6">
              Exclusive Pilgrimage
            </span>
            <h1 className="text-5xl md:text-8xl font-serif leading-[0.9] mb-8 text-slate-900">
              {pack.name.split(' ')[0]} <br />
              <span className="italic font-light text-slate-400">
                {pack.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-md">
              {pack.tagline || "A journey of a lifetime, meticulously planned for your spiritual peace and physical comfort."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: THE SPECS & SECONDARY GALLERY --- */}
      <section className="w-full py-32 px-8 lg:px-24">
        <div className="flex flex-col lg:flex-row-reverse items-start gap-20">
          
          {/* STAGGERED IMAGE BOX (Using the first image from the images array) */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] space-y-8"
          >
            <div className="relative group overflow-hidden">
                <img 
                src={pack.images[0]?.image_url || pack.card_image} 
                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl"
                alt="Detail"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 p-4 text-[10px] tracking-widest uppercase font-bold">
                    View Gallery
                </div>
            </div>
          </motion.div>

          {/* SPEC GRID */}
          <div className="w-full lg:w-[55%]">
             <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20"
            >
              <DetailBox icon={<Building2 size={20}/>} label="AGENCY" value={pack.company_name} />
              <DetailBox icon={<Calendar size={20}/>} label="JOURNEY DATE" value={pack.date} />
              <DetailBox icon={<BadgeCheck size={20}/>} label="CATEGORY" value={pack.package_type} />
              <DetailBox icon={<MapPin size={20}/>} label="LOCATION" value="Makkah / Madinah" />
              
              <div className="md:col-span-2 pt-10">
                <p className="text-slate-400 flex items-center gap-2 mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">
                    <Quote size={14} /> The Experience
                </p>
                <p className="text-2xl text-slate-700 italic font-serif leading-snug">
                    "This package covers all logistics, from visa processing to luxury accommodation near the Haram, ensuring your focus remains solely on your Ibadah."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: MULTI-IMAGE GALLERY (The rest of the images) --- */}
      <section className="pb-32 px-8 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pack.images.slice(1, 5).map((img, idx) => (
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

      {/* --- SECTION 4: FULL WIDTH PRICING --- */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="w-full px-8 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-4">
            <BigStat number={pack.price} label="TOTAL INVESTMENT" />
            <BigStat number={pack.per_person_price} label="PER PILGRIM" />
            <div className="lg:col-span-2 flex items-center justify-end">
                <button className="group flex items-center gap-6 bg-amber-600 hover:bg-amber-500 text-white px-10 py-6 transition-all">
                    <span className="text-xl font-light tracking-widest uppercase">Inquire Now</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- SHARED SUB-COMPONENTS --- */

const DetailBox = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="group">
    <div className="flex items-center gap-3 text-amber-700/50 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
      {icon}
      {label}
    </div>
    <p className="text-4xl font-light text-slate-800 tracking-tighter border-b border-slate-200 pb-6 group-hover:border-amber-500 transition-colors duration-500">
      {value}
    </p>
  </div>
);

const BigStat = ({ number, label }: { number: string, label: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="border-l border-slate-700 pl-8"
  >
    <span className="text-5xl md:text-6xl font-serif block mb-2 text-white">{number}</span>
    <span className="text-[10px] tracking-[0.5em] font-bold text-slate-500 uppercase">
      {label}
    </span>
  </motion.div>
);

export default HajjUmDetPackInfo;