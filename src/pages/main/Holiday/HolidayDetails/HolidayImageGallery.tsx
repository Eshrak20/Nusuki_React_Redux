import { useMemo, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface HolidayImage {
  id: number;
  image?: string;
  image_url: string;
}

interface Props {
  images?: HolidayImage[];
  title?: string;
}

const HolidayImageGallery = ({
  images = [],
  title = "Holiday package",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const visibleImages = useMemo(
    () => images.filter((img) => img.image_url),
    [images],
  );

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % visibleImages.length);
    setZoom(1);
  }, [visibleImages.length]);

  const prevImage = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + visibleImages.length) % visibleImages.length,
    );
    setZoom(1);
  }, [visibleImages.length]);

  // Keyboard Navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, nextImage, prevImage]);

  const openViewer = (index: number) => {
    setActiveIndex(index);
    setZoom(1);
    setOpen(true);
  };

  if (!visibleImages.length) {
    return (
      <div className="flex h-[260px] items-center justify-center border bg-muted/50 text-muted-foreground rounded-sm">
        No images available
      </div>
    );
  }

  const [mainImg, topImg, bottomImg, rightImg] = visibleImages;

  return (
    <>
      <section className="group">
        <div className="grid gap-3 lg:h-[480px] lg:grid-cols-[1.5fr_0.8fr_1fr]">
          {/* Main Large Image */}
          {mainImg && (
            <GalleryImage
              image={mainImg}
              title={title}
              className="min-h-[300px] lg:min-h-0 rounded-l-md"
              onClick={() => openViewer(0)}
            />
          )}

          {/* Stacked Middle Images */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[topImg, bottomImg].map(
              (image, index) =>
                image && (
                  <GalleryImage
                    key={image.id}
                    image={image}
                    title={title}
                    className="min-h-[145px] lg:min-h-0"
                    delay={0.1 * (index + 1)}
                    onClick={() => openViewer(index + 1)}
                  />
                ),
            )}
          </div>

          {/* Right Featured Image */}
          {rightImg && (
            <GalleryImage
              image={rightImg}
              title={title}
              className="min-h-[250px] lg:min-h-0 rounded-r-md"
              delay={0.2}
              onClick={() => openViewer(3)}
            >
              <Button
                variant="secondary"
                className="absolute bottom-6 right-6 gap-2 bg-white/90 backdrop-blur-md hover:bg-white text-black shadow-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  openViewer(0);
                }}
              >
                <Images className="h-4 w-4" />
                View {visibleImages.length} Photos
              </Button>
            </GalleryImage>
          )}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
    !fixed !left-1/2 !top-1/2
    !h-[94vh] !w-[98vw] !max-w-[98vw]
    !translate-x-[-50%] !translate-y-[-50%]
    overflow-hidden border-none bg-black p-0 shadow-2xl
    sm:rounded-none [&>button]:hidden
  "
        >
          <DialogTitle className="sr-only">{title} Viewer</DialogTitle>

          <div className="relative flex h-full flex-col">
            {/* Header */}
            <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-5 py-4">
              <div className="min-w-0 text-white">
                <h3 className="max-w-[70vw] truncate text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  {activeIndex + 1} / {visibleImages.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur-md sm:flex">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full text-white hover:bg-white/20 hover:text-white"
                    onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center text-xs text-white/80">
                    {Math.round(zoom * 100)}%
                  </span>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full text-white hover:bg-white/20 hover:text-white"
                    onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full text-white hover:bg-white/20 hover:text-white"
                    onClick={() => setZoom(1)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full text-white hover:bg-white/20 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Main image */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={visibleImages[activeIndex].image_url}
                  alt={title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: zoom }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.28 }}
                  className="max-h-[78vh] max-w-[94vw] select-none object-contain"
                />
              </AnimatePresence>

              {visibleImages.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black"
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black"
                  >
                    <ChevronRight className="h-7 w-7" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-transparent px-4 pb-5 pt-10">
              <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto">
                {visibleImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setZoom(1);
                    }}
                    className={cn(
                      "h-16 w-24 shrink-0 overflow-hidden border transition-all",
                      activeIndex === index
                        ? "scale-105 border-white opacity-100"
                        : "border-white/20 opacity-50 hover:opacity-100",
                    )}
                  >
                    <img
                      src={image.image_url}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const GalleryImage = ({
  image,
  title,
  className,
  delay = 0,
  children,
  onClick,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    onClick={onClick}
    className={cn("group relative overflow-hidden bg-muted", className)}
  >
    <img
      src={image.image_url}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
    {children}
  </motion.button>
);

export default HolidayImageGallery;
