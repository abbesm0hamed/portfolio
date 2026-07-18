import { Icons } from "@/icons";

export const ResumeButton = () => (
  <a
    href="/resume.pdf"
    download
    aria-label="Download resume"
    className="h-full w-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border-l border-border"
  >
    <Icons.Download className="w-4 h-4" />
  </a>
);
