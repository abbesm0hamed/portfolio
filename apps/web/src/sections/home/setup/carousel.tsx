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

const items = [
  {
    category: "Operating System",
    desc: "NixOS — declarative, reproducible, and fully version-controlled. My entire system is a git repo.",
    id: "setup-os",
    num: "01",
    title: "NixOS",
  },
  {
    category: "Terminal",
    desc: "Ghostty with a hand-tuned config. Fast, GPU-accelerated, and native — the first terminal that felt right.",
    id: "setup-terminal",
    num: "02",
    title: "Ghostty",
  },
  {
    category: "Shell",
    desc: "Zsh with Starship prompt. Minimal, fast, and honest — shows exactly what I need, nothing more.",
    id: "setup-shell",
    num: "03",
    title: "Zsh + Starship",
  },
  {
    category: "Editor",
    desc: "Neovim. Configured from scratch with Lua. The editor is part of the craft — I treat it that way.",
    id: "setup-editor",
    num: "04",
    title: "Neovim",
  },
  {
    category: "Dotfiles",
    desc: "Managed with GNU Stow. Every config lives in one repo, symlinked and tracked. One command to bootstrap.",
    id: "setup-dotfiles",
    num: "05",
    title: "GNU Stow",
  },
];

export default function SetupCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="h-full flex-1 flex flex-col border-l"
    >
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground pl-6">
          Setup
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
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <a
              href={`/setup#${item.id}`}
              className="p-6 flex flex-col justify-between h-full"
            >
              <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                {item.num} — {item.category}
              </span>
              <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[0.08em] leading-none">
                {item.title}
              </span>
              <p className="text-[0.875rem] text-muted-foreground leading-relaxed max-w-[40ch]">
                {item.desc}
              </p>
              <span className="text-[0.625rem] tracking-[0.15em] uppercase text-muted-foreground self-end py-1.5 px-3 border border-border hover:bg-muted hover:text-foreground">
                Explore →
              </span>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
