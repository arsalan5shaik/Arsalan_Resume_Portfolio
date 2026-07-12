import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { profile } from "@/lib/data/profile";
import { education } from "@/lib/data/education";
import { siteUrl } from "@/lib/site-config";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.title}`,
  description: profile.bio,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: profile.bio,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: profile.bio,
  },
};

const [addressLocality, addressRegion] = profile.location
  .split(",")
  .map((part) => part.trim());

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.bio,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.githubUrl, profile.linkedinUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality,
    addressRegion,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
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
      className={`${geistMono.variable} h-full antialiased grain`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main id="top" className="flex-1">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
