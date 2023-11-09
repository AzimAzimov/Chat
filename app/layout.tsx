import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Messenger",
  description: "Messenger-clone app",
};

export default function RootLayout({ children }: HomeProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
