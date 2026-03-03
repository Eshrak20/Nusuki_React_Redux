import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface GalleryProps {
  gallery?: string[];
  open?: boolean;
  onClose?: () => void;
}

const GalleryPreview = ({
  gallery = [],
  open: externalOpen,
  onClose,
}: GalleryProps) => {
  const [index, setIndex] = useState(0);
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Ref to store scroll position before opening
  const scrollPosRef = useRef(0);

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

  // Capture scroll position right before the lightbox opens
  useEffect(() => {
    if (isOpen) {
      scrollPosRef.current = window.scrollY;
    }
  }, [isOpen]);

  const slides = useMemo(
    () =>
      gallery.map((src, i) => ({
        src,
        title: `Image ${i + 1}`,
      })),
    [gallery],
  );

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }

    // Optional: Force the browser to stay at the captured position 
    // after the Lightbox cleanup cycle completes
    setTimeout(() => {
      window.scrollTo(0, scrollPosRef.current);
    }, 0);
  }, [onClose]);

  return (
    <Lightbox
      open={isOpen}
      close={handleClose}
      index={index}
      slides={slides}
      plugins={[Zoom, Captions]}
      /* Setting portal to document.body and disabling 
         automatic scroll-to-top behavior 
      */
      portal={{ root: typeof document !== 'undefined' ? document.body : undefined }}
      controller={{ 
        closeOnBackdropClick: true,
        // This prevents the library from adding styles that might jump the scroll
        focus: false 
      }}
      on={{
        view: ({ index: newIndex }) => setIndex(newIndex),
      }}
      carousel={{
        finite: false,
        preload: 3,
      }}
    />
  );
};

export default GalleryPreview;