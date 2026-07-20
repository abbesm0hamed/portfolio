import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import { Icons } from "@workspace/ui/icons";

import WorkImages from "./work-images";

interface Work {
  desc: string;
  slug: string;
  images: string[];
  title: string;
  num: string;
  role: string;
  stack: string;
  year: string;
  repo?: string;
  url?: string;
}

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
      <div className="flex justify-between items-center h-control border-b">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground px-6">
          Work
        </span>
        <div className="flex items-center">
          <a
            href={`/work/${works[0]?.slug}`}
            className="h-control w-control flex items-center justify-center text-muted-foreground border-l border-l-border hover:bg-muted hover:text-foreground"
          >
            <Icons.ArrowUpRight className="size-4" />
          </a>
          <CarouselControls buttonClassName="w-control h-control" />
        </div>
      </div>
      <CarouselContent className="flex-1 m-0 h-full">
        {works.map((w) => (
          <CarouselItem key={w.slug} className="p-0">
            <div className="flex flex-col layout:grid layout:grid-cols-[40%_60%] h-full">
              <div className="flex flex-col justify-between layout:h-full flex-1">
                <div className="flex flex-col gap-4 pt-6 pl-6">
                  <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                    {w.year} — {w.role} — {w.stack}
                  </span>
                  <span className="text-[clamp(1rem,2vw,1.5rem)] font-bold tracking-[0.08em] leading-none max-w-[27ch] layout:max-w-[32ch]">
                    {w.title}
                  </span>
                  <p className="text-[1rem] text-muted-foreground leading-relaxed max-w-[27ch] layout:max-w-[32ch]">
                    {w.desc}
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-1 min-h-0 layout:h-full layout:border-l overflow-hidden">
                <div className="flex-1 min-h-0 overflow-hidden relative max-layout:border-t">
                  {w.images.length > 1 ? (
                    <div className="size-full">
                      <WorkImages images={w.images} title={w.title} />
                    </div>
                  ) : (
                    <img
                      alt={w.title}
                      className="h-full w-full object-cover"
                      src={w.images[0]}
                    />
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
