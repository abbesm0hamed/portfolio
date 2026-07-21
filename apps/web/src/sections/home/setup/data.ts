export interface SetupItem {
  category: string;
  cmd: string;
  desc: string;
  id: string;
  title: string;
}

export const setupItems: SetupItem[] = [
  {
    category: "Operating System",
    cmd: "cat /etc/fedora-release",
    desc: "Fedora Workstation — cutting-edge packages, rock-solid SELinux, and the perfect host for a Wayland tiling setup.",
    id: "setup-os",
    title: "Fedora",
  },
  {
    category: "Window Manager",
    cmd: "niri --version",
    desc: "Niri — a scrollable-tiling Wayland based Window Manager. Every workspace is an infinite vertical strip.",
    id: "setup-wm",
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
