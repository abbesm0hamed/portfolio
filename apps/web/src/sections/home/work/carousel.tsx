import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import type { CarouselApi } from "@workspace/ui/components/carousel";
import { Icons } from "@workspace/ui/icons";
import { useCallback, useState } from "react";

import { WorkSlide } from "./work-slide";
import type { Work } from "./work-slide";

interface WorkCarouselProps {
  works: Work[];
}

export default function WorkCarousel({ works }: WorkCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const setApi = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }
    setCurrentIndex(api.selectedScrollSnap());
    api.on("select", () => setCurrentIndex(api.selectedScrollSnap()));
  }, []);

  return (
    <Carousel
      orientation="vertical"
      opts={{ align: "start", dragFree: true, loop: true, watchDrag: false }}
      setApi={setApi}
      className="flex h-full min-h-0 flex-1 flex-col border-b"
    >
      <div className="flex h-control shrink-0 items-center justify-between border-b">
        <span className="px-6 text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
          Work
        </span>
        <div className="flex items-center">
          <a
            href={`/work/${works[currentIndex]?.slug}`}
            className="flex h-control w-control items-center justify-center border-l border-l-border text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icons.ArrowUpRight className="size-4" />
          </a>
          <CarouselControls buttonClassName="h-control w-control" />
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <CarouselContent className="m-0 h-full">
          {works.map((w) => (
            <CarouselItem key={w.slug} className="h-full min-h-0 p-0">
              <WorkSlide work={w} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
