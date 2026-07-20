/**
 * Every raster asset on the site, in one place.
 *
 * Imported statically rather than served from `public/` so Next fingerprints
 * the files, generates a `blurDataURL`, and — crucially — fails the build if
 * one goes missing. A string path into `public/` only fails at runtime, as a
 * broken image in front of a visitor.
 *
 * `public/` is now reserved for files that need a stable, URL-addressable
 * path: the résumé download and the certificate PDFs.
 */

/* Brand */
export { default as brandMark } from "./brand-mark.png";
export { default as pemaPortrait } from "./pema-portrait.webp";

/* Project and client logos */
export { default as ibestLogo } from "./ibest-logo.png";
export { default as dgmLogo } from "./dgm-logo.webp";
export { default as rpisLogo } from "./rpis-logo.png";
export { default as mindfulnessGuide } from "./mindfulness-guide.png";
export { default as portfolioPreview } from "./portfolio-preview.png";
