import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard";
import { Icons } from "@workspace/ui/icons";

export const CopyUrl = ({ className }: { className?: string }) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(window.location.href)}
      aria-label={copied ? "Link copied" : "Copy link"}
      className={className}
    >
      {copied ? (
        <Icons.Check className="size-4" />
      ) : (
        <Icons.Link className="size-4" />
      )}
    </button>
  );
};
