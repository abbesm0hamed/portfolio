import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

const writings = [
  {
    date: "Jan 2025",
    desc: "A deep dive into how I think about building software that lasts.",
    id: "post-01",
    num: "01",
    title: "On Writing Code That Ages Well",
  },
  {
    date: "Mar 2025",
    desc: "What embedded systems taught me about constraints and clarity.",
    id: "post-02",
    num: "02",
    title: "Lessons from the Bare Metal",
  },
  {
    date: "May 2025",
    desc: "The small decisions that quietly define a product's character.",
    id: "post-03",
    num: "03",
    title: "Details Are the Product",
  },
];

export default function WritingsCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="h-full flex-1 flex flex-col border-b"
    >
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground pl-6">
          Writing
        </span>
        <ButtonGroup className="[&>[data-slot='carousel-previous']]:static [&>[data-slot='carousel-next']]:static h-full">
          <CarouselPrevious
            variant="ghost"
            className="h-full border-l border-l-border text-muted-foreground hover:text-foreground w-10"
          />
          <ButtonGroupSeparator />
          <CarouselNext
            variant="ghost"
            className="h-full text-muted-foreground hover:text-foreground w-10"
          />
        </ButtonGroup>
      </div>
      <CarouselContent className="flex-1">
        {writings.map((post) => (
          <CarouselItem key={post.id}>
            <a
              href={`#${post.id}`}
              className="p-6 flex flex-col justify-between h-full"
            >
              <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                {post.num} — Post
              </span>
              <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[0.08em] leading-none">
                {post.title}
              </span>
              <p className="text-[0.875rem] text-muted-foreground leading-relaxed max-w-[40ch]">
                {post.desc}
              </p>
              <span className="text-[0.625rem] tracking-[0.15em] uppercase text-muted-foreground self-end py-1.5 px-3 border border-border hover:bg-muted hover:text-foreground">
                Read →
              </span>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
