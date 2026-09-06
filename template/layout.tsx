import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emptyxz CLI | Template Blank",
  description: "Inicie seu projeto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
