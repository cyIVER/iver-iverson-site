import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} / ${site.title}`,
    template: `%s / ${site.name}`
  },
  description: site.description
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="site-shell">
          <header className="topbar">
            <nav className="nav" aria-label="Main navigation">
              <Link className="brand" href="/">
                <strong>Iver Iverson</strong>
                <span>AI-era cyber investigator</span>
              </Link>
              <div className="nav-links">
                <Link href="/work">Work</Link>
                <Link href="/writing">Writing</Link>
                <Link href="/about">About</Link>
                <Link href="/resume">Resume</Link>
                <Link href="/archive">Archive</Link>
              </div>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            <div className="footer-inner">
              <span>Static dossier site. Built for public technical review.</span>
              <span>No backend runtime. No tracking scripts.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
