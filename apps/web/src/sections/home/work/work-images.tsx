import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import type { CarouselApi } from "@workspace/ui/components/carousel";
import { Icons } from "@workspace/ui/icons";
import { useEffect, useState } from "react";

interface ImageControlsProps {
  api: CarouselApi | undefined;
}

export function ImageControls({ api }: ImageControlsProps) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex h-control">
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-control w-control rounded-none border-l border-l-border text-muted-foreground hover:text-foreground"
        disabled={!canScrollPrev}
        onClick={() => api?.scrollPrev()}
        aria-label="Previous image"
      >
        <Icons.ChevronLeft className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-control w-control rounded-none border-l border-l-border text-muted-foreground hover:text-foreground"
        disabled={!canScrollNext}
        onClick={() => api?.scrollNext()}
        aria-label="Next image"
      >
        <Icons.ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

interface WorkImagesProps {
  images: string[];
  title: string;
  setApi?: (api: CarouselApi) => void;
}

export default function WorkImages({ images, title, setApi }: WorkImagesProps) {
  return (
    <Carousel opts={{ loop: true }} className="size-full" setApi={setApi}>
      <CarouselContent className="m-0 size-full">
        {images.map((src, i) => (
          <CarouselItem key={src} className="p-0 size-full">
            <img
              alt={`${title} ${i + 1}`}
              className="size-full object-cover"
              src={src}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
