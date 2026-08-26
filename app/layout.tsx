import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSTD Developer Applications",
  description: "Apply to join the PSTD development team."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}