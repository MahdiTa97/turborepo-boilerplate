// Don't change order of these css files
import "./globals.css";
import "@repo/ui/styles.css";

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import type { ReactNode } from "react";

import { Container, Navbar } from "@repo/ui";

const vazirmatn = Vazirmatn({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: "turborepo-design-system",
  description: "turborepo-design-system Description!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactNode {
  return (
    <html dir="rtl" lang="fa">
      <body className={vazirmatn.className}>
        <Container>
          <Navbar title="ایزی کانکت" />
          {children}
        </Container>
      </body>
    </html>
  );
}
