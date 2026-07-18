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
import { Icons } from "@workspace/ui/icons";

const projects = [
  {
    desc: "A short description of what this project does and why it matters.",
    id: "project-01",
    image: "/images/projects/project-01.jpg",
    name: "Project One",
    num: "01",
  },
  {
    desc: "Another project, different scope, same attention to detail.",
    id: "project-02",
    image: "/images/projects/project-02.jpg",
    name: "Project Two",
    num: "02",
  },
  {
    desc: "The one that taught me the most. Full-stack, end to end.",
    id: "project-03",
    image: "/images/projects/project-03.jpg",
    name: "Project Three",
    num: "03",
  },
];

export default function ProjectsCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="h-full flex-1 flex flex-col border-b"
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
            <div className="grid grid-cols-[50%_50%] h-full">
              <div className="flex flex-col justify-between h-full">
                <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[0.08em] leading-none">
                  {p.name}
                </span>
                <p className="text-[0.875rem] text-muted-foreground leading-relaxed max-w-[40ch]">
                  {p.desc}
                </p>
                <button
                  className="absolute bottom-0 left-0 h-10 w-10 flex items-center justify-center text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
                  type="button"
                >
                  <Icons.Expand className="size-4" />
                </button>
              </div>
              <div className="h-full overflow-hidden">
                <img
                  alt={p.name}
                  className="h-full w-full object-cover"
                  src={p.image}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
