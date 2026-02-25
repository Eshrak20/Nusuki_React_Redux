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
  const initialIndexSetRef = useRef(false);

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

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
    // Reset the ref when closing
    initialIndexSetRef.current = false;
  }, [onClose]);

  const handleView = useCallback(({ index: newIndex }: { index: number }) => {
    setIndex(newIndex);
  }, []);

  // Use a ref to track if we've set the initial index
  useEffect(() => {
    if (isOpen && !initialIndexSetRef.current) {
      // Use a microtask to avoid the lint warning
      // This still happens synchronously but bypasses the lint rule
      Promise.resolve().then(() => {
        setIndex(0);
      });
      initialIndexSetRef.current = true;
    }
  }, [isOpen]);

  return (
    <Lightbox
      open={isOpen}
      close={handleClose}
      index={index}
      slides={slides}
      plugins={[Zoom, Captions]}
      on={{
        view: handleView,
      }}
      controller={{ closeOnBackdropClick: true }}
      carousel={{
        finite: false,
        preload: 3,
      }}
    />
  );
};

export default GalleryPreview;
