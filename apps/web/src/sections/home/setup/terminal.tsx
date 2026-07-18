import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";

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
  // {
  //   category: "Launcher",
  //   cmd: "rofi --version",
  //   desc: "Rofi — application launcher, window switcher, and dmenu replacement. Bound to Super+Space.",
  //   id: "setup-launcher",
  //   title: "Rofi",
  // },
  // {
  //   category: "Dotfiles",
  //   cmd: "dofs doctor",
  //   desc: "Managed with chezmoi + Ansible under ~/dofs. One command bootstraps an entire workstation.",
  //   id: "setup-dotfiles",
  //   title: "dofs",
  // },
];

export default function SetupTerminal() {
  return (
    <div className="h-full flex-1 flex flex-col border-l">
      <div className="flex justify-between items-center h-10 border-b">
        <span className="text-[0.7rem] leading-none tracking-[0.2em] uppercase text-muted-foreground px-6">
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
      <div className="flex-1 min-h-0 overflow-y-auto">
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
            <span className="flex items-center justify-center pt-0.5">$</span>
            <span className="w-2 h-[1em] bg-current animate-blink" />
          </div>
        </div>
      </div>
    </div>
  );
}
