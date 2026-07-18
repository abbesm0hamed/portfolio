import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";
import { useEffect, useRef, useState } from "react";

const EMAIL = "hello@abbes.dev";
const FEEDBACK_MS = 1600;

export const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const input = document.createElement("input");
      input.value = EMAIL;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    setCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, FEEDBACK_MS);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={copied ? "Email copied" : `Copy email ${EMAIL}`}
      onClick={handleCopy}
      className="h-full border-r border-r-border text-muted-foreground hover:text-foreground"
    >
      {copied ? <Icons.Check /> : <Icons.Mail />}
    </Button>
  );
};
