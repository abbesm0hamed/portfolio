import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import type { CarouselApi } from "@workspace/ui/components/carousel";
import { Icons } from "@workspace/ui/icons";
import { useState } from "react";

import WorkImages, { ImageControls } from "./work-images";

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

function WorkSlide({ work }: { work: Work }) {
  const [imageApi, setImageApi] = useState<CarouselApi>();
  const hasMultipleImages = work.images.length > 1;

  return (
    <div className="grid size-full grid-rows-[minmax(0,1fr)_minmax(14rem,1.2fr)] layout:grid-cols-[40%_60%] layout:grid-rows-1">
      <div className="flex min-h-0 flex-col overflow-hidden layout:h-full">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
            {work.year} — {work.role} — {work.stack}
          </span>
          <span className="text-[clamp(1.15rem,2.5vw,1.5rem)] font-bold tracking-[0.08em] leading-none max-w-[45ch] layout:max-w-[32ch] mt-6">
            {work.title}
          </span>
          <p className="text-[1rem] text-muted-foreground leading-relaxed max-w-[45ch] layout:max-w-[32ch]">
            {work.desc}
          </p>
        </div>
        <div className="flex h-control w-full shrink-0 border-t border-t-border">
          {work.repo ? (
            <a
              href={work.repo}
              rel="noopener noreferrer"
              target="_blank"
              className="flex h-control w-control items-center justify-center border-r border-r-border"
            >
              <Button
                className="h-control w-control m-0 p-0 text-muted-foreground hover:text-foreground rounded-none"
                variant="ghost"
              >
                <Icons.GitRepository className="size-4" />
              </Button>
            </a>
          ) : null}
          <div className="flex-1" />
          {hasMultipleImages ? <ImageControls api={imageApi} /> : null}
        </div>
      </div>

      <div className="min-h-0 overflow-hidden layout:h-full layout:border-l max-layout:border-t">
        <div className="relative size-full overflow-hidden">
          {hasMultipleImages ? (
            <WorkImages images={work.images} title={work.title} setApi={setImageApi} />
          ) : (
            <img alt={work.title} className="size-full object-cover" src={work.images[0]} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkCarousel({ works }: WorkCarouselProps) {
  return (
    <Carousel
      orientation="vertical"
      opts={{ align: "start", dragFree: true, loop: true, watchDrag: false }}
      className="flex h-full min-h-0 flex-1 flex-col border-b"
    >
      <div className="flex h-control shrink-0 items-center justify-between border-b">
        <span className="px-6 text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
          Work
        </span>
        <div className="flex items-center">
          <a
            href={`/work/${works[0]?.slug}`}
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
            <CarouselItem key={w.slug} className="relative min-h-0 p-0">
              {/*
                Embla sizes the item via flex-basis; percentage heights inside
                are unreliable. Fill the slide with absolute inset instead.
              */}
              <div className="absolute inset-0">
                <WorkSlide work={w} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
