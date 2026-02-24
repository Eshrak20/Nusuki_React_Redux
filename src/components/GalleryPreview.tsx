import { useState, useEffect, useCallback } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GalleryProps {
  gallery?: string[];
  open?: boolean; // Add this
  onClose?: () => void; // Add this
}

const GalleryPreview = ({
  gallery = [],
  open: externalOpen,
  onClose,
}: GalleryProps) => {
  // Use internal state for index, but sync open state with parent if provided
  const [index, setIndex] = useState(0);
  const [internalOpen, setInternalOpen] = useState(false);

  // Determine if we are controlled externally or internally
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

  // ... existing hooks (isHovering, etc) ...

  // Handle close event
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  }, [onClose]);

  // Reset index when gallery opens
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIndex(0);
    }
  }, [isOpen]);

  // ... existing logic ...

  return (
    <section className="overflow-hidden relative">
      {/* ... existing Header JSX ... */}

      {/* ... existing Swiper JSX ... */}

      {/* Updated Lightbox Component */}
      <Lightbox
        open={isOpen}
        close={handleClose}
        index={index}
        slides={gallery.map((src, i) => ({
          src,
          title: `Image ${i + 1}`,
        }))}
        plugins={[Zoom, Captions]}
        on={{ view: ({ index }) => setIndex(index) }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: false }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
          captionsTitle: { fontSize: "1.5rem", fontWeight: "bold" },
        }}
      />
    </section>
  );
};

export default GalleryPreview;
