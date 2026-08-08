import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";

import { CopyCloneButton } from "./copy-clone-button";
import WorkImages from "./work-images";

export interface Work {
  desc: string;
  slug: string;
  images: string[];
  title: string;
  num: string;
  role: string;
  stack: string;
  year: string;
  isPublic?: boolean;
  repo?: string;
  url?: string;
}

export function WorkSlide({ work }: { work: Work }) {
  const hasMultipleImages = work.images.length > 1;
  const hasImages = work.images.length > 0;

  return (
    <div className="grid size-full grid-rows-[0.4fr_auto] layout:grid-cols-[1fr_2fr] layout:grid-rows-1">
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden layout:h-full">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground">
            {work.year} — {work.role} — {work.stack}
          </span>
          <span className="text-[clamp(1rem,2vw,1.25rem)] font-bold tracking-[0.08em] leading-none mt-4">
            {work.title}
          </span>
          <p className="text-[1rem] text-muted-foreground leading-relaxed">
            {work.desc}
          </p>
        </div>
        <div className="flex justify-between h-control w-full border-t border-t-border">
          {work.repo ? (
            <a
              href={work.repo}
              rel="noopener noreferrer"
              target="_blank"
              className="flex h-control w-control items-center justify-center border-r border-r-border"
            >
              <Button
                className="h-control w-control m-0 p-0 text-muted-foreground hover:text-foreground rounded-none"
                variant="ghost"
              >
                <Icons.GitRepository className="size-4" />
              </Button>
            </a>
          ) : null}
          <div className="flex-1" />
          {work.repo && work.isPublic !== false ? (
            <CopyCloneButton repo={work.repo} />
          ) : null}
        </div>
      </div>

      <div className="min-h-0 min-w-0 overflow-hidden layout:border-l layout:border-l-border layout:h-full max-layout:border-t">
        <div className="relative size-full overflow-hidden">
          {hasMultipleImages ? (
            <WorkImages
              images={work.images}
              title={work.title}
              buttonClassName="h-control w-control"
            />
          ) : (
            <img
              alt={work.title}
              className="size-full object-cover"
              src={hasImages ? work.images[0] : "/images/gh_cover.jpg"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
