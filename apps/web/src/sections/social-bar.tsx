import { Separator } from "@workspace/ui/components/separator";

import { Icons } from "@/icons";

const socials = [
  {
    href: "https://github.com/abbesm0hamed",
    icon: Icons.Github,
    label: "GitHub",
  },
  { href: "https://x.com/thr3add", icon: Icons.Twitter, label: "Twitter" },
  {
    href: "https://linkedin.com/abbesm0hamed",
    icon: Icons.Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:abbesmohamed717@gmail.com",
    icon: Icons.Mail,
    label: "Email",
  },
];

export const SocialBar = () => (
  <div class="flex items-center h-full">
    {socials.map(({ icon: Icon, href, label }, index) => (
      <div key={label} class="flex items-center h-full">
        {index > 0 && <Separator orientation="vertical" className="h-full" />}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          class="flex items-center justify-center h-full px-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon class="w-4 h-4" />
        </a>
      </div>
    ))}
    <Separator orientation="vertical" className="h-full" />
  </div>
);
