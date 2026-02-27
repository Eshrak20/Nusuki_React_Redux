import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { DetInstitutionCulturalProps } from "@/types/education/type.uniDet";
import { Typewriter } from "@/components/Typewriter";

const DetInstitutionCultural = ({ culture }: DetInstitutionCulturalProps) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos = culture?.medias.filter((media) => media.videoUrl) || [];

  // Filter out any images that contain the background pattern
  const images = culture?.medias.filter((media) => {
    if (media.videoUrl) return false;

    // Check if either desktop or mobile image URL contains the pattern
    const desktopUrl = media.desktopImage?.url || '';
    const mobileUrl = media.mobileImage?.url || '';

    // Return false (filter out) if either URL contains the pattern
    return !desktopUrl.includes('gallery_Bg_Image_ce22c64c25_8de67b5015_e84e5173bd.png') &&
      !mobileUrl.includes('gallery_Bg_Image_ce22c64c25_8de67b5015_e84e5173bd.png') &&
      !desktopUrl.includes('thumbnail_gallery_Bg_Image_ce22c64c25_8de67b5015_e84e5173bd.png') &&
      !mobileUrl.includes('thumbnail_gallery_Bg_Image_ce22c64c25_8de67b5015_e84e5173bd.png') &&
      media.desktopImage; // Also ensure desktopImage exists
  }) || [];

  // Helper to extract YouTube ID for thumbnails
  const getYouTubeId = (url: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Convert YouTube URL to embed URL with autoplay
  const getEmbedUrl = (url: string) => {
    const ytId = getYouTubeId(url);
    if (!ytId) return url;
    return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3`;
  };

  return (
    <section className="pt-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 text-center">
          <div className="inline-block">
            <Typewriter
              text={culture?.title || "Cultural Section of University"}
              className="text-3xl font-bold tracking-tight sm:text-4xl text-center"
              textClassName="text-foreground dark:text-foreground"
            />
            <div className="h-1 w-full mt-2 bg-primary rounded-full" />
          </div>
        </div>

        {/* --- VIDEO SECTION --- */}
        {videos.length > 0 && (
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
              Campus Experience
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => {
                const ytId = getYouTubeId(video.videoUrl!);
                const isActive = activeVideo === video.id;

                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black group"
                  >
                    {!isActive ? (
                      /* --- CUSTOM THUMBNAIL --- */
                      <>
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img
                            src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                        </div>

                        {/* Play Button - Clicking this will load and PLAY the video automatically */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.button
                            onClick={() => setActiveVideo(video.id)}
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <div className="absolute inset-0 rounded-full dark:bg-primary bg-primary/20 animate-ping" />
                            <div className="relative w-20 h-20 dark:bg-[#29308f] bg-primary rounded-full flex items-center justify-center shadow-2xl">
                              <Play className="w-8 h-8 text-white ml-1" fill="white" />
                            </div>
                          </motion.button>
                          <p className="mt-4 text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Watch Campus Tour
                          </p>
                        </div>
                      </>
                    ) : (
                      /* --- VIDEO PLAYER - AUTOPLAYS AUTOMATICALLY --- */
                      <iframe
                        src={getEmbedUrl(video.videoUrl!)}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- GALLERY SECTION --- */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">02</span>
              Photo Gallery
            </h3>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedImageIdx(idx)}
                  className="relative cursor-zoom-in overflow-hidden rounded-xl break-inside-avoid shadow-md hover:shadow-xl transition-all group"
                >
                  <img
                    src={image.desktopImage?.url || image.mobileImage?.url}
                    alt={image.desktopImage?.alternativeText || "Campus life"}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-110 transition-colors"
            >
              <X size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={images[selectedImageIdx].desktopImage?.url}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                alt="Enlarged campus"
              />

              <div className="absolute inset-x-0 flex justify-between px-4">
                <button
                  onClick={() => setSelectedImageIdx((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={() => setSelectedImageIdx((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight size={32} />
                </button>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIdx + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DetInstitutionCultural;