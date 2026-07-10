import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { profile } from "@/assets/content/common/SiteContent";
import ScrollToTop from "@/components/common/ScrollToTop";
import { ThemeScript } from "@/utils/helpers/ThemeScript";
import favicon from "../public/myfavicon.png";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = `${profile.name} — ${profile.roles[0]}`;
const DESCRIPTION = `${profile.name} — ${profile.roles[0]} based in ${profile.location}. ${profile.tagline}`;

export const metadata: Metadata = {
  // Resolves the relative OG image below against a real origin.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: TITLE, template: `%s | ${profile.name}` },
  description: DESCRIPTION,
  authors: [{ name: profile.name }],
  keywords: [
    "Pema Lepcha",
    "software developer",
    "frontend engineer",
    "React",
    "Next.js",
    "Bhutan",
  ],
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    images: [profile.avatar],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [profile.avatar],
  },
  icons:{icon: favicon.src}
};

// `themeColor` belongs on the viewport export, not on metadata. Each entry
// matches the surface token in that theme, so browser chrome blends in.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables must live on an element that also sets font-sans, so
    // descendants inherit the loaded family rather than the fallback.
    // suppressHydrationWarning: ThemeScript writes data-theme onto <html>.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeScript />
        {children}
        <ScrollToTop />
      </body>

    </html>
  );
}
