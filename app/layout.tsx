import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";
import "./globals.scss";

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
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
