"use client";

import { useEffect } from "react";
import Display from "@/components/gallery/display";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePhotoStore } from "@/store/photo-store";

export default function Home() {
  // Access state and actions from Zustand store
  const photos = usePhotoStore((state) => state.photos);
  const currentIndex = usePhotoStore((state) => state.currentIndex);
  const goToNext = usePhotoStore((state) => state.goToNext);
  const goToPrevious = usePhotoStore((state) => state.goToPrevious);
  const initializePhotos = usePhotoStore((state) => state.initializePhotos);

  // Load photos on component mount if not already loaded
  useEffect(() => {
    // Check if photos array is empty before initializing
    if (photos.length === 0) {
      initializePhotos();
    }
  }, [initializePhotos, photos.length]); // Depend on initializePhotos and photos.length

  // Get current photo based on currentIndex from the store
  const currentPhoto = photos.length > 0 ? photos[currentIndex] : null;

  return (
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <div className="flex justify-between items-center h-full w-full">
        <Button variant={'ghost'} className="h-full w-24" onClick={goToPrevious} disabled={photos.length <= 1}>
          <ChevronLeft />
        </Button>

        {currentPhoto ? (
          <Display
            src={currentPhoto.imageSrc}
            title={currentPhoto.title}
            description={currentPhoto.description}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8">
            {/* Optional: Show loading state while initializing */}
            {photos.length === 0 && <p className="text-muted-foreground">Loading photos...</p>}
            {/* Show message if still no photos after loading */}
            {photos.length > 0 && !currentPhoto && <p className="text-muted-foreground">No photos available</p>}
          </div>
        )}

        <Button variant={'ghost'} className="h-full w-24" onClick={goToNext} disabled={photos.length <= 1}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
