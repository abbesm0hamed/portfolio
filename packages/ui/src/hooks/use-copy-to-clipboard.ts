import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_FEEDBACK_MS = 1600;

export function useCopyToClipboard(feedbackMs = DEFAULT_FEEDBACK_MS) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const input = document.createElement("input");
        input.value = text;
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
      }, feedbackMs);
    },
    [feedbackMs],
  );

  return { copied, copy };
}
