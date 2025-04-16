import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <div className="flex justify-between">
        <Button variant={'ghost'} className="h-full">
          <ChevronLeft/>
        </Button>
        <Image alt="Hateruni" src={'/hateruni.png'} width={1000} height={100} />
        <Button variant={'ghost'}>
          <ChevronRight/>
        </Button>
      </div>
    </div>
  );
}
