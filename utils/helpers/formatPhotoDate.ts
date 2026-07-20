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

/**
 * "2026-03-24" + "2026-06-23" → "Mar–Jun 2026". Collapses to a single month
 * when both ends land in one, and carries both years when they differ.
 */
export function formatPhotoRange(fromIso: string, toIso: string): string {
  const month = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      month: "short",
      timeZone: "UTC",
    });
  const year = (iso: string) => iso.slice(0, 4);

  if (year(fromIso) !== year(toIso)) {
    return `${month(fromIso)} ${year(fromIso)}–${month(toIso)} ${year(toIso)}`;
  }
  if (month(fromIso) === month(toIso)) {
    return `${month(fromIso)} ${year(toIso)}`;
  }
  return `${month(fromIso)}–${month(toIso)} ${year(toIso)}`;
}
