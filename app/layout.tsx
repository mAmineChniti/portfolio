import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://maminechniti.dev";
const description =
  "Med Amine Chniti builds backend systems, web applications, and developer tools with TypeScript, Python, Go, Rust, React, and Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Med Amine Chniti — Software Engineer",
  description,
  alternates: {
    canonical: "/",
  },
  authors: [
    { name: "Med Amine Chniti", url: "https://github.com/mAmineChniti" },
  ],
  creator: "Med Amine Chniti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Med Amine Chniti",
    title: "Med Amine Chniti — Software Engineer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Med Amine Chniti — Software Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3fcff" },
    { media: "(prefers-color-scheme: dark)", color: "#010810" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
