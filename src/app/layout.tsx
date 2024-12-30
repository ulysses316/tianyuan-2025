import type { Metadata } from "next";
import { Karla, Cormorant } from "next/font/google";
import "./globals.css";

const karla = Karla({
  variable: "--font-karla",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${cormorant.variable} font-karla antialiased`}>{children}</body>
    </html>
  );
}
