import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import { Icons } from "@workspace/ui/icons";

import type { Work } from "./data";

interface WorkCarouselProps {
  works: Work[];
}

export default function WorkCarousel({ works }: WorkCarouselProps) {
  return (
    <Carousel
      orientation="vertical"
      opts={{ align: "start", dragFree: true, loop: true, watchDrag: false }}
      className="h-full flex-1 flex flex-col border-b"
    >
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground px-6">
          Work
        </span>
        <CarouselControls />
      </div>
      <CarouselContent className="flex-1 m-0 h-full">
        {works.map((w) => (
          <CarouselItem key={w.slug} className="p-0">
            <div className="grid grid-cols-[40%_60%] h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4 pt-6 pl-6">
                  <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                    {w.year} — {w.role} — {w.stack}
                  </span>
                  <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[0.08em] leading-none">
                    {w.title}
                  </span>
                  <p className="text-[1rem] text-muted-foreground leading-relaxed max-w-[30ch]">
                    {w.desc}
                  </p>
                </div>
                <div className="border-t">
                  <Button
                    className="h-10 w-10 flex items-center justify-center text-muted-foreground border-r-border hover:bg-muted hover:text-foreground"
                    variant="ghost"
                  >
                    <Icons.Expand className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="h-full overflow-hidden border-l">
                <img
                  alt={w.title}
                  className="h-full w-full object-cover"
                  src={w.image}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
