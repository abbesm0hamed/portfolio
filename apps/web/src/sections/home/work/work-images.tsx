import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";

interface WorkImagesProps {
  images: string[];
  title: string;
  buttonClassName?: string;
}

export default function WorkImages({
  images,
  title,
  buttonClassName,
}: WorkImagesProps) {
  return (
    <Carousel opts={{ loop: true }} className="size-full">
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
      <CarouselControls
        className="absolute max-layout:bottom-0 max-layout:border-t layout:border-b layout:top-0 right-0 bg-background flex-row-reverse"
        buttonClassName={buttonClassName}
      />
    </Carousel>
  );
}
