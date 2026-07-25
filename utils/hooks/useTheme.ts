import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
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
