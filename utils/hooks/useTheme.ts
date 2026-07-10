import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Reads the theme that ThemeScript already applied to <html>, so the first
 * client render matches the server-painted DOM.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    // The real theme lives in localStorage / the OS setting, so the server
    // can't know it and must render the "light" default. Adopting it has to
    // wait for the client, which means setting state from an effect on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(current ?? "light");
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(
      (document.documentElement.dataset.theme as Theme) === "dark"
        ? "light"
        : "dark",
    );
  }, [setTheme]);

  return { theme, setTheme, toggle, mounted };
}
