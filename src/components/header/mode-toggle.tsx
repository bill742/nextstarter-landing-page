"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Theme toggle component for switching between light and dark modes
 * @returns Toggle button with tooltip for theme switching
 */
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Use useSyncExternalStore to check if we're mounted (avoids setState in useEffect)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            id="themeToggle"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-label="Light Mode" />
            ) : (
              <Moon className="h-4 w-4" aria-label="Dark Mode" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

ModeToggle.displayName = "ModeToggle";

export default ModeToggle;
