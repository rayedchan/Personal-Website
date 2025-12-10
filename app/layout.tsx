import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Website | Portfolio",
  description: "Personal website showcasing projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
