import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import type { CarouselApi } from "@workspace/ui/components/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard";
import { Icons } from "@workspace/ui/icons";
import { useCallback, useState } from "react";

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
  isPublic?: boolean;
  repo?: string;
  url?: string;
}

interface WorkCarouselProps {
  works: Work[];
}

function CopyCloneButton({ repo }: { repo: string }) {
  const { copied, copy } = useCopyToClipboard();
  const cloneCommand = `git clone ${repo}.git`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            aria-label="Clone repository command"
            className="h-control w-control m-0 p-0 text-muted-foreground hover:text-foreground rounded-none border-l border-l-border"
          />
        }
      >
        <Icons.GitClone className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className="w-auto p-1 rounded-none border-border"
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copy(cloneCommand)}
          className="h-7 px-2.5 text-xs font-sans gap-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-none"
        >
          {copied ? (
            <>
              <Icons.Check className="size-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-medium">
                Copied git clone
              </span>
            </>
          ) : (
            <>
              <Icons.Copy className="size-3.5" />
              <span>Copy git clone command</span>
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function WorkSlide({ work }: { work: Work }) {
  const hasMultipleImages = work.images.length > 1;
  const hasImages = work.images.length > 0;

  return (
    <div className="grid size-full grid-rows-[0.4fr_auto] layout:grid-cols-[1fr_2fr] layout:grid-rows-1">
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden layout:h-full">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
            {work.year} — {work.role} — {work.stack}
          </span>
          <span className="text-[clamp(1rem,2vw,1.25rem)] font-bold tracking-[0.08em] leading-none mt-4">
            {work.title}
          </span>
          <p className="text-[1rem] text-muted-foreground leading-relaxed">
            {work.desc}
          </p>
        </div>
        <div className="flex justify-between h-control w-full border-t border-t-border">
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
          {work.repo && work.isPublic !== false ? (
            <CopyCloneButton repo={work.repo} />
          ) : null}
        </div>
      </div>

      <div className="min-h-0 min-w-0 overflow-hidden layout:border-l layout:border-l-border layout:h-full max-layout:border-t">
        <div className="relative size-full overflow-hidden">
          {hasMultipleImages ? (
            <WorkImages
              images={work.images}
              title={work.title}
              buttonClassName="h-control w-control"
            />
          ) : (
            <img
              alt={work.title}
              className="size-full object-cover"
              src={hasImages ? work.images[0] : "/images/gh_cover.jpg"}
            />
          )}
        </div>
      </div>
    </div>
  );
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
