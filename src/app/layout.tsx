import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { auth } from "@/auth";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "JetFly | Luxury Private Jet Charter & Fleet",
    template: "%s | JetFly"
  },
  description: "JetFly delivers unforgettable luxury travel experiences through premium private jet charters. Flexible service, professional support, and a world-class fleet.",
  keywords: ["private jet", "luxury travel", "jet charter", "private flight", "Gulfstream", "Falcon jet"],
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={montserrat.className}>
          <Nav session={session} />
          {children}
          <Footer />
          <SpeedInsights />
        </body>
    </html>
  );
}
