import Display from "@/components/gallery/display";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <div className="flex justify-between items-center h-full w-full">
        <Button variant={'ghost'} className="h-full w-24">
          <ChevronLeft />
        </Button>
        <Display title={'Hateruni'}/>
        <Button variant={'ghost'} className="h-full w-24">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
