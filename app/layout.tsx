import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "@/components/Header";
import Providers from "@/lib/providers";
const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nasa Exam",
  description: "Check this out",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={raleway.className} suppressHydrationWarning={true}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
