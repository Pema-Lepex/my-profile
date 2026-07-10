# Certificates

Every certificate on the site is one entry in the `certificates` array in
`assets/content/common/SiteContent.tsx`, backed by files in this folder.

## Adding a certificate

1. Drop the PDF here, e.g. `public/certificates/aws-cloud.pdf`.
2. Optionally drop a preview image beside it, e.g. `public/certificates/aws-cloud.png`.
   Landscape 4:3 looks best — the card crops to that ratio from the top.
   With no image, the card falls back to a PDF glyph, which is a fine default.
3. Add the entry:

```ts
{
  id: "aws-cloud",
  title: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  year: "2025",
  fileUrl: "/certificates/aws-cloud.pdf",
  thumbnailUrl: "/certificates/aws-cloud.png", // omit if you have no image
},
```

Order in the array is the order on the page. No component changes needed.

## Notes

- The card grid handles any number of certificates. The section hides itself
  entirely when the array is empty.
- `thumbnailUrl` pointing at a missing file is safe: the card detects the
  failed load and swaps in the glyph.
- Keep PDFs reasonably small. They are only fetched when a card is clicked,
  not on page load, but a 20 MB scan still takes a while to open.
