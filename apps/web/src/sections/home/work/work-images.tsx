import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@workspace/ui/components/carousel";
import { Icons } from "@workspace/ui/icons";

function Controls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <div className="flex h-control">
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-control w-control rounded-none border-b border-b-border border-l border-l-border text-muted-foreground bg-surface backdrop-blur-sm hover:text-foreground hover:bg-background/90"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <Icons.ChevronLeft className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-control w-control rounded-none border-l border-b border-b-border border-l-border text-muted-foreground bg-surface backdrop-blur-sm hover:text-foreground hover:bg-background/90"
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <Icons.ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

interface WorkImagesProps {
  images: string[];
  title: string;
}

export default function WorkImages({ images, title }: WorkImagesProps) {
  return (
    <Carousel opts={{ loop: true }} className="size-full">
      <CarouselContent className="m-0 size-full">
        {images.map((src, i) => (
          <CarouselItem key={i} className="p-0 size-full">
            <img
              alt={`${title} ${i + 1}`}
              className="size-full object-cover"
              src={src}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-0 right-0 z-10">
        <Controls />
      </div>
    </Carousel>
  );
}
