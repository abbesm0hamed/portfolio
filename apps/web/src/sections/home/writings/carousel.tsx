import { Button } from "@workspace/ui/components/button";
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
import { Icons } from "@workspace/ui/icons";

import type { Writing } from "./data";

interface WritingsCarouselProps {
  writings: Writing[];
}

export default function WritingsCarousel({ writings }: WritingsCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="h-full flex-1 flex flex-col"
    >
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] leading-none tracking-[0.2em] uppercase text-muted-foreground px-6">
          Writing
        </span>
        <ButtonGroup className="[&>[data-slot='carousel-previous']]:static [&>[data-slot='carousel-next']]:static h-10">
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
      <CarouselContent className="flex-1 m-0 h-full">
        {writings.map((post) => {
          const base =
            typeof window === "undefined"
              ? (import.meta.env.PUBLIC_SERVER_URL as string)
              : window.location.origin;
          const articleUrl = `${base}/writings/${post.slug}`;
          const promptText = `Please read and summarize this article, then be ready to answer questions about it: ${articleUrl}`;
          const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`;
          const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;

          return (
            <CarouselItem key={post.slug} className="p-0">
              <div className="flex flex-row justify-between h-full">
                <div className="flex flex-col gap-4 pt-6 pl-6">
                  <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                    {post.date} — Post
                  </span>
                  <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[0.08em] leading-none max-w-[40ch]">
                    {post.title}
                  </span>
                  <p className="text-[1rem] text-muted-foreground leading-relaxed max-w-[50ch]">
                    {post.desc}
                  </p>
                </div>
                <div className="flex flex-col justify-between border-l border-border h-full">
                  <div className="flex flex-col">
                    <a
                      href={chatgptUrl}
                      target="_blank"
                      rel="noopener"
                      title="Summarize with ChatGPT"
                    >
                      <Button
                        className="h-10 w-10 border-b border-b-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                        variant="ghost"
                      >
                        <Icons.OpenAI className="size-4" />
                      </Button>
                    </a>
                    <a
                      href={claudeUrl}
                      target="_blank"
                      rel="noopener"
                      title="Summarize with Claude"
                    >
                      <Button
                        className="h-10 w-10 border-b border-b-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                        variant="ghost"
                      >
                        <Icons.Claude className="size-4" />
                      </Button>
                    </a>
                  </div>
                  <Button
                    className="h-10 w-10 border-t border-t-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                    variant="ghost"
                  >
                    <Icons.Expand className="size-4" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
