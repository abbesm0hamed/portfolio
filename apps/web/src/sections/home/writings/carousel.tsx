import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard";
import { Icons } from "@workspace/ui/icons";

interface Writing {
  date: string;
  desc: string;
  slug: string;
  num: string;
  title: string;
}

interface WritingsCarouselProps {
  writings: Writing[];
}

function rawMdUrl(slug: string) {
  const base =
    typeof window === "undefined"
      ? (import.meta.env.PUBLIC_SERVER_URL as string)
      : window.location.origin;
  return `${base}/content/writings/${slug}.md`;
}

function CopyLinkButton({ slug }: { slug: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button
      variant="ghost"
      onClick={() => copy(`${window.location.origin}/writings/${slug}`)}
      aria-label={copied ? "Link copied" : `Copy link to this post`}
      className="h-control w-control border-t border-t-border text-muted-foreground rounded-none"
    >
      {copied ? (
        <Icons.Check className="size-4" />
      ) : (
        <Icons.Link className="size-4" />
      )}
    </Button>
  );
}

export default function WritingsCarousel({ writings }: WritingsCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="h-full flex-1 flex flex-col"
    >
      <div className="flex justify-between items-center h-control border-b">
        <span className="text-[0.7rem] leading-none tracking-[0.2em] uppercase text-muted-foreground px-6">
          Writing
        </span>
        <div className="flex items-center">
          <a
            href={`/writings/${writings[0]?.slug}`}
            className="h-control w-control flex items-center justify-center text-muted-foreground border-l border-l-border hover:text-foreground hover:bg-muted"
          >
            <Icons.ArrowUpRight className="size-4" />
          </a>
          <CarouselControls className="flex-row-reverse" />
        </div>
      </div>
      <CarouselContent className="flex-1 m-0 h-full">
        {writings.map((post) => {
          const mdUrl = rawMdUrl(post.slug);
          const promptText = `Please read and summarize this article, then be ready to answer questions about it: ${mdUrl}`;
          const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`;
          const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;

          return (
            <CarouselItem key={post.slug} className="p-0">
              <div className="flex flex-row justify-between h-full">
                <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
                  <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
                    {post.date} — Post
                  </span>
                  <span className="text-[clamp(1rem,2vw,1.5rem)] font-bold tracking-[0.08em] leading-none max-w-[25ch] md:layout:max-w-[40ch]">
                    {post.title}
                  </span>
                  <p className="text-[1rem] text-muted-foreground leading-relaxed max-w-[25ch] md:layout:max-w-[40ch]">
                    {post.desc}
                  </p>
                </div>
                <div className="flex flex-col justify-between border-l border-border h-full w-control">
                  <div className="flex flex-col">
                    <a
                      href={chatgptUrl}
                      target="_blank"
                      rel="noopener"
                      title="Summarize with ChatGPT"
                      className="h-control w-control border-b border-b-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Icons.OpenAI className="size-4" />
                    </a>
                    <a
                      href={claudeUrl}
                      target="_blank"
                      rel="noopener"
                      title="Summarize with Claude"
                      className="h-control w-control border-b border-b-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Icons.Claude className="size-4" />
                    </a>
                  </div>
                  <CopyLinkButton slug={post.slug} />
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
