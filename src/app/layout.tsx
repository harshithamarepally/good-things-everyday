import type { Metadata } from "next";
import { Public_Sans, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import SlowerScroll from "./components/SlowerScroll";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-public-sans",
  display: "swap",
});

const shadows = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shadows",
});

export const metadata: Metadata = {
  title: "good things everyday",
  description:
    "keep track of little good things that happen every day and practice gratitude!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${shadows.variable} antialiased`}
      >
        <SlowerScroll>{children}</SlowerScroll>
      </body>
    </html>
  );
}
