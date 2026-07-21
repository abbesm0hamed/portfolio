import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

import type { SetupItem } from "./data";

interface SetupTerminalProps {
  items: SetupItem[];
}

export default function SetupTerminal({ items }: SetupTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isScrollable = scrollHeight > clientHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setShowScrollIndicator(isScrollable && !isAtBottom);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    handleScroll();

    const observer = new ResizeObserver(handleScroll);
    observer.observe(el);

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-full flex-1 flex flex-col layout:border-l max-layout:border-t relative">
      <div className="flex justify-between items-center h-control border-b">
        <span className="text-[0.7rem] leading-none tracking-[0.2em] uppercase text-muted-foreground pl-6">
          Setup
        </span>
        <a
          href="https://github.com/abbesm0hamed/dofs"
          rel="noopener noreferrer"
          target="_blank"
          className="flex h-control w-control border-l border-border items-center justify-center"
        >
          <Button
            className="h-control w-control m-0 p-0 text-muted-foreground hover:text-foreground rounded-none"
            variant="ghost"
          >
            <Icons.GitRepository className="size-4" />
          </Button>
        </a>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="p-6 font-mono text-xs space-y-6">
          {items.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-muted-foreground/50 select-none pt-0.5">$</span>
                <span className="text-foreground/80">{item.cmd}</span>
              </div>
              <div className="ml-5 space-y-1">
                <span className="text-muted-foreground/50 select-none"># {item.category}</span>
                <div className="text-foreground font-semibold">{item.title}</div>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 text-muted-foreground/50">
            <span className="flex items-center justify-center pt-[0.2rem]">$</span>
            <span className="w-[0.35rem] h-[1em] bg-current animate-blink" />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1.5 text-muted-foreground transition-all duration-300",
          showScrollIndicator ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        )}
      >
        <span className="text-[0.625rem] tracking-[0.25em] uppercase font-mono bg-background/90 px-2 py-1 rounded border border-border backdrop-blur-xs shadow-xs">
          More
        </span>
        <Icons.ArrowDown className="size-3.5 animate-bounce text-muted-foreground/80" />
      </div>
    </div>
  );
}
