import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@workspace/ui/components/carousel";

const projects = [
  {
    desc: "A short description of what this project does and why it matters.",
    id: "project-01",
    name: "Project One",
    num: "01",
  },
  {
    desc: "Another project, different scope, same attention to detail.",
    id: "project-02",
    name: "Project Two",
    num: "02",
  },
  {
    desc: "The one that taught me the most. Full-stack, end to end.",
    id: "project-03",
    name: "Project Three",
    num: "03",
  },
];

export default function ProjectsCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="flex-1 flex flex-col border-b"
    >
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground pl-6">
          Work
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
        {projects.map((p) => (
          <CarouselItem key={p.id}>
            <a
              href={`#${p.id}`}
              className="p-6 flex flex-col justify-between h-full"
            >
              <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                {p.num} — Project
              </span>
              <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[0.08em] leading-none">
                {p.name}
              </span>
              <p className="text-[0.875rem] text-muted-foreground leading-relaxed max-w-[40ch]">
                {p.desc}
              </p>
              <span className="text-[0.625rem] tracking-[0.15em] uppercase text-muted-foreground self-end py-1.5 px-3 border border-border hover:bg-muted hover:text-foreground">
                Expand →
              </span>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
