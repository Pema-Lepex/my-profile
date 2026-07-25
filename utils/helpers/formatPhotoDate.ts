export function formatPhotoDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

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
