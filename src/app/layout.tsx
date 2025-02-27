import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/sonner";

import Provider from "./provider";

export const metadata: Metadata = {
  title: "ATS",
  description: "ATS FE",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen">
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
