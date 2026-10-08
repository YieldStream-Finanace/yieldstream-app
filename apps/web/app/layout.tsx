import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YieldStream Protocol",
  description: "Real-time continuous money streaming on Stellar Soroban",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}