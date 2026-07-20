/**
 * "2026-06-23" → "23 June 2026".
 *
 * Parsed as UTC deliberately: `new Date("2026-06-23")` is already UTC midnight,
 * so reading it back with local getters would shift the date by a day for
 * anyone west of Greenwich.
 */
export function formatPhotoDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
