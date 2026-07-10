/**
 * Applies the stored theme to <html> before the first paint, so a dark-mode
 * reload never flashes white. The browser runs this synchronously while
 * parsing, ahead of any page content.
 *
 * `type` flips to text/plain on the client because React warns in development
 * when a render produces a <script>; the server-sent copy has already run by
 * then. `suppressHydrationWarning` covers both that type swap and the
 * `data-theme` attribute the script writes onto <html>.
 */
const THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = stored || (prefersDark ? "dark" : "light");
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
