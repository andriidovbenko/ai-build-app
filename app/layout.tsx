import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TemplateProvider } from "@/contexts/TemplateContext";

export const metadata: Metadata = {
  title: "Template Preview",
  description: "Template preview application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TemplateProvider>
            {children}
          </TemplateProvider>
        </Providers>
      </body>
    </html>
  );
}
