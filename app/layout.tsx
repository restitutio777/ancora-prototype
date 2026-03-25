import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ancora – Ein digitales Hausbuch für unsichere Zeiten",
  description:
    "Verstehen, Handeln, Haltung finden. Ein ruhiger Ort der Orientierung, wenn die gewohnte Ordnung ins Rutschen kommt.",
  openGraph: {
    title: "Ancora – Ein digitales Hausbuch für unsichere Zeiten",
    description:
      "Verstehen, Handeln, Haltung finden. Ein ruhiger Ort der Orientierung, wenn die gewohnte Ordnung ins Rutschen kommt.",
    type: "website",
    locale: "de_DE",
    siteName: "Ancora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ancora – Ein digitales Hausbuch für unsichere Zeiten",
    description:
      "Verstehen, Handeln, Haltung finden. Ein ruhiger Ort der Orientierung.",
  },
  other: {
    "og:locale:alternate": "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
