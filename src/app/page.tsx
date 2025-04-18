"use client";

import { useEffect, useState } from "react";
import Display from "@/components/gallery/display";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Photo, getAllPhotos } from "@/lib/photo-service";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load photos on component mount
  useEffect(() => {
    const allPhotos = getAllPhotos();
    setPhotos(allPhotos);
  }, []);

  // Handle navigation
  const goToNext = () => {
    if (photos.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const goToPrevious = () => {
    if (photos.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  // Get current photo
  const currentPhoto = photos.length > 0 ? photos[currentIndex] : null;

  return (
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <div className="flex justify-between items-center h-full w-full">
        <Button variant={'ghost'} className="h-full w-24" onClick={goToPrevious}>
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
            <p className="text-muted-foreground">No photos available</p>
          </div>
        )}

        <Button variant={'ghost'} className="h-full w-24" onClick={goToNext}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
