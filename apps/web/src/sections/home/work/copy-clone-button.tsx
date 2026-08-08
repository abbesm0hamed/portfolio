import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard";
import { Icons } from "@workspace/ui/icons";

export function CopyCloneButton({ repo }: { repo: string }) {
  const { copied, copy } = useCopyToClipboard();
  const cloneCommand = `git clone ${repo}.git`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            aria-label="Clone repository command"
            className="h-control w-control m-0 p-0 text-muted-foreground hover:text-foreground rounded-none border-l border-l-border"
          />
        }
      >
        <Icons.GitClone className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className="w-auto p-1 rounded-none border-border"
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copy(cloneCommand)}
          className="h-7 px-2.5 text-xs font-sans gap-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-none"
        >
          {copied ? (
            <>
              <Icons.Check className="size-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-medium">
                Copied git clone
              </span>
            </>
          ) : (
            <>
              <Icons.Copy className="size-3.5" />
              <span>Copy git clone command</span>
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
