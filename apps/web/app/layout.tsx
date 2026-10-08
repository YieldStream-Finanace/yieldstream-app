import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YieldStream Protocol',
  description: 'Continuous money streaming with automated vault yield routing on Stellar Soroban.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-gray-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}