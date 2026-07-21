import { Button } from "@workspace/ui/components/button";
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard";
import { Icons } from "@workspace/ui/icons";

export const CopyUrlBtn = ({ className }: { className?: string }) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => copy(window.location.href)}
      aria-label={copied ? "Link copied" : "Copy link"}
      className={className}
    >
      {copied ? (
        <Icons.Check className="size-4" />
      ) : (
        <Icons.Link className="size-4" />
      )}
    </Button>
  );
};
