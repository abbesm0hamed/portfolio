import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    category: "Operating System",
    cmd: "cat /etc/fedora-release",
    desc: "Fedora Workstation — cutting-edge packages, rock-solid SELinux, and the perfect host for a Wayland tiling setup.",
    id: "setup-os",
    title: "Fedora",
  },
  {
    category: "Compositor",
    cmd: "niri --version",
    desc: "Niri — a scrollable-tiling Wayland compositor. Every workspace is an infinite vertical strip.",
    id: "setup-compositor",
    title: "Niri",
  },
  {
    category: "Terminal",
    cmd: "wezterm --version",
    desc: "WezTerm — GPU-accelerated, multiplexer built-in, and configured entirely in Lua.",
    id: "setup-terminal",
    title: "WezTerm",
  },
  {
    category: "Shell",
    cmd: "fish --version",
    desc: "Fish with Hydro prompt. Sane defaults, autosuggestions out of the box, and a prompt that shows just enough.",
    id: "setup-shell",
    title: "Fish + Hydro",
  },
  {
    category: "Editor",
    cmd: "nvim --version | head -1",
    desc: "Neovim. Configured from scratch with Lua. The editor is part of the craft — I treat it that way.",
    id: "setup-editor",
    title: "Neovim",
  },
  {
    category: "Launcher",
    cmd: "rofi --version",
    desc: "Rofi — application launcher, window switcher, and dmenu replacement. Bound to Super+Space.",
    id: "setup-launcher",
    title: "Rofi",
  },
  {
    category: "Status Bar",
    cmd: "waybar --version",
    desc: "Waybar — highly customizable status bar for Wayland compositors. Displays workspaces, media, and system info.",
    id: "setup-waybar",
    title: "Waybar",
  },
  {
    category: "Dotfiles",
    cmd: "dofs doctor",
    desc: "Managed with chezmoi + Ansible under ~/dofs. One command bootstraps an entire workstation.",
    id: "setup-dotfiles",
    title: "dofs",
  },
];

export default function SetupTerminal() {
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
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] leading-none tracking-[0.2em] uppercase text-muted-foreground pl-6">
          Setup
        </span>
        <a
          href="https://github.com/abbesm0hamed/dofs"
          rel="noopener noreferrer"
          target="_blank"
          className="flex h-full w-10"
        >
          <Button
            className="h-full w-10 text-muted-foreground hover:text-foreground rounded-none border-l border-l-border"
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
                <span className="text-muted-foreground/50 select-none pt-0.5">
                  $
                </span>
                <span className="text-foreground/80">{item.cmd}</span>
              </div>
              <div className="ml-5 space-y-1">
                <span className="text-muted-foreground/50 select-none">
                  # {item.category}
                </span>
                <div className="text-foreground font-semibold">
                  {item.title}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 text-muted-foreground/50">
            <span className="flex items-center justify-center pt-[0.2rem]">
              $
            </span>
            <span className="w-[0.35rem] h-[1em] bg-current animate-blink" />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1.5 text-muted-foreground transition-all duration-300",
          showScrollIndicator
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1",
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
