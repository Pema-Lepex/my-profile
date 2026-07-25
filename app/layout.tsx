import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { profile } from "@/assets/content/common/SiteContent";
import ScrollToTop from "@/components/common/ScrollToTop";
import { ThemeScript } from "@/utils/helpers/ThemeScript";
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
    images: [profile.avatar.src],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [profile.avatar.src],
  },
};

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
