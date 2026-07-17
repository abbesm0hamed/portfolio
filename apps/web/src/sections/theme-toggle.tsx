import { Button } from "@workspace/ui/components/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Icons } from "@/icons";
import { ThemeProvider } from "@/sections/theme-provider";

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="h-full border-l border-l-border text-muted-foreground hover:text-foreground"
    >
      {isDark ? <Icons.Sun /> : <Icons.Moon />}
    </Button>
  );
};

export const ThemeToggle = () => (
  <ThemeProvider>
    <ThemeToggleButton />
  </ThemeProvider>
);
