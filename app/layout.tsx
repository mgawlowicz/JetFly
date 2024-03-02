import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JetFly - Luxury Private Flights",
  description: "JetFly delivers unforgettable travel experiences through the rental of luxurious private aircraft. Utilize our flexible service and professional customer support to plan your perfect journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<SpeedInsights /></body>
    </html>
  );
}
