import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/icons";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
    setRotation((r) => r + 180);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="h-full w-control border-l border-l-border text-muted-foreground hover:text-foreground"
    >
      <span
        className="inline-block transition-transform duration-500 ease-in-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Icons.Theme />
      </span>
    </Button>
  );
};
